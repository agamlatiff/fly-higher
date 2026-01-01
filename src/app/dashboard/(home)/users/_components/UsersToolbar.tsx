"use client";

import { AdminToolbar } from "@/components/admin";

const userRoleOptions = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "ADMIN", label: "Admin" },
];

export function UsersToolbar() {
  return (
    <AdminToolbar
      searchPlaceholder="Search by name or email..."
      filters={[
        {
          key: "role",
          icon: "badge",
          placeholder: "All Roles",
          options: userRoleOptions,
        },
      ]}
      addButtonLabel="Add New User"
      addButtonHref="/dashboard/users/create"
      addButtonIcon="person_add"
    />
  );
}
