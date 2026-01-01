"use client";

import type { Airplane } from "@prisma/client";
import { useContext, type ChangeEvent } from "react";
import {
  FilterActionKind,
  flightContext,
  type FContext,
} from "../providers/FlightProvider";
import Image from "next/image";
import { getUrlFile } from "@/lib/supabase";

interface CheckboxAirlineProps {
  item: Airplane;
}

const CheckboxAirline = ({ item }: CheckboxAirlineProps) => {
  const { dispatch } = useContext(flightContext) as FContext;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    dispatch({
      type: isChecked
        ? FilterActionKind.ADD_PLANE
        : FilterActionKind.REMOVE_PLANE,
      payload: {
        planeId: value,
      },
    });
  };

  return (
    <label htmlFor={item.name} className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        name="airlines"
        id={item.name}
        value={item.id}
        onChange={handleChange}
        className="peer sr-only"
      />
      <div className="w-5 h-5 border-2 border-gray-200 dark:border-gray-600 rounded-md flex items-center justify-center transition-colors peer-checked:bg-accent peer-checked:border-accent">
        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </svg>
      </div>
      <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        <Image
          src={getUrlFile(item.image)}
          alt={item.name}
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-gray-600 dark:text-gray-300 text-sm font-medium group-hover:text-accent transition-colors">
        {item.name}
      </span>
    </label>
  );
};

export default CheckboxAirline;
