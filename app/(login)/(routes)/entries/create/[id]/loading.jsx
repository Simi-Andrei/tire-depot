import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="py-1 h-full">
      <Skeleton className="w-full min-h-96 h-full rounded" />
    </div>
  );
};

export default Loading;
