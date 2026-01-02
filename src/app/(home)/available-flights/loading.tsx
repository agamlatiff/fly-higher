import { Skeleton, SkeletonFlightCard } from "@/components/ui/skeleton";

export default function FlightsLoading() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      {/* Navbar skeleton */}
      <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Skeleton variant="title" className="w-32" />
          <div className="hidden md:flex gap-6">
            <Skeleton variant="text" className="w-16" />
            <Skeleton variant="text" className="w-16" />
            <Skeleton variant="text" className="w-16" />
          </div>
          <Skeleton variant="button" />
        </div>
      </div>

      {/* Search header skeleton */}
      <div className="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton variant="title" className="w-24" />
              <Skeleton variant="text" className="w-8" />
              <Skeleton variant="title" className="w-24" />
            </div>
            <Skeleton variant="button" className="w-28" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 gap-8">
          {/* Filters sidebar skeleton */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-6">
              <Skeleton variant="title" className="w-24 mb-4" />

              {/* Filter groups */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton variant="text" className="w-20" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Flight results skeleton */}
          <main className="lg:col-span-9 space-y-6">
            {/* Sort tabs skeleton */}
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>

            {/* Flight cards skeleton */}
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonFlightCard key={i} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
