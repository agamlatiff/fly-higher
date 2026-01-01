"use client";

import { useState, useMemo } from "react";
import type { FlightSeat } from "@prisma/client";
import SeatLegend, { type LegendFilter } from "./SeatLegend";
import SeatList from "./SeatList";
import QuickSelectBar from "./QuickSelectBar";
import SeatComparePanel from "./SeatComparePanel";
import { useContext } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { Plane } from "lucide-react";

interface SeatMapWrapperProps {
  seats: FlightSeat[];
}

// Row 3 is typically the exit row in smaller aircraft
const EXIT_ROW = "3";

const SeatMapWrapper = ({ seats }: SeatMapWrapperProps) => {
  const [filter, setFilter] = useState<LegendFilter>("all");
  const { selectedClass } = useContext(seatContext) as SeatContextType;

  // Calculate counts based on current class
  const counts = useMemo(() => {
    const classSeats = seats.filter(s => s.type === selectedClass);
    const available = classSeats.filter(s => !s.isBooked).length;
    const occupied = classSeats.filter(s => s.isBooked).length;
    const legroom = classSeats.filter(s => s.seatNumber.endsWith(EXIT_ROW)).length;

    return { available, occupied, legroom };
  }, [seats, selectedClass]);

  return (
    <div className="space-y-6">
      {/* Quick Select Buttons */}
      <QuickSelectBar seats={seats} />

      {/* Interactive Legend */}
      <SeatLegend
        onFilterChange={setFilter}
        availableCount={counts.available}
        occupiedCount={counts.occupied}
        legroomCount={counts.legroom}
      />

      {/* Fuselage Visual Container */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-white dark:bg-surface-dark shadow-soft border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        {/* Wing Indicators - Left */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="w-16 h-40 bg-gradient-to-r from-gray-100 dark:from-gray-800 to-transparent rounded-r-full opacity-50" />
          <div className="absolute inset-0 flex items-center justify-start pl-2">
            <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 rotate-90 whitespace-nowrap">
              WING
            </span>
          </div>
        </div>

        {/* Wing Indicators - Right */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
          <div className="w-16 h-40 bg-gradient-to-l from-gray-100 dark:from-gray-800 to-transparent rounded-l-full opacity-50" />
          <div className="absolute inset-0 flex items-center justify-end pr-2">
            <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 -rotate-90 whitespace-nowrap">
              WING
            </span>
          </div>
        </div>

        {/* Decorative Cockpit Shape */}
        <div className="w-20 h-20 bg-gradient-to-b from-gray-100 dark:from-gray-700 to-transparent rounded-t-full absolute -top-10 left-1/2 -translate-x-1/2 z-0 opacity-60" />

        {/* Cabin Interior */}
        <div className="relative z-10 w-full max-w-md mx-auto bg-gray-50 dark:bg-gray-800 rounded-[3rem] px-4 sm:px-6 py-10 border-4 border-gray-200 dark:border-gray-700 shadow-inner">
          {/* Front Decoration */}
          <div className="flex justify-center mb-6 opacity-40">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
              <Plane className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>

          {/* Class Label with Availability */}
          <div className="text-center mb-6">
            <span className="text-xs font-bold tracking-widest text-sky-primary uppercase bg-sky-primary/10 dark:bg-sky-primary/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Plane className="w-3 h-3" />
              Seat Selection
            </span>
          </div>

          {/* Seat Grid */}
          <SeatList seats={seats} filter={filter} />

          {/* Rear/Bathroom Visual */}
          <div className="mt-8 flex justify-center gap-8 opacity-40">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                🚻
              </div>
              <span className="text-[8px] font-medium text-gray-400 dark:text-gray-500">WC</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                ☕
              </div>
              <span className="text-[8px] font-medium text-gray-400 dark:text-gray-500">Galley</span>
            </div>
          </div>
        </div>

        {/* Tail decoration */}
        <div className="w-16 h-16 bg-gradient-to-t from-gray-100 dark:from-gray-700 to-transparent rounded-b-full absolute -bottom-8 left-1/2 -translate-x-1/2 z-0 opacity-60" />
      </div>

      {/* Seat Compare Panel - Fixed at bottom */}
      <SeatComparePanel />
    </div>
  );
};

export default SeatMapWrapper;
