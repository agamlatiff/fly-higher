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
  SET_PAGE = "SET_PAGE",
  SET_PARAMS = "SET_PARAMS",
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
  page: number;
  limit: number;
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
        page: 1, // Reset page on filter change
      };
    case FilterActionKind.REMOVE_PLANE:
      return {
        ...state,
        planeIds: payload.planeId
          ? state.planeIds.filter((item) => item !== payload.planeId)
          : state.planeIds,
        page: 1, // Reset page on filter change
      };
    case FilterActionKind.SET_SEAT:
      return {
        ...state,
        seat: payload.seat,
        page: 1, // Reset page on filter change
      };
    case FilterActionKind.SET_SORT:
      return {
        ...state,
        sort: payload.sort ?? "recommended",
        page: 1, // Reset page on sort change
      };
    case FilterActionKind.SET_PAGE:
      return {
        ...state,
        page: payload.page ?? 1,
      };
    case FilterActionKind.SET_PARAMS:
      return {
        ...state,
        departure: payload.departure,
        arrival: payload.arrival,
        date: payload.date,
        page: 1, // Reset page
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
  totalPages: number;
  setPage: (page: number) => void;
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
    page: 1,
    limit: 5,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["flights-list", state.departure, state.arrival, state.date, state.planeIds, state.seat, state.sort, state.page],
    queryFn: () => axios.post("/api/flights", state).then((res) => res.data),
  });

  const flights = data?.data;
  const totalPages = data?.meta?.totalPages || 0;

  const setPage = (page: number) => {
    dispatch({
      type: FilterActionKind.SET_PAGE,
      payload: { page },
    });
  };

  // Sync state with URL params
  useMemo(() => {
    dispatch({
      type: FilterActionKind.SET_PARAMS,
      payload: {
        departure: params.departure,
        arrival: params.arrival,
        date: params.date,
      },
    });
  }, [params.departure, params.arrival, params.date]);

  return (
    <flightContext.Provider value={{ flights, isLoading, dispatch, state, totalPages, setPage }}>
      {children}
    </flightContext.Provider>
  );
};

export default FlightProvider;

