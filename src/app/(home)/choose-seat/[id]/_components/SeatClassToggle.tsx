"use client";

import { useContext, useMemo } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import type { FlightSeat, TypeSeat } from "@prisma/client";
import { SEAT_VALUES } from "@/lib/utils";
import { rupiahFormat } from "@/lib/utils";

interface SeatClassToggleProps {
  seats: FlightSeat[];
  basePrice: number;
}

const CLASS_OPTIONS: {
  value: TypeSeat;
  label: string;
  icon: string; // Material Symbols icon name
  color: string;
  bgColor: string;
}[] = [
    {
      value: "ECONOMY",
      label: "Economy",
      icon: "airline_seat_recline_normal",
      color: "text-gray-600 dark:text-gray-300",
      bgColor: "bg-gray-100 dark:bg-gray-800",
    },
    {
      value: "BUSSINESS",
      label: "Business",
      icon: "airline_seat_recline_extra",
      color: "text-accent",
      bgColor: "bg-accent/10 dark:bg-accent/20",
    },
    {
      value: "FIRST",
      label: "First Class",
      icon: "workspace_premium",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/30",
    },
  ];

const SeatClassToggle = ({ seats, basePrice }: SeatClassToggleProps) => {
  const { selectedClass, setSelectedClass } = useContext(
    seatContext
  ) as SeatContextType;

  // Calculate seat availability for each class
  const seatCounts = useMemo(() => {
    const counts: Record<TypeSeat, { available: number; total: number }> = {
      ECONOMY: { available: 0, total: 0 },
      BUSSINESS: { available: 0, total: 0 },
      FIRST: { available: 0, total: 0 },
    };

    seats.forEach((seat) => {
      counts[seat.type].total++;
      if (!seat.isBooked) {
        counts[seat.type].available++;
      }
    });

    return counts;
  }, [seats]);

  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-gray-100 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        Select Class
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {CLASS_OPTIONS.map((option) => {
          const isSelected = selectedClass === option.value;
          const count = seatCounts[option.value];
          const priceInfo = SEAT_VALUES[option.value];
          const totalPrice = basePrice + priceInfo.additionalPrice;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedClass(option.value)}
              className={`
                relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300
                ${isSelected
                  ? `${option.bgColor} ring-2 ring-offset-2 dark:ring-offset-surface-dark ${option.value === "ECONOMY"
                    ? "ring-gray-400"
                    : option.value === "BUSSINESS"
                      ? "ring-accent"
                      : "ring-amber-500"
                  }`
                  : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                ${count.available === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
              disabled={count.available === 0}
            >
              {/* Icon */}
              <div
                className={`
                p-2 rounded-lg transition-colors duration-300
                ${isSelected ? option.bgColor : "bg-white dark:bg-gray-700"}
              `}
              >
                <span
                  className={`material-symbols-outlined text-xl ${isSelected ? option.color : "text-gray-400"}`}
                >
                  {option.icon}
                </span>
              </div>

              {/* Label */}
              <span
                className={`text-sm font-bold ${isSelected ? option.color : "text-gray-600 dark:text-gray-300"
                  }`}
              >
                {option.label}
              </span>

              {/* Price */}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {rupiahFormat(totalPrice)}
              </span>

              {/* Availability Badge */}
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${count.available > 0
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}
              >
                {count.available}/{count.total} seats
              </span>

              {/* Selected indicator */}
              {isSelected && (
                <div
                  className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white ${option.value === "ECONOMY"
                    ? "bg-gray-500"
                    : option.value === "BUSSINESS"
                      ? "bg-accent"
                      : "bg-amber-500"
                    }`}
                >
                  <span className="material-symbols-outlined text-xs">check</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SeatClassToggle;
