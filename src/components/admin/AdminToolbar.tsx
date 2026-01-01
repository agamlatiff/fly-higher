"use client";

import { AdminSearchInput } from "./AdminSearchInput";
import { AdminFilterSelect } from "./AdminFilterSelect";
import { AdminDateFilter } from "./AdminDateFilter";
import { AdminResetFilters } from "./AdminResetFilters";
import Link from "next/link";

interface FilterConfig {
  key: string;
  icon?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

interface AdminToolbarProps {
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  showDateFilter?: boolean;
  dateFilterKey?: string;
  addButtonLabel?: string;
  addButtonHref?: string;
  addButtonIcon?: string;
}

/**
 * Reusable admin toolbar with search, filters, and action button
 */
export function AdminToolbar({
  searchPlaceholder = "Search...",
  filters = [],
  showDateFilter = false,
  dateFilterKey = "date",
  addButtonLabel,
  addButtonHref,
  addButtonIcon = "add",
}: AdminToolbarProps) {
  return (
    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-wrap">
        {/* Search Input */}
        <AdminSearchInput
          placeholder={searchPlaceholder}
          className="min-w-[200px] sm:w-64"
        />

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <AdminFilterSelect
            key={filter.key}
            filterKey={filter.key}
            options={filter.options}
            icon={filter.icon}
            placeholder={filter.placeholder}
            className="w-full sm:w-auto"
          />
        ))}

        {/* Date Filter */}
        {showDateFilter && (
          <AdminDateFilter
            filterKey={dateFilterKey}
            className="w-full sm:w-48"
          />
        )}

        {/* Reset Filters */}
        <AdminResetFilters />
      </div>

      {/* Add Button */}
      {addButtonLabel && addButtonHref && (
        <Link
          href={addButtonHref}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-primary/25 transition-colors whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-lg">{addButtonIcon}</span>
          {addButtonLabel}
        </Link>
      )}
    </div>
  );
}
