"use client";

import { useState } from "react";

export type LegendFilter = "all" | "available" | "occupied" | "legroom";

interface SeatLegendProps {
  onFilterChange?: (filter: LegendFilter) => void;
  availableCount: number;
  occupiedCount: number;
  legroomCount: number;
}

const SeatLegend = ({
  onFilterChange,
  availableCount,
  occupiedCount,
  legroomCount
}: SeatLegendProps) => {
  const [activeFilter, setActiveFilter] = useState<LegendFilter>("all");

  const handleFilterClick = (filter: LegendFilter) => {
    const newFilter = activeFilter === filter ? "all" : filter;
    setActiveFilter(newFilter);
    onFilterChange?.(newFilter);
  };

  return (
    <div className="flex flex-wrap gap-2 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Available */}
      <button
        type="button"
        onClick={() => handleFilterClick("available")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${activeFilter === "available"
          ? "bg-green-100 dark:bg-green-900/30 ring-2 ring-green-400 ring-offset-1 dark:ring-offset-surface-dark"
          : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
      >
        <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Available
        </span>
        <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full">
          {availableCount}
        </span>
      </button>

      {/* Occupied */}
      <button
        type="button"
        onClick={() => handleFilterClick("occupied")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${activeFilter === "occupied"
          ? "bg-gray-200 dark:bg-gray-700 ring-2 ring-gray-400 ring-offset-1 dark:ring-offset-surface-dark"
          : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
      >
        <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs">
          ✕
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Occupied
        </span>
        <span className="text-[10px] font-bold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-full">
          {occupiedCount}
        </span>
      </button>

      {/* Selected - Non-clickable, just indicator */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-primary/10">
        <div className="w-5 h-5 rounded bg-sky-primary text-white flex items-center justify-center text-xs">
          ✓
        </div>
        <span className="text-sm font-medium text-sky-primary">
          Selected
        </span>
      </div>

      {/* Extra Legroom */}
      <button
        type="button"
        onClick={() => handleFilterClick("legroom")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${activeFilter === "legroom"
          ? "bg-amber-100 ring-2 ring-amber-400 ring-offset-1"
          : "bg-amber-50 hover:bg-amber-100"
          }`}
      >
        <div className="w-5 h-5 rounded border-2 border-amber-300 bg-amber-50" />
        <span className="text-sm font-medium text-amber-700">
          Extra Legroom
        </span>
        <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
          {legroomCount}
        </span>
      </button>

      {/* Clear filter hint */}
      {activeFilter !== "all" && (
        <button
          type="button"
          onClick={() => handleFilterClick(activeFilter)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition-colors text-red-600 text-sm font-medium"
        >
          ✕ Clear Filter
        </button>
      )}
    </div>
  );
};

export default SeatLegend;
