import { Navbar } from "@/components/ui/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Loading = () => {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen font-display transition-colors duration-300">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <Navbar />
      </header>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-5">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap gap-2 py-4">
          <Link
            href="/"
            className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-sky-primary dark:hover:text-accent"
          >
            Home
          </Link>
          <span className="text-gray-500 dark:text-gray-600 text-sm">/</span>
          <Link
            href="/my-tickets"
            className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-sky-primary dark:hover:text-accent"
          >
            My Tickets
          </Link>
          <span className="text-gray-500 dark:text-gray-600 text-sm">/</span>
          <span className="text-text-dark dark:text-white text-sm font-medium">
            Manage Booking
          </span>
        </nav>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
          {/* LEFT COLUMN: Flight Info & Actions */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Header Card Skeleton */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col gap-2 z-10">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-5 w-48" />
              </div>
              <Skeleton className="h-12 w-44 rounded-xl" />
            </div>

            {/* Flight Timeline Card Skeleton */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-6 w-28 rounded" />
              </div>

              {/* Timeline Skeleton */}
              <div className="grid grid-cols-[40px_1fr] gap-x-4 px-2">
                {/* Departure */}
                <div className="flex flex-col items-center pt-1">
                  <div className="w-3 h-3 rounded-full border-2 border-sky-primary/30 bg-white dark:bg-surface-dark relative z-10" />
                  <div className="w-[2px] bg-gradient-to-b from-sky-primary/30 to-sky-primary/10 h-full grow my-1" />
                </div>
                <div className="flex flex-col pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Skeleton className="h-6 w-40 mb-2" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-6 w-20 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="mt-2 h-6 w-24 rounded" />
                </div>

                {/* Plane Icon middle */}
                <div className="flex flex-col items-center justify-center relative h-8">
                  <div className="w-[2px] bg-sky-primary/20 h-full" />
                </div>
                <div className="flex flex-col py-2 justify-center">
                  <Skeleton className="h-4 w-28" />
                </div>

                {/* Arrival */}
                <div className="flex flex-col items-center pb-1">
                  <div className="w-[2px] bg-gradient-to-b from-sky-primary/10 to-sky-primary/30 h-full grow my-1" />
                  <div className="w-3 h-3 rounded-full bg-sky-primary/30 relative z-10" />
                </div>
                <div className="flex flex-col pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Skeleton className="h-6 w-40 mb-2" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-6 w-20 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="mt-2 h-6 w-24 rounded" />
                </div>
              </div>
            </div>

            {/* Management Grid Skeleton */}
            <div>
              <Skeleton className="h-7 w-40 mb-4 ml-1" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-card"
                  >
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="w-16 h-16 rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Skeleton */}
          <div className="flex flex-col gap-6">
            {/* Passenger Card Skeleton */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-28 mb-1" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-16 rounded-md" />
                </div>
              </div>
            </div>

            {/* Airplane Card Skeleton */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
              <Skeleton className="h-6 w-20 mb-4" />
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-12 rounded-lg" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>

            {/* Price Breakdown Skeleton */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="my-3 border-t border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between items-end">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-7 w-32" />
                </div>
              </div>
              <Skeleton className="mt-4 h-11 w-full rounded-lg" />
            </div>

            {/* Danger Zone Skeleton */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-100 dark:border-red-900/30">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-full mb-4" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          </div>
        </main>

        {/* Bottom Action Bar Skeleton */}
        <div className="mt-8 flex justify-end gap-4 pb-8">
          <Skeleton className="h-12 w-20 rounded-xl" />
          <Skeleton className="h-12 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
