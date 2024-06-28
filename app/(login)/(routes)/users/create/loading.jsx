import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <Skeleton className="h-96 rounded my-1" />
      <Skeleton className="w-44 h-9 rounded my-1" />
    </div>
  );
};

export default Loading;
