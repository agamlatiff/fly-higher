"use server";

import prisma from "../../../../../../lib/prisma";
import type { Prisma } from "@prisma/client";

export interface GetFlightsParams {
  search?: string;
  status?: string;
  route?: string;
  date?: string;
  page?: number;
  limit?: number;
}

export const getFlights = async (params: GetFlightsParams = {}) => {
  const { search, status, route, date, page = 1, limit = 10 } = params;

  try {
    const where: Prisma.FlightWhereInput = {};
    const now = new Date();

    // Search by departure/destination city
    if (search) {
      where.OR = [
        { departureCity: { contains: search, mode: "insensitive" } },
        { destinationCity: { contains: search, mode: "insensitive" } },
        { departureCityCode: { contains: search, mode: "insensitive" } },
        { destinationCityCode: { contains: search, mode: "insensitive" } },
      ];
    }

    // Filter by route (departure-destination)
    if (route) {
      const [from, to] = route.split("-");
      if (from) where.departureCityCode = { contains: from, mode: "insensitive" };
      if (to) where.destinationCityCode = { contains: to, mode: "insensitive" };
    }

    // Filter by date
    if (date) {
      const filterDate = new Date(date);
      const nextDay = new Date(filterDate);
      nextDay.setDate(nextDay.getDate() + 1);
      where.departureDate = {
        gte: filterDate,
        lt: nextDay,
      };
    }

    // Filter by status (upcoming/past)
    if (status && status !== "all") {
      if (status === "scheduled") {
        where.departureDate = { gte: now };
      } else if (status === "landed") {
        where.departureDate = { lt: now };
      }
    }

    const [flights, total] = await Promise.all([
      prisma.flight.findMany({
        where,
        include: {
          plane: true,
          seats: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { departureDate: "asc" },
      }),
      prisma.flight.count({ where }),
    ]);

    return {
      data: flights,
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
};

export const getFlightById = async (id: string) => {
  try {
    const flight = await prisma.flight.findFirst({
      where: { id },
    });
    return flight;
  } catch (e) {
    console.log(e);
    return null;
  }
};
