import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/ColumnsUser";
import { getCustomers } from "./lib/data";
import { UsersToolbar } from "./_components/UsersToolbar";
import { AdminPagination } from "@/components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users Management | FlyHigher Admin",
};

interface PageProps {
  searchParams: {
    q?: string;
    role?: string;
    page?: string;
    limit?: string;
  };
}

const UserPage = async ({ searchParams }: PageProps) => {
  const { data: users, pagination } = await getCustomers({
    search: searchParams.q,
    role: searchParams.role,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: searchParams.limit ? parseInt(searchParams.limit) : 10,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage registered users, account statuses, and access roles.
          </p>
        </div>
      </header>

      {/* Main Card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col min-h-[600px]">
        {/* Toolbar with Search & Filters */}
        <UsersToolbar />

        {/* Data Table */}
        <div className="overflow-x-auto flex-1">
          <DataTable columns={columns} data={users} />
        </div>

        {/* Pagination Footer */}
        <AdminPagination pagination={pagination} itemLabel="users" />
      </div>
    </div>
  );
};

export default UserPage;
