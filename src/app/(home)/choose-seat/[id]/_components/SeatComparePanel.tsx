"use client";

import { useContext } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { X, Check, Trash2 } from "lucide-react";

// Helper to get seat position
const getSeatPosition = (seatNumber: string): string => {
  const letter = seatNumber.slice(-1);
  if (letter === "A" || letter === "F") return "Window";
  if (letter === "B" || letter === "E") return "Middle";
  if (letter === "C" || letter === "D") return "Aisle";
  return "Standard";
};

const SeatComparePanel = () => {
  const { comparedSeats, removeFromCompare, clearCompare, setSelectedSeat } =
    useContext(seatContext) as SeatContextType;

  if (comparedSeats.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Compare Seats
            </span>
            <span className="text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full">
              {comparedSeats.length}/3
            </span>
          </div>
          <button
            type="button"
            onClick={clearCompare}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>

        {/* Seat Cards Grid */}
        <div className="grid grid-cols-3 gap-3">
          {comparedSeats.map((seat) => {
            const position = getSeatPosition(seat.seatNumber);
            const classLabel =
              seat.type === "FIRST"
                ? "First"
                : seat.type === "BUSSINESS"
                  ? "Business"
                  : "Economy";
            const classColor =
              seat.type === "FIRST"
                ? "from-amber-400 to-amber-600"
                : seat.type === "BUSSINESS"
                  ? "from-purple-400 to-purple-600"
                  : "from-sky-400 to-sky-600";

            return (
              <div
                key={seat.id}
                className="relative bg-gray-50 dark:bg-gray-700 rounded-xl p-3 border border-gray-200 dark:border-gray-600"
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFromCompare(seat.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Seat Info */}
                <div className="text-center">
                  <div
                    className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${classColor} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {seat.seatNumber}
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    {classLabel}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {position} Seat
                  </p>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  onClick={() => setSelectedSeat(seat)}
                  className="w-full mt-2 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <Check className="w-3 h-3" />
                  Select
                </button>
              </div>
            );
          })}

          {/* Empty slots */}
          {Array.from({ length: 3 - comparedSeats.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center min-h-[100px]"
            >
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Long press seat to add
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatComparePanel;
