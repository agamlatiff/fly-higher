import prisma from "../../../../../lib/prisma";
import dayjs from "dayjs";

export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  activeFlights: number;
  totalUsers: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [revenueResult, bookingsCount, flightsCount, usersCount] =
    await Promise.all([
      // Total revenue from all completed tickets
      prisma.ticket.aggregate({
        _sum: {
          price: true,
        },
        where: {
          status: "SUCCESS",
        },
      }),
      // Total bookings (tickets)
      prisma.ticket.count(),
      // Active flights (departure date >= today)
      prisma.flight.count({
        where: {
          departureDate: {
            gte: new Date(),
          },
        },
      }),
      // Total users
      prisma.user.count(),
    ]);

  return {
    totalRevenue: Number(revenueResult._sum?.price || 0),
    totalBookings: bookingsCount,
    activeFlights: flightsCount,
    totalUsers: usersCount,
  };
}

export async function getLoadFactor(): Promise<number> {
  const now = new Date();

  const [totalSeats, bookedSeats] = await Promise.all([
    prisma.flightSeat.count({
      where: {
        flight: {
          departureDate: {
            gte: now,
          },
        },
      },
    }),
    prisma.flightSeat.count({
      where: {
        isBooked: true,
        flight: {
          departureDate: {
            gte: now,
          },
        },
      },
    }),
  ]);

  if (totalSeats === 0) return 0;
  return Number(((bookedSeats / totalSeats) * 100).toFixed(1));
}

export interface RevenueData {
  name: string;
  total: number;
}

export async function getRevenueChartData(): Promise<RevenueData[]> {
  // Fetch successful tickets from the last 6 months
  const startDate = dayjs().subtract(5, "month").startOf("month").toDate();

  const tickets = await prisma.ticket.findMany({
    where: {
      status: "SUCCESS",
      bookingDate: {
        gte: startDate,
      },
    },
    select: {
      price: true,
      bookingDate: true,
    },
    orderBy: {
      bookingDate: "asc",
    },
  });

  // Group by month
  const monthlyData = new Map<string, number>();

  // Initialize last 6 months with 0
  for (let i = 0; i < 6; i++) {
    const month = dayjs().subtract(5 - i, "month").format("MMM");
    monthlyData.set(month, 0);
  }

  tickets.forEach((ticket) => {
    const month = dayjs(ticket.bookingDate).format("MMM");
    const currentTotal = monthlyData.get(month) || 0;
    monthlyData.set(month, currentTotal + Number(ticket.price));
  });

  return Array.from(monthlyData.entries()).map(([name, total]) => ({
    name,
    total,
  }));
}

const DOMESTIC_AIRPORTS = ["CGK", "DPS", "SUB", "BDO", "KNO", "UPG", "LOP", "JOG", "SOC", "SRG", "BPN", "MDC", "PLM", "BTH"];

export async function getFlightDistribution() {
  const flights = await prisma.flight.findMany({
    select: {
      departureCityCode: true,
      destinationCityCode: true,
    },
  });

  let domestic = 0;
  let international = 0;

  flights.forEach((flight) => {
    const isDomestic =
      DOMESTIC_AIRPORTS.includes(flight.departureCityCode) &&
      DOMESTIC_AIRPORTS.includes(flight.destinationCityCode);

    if (isDomestic) {
      domestic++;
    } else {
      international++;
    }
  });

  return { domestic, international };
}

export interface DestinationRank {
  rank: number;
  name: string;
  count: number;
}

export async function getTopDestinations(limit = 5): Promise<DestinationRank[]> {
  const tickets = await prisma.ticket.findMany({
    include: {
      flight: {
        select: {
          destinationCity: true,
          destinationCityCode: true,
        },
      },
    },
  });

  const cityCounts = new Map<string, number>();

  tickets.forEach((ticket) => {
    const city = `${ticket.flight.destinationCity}`; // You could append Code if needed like (${ticket.flight.destinationCityCode})
    const count = cityCounts.get(city) || 0;
    cityCounts.set(city, count + 1);
  });

  const sortedDestinations = Array.from(cityCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map((entry, index) => ({
      rank: index + 1,
      name: entry[0],
      count: entry[1],
    }));

  return sortedDestinations;
}

export interface RecentBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  route: string;
  departureDate: Date;
  status: string;
  price: number;
  bookingDate: Date;
}

export async function getRecentBookings(
  limit: number = 5
): Promise<RecentBooking[]> {
  const tickets = await prisma.ticket.findMany({
    take: limit,
    orderBy: {
      bookingDate: "desc",
    },
    include: {
      customer: true,
      flight: true,
    },
  });

  return tickets.map((ticket) => ({
    id: ticket.id,
    customerName: ticket.customer.name,
    customerEmail: ticket.customer.email,
    route: `${ticket.flight.departureCity} → ${ticket.flight.destinationCity}`,
    departureDate: ticket.flight.departureDate,
    status: ticket.status,
    price: Number(ticket.price),
    bookingDate: ticket.bookingDate,
  }));
}
