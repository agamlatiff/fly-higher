import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/ColumnsTable";
import { getAirplanes } from "./lib/data";
import { AirplanesToolbar } from "./_components/AirplanesToolbar";
import { AdminPagination } from "@/components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airplanes Management | FlyHigher Admin",
};

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    status?: string;
    page?: string;
    limit?: string;
  };
}

const AirplanesPage = async ({ searchParams }: PageProps) => {
  const { data: planes, pagination } = await getAirplanes({
    search: searchParams.q,
    type: searchParams.type,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: searchParams.limit ? parseInt(searchParams.limit) : 10,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Airplanes Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage fleet inventory, status, and maintenance schedules.
          </p>
        </div>
      </header>

      {/* Main Card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col min-h-[600px]">
        {/* Toolbar with Search & Filters */}
        <AirplanesToolbar />

        {/* Data Table */}
        <div className="overflow-x-auto flex-1">
          <DataTable columns={columns} data={planes} />
        </div>

        {/* Pagination Footer */}
        <AdminPagination pagination={pagination} itemLabel="airplanes" />
      </div>
    </div>
  );
};

export default AirplanesPage;
