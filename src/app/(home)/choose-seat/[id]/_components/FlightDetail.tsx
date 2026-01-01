"use client";

import { getUrlFile } from "@/lib/supabase";
import {
  CHECKOUT_KEY,
  dateFormat,
  rupiahFormat,
  SEAT_VALUES,
  type Checkout,
  type SeatValuesType,
} from "@/lib/utils";
import type { Airplane, Flight, FlightSeat } from "@prisma/client";
import Image from "next/image";
import { useContext, useMemo } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { useToast } from "@/hooks/use-toast";
import type { Session } from "@/lib/auth";
import { useRouter } from "next/navigation";

type FlightProps = Flight & { seats: FlightSeat[]; plane: Airplane };

interface FlightDetailProps {
  flight: FlightProps;
  session: Session | null;
}

const FlightDetail = ({ flight, session }: FlightDetailProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const { selectedSeat, selectedClass } = useContext(seatContext) as SeatContextType;

  const seatClass = useMemo(() => {
    return SEAT_VALUES[selectedClass as SeatValuesType];
  }, [selectedClass]);

  const continueBook = () => {
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

  const totalPrice = flight.price + seatClass.additionalPrice;

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      {/* Flight Card - Separate Card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 z-10 relative">
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
              Flight
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-white">
              {flight.departureCityCode}{" "}
              <span className="text-gray-300 dark:text-gray-600 font-light mx-1">→</span>{" "}
              {flight.destinationCityCode}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {dateFormat(flight.departureDate, "MMM dd, HH:mm a")}
            </p>
          </div>
          <div className="bg-accent/10 dark:bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold">
            {flight.plane.code}
          </div>
        </div>

        {/* Decorative Map Line */}
        <div className="relative h-16 w-full">
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-200 dark:bg-gray-700 border-t border-dashed border-gray-300 dark:border-gray-600" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-surface-dark" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent border-2 border-white dark:border-surface-dark shadow-sm ring-2 ring-accent/20" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-surface-dark p-1 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm">
            <span className="material-symbols-outlined text-accent">flight</span>
          </div>
        </div>
      </div>

      {/* Selection Card - Separate Card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-accent">auto_awesome</span>
          Your Selection
        </h3>

        <div className="space-y-4">
          {/* Class Badge */}
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl border border-accent/10 dark:border-accent/20">
            <span className="text-sm font-bold text-accent">
              {seatClass.label} Class
            </span>
            {seatClass.additionalPrice > 0 && (
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                +{rupiahFormat(seatClass.additionalPrice)}
              </span>
            )}
          </div>

          {/* Passenger Selection */}
          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <div
              className={`text-white w-12 h-12 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${selectedSeat
                ? "bg-accent shadow-accent/30"
                : "bg-gray-300 dark:bg-gray-600"
                }`}
            >
              <span className="text-xs font-medium opacity-80">Seat</span>
              <span className="text-lg font-bold leading-none">
                {selectedSeat?.seatNumber || "—"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Passenger 1</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{seatClass.label}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {rupiahFormat(seatClass.additionalPrice)}
              </p>
            </div>
          </div>

          {/* Airplane Image */}
          <div className="h-28 w-full rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 flex items-center justify-center relative overflow-hidden group border border-gray-100 dark:border-gray-700">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            <Image
              src={getUrlFile(flight.plane.image)}
              alt={flight.plane.name}
              width={140}
              height={90}
              className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 object-cover"
            />
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Ticket Price</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {rupiahFormat(flight.price)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Seat Upgrade
            </span>
            <span className="text-accent font-medium">
              {seatClass.additionalPrice > 0
                ? `+${rupiahFormat(seatClass.additionalPrice)}`
                : "Free"}
            </span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200 dark:border-gray-600">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
            <span className="text-2xl font-black text-accent">
              {rupiahFormat(totalPrice)}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={continueBook}
          disabled={!selectedSeat}
          className={`
            w-full mt-6 font-bold py-4 rounded-full transition-all flex items-center justify-center gap-2
            ${selectedSeat
              ? "bg-accent hover:bg-sky-400 text-primary shadow-lg shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Confirm Seat Selection
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default FlightDetail;
