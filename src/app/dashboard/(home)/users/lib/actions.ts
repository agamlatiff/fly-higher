"use server";

import prisma from "../../../../../../lib/prisma";
import type { RoleUser } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tickets: {
          include: {
            flight: true,
            seat: true,
          },
          orderBy: { bookingDate: "desc" },
          take: 10,
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export async function updateUser(
  userId: string,
  data: { name?: string; email?: string; passport?: string }
) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data,
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function updateUserRole(userId: string, role: RoleUser) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { success: false, error: "Failed to update role" };
  }
}

export async function deleteUser(userId: string) {
  try {
    // Check if user has tickets
    const ticketCount = await prisma.ticket.count({
      where: { customerId: userId },
    });

    if (ticketCount > 0) {
      return {
        success: false,
        error: `Cannot delete user with ${ticketCount} active tickets. Please transfer or cancel tickets first.`,
      };
    }

    // Delete user sessions first
    await prisma.session.deleteMany({
      where: { userId },
    });

    // Then delete user
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = (formData.get("role") as RoleUser) || "CUSTOMER";

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { success: false, error: "Failed to create user" };
  }
}
