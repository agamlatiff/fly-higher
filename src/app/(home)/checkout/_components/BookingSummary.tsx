"use client";

import useCheckoutData from "@/hooks/useCheckoutData";
import { getUrlFile } from "@/lib/supabase";
import {
  dateFormat,
  rupiahFormat,
  SEAT_VALUES,
  type SeatValuesType,
} from "@/lib/utils";
import type { User } from "@/lib/auth";
import Image from "next/image";
import { useMemo } from "react";

interface BookingSummaryProps {
  user: User | null;
}

const BookingSummary = ({ user }: BookingSummaryProps) => {
  const { data } = useCheckoutData();

  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data?.seat]);

  const totalPrice = useMemo(() => {
    if (!data?.flightDetail?.price) return 0;
    return data.flightDetail.price + selectedSeat.additionalPrice;
  }, [data?.flightDetail?.price, selectedSeat.additionalPrice]);

  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden sticky top-24">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-sky-300 to-accent" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-dashed border-gray-200 dark:border-gray-700 pt-2">
        <div className="w-10 h-10 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent">
          <span className="material-symbols-outlined">receipt_long</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Trip</h3>
      </div>

      {/* Flight Info */}
      {data?.flightDetail && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700 shadow-md overflow-hidden relative">
              <Image
                fill
                src={getUrlFile(data.flightDetail.plane.image)}
                className="object-cover"
                alt={data.flightDetail.plane.name}
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                {data.flightDetail.plane.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {dateFormat(data.flightDetail.departureDate, "DD MMM YYYY")}
              </p>
            </div>
          </div>

          {/* Route Visualization */}
          <div className="flex items-center justify-between gap-2 mb-4 px-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20" />
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {data.flightDetail.departureCityCode}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              <div className="w-full h-[2px] bg-gray-200 dark:bg-gray-700 absolute top-1/2 -translate-y-1/2" />
              <div className="w-8 h-8 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 flex items-center justify-center z-10 shadow-sm text-accent">
                <span className="material-symbols-outlined text-lg">flight</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-500/20" />
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {data.flightDetail.destinationCityCode}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
            <span>{dateFormat(data.flightDetail.departureDate, "HH:mm")}</span>
            <span>{dateFormat(data.flightDetail.arrivalDate, "HH:mm")}</span>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="flex flex-col gap-4 py-4 border-t border-gray-100 dark:border-gray-800">
        {/* Seat Selection */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-gray-400 mt-0.5">airline_seat_recline_extra</span>
            <div>
              <p className="text-gray-900 dark:text-white text-sm font-bold">
                Seat {data?.seatDetail?.seatNumber || "—"}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{user?.name || "Passenger"}</p>
            </div>
          </div>
          <p className="text-gray-900 dark:text-white text-sm font-bold">
            {rupiahFormat(selectedSeat.additionalPrice)}
          </p>
        </div>

        {/* Flight Price */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-gray-400 mt-0.5">flight</span>
            <div>
              <p className="text-gray-900 dark:text-white text-sm font-bold">Flight Ticket</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{selectedSeat.label} Class</p>
            </div>
          </div>
          <p className="text-gray-900 dark:text-white text-sm font-bold">
            {rupiahFormat(data?.flightDetail?.price || 0)}
          </p>
        </div>

        {/* Taxes */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-gray-400 mt-0.5">receipt</span>
            <div>
              <p className="text-gray-900 dark:text-white text-sm font-bold">Taxes & Fees</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Included</p>
            </div>
          </div>
          <p className="text-gray-900 dark:text-white text-sm font-bold">
            {rupiahFormat(0)}
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-end">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total due today</p>
        <h2 className="text-accent text-2xl font-black tracking-tight">
          {rupiahFormat(totalPrice)}
        </h2>
      </div>
    </div>
  );
};

export default BookingSummary;
