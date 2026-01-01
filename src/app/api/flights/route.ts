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

  try {
    const data = await prisma.flight.findMany({
      where: {
        // Filter by departure city (case-insensitive contains)
        ...(isValidSearch(body.departure)
          ? {
            departureCity: {
              contains: body.departure,
              mode: "insensitive",
            },
          }
          : {}),
        // Filter by arrival/destination city (case-insensitive contains)
        ...(isValidSearch(body.arrival)
          ? {
            destinationCity: {
              contains: body.arrival,
              mode: "insensitive",
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
      },
      include: {
        plane: true,
      },
      orderBy: {
        departureDate: "asc",
      },
    });

    return Response.json({ data });
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: true, error_message: "Failed to get data" },
      { status: 500 }
    );
  }
}

