"use client";

import { AdminToolbar } from "@/components/admin";

const airplaneTypeOptions = [
  { value: "Boeing 737", label: "Boeing 737" },
  { value: "Airbus A320", label: "Airbus A320" },
  { value: "Boeing 777", label: "Boeing 777" },
  { value: "Airbus A330", label: "Airbus A330" },
  { value: "Airbus A350", label: "Airbus A350" },
];

const airplaneStatusOptions = [
  { value: "active", label: "Active" },
  { value: "maintenance", label: "Maintenance" },
  { value: "inactive", label: "Inactive" },
];

export function AirplanesToolbar() {
  return (
    <AdminToolbar
      searchPlaceholder="Search by Reg. Number or Model..."
      filters={[
        {
          key: "type",
          icon: "flight",
          placeholder: "All Types",
          options: airplaneTypeOptions,
        },
        {
          key: "status",
          icon: "toggle_on",
          placeholder: "All Status",
          options: airplaneStatusOptions,
        },
      ]}
      addButtonLabel="Add Airplane"
      addButtonHref="/dashboard/airplanes/create"
    />
  );
}
