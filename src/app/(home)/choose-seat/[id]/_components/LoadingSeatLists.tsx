import { Skeleton } from "@/components/ui/skeleton";

const LoadingSeatLists = () => {
  return (
    <form className="flex flex-row  justify-between gap-5">
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3, 4].map((item) => (
            <Skeleton className="bg-white size-[60px] rounded-xl" key={item} />
          ))}
        </div>
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3, 4].map((item) => (
            <Skeleton className="bg-white size-[60px] rounded-xl" key={item} />
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3, 4].map((item) => (
            <Skeleton className="bg-white size-[60px] rounded-xl" key={item} />
          ))}
        </div>
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3, 4].map((item) => (
            <Skeleton className="bg-white size-[60px] rounded-xl" key={item} />
          ))}
        </div>
      </div>
    </form>
  );
};

export default LoadingSeatLists;
