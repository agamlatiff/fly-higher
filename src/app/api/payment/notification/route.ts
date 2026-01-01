import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { verifySignature } from "@/lib/midtrans";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      order_id,
      transaction_status,
      fraud_status,
      signature_key,
      status_code,
      gross_amount,
    } = body;

    // Verify signature
    const isValid = verifySignature(
      order_id,
      status_code,
      gross_amount,
      signature_key
    );

    if (!isValid) {
      console.error("Invalid signature for order:", order_id);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }

    // Find ticket by order_id (which is the ticket code)
    const ticket = await prisma.ticket.findFirst({
      where: { code: order_id },
      include: { seat: true },
    });

    if (!ticket) {
      console.error("Ticket not found for order:", order_id);
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    // Determine new status based on Midtrans response
    let newStatus: "SUCCESS" | "PENDING" | "FAILED" = "PENDING";

    if (transaction_status === "capture") {
      // For credit card payment
      if (fraud_status === "accept") {
        newStatus = "SUCCESS";
      }
    } else if (transaction_status === "settlement") {
      // For most payment methods
      newStatus = "SUCCESS";
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      newStatus = "FAILED";
    } else if (transaction_status === "pending") {
      newStatus = "PENDING";
    }

    // Update ticket status
    await prisma.ticket.update({
      where: { id: ticket.id },
      data: { status: newStatus },
    });

    // If payment successful, mark seat as booked
    if (newStatus === "SUCCESS") {
      await prisma.flightSeat.update({
        where: { id: ticket.seatId },
        data: { isBooked: true },
      });
      console.log(`Payment SUCCESS for order: ${order_id}`);
    } else if (newStatus === "FAILED") {
      // Delete the pending ticket on cancel
      await prisma.ticket.delete({
        where: { id: ticket.id },
      });
      console.log(`Payment FAILED for order: ${order_id}`);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Notification handler error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Midtrans may also send GET request for health check
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
