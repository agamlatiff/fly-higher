"use server";

import prisma from "../../../../../../lib/prisma";
import type { Prisma } from "@prisma/client";

export interface GetUsersParams {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export async function getCustomers(params: GetUsersParams = {}) {
  const { search, role, page = 1, limit = 10 } = params;

  try {
    const where: Prisma.UserWhereInput = {};

    // Search by name or email
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    // Filter by role
    if (role && role !== "all") {
      where.role = role.toUpperCase() as "CUSTOMER" | "ADMIN";
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: users,
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
