"use client";

import type { Airplane, Flight, FlightSeat } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import DeleteFlight from "./DeleteFlight";
import { differenceInMinutes, format } from "date-fns";

export type FlightColumn = Flight & {
  plane: Airplane;
  seats: FlightSeat[];
};

export const columns: ColumnDef<FlightColumn>[] = [
  {
    accessorKey: "planeId", // Use planeId as a proxy for Flight Info since we show plane icon
    header: "Flight No.",
    cell: ({ row }) => {
      const flight = row.original;
      const flightNo = `FH-${flight.id.slice(-4).toUpperCase()}`; // Mock flight number

      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              flight_takeoff
            </span>
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white">{flightNo}</p>
            <p className="text-xs text-gray-400">Economy</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "route",
    header: "Route",
    cell: ({ row }) => {
      const flight = row.original;
      const durationMins = differenceInMinutes(
        new Date(flight.arrivalDate),
        new Date(flight.departureDate)
      );
      const hours = Math.floor(durationMins / 60);
      const minutes = durationMins % 60;
      const duration = `${hours}h ${minutes}m`;

      return (
        <div className="flex items-center gap-3">
          <div className="text-center w-12">
            <p className="font-bold text-gray-700 dark:text-gray-300">
              {flight.departureCityCode}
            </p>
            <p className="text-[10px] text-gray-400 uppercase truncate max-w-[60px]">
              {flight.departureCity}
            </p>
          </div>
          <div className="flex flex-col items-center px-2">
            <span className="text-[10px] text-gray-400 font-medium">
              {duration}
            </span>
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-gray-600 relative my-1">
              <div className="absolute -right-1 -top-1 w-2 h-2 border-t border-r border-gray-300 dark:border-gray-600 transform rotate-45" />
            </div>
          </div>
          <div className="text-center w-12">
            <p className="font-bold text-gray-700 dark:text-gray-300">
              {flight.destinationCityCode}
            </p>
            <p className="text-[10px] text-gray-400 uppercase truncate max-w-[60px]">
              {flight.destinationCity}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "departureDate",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.departureDate);
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {format(date, "MMM dd, yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "departureTime", // Virtual accessor
    header: "Time",
    cell: ({ row }) => {
      const date = new Date(row.original.departureDate);
      return (
        <div>
          <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {format(date, "hh:mm a")}
          </div>
          <div className="text-xs text-gray-400">Departs</div>
        </div>
      );
    },
  },
  {
    accessorKey: "plane.name",
    header: "Aircraft",
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {row.original.plane.name}
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const date = new Date(row.original.departureDate);
      const isPast = date < new Date();
      // Mock status
      const status = isPast ? "Landed" : "Scheduled";

      const styles = {
        Scheduled: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        Landed: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700",
        Delayed: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-500/20",
        Cancelled: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-500/20",
      };

      const style = styles[status as keyof typeof styles];

      return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${style}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'Scheduled' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const flight = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <button
            className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
            title="View Details"
          >
            <span className="material-symbols-outlined text-[20px]">
              visibility
            </span>
          </button>
          <Link
            href={`/dashboard/flights/edit/${flight.id}`}
            className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[20px]">
              edit
            </span>
          </Link>
          <DeleteFlight id={flight.id} />
        </div>
      );
    },
  },
];
