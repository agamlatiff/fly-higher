import prisma from "../../../../../lib/prisma";

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
