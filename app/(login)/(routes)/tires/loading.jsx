import { Skeleton } from "@/components/ui/skeleton";

const LoadingTires = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between my-1">
        <Skeleton className="w-44 h-10 rounded my-1" />
        <Skeleton className="w-44 h-10 rounded my-1" />
      </div>
      <div className="flex-1 flex flex-col">
        <Skeleton className="w-full h-8 rounded my-1" />
        <Skeleton className="w-full h-8 rounded my-1 flex-1" />
        <Skeleton className="w-full h-8 rounded my-1" />
        <Skeleton className="w-44 h-10 rounded my-1 self-center" />
      </div>
    </div>
  );
};

export default LoadingTires;
