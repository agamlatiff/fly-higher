"use client";

import { AdminToolbar } from "@/components/admin";

const ticketStatusOptions = [
  { value: "SUCCESS", label: "Issued" },
  { value: "PENDING", label: "Pending" },
  { value: "FAILED", label: "Cancelled" },
];

export function TicketsToolbar() {
  return (
    <AdminToolbar
      searchPlaceholder="Search ticket ID or passenger..."
      filters={[
        {
          key: "status",
          icon: "receipt_long",
          placeholder: "All Status",
          options: ticketStatusOptions,
        },
      ]}
      showDateFilter={true}
      dateFilterKey="date"
      addButtonLabel="Issue New Ticket"
      addButtonHref="/dashboard/tickets/create"
    />
  );
}
