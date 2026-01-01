"use client";

import { useContext } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import type { Session } from "@/lib/auth";
import { CHECKOUT_KEY, type Checkout } from "@/lib/utils";
import type { Flight, FlightSeat, Airplane } from "@prisma/client";
import MobileSummaryBar from "./MobileSummaryBar";

type FlightProps = Flight & { seats: FlightSeat[]; plane: Airplane };

interface MobileSummaryWrapperProps {
  flight: FlightProps;
  session: Session | null;
}

const MobileSummaryWrapper = ({ flight, session }: MobileSummaryWrapperProps) => {
  const { selectedSeat, selectedClass } = useContext(seatContext) as SeatContextType;
  const { toast } = useToast();
  const router = useRouter();

  const handleConfirm = () => {
    if (selectedSeat === null) {
      toast({
        title: "Failed to checkout",
        description: "Please select a seat first",
      });
      return;
    }

    if (session === null) {
      router.replace("/sign-in");
      return;
    }

    const checkoutData: Checkout = {
      id: flight.id,
      seat: selectedClass,
      flightDetail: flight,
      seatDetail: selectedSeat,
    };

    sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(checkoutData));
    router.push("/checkout");
  };

  return (
    <MobileSummaryBar
      basePrice={flight.price}
      onConfirm={handleConfirm}
    />
  );
};

export default MobileSummaryWrapper;
