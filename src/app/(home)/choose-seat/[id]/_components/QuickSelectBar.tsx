"use client";

import { useContext } from "react";
import type { FlightSeat } from "@prisma/client";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { Sparkles, Columns, MoveHorizontal } from "lucide-react";

interface QuickSelectBarProps {
  seats: FlightSeat[];
}

const QuickSelectBar = ({ seats }: QuickSelectBarProps) => {
  const { selectedClass, setSelectedSeat } = useContext(seatContext) as SeatContextType;

  // Filter available seats for current class
  const availableSeats = seats.filter(
    (seat) => seat.type === selectedClass && !seat.isBooked
  );

  // Get window seats (A or F column - last character)
  const windowSeats = availableSeats.filter((seat) => {
    const letter = seat.seatNumber.slice(-1);
    return letter === "A" || letter === "F";
  });

  // Get aisle seats (C or D column - last character)
  const aisleSeats = availableSeats.filter((seat) => {
    const letter = seat.seatNumber.slice(-1);
    return letter === "C" || letter === "D";
  });

  // Select best available (first available seat)
  const selectBestAvailable = () => {
    if (availableSeats.length > 0) {
      // Sort by row number to get front seats first
      const sorted = [...availableSeats].sort((a, b) => {
        const rowA = parseInt(a.seatNumber.slice(0, -1));
        const rowB = parseInt(b.seatNumber.slice(0, -1));
        return rowA - rowB;
      });
      setSelectedSeat(sorted[0]);
    }
  };

  // Select best window seat
  const selectWindow = () => {
    if (windowSeats.length > 0) {
      const sorted = [...windowSeats].sort((a, b) => {
        const rowA = parseInt(a.seatNumber.slice(0, -1));
        const rowB = parseInt(b.seatNumber.slice(0, -1));
        return rowA - rowB;
      });
      setSelectedSeat(sorted[0]);
    }
  };

  // Select best aisle seat
  const selectAisle = () => {
    if (aisleSeats.length > 0) {
      const sorted = [...aisleSeats].sort((a, b) => {
        const rowA = parseInt(a.seatNumber.slice(0, -1));
        const rowB = parseInt(b.seatNumber.slice(0, -1));
        return rowA - rowB;
      });
      setSelectedSeat(sorted[0]);
    }
  };

  if (availableSeats.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center mr-2">
        Quick Select:
      </span>

      <button
        type="button"
        onClick={selectBestAvailable}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 text-white text-xs font-medium hover:from-sky-600 hover:to-sky-700 transition-all shadow-sm hover:shadow-md active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Best Available
      </button>

      <button
        type="button"
        onClick={selectWindow}
        disabled={windowSeats.length === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      >
        <Columns className="w-3.5 h-3.5" />
        Window ({windowSeats.length})
      </button>

      <button
        type="button"
        onClick={selectAisle}
        disabled={aisleSeats.length === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium hover:bg-green-100 dark:hover:bg-green-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      >
        <MoveHorizontal className="w-3.5 h-3.5" />
        Aisle ({aisleSeats.length})
      </button>
    </div>
  );
};

export default QuickSelectBar;
