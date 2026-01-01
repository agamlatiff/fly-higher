import type { NextRequest } from "next/server";
import prisma from "../../../../../lib/prisma";
import { makeid } from "@/lib/utils";

const MIDTRANS_URL = process.env.NEXT_PUBLIC_MIDTRANS_TRANSACTION_URL ?? "";


export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const transaction = await prisma.ticket.create({
      data: {
        bookingDate: body.bookingDate,
        price: body.price,
        status: "PENDING",
        customerId: body.customerId,
        flightId: body.flightId,
        code: `TRX${makeid(7)}`,
        seatId: body.seatId,
      },
    });

    await prisma.flightSeat.update({
      where: {
        id: transaction.seatId,
      },
      data: {
        isBooked: true,
      },
    });

    const paramter = {
      transaction_details: {
        order_id: transaction.id,
        gross_amount: body.price,
      },
      credit_details: [
        {
          id: body.flightId,
          price: body.price,
          quantity: 1,
          name: `Tiket Pesawat ${body.departureCityCode} - ${body.destinationCityCode}`,
        },
      ],
    };

    const resMidtrans = await fetch(MIDTRANS_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(paramter),
    });

    const midtrans = await resMidtrans.json();

    await prisma.ticket.update({
      where: {
        id: transaction.id,
      },
      data: {
        tokenMidtrans: midtrans.token,
      },
    });

    return Response.json({ midtrans, transaction_id: transaction.id });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
