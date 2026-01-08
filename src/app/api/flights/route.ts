import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";
import type { TypeSeat } from "@prisma/client";

// Helper to check if a value is a valid search term
function isValidSearch(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim() !== "" &&
    value !== "Select City"
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  let departureDate: Date | null = null;
  if (body.date) {
    departureDate = new Date(body.date);
    departureDate.setHours(0, 0, 0, 0);
  }

  // Pagination params
  const page = body.page && typeof body.page === 'number' && body.page > 0 ? body.page : 1;
  const limit = body.limit && typeof body.limit === 'number' && body.limit > 0 ? body.limit : 5;
  const skip = (page - 1) * limit;

  // Sorting
  let orderBy: { departureDate?: "asc" | "desc"; price?: "asc" | "desc"; arrivalDate?: "asc" | "desc" } = { departureDate: "asc" }; // default recommended/fastest/duration fallbacks

  if (body.sort === 'cheapest' || body.sort === 'price_low') {
    orderBy = { price: 'asc' };
  } else if (body.sort === 'price_high') {
    orderBy = { price: 'desc' };
  } else if (body.sort === 'fastest' || body.sort === 'duration') {
    // Prisma doesn't support computed sort easily. 
    // For now, we use departureDate as secondary proxy or just default.
    // Ideally we would compute (arrival - departure) but that requires raw query.
    // Let's stick to default for 'fastest' for now to ensure stability, or sort by arrival which is somewhat correlated.
    orderBy = { arrivalDate: 'asc' };
  } else if (body.sort === 'recommended') {
    // Recommended: often price asc or earlier flights
    orderBy = { price: 'asc' };
  }

  const whereClause = {
    // Filter by departure city (case-insensitive contains)
    ...(isValidSearch(body.departure)
      ? {
        departureCity: {
          contains: body.departure,
          mode: "insensitive" as const,
        },
      }
      : {}),
    // Filter by arrival/destination city (case-insensitive contains)
    ...(isValidSearch(body.arrival)
      ? {
        destinationCity: {
          contains: body.arrival,
          mode: "insensitive" as const,
        },
      }
      : {}),
    // Filter by seat type
    ...(body.seat
      ? {
        seats: {
          some: {
            type: body.seat as TypeSeat,
            isBooked: false,
          },
        },
      }
      : {}),
    // Filter by departure date (on or after)
    ...(departureDate
      ? {
        departureDate: {
          gte: departureDate,
        },
      }
      : {}),
    // Filter by plane IDs
    ...(body.planeIds && body.planeIds.length > 0
      ? {
        planeId: {
          in: body.planeIds,
        },
      }
      : {}),
  };

  try {
    const [data, total] = await Promise.all([
      prisma.flight.findMany({
        where: whereClause,
        include: {
          plane: true,
        },
        orderBy: orderBy,
        skip: skip,
        take: limit,
      }),
      prisma.flight.count({
        where: whereClause,
      }),
    ]);

    return Response.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: true, error_message: "Failed to get data" },
      { status: 500 }
    );
  }
}

