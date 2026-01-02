"use server";

import prisma from "@/../lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePassengerName(ticketId: string, newName: string) {
  try {
    // Get the ticket to find the customer (which is a User)
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { customer: true }
    });

    if (!ticket) {
      return { success: false, error: "Ticket not found" };
    }

    // Update the user name (customer is actually a User relation)
    await prisma.user.update({
      where: { id: ticket.customerId },
      data: { name: newName }
    });

    // Revalidate the ticket detail page
    revalidatePath(`/my-tickets/detail/${ticketId}`);

    return { success: true };
  } catch (error) {
    console.error("[updatePassengerName] Error:", error);
    return { success: false, error: "Failed to update passenger name" };
  }
}

export async function cancelTicket(ticketId: string) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return { success: false, error: "Ticket not found" };
    }

    if (ticket.status === "FAILED") {
      return { success: false, error: "Ticket is already cancelled" };
    }

    // Update ticket status to FAILED (acting as Cancelled)
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: "FAILED" },
    });

    // Revalidate the ticket detail page
    revalidatePath(`/my-tickets/detail/${ticketId}`);

    return { success: true };
  } catch (error) {
    console.error("[cancelTicket] Error:", error);
    return { success: false, error: "Failed to cancel ticket" };
  }
}
