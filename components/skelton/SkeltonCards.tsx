import { Skeleton } from "../ui/skeleton";

export const CardsSkeleton = ({ length }: { length: number }) =>
  Array.from({ length }).map((_, index) => (
    <div key={`skeleton ${index}`} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ));
