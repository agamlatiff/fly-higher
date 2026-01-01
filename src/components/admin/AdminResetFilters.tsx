"use client";

import { useAdminFilters } from "@/hooks/useAdminFilters";

interface AdminResetFiltersProps {
  className?: string;
}

/**
 * Reset all filters button with active count badge
 */
export function AdminResetFilters({ className = "" }: AdminResetFiltersProps) {
  const { resetFilters, activeFilterCount } = useAdminFilters();

  if (activeFilterCount === 0) return null;

  return (
    <button
      onClick={resetFilters}
      className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${className}`}
    >
      <span className="material-symbols-outlined text-lg">filter_alt_off</span>
      Reset
      <span className="flex items-center justify-center w-5 h-5 text-xs font-bold bg-accent text-white rounded-full">
        {activeFilterCount}
      </span>
    </button>
  );
}
