"use server";

import prisma from "../../../../../../lib/prisma";
import type { Prisma } from "@prisma/client";

export interface GetAirplanesParams {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function getAirplanes(params: GetAirplanesParams = {}) {
  const { search, type, page = 1, limit = 10 } = params;

  try {
    const where: Prisma.AirplaneWhereInput = {};

    // Search by code or name
    if (search) {
      where.OR = [
        { code: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    // Filter by type (based on name containing type)
    if (type && type !== "all") {
      where.name = { contains: type, mode: "insensitive" };
    }

    const [airplanes, total] = await Promise.all([
      prisma.airplane.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { code: "asc" },
      }),
      prisma.airplane.count({ where }),
    ]);

    return {
      data: airplanes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (e) {
    console.log("Database airplanes error:", e);
    return {
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }
}