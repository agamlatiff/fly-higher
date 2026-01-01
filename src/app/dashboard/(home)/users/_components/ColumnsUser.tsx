"use client";

import type { User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { format } from "date-fns";

// Mock helper for registration date per user (deterministic mock based on ID char)
const getMockDate = (id: string) => {
  const code = id.charCodeAt(0);
  const date = new Date();
  date.setDate(date.getDate() - (code % 30));
  return date;
};

// Mock status
const getMockStatus = (id: string) => {
  const statuses = ["Active", "Active", "Active", "Suspended", "Disabled"];
  return statuses[id.charCodeAt(id.length - 1) % statuses.length];
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const role = user.role === "ADMIN" ? "Administrator" : "Standard User";

      return (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-white dark:ring-gray-800 ${user.role === "ADMIN"
              ? "bg-accent/10 text-accent"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>
            {user.role === "ADMIN" ? (
              <span className="material-symbols-outlined text-xl">face</span>
            ) : (
              initials
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => {
      const id = row.original.id;
      const shortId = `#USR-${id.slice(-4).toUpperCase()}`;
      return (
        <span className="font-mono font-bold text-xs text-gray-600 dark:text-gray-400">
          {shortId}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {row.original.email}
        </span>
      );
    },
  },
  {
    id: "reg_date",
    header: "Registration Date",
    cell: ({ row }) => {
      const date = getMockDate(row.original.id);
      return (
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {format(date, "MMM dd, yyyy")}
        </span>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = getMockStatus(row.original.id);
      const styles = {
        Active: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        Suspended: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-500/20",
        Disabled: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700",
      };

      const icon = {
        Active: "check_circle",
        Suspended: "history",
        Disabled: "do_not_disturb_on"
      };

      const style = styles[status as keyof typeof styles];
      const iconName = icon[status as keyof typeof icon];

      return (
        <div className="text-center">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${style}`}>
            <span className="material-symbols-outlined text-[14px]">{iconName}</span>
            {status}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
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
            href={`/dashboard/users/edit/${row.original.id}`}
            className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[20px]">
              edit
            </span>
          </Link>
          <button
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Disable Account"
          >
            <span className="material-symbols-outlined text-[20px]">
              block
            </span>
          </button>
        </div>
      );
    },
  },
];
