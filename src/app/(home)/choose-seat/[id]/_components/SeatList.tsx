"use client";

import SeatItem from "./SeatItem";
import type { FlightSeat } from "@prisma/client";
import { useContext, useMemo } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { AlertTriangle } from "lucide-react";
import type { LegendFilter } from "./SeatLegend";

interface SeatListProps {
  seats: FlightSeat[];
  filter?: LegendFilter;
}

// Row 3 is typically the exit row in smaller aircraft
const EXIT_ROW = "3";

const SeatList = ({ seats, filter = "all" }: SeatListProps) => {
  const { selectedClass } = useContext(seatContext) as SeatContextType;

  const { seatA, seatB, seatC, seatD } = useMemo(() => {
    const rawSeats = seats.filter((seat) => seat.type === selectedClass);

    // Seat format is "10A" - number followed by letter
    const seatA = rawSeats.filter((seat) => seat.seatNumber.endsWith("A"));
    const seatB = rawSeats.filter((seat) => seat.seatNumber.endsWith("B"));
    const seatC = rawSeats.filter((seat) => seat.seatNumber.endsWith("C"));
    const seatD = rawSeats.filter((seat) => seat.seatNumber.endsWith("D"));

    return { seatA, seatB, seatC, seatD };
  }, [selectedClass, seats]);

  // Get row numbers
  const rowNumbers = useMemo(() => {
    const allSeats = [...seatA, ...seatB, ...seatC, ...seatD];
    const rows = new Set(allSeats.map((s) => s.seatNumber.slice(1)));
    return Array.from(rows).sort((a, b) => parseInt(a) - parseInt(b));
  }, [seatA, seatB, seatC, seatD]);

  // Check if seat should be highlighted based on filter
  const shouldHighlight = (seat: FlightSeat, isExitRow: boolean): boolean => {
    if (filter === "all") return true;
    if (filter === "available") return !seat.isBooked;
    if (filter === "occupied") return seat.isBooked;
    if (filter === "legroom") return isExitRow;
    return true;
  };

  return (
    <div className="space-y-2">
      {/* Column Labels Header */}
      <div className="flex items-center justify-center gap-1 sm:gap-3 mb-4">
        {/* Left columns */}
        <div className="flex gap-1 sm:gap-2">
          <div className="w-10 h-6 sm:w-11 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
              A
            </span>
          </div>
          <div className="w-10 h-6 sm:w-11 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
              B
            </span>
          </div>
        </div>

        {/* Aisle indicator */}
        <div className="w-6 sm:w-8 flex items-center justify-center">
          <div className="w-4 h-0.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Right columns */}
        <div className="flex gap-1 sm:gap-2">
          <div className="w-10 h-6 sm:w-11 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
              C
            </span>
          </div>
          <div className="w-10 h-6 sm:w-11 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
              D
            </span>
          </div>
        </div>
      </div>

      {/* Seat Grid */}
      <form className="space-y-2">
        {rowNumbers.map((rowNum) => {
          const leftSeats = [
            ...seatA.filter((s) => s.seatNumber.endsWith(rowNum)),
            ...seatB.filter((s) => s.seatNumber.endsWith(rowNum)),
          ];
          const rightSeats = [
            ...seatC.filter((s) => s.seatNumber.endsWith(rowNum)),
            ...seatD.filter((s) => s.seatNumber.endsWith(rowNum)),
          ];

          const isExitRow = rowNum === EXIT_ROW;

          return (
            <div key={rowNum}>
              {/* Exit Row Indicator */}
              {isExitRow && (
                <div className="flex items-center justify-center gap-2 py-2 mb-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 dark:via-amber-600 to-transparent" />
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-900/30 rounded-full border border-amber-200 dark:border-amber-700">
                    <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-500" />
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      Emergency Exit
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 dark:via-amber-600 to-transparent" />
                </div>
              )}

              {/* Seat Row */}
              <div
                className={`
                  flex items-center justify-center gap-1 sm:gap-3 py-1
                  ${isExitRow ? "bg-amber-50/50 dark:bg-amber-900/20 rounded-lg mx-[-8px] px-2" : ""}
                `}
              >
                {/* Left side seats */}
                <div className="flex gap-1 sm:gap-2">
                  {leftSeats.map((seat) => (
                    <SeatItem
                      key={seat.id}
                      seat={seat}
                      isExitRow={isExitRow}
                      isHighlighted={shouldHighlight(seat, isExitRow)}
                    />
                  ))}
                </div>

                {/* Row number */}
                <div className="w-6 sm:w-8 flex items-center justify-center">
                  <span
                    className={`text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full
                      ${isExitRow ? "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200" : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"}
                    `}
                  >
                    {rowNum}
                  </span>
                </div>

                {/* Right side seats */}
                <div className="flex gap-1 sm:gap-2">
                  {rightSeats.map((seat) => (
                    <SeatItem
                      key={seat.id}
                      seat={seat}
                      isExitRow={isExitRow}
                      isHighlighted={shouldHighlight(seat, isExitRow)}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </form>

      {/* No seats available message */}
      {rowNumbers.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm font-medium">No seats available for this class</p>
        </div>
      )}
    </div>
  );
};

export default SeatList;
