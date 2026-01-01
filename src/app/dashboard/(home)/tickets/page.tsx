import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/ColumnsTicket";
import { getTickets } from "./lib/data";
import { TicketsToolbar } from "./_components/TicketsToolbar";
import { AdminPagination } from "@/components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tickets Management | FlyHigher Admin",
};

interface PageProps {
  searchParams: {
    q?: string;
    status?: string;
    flightId?: string;
    date?: string;
    page?: string;
    limit?: string;
  };
}

const TicketPage = async ({ searchParams }: PageProps) => {
  const { data: tickets, pagination } = await getTickets({
    search: searchParams.q,
    status: searchParams.status,
    flightId: searchParams.flightId,
    date: searchParams.date,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: searchParams.limit ? parseInt(searchParams.limit) : 10,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ticket Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage bookings, passenger details, and ticket statuses.
          </p>
        </div>
      </header>

      {/* Main Card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col min-h-[600px]">
        {/* Toolbar with Search & Filters */}
        <TicketsToolbar />

        {/* Data Table */}
        <div className="overflow-x-auto flex-1">
          <DataTable columns={columns} data={tickets} />
        </div>

        {/* Pagination Footer */}
        <AdminPagination pagination={pagination} itemLabel="tickets" />
      </div>
    </div>
  );
};

export default TicketPage;
