import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

/**
 * Loading placeholder component
 */
const LoadingPlaceholder = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-sky-primary" />
  </div>
);

/**
 * Dynamic imports for heavy dashboard components
 * These are loaded on-demand to reduce initial bundle size
 */

// Dashboard Charts (heavy SVG components)
export const DynamicRevenueChart = dynamic(
  () => import("@/app/dashboard/(home)/_components/RevenueChart"),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false
  }
);

export const DynamicFlightDistribution = dynamic(
  () => import("@/app/dashboard/(home)/_components/FlightDistribution"),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false
  }
);

// Payment components (not needed until checkout)
export const DynamicPaymentForm = dynamic(
  () => import("@/app/(home)/checkout/_components/PaymentForm"),
  {
    loading: () => <LoadingPlaceholder />,
  }
);

// Seat comparison panel (only loaded when comparing)
export const DynamicSeatComparePanel = dynamic(
  () => import("@/app/(home)/choose-seat/[id]/_components/SeatComparePanel"),
  {
    loading: () => null,
    ssr: false
  }
);

// Data tables (heavy with all the column definitions)
export const DynamicDataTable = dynamic(
  () => import("@/components/ui/data-table").then(mod => ({ default: mod.DataTable })),
  {
    loading: () => <LoadingPlaceholder />,
  }
);
