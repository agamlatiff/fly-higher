"use server";

import prisma from "../../../../../../lib/prisma";
import type { Prisma } from "@prisma/client";

export interface GetTicketsParams {
  search?: string;
  status?: string;
  flightId?: string;
  date?: string;
  page?: number;
  limit?: number;
}

export async function getTickets(params: GetTicketsParams = {}) {
  const { search, status, flightId, date, page = 1, limit = 10 } = params;

  try {
    const where: Prisma.TicketWhereInput = {};

    // Search by code or customer name
    if (search) {
      where.OR = [
        { code: { contains: search, mode: "insensitive" } },
        { customer: { name: { contains: search, mode: "insensitive" } } },
        { customer: { email: { contains: search, mode: "insensitive" } } },
      ];
    }

    // Filter by status
    if (status && status !== "all") {
      where.status = status.toUpperCase() as "PENDING" | "SUCCESS" | "FAILED";
    }

    // Filter by flight
    if (flightId) {
      where.flightId = flightId;
    }

    // Filter by booking date
    if (date) {
      const filterDate = new Date(date);
      const nextDay = new Date(filterDate);
      nextDay.setDate(nextDay.getDate() + 1);
      where.bookingDate = {
        gte: filterDate,
        lt: nextDay,
      };
    }

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        include: {
          flight: {
            include: {
              plane: true,
            },
          },
          customer: true,
          seat: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { bookingDate: "desc" },
      }),
      prisma.ticket.count({ where }),
    ]);

    return {
      data: tickets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (e) {
    console.log(e);
    return {
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }
}