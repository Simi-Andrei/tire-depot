import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full flex flex-col">
      <Skeleton className="w-full h-9 rounded my-2" />
      <Skeleton className="w-full h-9 rounded my-2 flex-1" />
      <Skeleton className="w-full h-9 rounded my-2" />
    </div>
  );
};

export default Loading;
