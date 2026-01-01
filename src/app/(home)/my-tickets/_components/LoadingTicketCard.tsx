import { Skeleton } from "@/components/ui/skeleton";

const LoadingTicketCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Airline Info Skeleton */}
        <div className="flex items-center gap-4 w-full md:w-48">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center p-2 shadow-sm border border-gray-100 overflow-hidden">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>

        {/* Date Skeleton */}
        <div className="hidden md:block">
          <Skeleton className="w-24 h-5" />
        </div>

        {/* Flight Route Visual Skeleton */}
        <div className="flex-1 w-full flex items-center justify-between gap-4 text-center">
          {/* Departure */}
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="w-16 h-7" />
            <Skeleton className="w-10 h-4 rounded-md" />
          </div>

          {/* Route Line */}
          <div className="flex flex-col items-center flex-1 px-2 relative gap-1">
            <Skeleton className="w-16 h-3" />
            <div className="w-full h-[2px] bg-gray-100 relative rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-full bg-gray-200" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
              <Skeleton className="w-4 h-4 rounded-full" />
            </div>
          </div>

          {/* Arrival */}
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="w-16 h-7" />
            <Skeleton className="w-10 h-4 rounded-md" />
          </div>
        </div>

        {/* CTA Skeleton */}
        <Skeleton className="h-12 w-full md:w-32 rounded-xl" />
      </div>
    </div>
  );
};

export default LoadingTicketCard;
