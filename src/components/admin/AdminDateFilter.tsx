"use client";

import { useAdminFilters } from "@/hooks/useAdminFilters";

interface AdminDateFilterProps {
  filterKey?: string;
  className?: string;
}

/**
 * Date filter input that syncs with URL params
 */
export function AdminDateFilter({
  filterKey = "date",
  className = "",
}: AdminDateFilterProps) {
  const { filters, setFilter } = useAdminFilters();
  const currentValue = (filters as Record<string, string | number>)[filterKey] || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(filterKey, e.target.value);
  };

  const handleClear = () => {
    setFilter(filterKey, "");
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="date"
        value={currentValue}
        onChange={handleChange}
        className="pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full shadow-sm placeholder:text-gray-400 dark:text-gray-300"
      />
      {currentValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      )}
    </div>
  );
}
