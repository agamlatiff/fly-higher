const LoadingListFlights = () => {
  return (
    <div className="flex flex-col gap-5">
      <LoadingFlightsItemSkeleton />
      <LoadingFlightsItemSkeleton />
      <LoadingFlightsItemSkeleton />
    </div>
  );
};

const LoadingFlightsItemSkeleton = () => {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 md:p-6 shadow-card border border-gray-100 dark:border-gray-800 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Airline Skeleton */}
        <div className="flex items-center gap-4 w-full md:w-48">
          <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
        </div>

        {/* Route Skeleton */}
        <div className="flex-1 w-full flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-10 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
          <div className="flex-1 px-4">
            <div className="h-[2px] bg-gray-200 dark:bg-gray-800 rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-10 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
        </div>

        {/* Price Skeleton */}
        <div className="w-full md:w-auto flex flex-col items-end gap-2 border-l border-gray-100 dark:border-gray-800 pl-6">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-10 w-full md:w-24 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default LoadingListFlights;
