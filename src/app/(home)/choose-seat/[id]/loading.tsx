import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Plane } from "lucide-react";

const Loading = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
      {/* Navigation Skeleton */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32 bg-gray-200 dark:bg-gray-700" />
            <div className="flex gap-4">
              <Skeleton className="h-8 w-20 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-8 w-20 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center gap-3 text-sm font-medium">
            <li className="text-gray-400 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Flight
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-sky-primary flex items-center gap-1">
              <Plane className="w-4 h-4" /> Seats
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-400">Payment</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Seat Map Skeleton */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-10 w-[320px] bg-gray-200" />
                <Skeleton className="h-6 w-[240px] bg-gray-200" />
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                <div className="w-5 h-5 rounded border-2 border-gray-300 bg-white" />
                <span className="text-sm font-medium text-gray-600">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                <div className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  ✕
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Occupied
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-primary/10">
                <div className="w-5 h-5 rounded bg-sky-primary text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-sky-primary">
                  Selected
                </span>
              </div>
            </div>

            {/* Fuselage Visual Container Skeleton */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-white dark:bg-surface-dark shadow-soft border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center">
              {/* Decorative Cockpit Shape */}
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-t-full absolute -top-12 left-1/2 -translate-x-1/2 z-0 opacity-50" />

              {/* Cabin Interior */}
              <div className="relative z-10 w-full max-w-md bg-gray-50 dark:bg-gray-800 rounded-[4rem] px-6 py-12 border-4 border-gray-200 dark:border-gray-700 shadow-inner">
                {/* Front Decoration */}
                <div className="flex justify-center mb-8 opacity-40">
                  <Plane className="w-8 h-8 text-gray-400" />
                </div>

                {/* Class Label Skeleton */}
                <div className="text-center mb-6">
                  <Skeleton className="h-6 w-28 mx-auto bg-gray-200 rounded-full" />
                </div>

                {/* Seat Grid Skeleton */}
                <div className="flex justify-center gap-8">
                  {/* Left Aisle */}
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-3">
                      {[0, 1, 2, 3, 4].map((item) => (
                        <Skeleton
                          key={`left-a-${item}`}
                          className="w-12 h-12 rounded-lg bg-gray-200"
                        />
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      {[0, 1, 2, 3, 4].map((item) => (
                        <Skeleton
                          key={`left-b-${item}`}
                          className="w-12 h-12 rounded-lg bg-gray-200"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Aisle indicator */}
                  <div className="w-8 flex items-center justify-center">
                    <div className="w-px h-full bg-gray-200" />
                  </div>

                  {/* Right Aisle */}
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-3">
                      {[0, 1, 2, 3, 4].map((item) => (
                        <Skeleton
                          key={`right-a-${item}`}
                          className="w-12 h-12 rounded-lg bg-gray-200"
                        />
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      {[0, 1, 2, 3, 4].map((item) => (
                        <Skeleton
                          key={`right-b-${item}`}
                          className="w-12 h-12 rounded-lg bg-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rear/Bathroom Visual */}
                <div className="mt-8 flex justify-center gap-12 opacity-50">
                  <div className="w-8 h-8 rounded bg-gray-200" />
                  <div className="w-8 h-8 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary Sidebar Skeleton */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 p-6 space-y-6">
              {/* Flight Route Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-24 bg-gray-200 rounded-full mx-auto" />
                <div className="flex items-center justify-between gap-4 py-3">
                  <div className="text-center space-y-1">
                    <Skeleton className="h-6 w-12 bg-gray-200" />
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gray-200" />
                    <Plane className="w-4 h-4 text-gray-300" />
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <div className="text-center space-y-1">
                    <Skeleton className="h-6 w-12 bg-gray-200" />
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Airline Info Skeleton */}
              <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-lg bg-gray-200" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-28 bg-gray-200" />
                  <Skeleton className="h-4 w-20 bg-gray-200" />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Booking Details Skeleton */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                  Booking Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Date</span>
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Seat</span>
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Passenger</span>
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Pricing Skeleton */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Seat Price</span>
                  <Skeleton className="h-5 w-20 bg-gray-200" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="font-semibold text-gray-800 dark:text-white">Total</span>
                  <Skeleton className="h-6 w-24 bg-gray-200" />
                </div>
              </div>

              {/* CTA Button Skeleton */}
              <Skeleton className="h-14 w-full rounded-full bg-gray-200" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Loading;
