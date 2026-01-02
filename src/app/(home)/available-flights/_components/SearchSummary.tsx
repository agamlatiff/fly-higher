"use client";

import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  flightContext,
  FilterActionKind,
  type FContext,
} from "../providers/FlightProvider";



interface SearchSummaryProps {
  onEdit?: () => void;
}

const SearchSummary = ({ onEdit }: SearchSummaryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useContext(flightContext) as FContext;

  const departure = searchParams.get("departure") || "";
  const arrival = searchParams.get("arrival") || "";
  const date = searchParams.get("date") || "";

  const isValidDeparture = departure && departure !== "Select City";
  const isValidArrival = arrival && arrival !== "Select City";

  // Display title based on search
  const displayTitle =
    isValidDeparture && isValidArrival
      ? `${departure} → ${arrival}`
      : "Search Flights";

  // Count active filters
  const activeFilterCount = [
    !!state.seat,
    state.planeIds.length > 0,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    router.push("/available-flights");
    dispatch({ type: FilterActionKind.SET_SEAT, payload: { seat: null } });
    dispatch({ type: FilterActionKind.SET_SORT, payload: { sort: "recommended" } });
  };

  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-gray-100 dark:border-gray-800">
      {/* Search Summary Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search/Edit Trigger */}
        <button
          onClick={onEdit}
          className="group flex items-center gap-3 pr-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="w-10 h-10 bg-accent/10 dark:bg-accent/20 group-hover:bg-accent/20 dark:group-hover:bg-accent/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
            <span className="material-symbols-outlined text-accent">search</span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{displayTitle}</p>
            <p className="text-xs text-sky-primary font-medium">Click to change search</p>
          </div>
        </button>

        <div className="w-[1px] h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block mx-1" />

        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Seat Class */}
          {state.seat && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-bold rounded-full">
              {state.seat}
              <button
                onClick={() =>
                  dispatch({ type: FilterActionKind.SET_SEAT, payload: { seat: null } })
                }
                className="hover:bg-yellow-200 dark:hover:bg-yellow-800/50 rounded-full p-0.5 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </span>
          )}

          {/* Airlines Count */}
          {state.planeIds.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-bold rounded-full">
              {state.planeIds.length} airline{state.planeIds.length > 1 ? "s" : ""}
            </span>
          )}

          {/* No filters placeholder */}
          {activeFilterCount === 0 && (
            <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
              No filters applied — showing all flights
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-bold rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Count */}
      {activeFilterCount > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
          </span>
          <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
          <button
            onClick={clearAllFilters}
            className="text-xs text-accent hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSummary;
