"use client";

import { useAdminFilters } from "@/hooks/useAdminFilters";

interface FilterOption {
  value: string;
  label: string;
}

interface AdminFilterSelectProps {
  filterKey: string;
  options: FilterOption[];
  icon?: string;
  placeholder?: string;
  className?: string;
}

/**
 * Filter dropdown that syncs with URL params
 */
export function AdminFilterSelect({
  filterKey,
  options,
  icon = "filter_alt",
  placeholder = "All",
  className = "",
}: AdminFilterSelectProps) {
  const { filters, setFilter } = useAdminFilters();
  const currentValue = (filters as Record<string, string | number>)[filterKey] || "all";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(filterKey, e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        {icon}
      </span>
      <select
        value={currentValue}
        onChange={handleChange}
        className="appearance-none pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent shadow-sm text-gray-600 dark:text-gray-300 cursor-pointer w-full"
      >
        <option value="all">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
        expand_more
      </span>
    </div>
  );
}
