import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import FilterClass from "./_components/FilterClass";
import FIlterFlight from "./_components/FIlterFlight";
import FilterAirline from "./_components/FilterAirline";
import ListFlights from "./_components/ListFlights";
import SortingTabs from "./_components/SortingTabs";
import SearchHeaderClient from "./_components/SearchHeaderClient";
import { Suspense } from "react";
import LoadingFilterAirlines from "./_components/LoadingFilterAirlines";

interface PageProps {
  searchParams: { departure?: string; arrival?: string; date?: string };
}

const AvailableFlightsPage = ({ searchParams }: PageProps) => {
  const departure = searchParams.departure || "Select City";
  const arrival = searchParams.arrival || "Select City";
  const date = searchParams.date || new Date().toISOString().split("T")[0];

  // Check if any search is applied
  const hasSearch =
    (departure && departure !== "Select City") ||
    (arrival && arrival !== "Select City");

  // Page title
  const pageTitle = hasSearch
    ? `${departure} → ${arrival}`
    : "Available Flights";

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-surface-dark sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <Navbar />
      </header>

      {/* Page Header */}
      <div className="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-accent">
                flight
              </span>
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-black leading-tight tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Find the best flights for your journey
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-24 h-fit">
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-accent">
                  tune
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Filters
                </h3>
              </div>
              <a
                href="/available-flights"
                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-accent transition-colors px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Reset
              </a>
            </div>

            {/* Filter Components */}
            <div className="flex flex-col gap-6 text-gray-500 dark:text-gray-400">
              <FilterClass />
              <hr className="border-dashed border-gray-200 dark:border-gray-700" />
              <FIlterFlight />
              <hr className="border-dashed border-gray-200 dark:border-gray-700" />
              <Suspense fallback={<LoadingFilterAirlines />}>
                <FilterAirline />
              </Suspense>
            </div>
          </div>

          {/* Promo Box */}
          <div className="bg-gradient-to-br from-primary to-slate-800 dark:from-accent dark:to-sky-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Get 20% Off!</h4>
              <p className="text-white/90 text-sm mb-4">
                Use code{" "}
                <span className="font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded">
                  FLYHIGH20
                </span>{" "}
                on your first booking.
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
          </div>
        </aside>

        {/* Search Results */}
        <section className="col-span-1 lg:col-span-9 flex flex-col gap-6">
          {/* Search Summary & Filters */}
          <SearchHeaderClient
            departure={departure}
            arrival={arrival}
            date={date}
          />

          {/* Sorting Tabs */}
          <SortingTabs />

          {/* Flights List */}
          <ListFlights />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AvailableFlightsPage;
