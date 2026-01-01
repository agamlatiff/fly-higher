"use client";
import type { User } from "@/lib/auth";
import useCheckoutData from "./useCheckoutData";
import { useState, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";



type Props = {
  user: User | null;
};

const useTransaction = ({ user }: Props) => {
  const { data } = useCheckoutData();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snapLoaded, setSnapLoaded] = useState<boolean>(false);

  const router = useRouter();



  // Load Snap.js script
  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
    const snapUrl = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";

    if (!document.querySelector(`script[src="${snapUrl}"]`)) {
      const script = document.createElement("script");
      script.src = snapUrl;
      script.setAttribute("data-client-key", clientKey || "");
      script.onload = () => setSnapLoaded(true);
      document.body.appendChild(script);
    } else {
      setSnapLoaded(true);
    }
  }, []);

  const transactionMutate = useMutation({
    mutationFn: (paymentData: unknown) =>
      axios.post("/api/payment/create", paymentData).then((res) => res.data),
  });

  const payTransaction = async () => {
    // Check user and data
    if (!data || !user) {
      alert("Please log in to complete payment.");
      return;
    }

    if (!data.flightDetail || !data.seatDetail) {
      alert("Please select a flight and seat first.");
      return;
    }

    if (!snapLoaded || !window.snap) {
      alert("Payment system is loading. Please try again.");
      return;
    }

    const bodyData = {
      flightId: data.flightDetail.id,
      seatId: data.seatDetail.id,
      seatType: data.seat || "ECONOMY",
    };

    try {
      setIsLoading(true);
      const transaction = await transactionMutate.mutateAsync(bodyData);

      window.snap.pay(transaction.token, {
        onSuccess: function () {
          // Save ticket data for success page
          const ticketData = {
            code: transaction.ticketCode || `FLYH-${transaction.ticketId?.slice(0, 6).toUpperCase() || "XXXXXX"}`,
            passenger: user?.name || "Guest",
            email: user?.email || "your email",
            departure: {
              city: data?.flightDetail?.departureCity || "Origin",
              code: data?.flightDetail?.departureCityCode || "---",
              time: data?.flightDetail?.departureDate ? new Date(data.flightDetail.departureDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "--:--",
            },
            arrival: {
              city: data?.flightDetail?.destinationCity || "Destination",
              code: data?.flightDetail?.destinationCityCode || "---",
            },
            date: data?.flightDetail?.departureDate ? new Date(data.flightDetail.departureDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "---",
            seat: data?.seatDetail?.seatNumber || data?.seat || "--",
          };
          localStorage.setItem("lastBookedTicket", JSON.stringify(ticketData));
          router.push("/success-checkout");
        },
        onPending: function () {
          router.push("/success-checkout");
        },
        onError: function () {
          alert("Payment failed! Please try again.");
        },
        onClose: function () {
          setIsLoading(false);
        },
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Failed to create payment. Please try again.");
    }
  };

  return {
    payTransaction,
    isLoading,
  };
};

export default useTransaction;

