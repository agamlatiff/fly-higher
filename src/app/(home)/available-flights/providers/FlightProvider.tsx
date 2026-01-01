"use client";

import type { Airplane, Flight } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useReducer,
  useMemo,
  type Dispatch,
  type FC,
  type ReactNode,
} from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface FlightProviderProps {
  children: ReactNode;
}

export enum FilterActionKind {
  ADD_PLANE = "ADD_PLANE",
  REMOVE_PLANE = "REMOVE_PLANE",
  SET_SEAT = "SET_SEAT",
  SET_SORT = "SET_SORT",
}

export type SortOption = "recommended" | "cheapest" | "fastest" | "price_low" | "price_high" | "duration";

type FilterState = {
  departure?: string | null;
  arrival?: string | null;
  date?: string | null;
  planeId: string | null;
  planeIds: string[];
  seat?: string | null;
  sort: SortOption;
};

type FilterAction = {
  type: FilterActionKind;
  payload: Partial<Omit<FilterState, "planeIds">>;
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  const { payload, type } = action;

  switch (type) {
    case FilterActionKind.ADD_PLANE:
      return {
        ...state,
        planeIds: payload.planeId
          ? [...state.planeIds, payload.planeId]
          : state.planeIds,
      };
    case FilterActionKind.REMOVE_PLANE:
      return {
        ...state,
        planeIds: payload.planeId
          ? state.planeIds.filter((item) => item !== payload.planeId)
          : state.planeIds,
      };
    case FilterActionKind.SET_SEAT:
      return {
        ...state,
        seat: payload.seat,
      };
    case FilterActionKind.SET_SORT:
      return {
        ...state,
        sort: payload.sort ?? "recommended",
      };
    default:
      return state;
  }
}

export type FlightWithPlane = Flight & {
  plane: Airplane;
};

export type FContext = {
  flights: FlightWithPlane[] | undefined;
  isLoading: boolean;
  dispatch: Dispatch<FilterAction>;
  state: FilterState;
};

export const flightContext = createContext<FContext | null>(null);

const FlightProvider: FC<FlightProviderProps> = ({ children }) => {
  const search = useSearchParams();

  const params = {
    departure: search.get("departure"),
    arrival: search.get("arrival"),
    date: search.get("date"),
  };

  const [state, dispatch] = useReducer(filterReducer, {
    arrival: params.arrival,
    date: params.date,
    departure: params.departure,
    planeId: "",
    planeIds: [],
    seat: null,
    sort: "recommended",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["flights-list", state.departure, state.arrival, state.date, state.planeIds, state.seat],
    queryFn: () => axios.post("/api/flights", state).then((res) => res.data.data),
  });

  // Apply sorting to flights
  const sortedFlights = useMemo(() => {
    if (!data) return undefined;

    const flightsCopy = [...data] as FlightWithPlane[];

    switch (state.sort) {
      case "cheapest":
      case "price_low":
        return flightsCopy.sort((a, b) => a.price - b.price);
      case "price_high":
        return flightsCopy.sort((a, b) => b.price - a.price);
      case "fastest":
      case "duration":
        return flightsCopy.sort((a, b) => {
          const durationA = new Date(a.arrivalDate).getTime() - new Date(a.departureDate).getTime();
          const durationB = new Date(b.arrivalDate).getTime() - new Date(b.departureDate).getTime();
          return durationA - durationB;
        });
      case "recommended":
      default:
        // Recommended: balance of price and duration (lower score = better)
        return flightsCopy.sort((a, b) => {
          const durationA = new Date(a.arrivalDate).getTime() - new Date(a.departureDate).getTime();
          const durationB = new Date(b.arrivalDate).getTime() - new Date(b.departureDate).getTime();
          // Normalize price (divide by average) and duration (in hours)
          const scoreA = (a.price / 1000000) + (durationA / (1000 * 60 * 60));
          const scoreB = (b.price / 1000000) + (durationB / (1000 * 60 * 60));
          return scoreA - scoreB;
        });
    }
  }, [data, state.sort]);

  return (
    <flightContext.Provider value={{ flights: sortedFlights, isLoading, dispatch, state }}>
      {children}
    </flightContext.Provider>
  );
};

export default FlightProvider;

