"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * Custom hook for managing admin filters via URL search params
 * Provides methods to get, set, and reset filters while maintaining URL state
 */
export function useAdminFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter values
  const filters = useMemo(() => {
    return {
      q: searchParams.get("q") || "",
      status: searchParams.get("status") || "all",
      type: searchParams.get("type") || "all",
      role: searchParams.get("role") || "all",
      route: searchParams.get("route") || "",
      date: searchParams.get("date") || "",
      flight: searchParams.get("flight") || "",
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
    };
  }, [searchParams]);

  // Create query string from current params + new param
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && value !== "all" && value !== "") {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      // Reset page when filter changes (except for page itself)
      if (name !== "page" && name !== "limit") {
        params.delete("page");
      }

      return params.toString();
    },
    [searchParams]
  );

  // Set a single filter
  const setFilter = useCallback(
    (name: string, value: string) => {
      const queryString = createQueryString(name, value);
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
    },
    [router, pathname, createQueryString]
  );

  // Set multiple filters at once
  const setFilters = useCallback(
    (newFilters: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset page when filters change
      params.delete("page");

      const queryString = params.toString();
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
    },
    [router, pathname, searchParams]
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  // Count active filters (excluding page and limit)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    searchParams.forEach((value, key) => {
      if (!["page", "limit"].includes(key) && value && value !== "all") {
        count++;
      }
    });
    return count;
  }, [searchParams]);

  return {
    filters,
    setFilter,
    setFilters,
    resetFilters,
    activeFilterCount,
    searchParams,
  };
}
