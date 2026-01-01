"use client";

import type { Flight, FlightSeat, Ticket, User, Airplane } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { format } from "date-fns";



type TicketType = Ticket & {
  flight: Flight & { plane: Airplane };
  customer: User;
  seat: FlightSeat;
};

const StatusBadge = ({ ticket }: { ticket: TicketType }) => {


  // Status mapping to design statuses where applicable
  // Ticket Model: PENDING, SUCCESS, FAILED
  // Design: Pending, Issued, Cancelled/Refunded
  const statusConfig = {
    SUCCESS: {
      label: "Issued",
      styles: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-500",
      icon: "check_circle"
    },
    PENDING: {
      label: "Pending",
      styles: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-500/20",
      dot: "bg-amber-500",
      icon: "hourglass_empty"
    },
    FAILED: {
      label: "Cancelled",
      styles: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-500/20",
      dot: "bg-red-500",
      icon: "cancel"
    }
  };

  const config = statusConfig[ticket.status] || statusConfig.PENDING;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.styles}`}>
      <span className="material-symbols-outlined text-[14px]">{config.icon}</span>
      {config.label}
    </span>
  );
};

export const columns: ColumnDef<TicketType>[] = [
  {
    accessorKey: "code",
    header: "Ticket ID",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              confirmation_number
            </span>
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white">#{ticket.code}</p>
            <p className="text-xs text-gray-400">Online Booking</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "flight.id", // Using flight ID to mock flight no
    header: "Flight No.",
    cell: ({ row }) => {
      const ticket = row.original;
      // Mock flight Code from flight ID or plane code
      const flightCode = `FH-${ticket.flight.plane.code.split('-')[1] || '000'}`;
      return (
        <span className="font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
          {flightCode}
        </span>
      );
    },
  },
  {
    accessorKey: "customer.name",
    header: "Passenger Name",
    cell: ({ row }) => {
      const ticket = row.original;
      const initials = ticket.customer.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-bold ring-2 ring-white dark:ring-gray-800">
            {initials}
          </div>
          <div className="text-sm">
            <p className="font-bold text-gray-700 dark:text-gray-200">{ticket.customer.name}</p>
            <p className="text-[10px] text-gray-400">ID: {ticket.customerId.slice(0, 8)}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "bookingDate",
    header: "Booking Date",
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {format(new Date(row.original.bookingDate), "MMM dd, yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "seat.type",
    header: "Class",
    cell: ({ row }) => {
      const type = row.original.seat.type;
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
          {type.toLowerCase()}
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <StatusBadge ticket={row.original} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/dashboard/tickets/detail/${ticket.id}`}
            className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
            title="View Details"
          >
            <span className="material-symbols-outlined text-[20px]">
              visibility
            </span>
          </Link>
          <button
            className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
            title="Edit Status"
          >
            <span className="material-symbols-outlined text-[20px]">
              edit
            </span>
          </button>
          <button
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Delete"
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>
        </div>
      );
    },
  },
];
