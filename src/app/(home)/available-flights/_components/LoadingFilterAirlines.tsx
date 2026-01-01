import { Skeleton } from "@/components/ui/skeleton";

const LoadingFilterAirlines = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-900 dark:text-white font-semibold">Airlines</p>
      {[0, 1, 2].map((item) => (
        <label
          key={item}
          className="font-semibold flex items-center gap-[10px]"
        >
          <Skeleton className="w-[25px] bg-gray-200 dark:bg-gray-700 h-[25px] rounded" />
          <Skeleton className="w-[150px] bg-gray-200 dark:bg-gray-700 h-5 rounded" />
        </label>
      ))}
    </div>
  );
};

export default LoadingFilterAirlines;
