import midtransClient from "midtrans-client";

import { createHash } from "crypto";

// Midtrans Snap client for generating tokens
export const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
});

// For webhook verification
export const coreApi = new midtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
});

// Types for Midtrans transactions
export interface MidtransTransactionParams {
  orderId: string;
  grossAmount: number;
  customerDetails: {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
  };
  itemDetails: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

// Create Snap transaction token
export async function createSnapTransaction(params: MidtransTransactionParams) {
  const parameter = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.grossAmount,
    },
    customer_details: {
      first_name: params.customerDetails.firstName,
      last_name: params.customerDetails.lastName || "",
      email: params.customerDetails.email,
      phone: params.customerDetails.phone || "",
    },
    item_details: params.itemDetails.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      error: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/error`,
      pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`,
    },
  };

  return snap.createTransaction(parameter);
}

// Verify notification signature
export function verifySignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
  const hash = createHash("sha512")
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest("hex");
  return hash === signatureKey;
}
