import type { Airplane, Flight, FlightSeat, TypeSeat } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export type Checkout = {
  id?: string;
  seat?: TypeSeat;
  flightDetail?: Flight & { plane: Airplane };
  seatDetail?: FlightSeat;
};

export const CHECKOUT_KEY = "CHECKOUT_KEY";

export const SEAT_VALUES = {
  ECONOMY: {
    label: "Economy",
    additionalPrice: 0,
  },
  BUSSINESS: {
    label: "Bussiness",
    additionalPrice: 500000,
  },
  FIRST: {
    label: "First",
    additionalPrice: 750000,
  },
};

export type SeatValuesType = keyof typeof SEAT_VALUES;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSeatPerClass = (flightId: string) => {
  const SEAT_CLASS: TypeSeat[] = ["ECONOMY", "BUSSINESS", "FIRST"];
  const SEAT_CODE = ["A", "B", "C", "D"];

  const seats: { seatNumber: string; type: TypeSeat; flightId: string }[] = [];

  SEAT_CLASS.forEach((className) => {
    SEAT_CODE.map((seat) => {
      for (let i = 1; i <= 5; i++) {
        seats.push({
          seatNumber: seat + i,
          type: className as TypeSeat,
          flightId,
        });
      }
    });
  });

  return seats;
};

export const dateFormat = (
  date: Date | string,
  format = "DD MMM YYYY HH:mm"
) => {
  if (!date) {
    return "";
  }

  const dateFormat = dayjs(date).format(format);

  return dateFormat;
};

export const rupiahFormat = (value: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export const objectToParams = (obj: { [key: string]: unknown }) => {
  const queryParams = Object.keys(obj)
    .map((key) => {
      if (obj[key] !== null) {
        return key + "=" + obj[key];
      }
      return "";
    })
    .filter((key) => key !== "")
    .join("&");

  return queryParams;
};

export const mappingSeats = (seats: FlightSeat[]) => {
  const totalSeatEconomy = seats.filter(
    (item) => item.type === "ECONOMY"
  ).length;
  const totalSeatBussiness = seats.filter(
    (item) => item.type === "BUSSINESS"
  ).length;
  const totalSeatFirst = seats.filter((item) => item.type === "FIRST").length;

  const economy = seats.filter(
    (item) => item.type === "ECONOMY" && item.isBooked
  ).length;
  const bussiness = seats.filter(
    (item) => item.type === "BUSSINESS" && item.isBooked
  ).length;
  const first = seats.filter(
    (item) => item.type === "FIRST" && item.isBooked
  ).length;

  return {
    economy,
    bussiness,
    first,
    totalSeatEconomy,
    totalSeatBussiness,
    totalSeatFirst,
  };
};

export function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// ============================================
// SLUG GENERATION UTILITIES
// ============================================

/**
 * Generate a SEO-friendly slug for a flight
 * Format: "jkt-dps-2025-01-15" or "jkt-dps-2025-01-15-2" for duplicates
 * 
 * @example
 * generateFlightSlug({ departureCityCode: 'JKT', destinationCityCode: 'DPS', departureDate: new Date() })
 * // => "jkt-dps-2025-01-15"
 */
export function generateFlightSlug(flight: {
  departureCityCode: string;
  destinationCityCode: string;
  departureDate: Date | string;
}, counter?: number): string {
  const date = dayjs(flight.departureDate).format('YYYY-MM-DD');
  const base = `${flight.departureCityCode.toLowerCase()}-${flight.destinationCityCode.toLowerCase()}-${date}`;
  return counter ? `${base}-${counter}` : base;
}

/**
 * Generate a SEO-friendly slug for a booking/ticket
 * Format: "booking-abc123" using the existing ticket code
 * 
 * @example
 * generateBookingSlug('FLYH-ABC123')
 * // => "booking-flyh-abc123"
 */
export function generateBookingSlug(ticketCode: string): string {
  return `booking-${ticketCode.toLowerCase().replace(/\s+/g, '-')}`;
}

/**
 * Extract the ID or slug from a URL parameter
 * Supports both UUID (cuid) format and slug format
 */
export function parseIdOrSlug(param: string): { type: 'id' | 'slug'; value: string } {
  // cuid format starts with 'c' and is 25 chars, or standard uuid
  const isLikelyId = param.length >= 20 && /^[a-z0-9]+$/.test(param);
  return {
    type: isLikelyId ? 'id' : 'slug',
    value: param,
  };
}

