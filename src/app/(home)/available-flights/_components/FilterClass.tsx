"use client";
import type { TypeSeat } from "@prisma/client";
import { useContext, type ChangeEvent } from "react";
import {
  FilterActionKind,
  flightContext,
  type FContext,
} from "../providers/FlightProvider";

const SEAT_OPTIONS: TypeSeat[] = ["ECONOMY", "BUSSINESS", "FIRST"];
const SEAT_LABELS: Record<TypeSeat, string> = {
  ECONOMY: "Economy",
  BUSSINESS: "Business",
  FIRST: "First Class",
};

const FilterClass = () => {
  const { dispatch, state } = useContext(flightContext) as FContext;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FilterActionKind.SET_SEAT,
      payload: {
        seat: event.target.value,
        planeId: "",
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-gray-900 dark:text-white text-sm font-bold mb-1">Seat Class</p>
      {SEAT_OPTIONS.map((item, index) => (
        <label
          key={`${item + index}`}
          htmlFor={item}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <input
            onChange={handleChange}
            type="radio"
            name="seat"
            id={item}
            value={item}
            checked={state.seat === item}
            className="peer sr-only"
          />
          <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${state.seat === item
              ? "border-accent bg-accent"
              : "border-gray-300 dark:border-gray-600"
            }`}>
            {state.seat === item && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
          <span className={`text-sm font-medium transition-colors ${state.seat === item
              ? "text-accent"
              : "text-gray-600 dark:text-gray-300 group-hover:text-accent"
            }`}>
            {SEAT_LABELS[item]}
          </span>
        </label>
      ))}
    </div>
  );
};

export default FilterClass;
