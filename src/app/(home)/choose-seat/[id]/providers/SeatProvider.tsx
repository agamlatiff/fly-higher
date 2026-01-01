"use client";

import type { FlightSeat, TypeSeat } from "@prisma/client";
import type { FC, ReactNode } from "react";
import { createContext, useState, useEffect, useCallback } from "react";
import { CHECKOUT_KEY, type Checkout } from "@/lib/utils";

interface SeatProviderProps {
  children: ReactNode;
}

const MAX_COMPARE_SEATS = 3;

export type SeatContextType = {
  seat: FlightSeat | null;
  selectedSeat: FlightSeat | null;
  setSelectedSeat: (seat: FlightSeat | null) => void;
  selectedClass: TypeSeat;
  setSelectedClass: (seatClass: TypeSeat) => void;
  // Compare feature
  comparedSeats: FlightSeat[];
  addToCompare: (seat: FlightSeat) => void;
  removeFromCompare: (seatId: string) => void;
  clearCompare: () => void;
  isComparing: (seatId: string) => boolean;
};

export const seatContext = createContext<SeatContextType | null>(null);

const SeatProvider: FC<SeatProviderProps> = ({ children }) => {
  const [seat, setSeat] = useState<FlightSeat | null>(null);
  const [selectedClass, setSelectedClassState] = useState<TypeSeat>("ECONOMY");
  const [comparedSeats, setComparedSeats] = useState<FlightSeat[]>([]);

  // Initialize from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const value = window.sessionStorage.getItem(CHECKOUT_KEY);
      if (value) {
        const parsed: Checkout = JSON.parse(value);
        if (parsed.seat) {
          setSelectedClassState(parsed.seat);
        }
      }
    }
  }, []);

  const setSelectedSeat = useCallback((newSeat: FlightSeat | null) => {
    setSeat(newSeat);
  }, []);

  const setSelectedClass = useCallback((seatClass: TypeSeat) => {
    setSelectedClassState(seatClass);
    // Reset selected seat and compared seats when class changes
    setSeat(null);
    setComparedSeats([]);

    // Update sessionStorage
    if (typeof window !== "undefined" && window.sessionStorage) {
      const value = window.sessionStorage.getItem(CHECKOUT_KEY);
      if (value) {
        const parsed: Checkout = JSON.parse(value);
        parsed.seat = seatClass;
        window.sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(parsed));
      }
    }
  }, []);

  // Compare functions
  const addToCompare = useCallback((seatToAdd: FlightSeat) => {
    setComparedSeats((prev) => {
      // Already comparing this seat?
      if (prev.some((s) => s.id === seatToAdd.id)) return prev;
      // Max 3 seats
      if (prev.length >= MAX_COMPARE_SEATS) return prev;
      return [...prev, seatToAdd];
    });
  }, []);

  const removeFromCompare = useCallback((seatId: string) => {
    setComparedSeats((prev) => prev.filter((s) => s.id !== seatId));
  }, []);

  const clearCompare = useCallback(() => {
    setComparedSeats([]);
  }, []);

  const isComparing = useCallback(
    (seatId: string) => comparedSeats.some((s) => s.id === seatId),
    [comparedSeats]
  );

  return (
    <seatContext.Provider
      value={{
        seat,
        selectedSeat: seat,
        setSelectedSeat,
        selectedClass,
        setSelectedClass,
        // Compare feature
        comparedSeats,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
      }}
    >
      {children}
    </seatContext.Provider>
  );
};

export default SeatProvider;

