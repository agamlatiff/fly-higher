"use client";

import type { Airplane } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import DeleteAirplane from "./DeleteAirplane";


export const columns: ColumnDef<Airplane>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="rounded border-gray-300 dark:border-gray-600 text-accent focus:ring-accent/20"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="rounded border-gray-300 dark:border-gray-600 text-accent focus:ring-accent/20"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Aircraft Info",
    cell: ({ row }) => {
      const plane = row.original;
      // Determine icon based on aircraft type
      const isAirbus = plane.name.toLowerCase().includes("airbus");

      return (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900/30 dark:to-sky-800/20 flex items-center justify-center text-sky-500 overflow-hidden">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isAirbus ? "flight" : "flight_takeoff"}
            </span>
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-sm">{plane.code || "N/A"}</p>
            <p className="text-xs text-gray-400">{plane.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: "type",
    header: "Type",
    cell: ({ row }) => {
      const plane = row.original;
      // Determine type based on name
      const isWideBody = plane.name.toLowerCase().includes("787") ||
        plane.name.toLowerCase().includes("a350") ||
        plane.name.toLowerCase().includes("777");
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{plane.name}</span>
          <span className="text-xs text-gray-400">{isWideBody ? "Wide-body" : "Narrow-body"}</span>
        </div>
      );
    },
  },
  {
    id: "capacity",
    header: "Capacity",
    cell: ({ row }) => {
      const plane = row.original;
      // Deterministic capacity based on plane name (not random to avoid hydration error)
      const capacities: Record<string, number> = {
        "Boeing 737": 156,
        "Boeing 777": 252,
        "Airbus A320": 163,
        "Airbus A330": 277,
        "Airbus A350": 210,
      };
      // Get base capacity from plane type or default
      let capacity = 156;
      for (const [type, cap] of Object.entries(capacities)) {
        if (plane.name.includes(type.split(" ")[1])) {
          capacity = cap;
          break;
        }
      }
      return (
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <span className="material-symbols-outlined text-sm text-gray-400">group</span>
          <span className="text-sm font-medium">{capacity} Seats</span>
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const plane = row.original;
      // Deterministic status based on plane code (not random to avoid hydration error)
      const codeSum = plane.code.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const statuses = ["Active", "Active", "Maintenance", "Active", "Inactive"] as const;
      const status = statuses[codeSum % statuses.length];

      const statusStyles = {
        Active: {
          bg: "bg-emerald-50 dark:bg-emerald-900/20",
          text: "text-emerald-600 dark:text-emerald-400",
          dot: "bg-emerald-500",
          border: "border-emerald-500/10",
        },
        Maintenance: {
          bg: "bg-amber-50 dark:bg-amber-900/20",
          text: "text-amber-600 dark:text-amber-400",
          dot: "bg-amber-500 animate-pulse",
          border: "border-amber-500/10",
        },
        Inactive: {
          bg: "bg-gray-100 dark:bg-gray-800",
          text: "text-gray-500 dark:text-gray-400",
          dot: "bg-gray-400",
          border: "border-gray-200 dark:border-gray-700",
        },
      };

      const style = statusStyles[status];

      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const plane = row.original;
      return (
        <div className="flex items-center justify-end gap-1">
          <button
            className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
            title="View Details"
          >
            <span className="material-symbols-outlined text-lg">visibility</span>
          </button>
          <Link
            href={`/dashboard/airplanes/edit/${plane.id}`}
            className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </Link>
          <DeleteAirplane id={plane.id} />
        </div>
      );
    },
  },
];
