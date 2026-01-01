"use client";

import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  flightContext,
  FilterActionKind,
  type FContext,
} from "../providers/FlightProvider";
import { RotateCcw, SlidersHorizontal, X } from "lucide-react";

interface FilterHeaderProps {
  onReset: () => void;
  activeFilterCount: number;
}

const FilterHeader = ({ onReset, activeFilterCount }: FilterHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-sky-primary" />
        <h3 className="text-lg font-bold text-text-dark">Filters</h3>
        {activeFilterCount > 0 && (
          <span className="w-5 h-5 bg-sky-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </div>
      {activeFilterCount > 0 && (
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-sky-primary transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset all
        </button>
      )}
    </div>
  );
};

// Active Filter Pills
interface ActiveFiltersProps {
  departure: string;
  arrival: string;
  seat: string | null;
  planeIds: string[];
  onClearDeparture: () => void;
  onClearArrival: () => void;
  onClearSeat: () => void;
}

const ActiveFilters = ({
  departure,
  arrival,
  seat,
  planeIds,
  onClearDeparture,
  onClearArrival,
  onClearSeat,
}: ActiveFiltersProps) => {
  const hasFilters =
    (departure && departure !== "Select City") ||
    (arrival && arrival !== "Select City") ||
    seat ||
    planeIds.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {departure && departure !== "Select City" && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-primary/10 text-sky-primary text-xs font-bold rounded-full">
          From: {departure}
          <button
            onClick={onClearDeparture}
            className="hover:bg-sky-primary/20 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {arrival && arrival !== "Select City" && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-primary/10 text-sky-primary text-xs font-bold rounded-full">
          To: {arrival}
          <button
            onClick={onClearArrival}
            className="hover:bg-sky-primary/20 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {seat && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
          {seat}
          <button
            onClick={onClearSeat}
            className="hover:bg-purple-200 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {planeIds.length > 0 && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
          {planeIds.length} airline{planeIds.length > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
};

// Main Filter Wrapper
export const useFilterActions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = useContext(flightContext) as FContext;

  const resetAllFilters = () => {
    // Clear URL params
    router.push("/available-flights");

    // Clear seat filter
    context.dispatch({
      type: FilterActionKind.SET_SEAT,
      payload: { seat: null },
    });

    // Clear sort
    context.dispatch({
      type: FilterActionKind.SET_SORT,
      payload: { sort: "recommended" },
    });
  };

  const clearSeat = () => {
    context.dispatch({
      type: FilterActionKind.SET_SEAT,
      payload: { seat: null },
    });
  };

  const clearDeparture = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("departure");
    router.push(`/available-flights?${params.toString()}`);
  };

  const clearArrival = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("arrival");
    router.push(`/available-flights?${params.toString()}`);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    const departure = searchParams.get("departure");
    const arrival = searchParams.get("arrival");

    if (departure && departure !== "Select City") count++;
    if (arrival && arrival !== "Select City") count++;
    if (context.state.seat) count++;
    if (context.state.planeIds.length > 0) count += context.state.planeIds.length;

    return count;
  };

  return {
    resetAllFilters,
    clearSeat,
    clearDeparture,
    clearArrival,
    getActiveFilterCount,
    state: context.state,
    departure: searchParams.get("departure") || "",
    arrival: searchParams.get("arrival") || "",
  };
};

export { FilterHeader, ActiveFilters };
