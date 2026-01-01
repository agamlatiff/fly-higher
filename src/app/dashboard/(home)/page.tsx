import StatsCard from "./_components/StatsCard";
import RecentBookings from "./_components/RecentBookings";
import RevenueChart from "./_components/RevenueChart";
import FlightDistribution from "./_components/FlightDistribution";
import TopDestinations from "./_components/TopDestinations";
import { getDashboardStats, getRecentBookings } from "./lib/dashboard-data";
import { rupiahFormat } from "@/lib/utils";

export default async function DashboardPage() {
  const [stats, recentBookings] = await Promise.all([
    getDashboardStats(),
    getRecentBookings(5),
  ]);

  // Calculate load factor (mock calculation)
  const loadFactor = 84.2;

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Real-time data monitoring and trend analysis.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              className="pl-9 pr-4 py-2.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full md:w-64 shadow-sm placeholder:text-gray-400"
              placeholder="Search analytics..."
              type="text"
            />
          </div>
        </div>
      </header>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={rupiahFormat(stats.totalRevenue)}
          icon="payments"
          color="green"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Active Flights"
          value={stats.activeFlights}
          icon="flight_takeoff"
          color="blue"
          variant="highlight"
          isLive={true}
        />
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings.toLocaleString()}
          icon="confirmation_number"
          color="gray"
          trend={{ value: 2.1, isPositive: false }}
        />
        <StatsCard
          title="Load Factor"
          value={`${loadFactor}%`}
          icon="pie_chart"
          color="warning"
          progress={loadFactor}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <FlightDistribution />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentBookings bookings={recentBookings} />
        </div>
        <TopDestinations />
      </div>
    </div>
  );
}
