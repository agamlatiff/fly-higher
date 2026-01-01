import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/ColumnsFlight";
import { getFlights } from "./lib/data";
import { FlightsToolbar } from "./components/FlightsToolbar";
import { AdminPagination } from "@/components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flights Management | FlyHigher Admin",
};

interface PageProps {
  searchParams: {
    q?: string;
    status?: string;
    route?: string;
    date?: string;
    page?: string;
    limit?: string;
  };
}

const FlightPage = async ({ searchParams }: PageProps) => {
  const { data, pagination } = await getFlights({
    search: searchParams.q,
    status: searchParams.status,
    route: searchParams.route,
    date: searchParams.date,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: searchParams.limit ? parseInt(searchParams.limit) : 10,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flight Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage schedules, routes, and flight statuses.
          </p>
        </div>
      </header>

      {/* Main Card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col min-h-[600px]">
        {/* Toolbar with Search & Filters */}
        <FlightsToolbar />

        {/* Data Table */}
        <div className="overflow-x-auto flex-1">
          <DataTable columns={columns} data={data} />
        </div>

        {/* Pagination Footer */}
        <AdminPagination pagination={pagination} itemLabel="flights" />
      </div>
    </div>
  );
};

export default FlightPage;
