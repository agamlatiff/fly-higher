"use client";

import type { FlightSeat, TypeSeat } from "@prisma/client";
import { useContext, useState } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { X, Check, ArrowUpFromLine, Eye } from "lucide-react";
import { rupiahFormat } from "@/lib/utils";

interface SeatItemProps {
  seat: FlightSeat;
  isExitRow?: boolean;
  isHighlighted?: boolean;
  price?: number;
}

// Determine seat position based on letter (seat format: "10A")
const getSeatPosition = (seatNumber: string): string => {
  const letter = seatNumber.slice(-1);
  if (letter === "A" || letter === "F") return "Window";
  if (letter === "B" || letter === "E") return "Middle";
  if (letter === "C" || letter === "D") return "Aisle";
  return "Standard";
};

// Get class-based color theme
const getClassTheme = (seatType: TypeSeat) => {
  switch (seatType) {
    case "FIRST":
      return {
        border: "border-amber-400 dark:border-amber-500",
        bg: "bg-amber-50 dark:bg-amber-900/20",
        text: "text-amber-700 dark:text-amber-400",
        hover: "hover:border-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/40",
        selected: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-300/50",
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
        label: "First Class",
      };
    case "BUSSINESS":
      return {
        border: "border-purple-400 dark:border-purple-500",
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-700 dark:text-purple-400",
        hover: "hover:border-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/40",
        selected: "bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-300/50",
        badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
        label: "Business",
      };
    default: // ECONOMY
      return {
        border: "border-sky-300 dark:border-sky-500",
        bg: "bg-sky-50 dark:bg-sky-900/20",
        text: "text-sky-700 dark:text-sky-400",
        hover: "hover:border-sky-500 hover:bg-sky-100 dark:hover:bg-sky-900/40",
        selected: "bg-gradient-to-br from-sky-400 to-sky-600 shadow-sky-300/50",
        badge: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-400",
        label: "Economy",
      };
  }
};

// Get seat amenities based on position and row
const getSeatAmenities = (seatNumber: string, isExitRow: boolean, seatType: TypeSeat): string[] => {
  const position = getSeatPosition(seatNumber);
  const amenities: string[] = [];

  if (position === "Window") {
    amenities.push("🪟 Window View");
  }
  if (position === "Aisle") {
    amenities.push("🚶 Easy Access");
  }
  if (isExitRow) {
    amenities.push("🦵 Extra Legroom");
    amenities.push("⚠️ Emergency Exit");
  }
  if (seatType === "FIRST") {
    amenities.push("🍾 Premium Service");
    amenities.push("🛏️ Lie-flat Seat");
  } else if (seatType === "BUSSINESS") {
    amenities.push("🍷 Priority Service");
    amenities.push("💼 Extra Recline");
  } else {
    amenities.push("💺 Reclinable Seat");
  }
  amenities.push("🔌 Power Outlet");

  return amenities;
};

const SeatItem = ({ seat, isExitRow = false, isHighlighted = true, price }: SeatItemProps) => {
  const { selectedSeat, setSelectedSeat, addToCompare, isComparing, removeFromCompare } = useContext(
    seatContext
  ) as SeatContextType;
  const [showTooltip, setShowTooltip] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const isSelected = selectedSeat?.id === seat.id;
  const isBooked = seat.isBooked ?? false;
  const isInCompare = isComparing(seat.id);
  const seatPosition = getSeatPosition(seat.seatNumber);
  const classTheme = getClassTheme(seat.type);
  const amenities = getSeatAmenities(seat.seatNumber, isExitRow, seat.type);

  // Dim non-highlighted seats when filtering
  const dimmedClass = !isHighlighted && !isSelected ? "opacity-30 scale-90" : "";

  // Long press handlers for compare
  const handleTouchStart = () => {
    setShowTooltip(true);
    if (!isBooked) {
      const timer = setTimeout(() => {
        if (isInCompare) {
          removeFromCompare(seat.id);
        } else {
          addToCompare(seat);
        }
      }, 500); // 500ms long press
      setLongPressTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setTimeout(() => setShowTooltip(false), 2000);
  };

  // Right click to toggle compare (desktop)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isBooked) {
      if (isInCompare) {
        removeFromCompare(seat.id);
      } else {
        addToCompare(seat);
      }
    }
  };

  return (
    <div className={`relative transition-all duration-300 ${dimmedClass}`}>
      <label
        className="group cursor-pointer relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onContextMenu={handleContextMenu}
      >
        <input
          type="radio"
          name="seat"
          className="seat-checkbox hidden"
          disabled={isBooked}
          checked={isSelected}
          onChange={() => setSelectedSeat(seat)}
        />
        <div
          className={`
            relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center 
            font-bold text-sm transition-all duration-200 ease-out
            ${isBooked
              ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : isSelected
                ? `${classTheme.selected} text-white shadow-lg scale-105`
                : isInCompare
                  ? "border-2 border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 ring-2 ring-orange-400/50 scale-105"
                  : isExitRow
                    ? `border-2 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 ${classTheme.hover} hover:scale-105`
                    : `border-2 ${classTheme.border} ${classTheme.bg} ${classTheme.text} ${classTheme.hover} hover:scale-105`
            }
            ${!isBooked && !isSelected ? "active:scale-95" : ""}
          `}
        >
          {isBooked ? (
            <X className="w-4 h-4" />
          ) : isSelected ? (
            <Check className="w-4 h-4" />
          ) : (
            <span>{seat.seatNumber}</span>
          )}

          {/* Compare indicator badge */}
          {isInCompare && !isSelected && (
            <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">
              C
            </div>
          )}

          {/* Extra legroom badge for exit row */}
          {isExitRow && !isBooked && !isSelected && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
              <ArrowUpFromLine className="w-2.5 h-2.5 text-white" />
            </div>
          )}

          {/* Selection ring animation */}
          {isSelected && (
            <div className="absolute inset-0 rounded-lg ring-4 ring-sky-primary/30 animate-pulse" />
          )}

          {/* Info indicator for non-booked seats */}
          {!isBooked && !isSelected && isHighlighted && (
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-2 h-2 text-gray-400" />
            </div>
          )}
        </div>
      </label>

      {/* Enhanced Tooltip */}
      {showTooltip && !isBooked && isHighlighted && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-gray-900 text-white rounded-xl shadow-xl p-3 relative">
            {/* Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45" />

            {/* Header */}
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-700">
              <span className="font-bold text-sm">Seat {seat.seatNumber}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${classTheme.badge}`}>
                {classTheme.label}
              </span>
            </div>

            {/* Position Badge */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${seatPosition === "Window"
                ? "bg-blue-500/20 text-blue-300"
                : seatPosition === "Aisle"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-gray-500/20 text-gray-300"
                }`}>
                {seatPosition} Seat
              </span>
            </div>

            {/* Amenities List */}
            <div className="space-y-1">
              {amenities.slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            {price && (
              <div className="mt-2 pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Seat Price</span>
                  <span className="text-sm font-bold text-accent">{rupiahFormat(price)}</span>
                </div>
              </div>
            )}

            {/* Select hint */}
            <div className="mt-2 pt-2 border-t border-gray-700 text-center">
              <span className="text-[10px] text-gray-400">Tap to select</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatItem;
