import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-1/2 flex gap-2">
        <div className="w-1/2">
          <Skeleton className="h-full" />
        </div>
        <div className="w-1/2">
          <Skeleton className="h-full" />
        </div>
      </div>
      <div className="h-1/2">
        <Skeleton className="h-full" />
      </div>
    </div>
  );
};

export default Loading;
