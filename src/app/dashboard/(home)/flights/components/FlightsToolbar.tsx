"use client";

import { AdminToolbar } from "@/components/admin";

const flightStatusOptions = [
  { value: "scheduled", label: "Scheduled" },
  { value: "landed", label: "Landed" },
];

export function FlightsToolbar() {
  return (
    <AdminToolbar
      searchPlaceholder="Search by city or code..."
      filters={[
        {
          key: "status",
          icon: "schedule",
          placeholder: "All Status",
          options: flightStatusOptions,
        },
      ]}
      showDateFilter={true}
      dateFilterKey="date"
      addButtonLabel="Add New Flight"
      addButtonHref="/dashboard/flights/create"
    />
  );
}
