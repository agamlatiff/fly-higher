"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useAdminFilters } from "@/hooks/useAdminFilters";

interface AdminSearchInputProps {
  placeholder?: string;
  className?: string;
}

/**
 * Debounced search input that syncs with URL params
 */
export function AdminSearchInput({
  placeholder = "Search...",
  className = "",
}: AdminSearchInputProps) {
  const { filters, setFilter } = useAdminFilters();
  const [value, setValue] = useState(filters.q);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Sync local state with URL params
  useEffect(() => {
    setValue(filters.q);
  }, [filters.q]);

  // Debounced search
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout for debounce (300ms)
      timeoutRef.current = setTimeout(() => {
        setFilter("q", newValue);
      }, 300);
    },
    [setFilter]
  );

  // Clear search
  const handleClear = useCallback(() => {
    setValue("");
    setFilter("q", "");
  }, [setFilter]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-10 pr-10 py-2.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full shadow-sm placeholder:text-gray-400 dark:text-white"
      />
      {value && (
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
