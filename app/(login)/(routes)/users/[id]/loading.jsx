import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between my-1">
        <Skeleton className="w-44 h-10 rounded my-1" />
      </div>
      <div className="flex-1 flex flex-col w-full md:w-1/2 md:max-w-md">
        <Skeleton className="w-full h-44 rounded my-1" />
      </div>
    </div>
  );
};

export default Loading;
