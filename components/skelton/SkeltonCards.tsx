import { Card } from "../ui/card";
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

export function OrderCardSkeleton() {
  return (
    <Card className="order-card">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h6 w-8" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-row items-center justify-center gap-2 sm:flex-col">
            <div className="flex -space-x-6">
              <Skeleton className="h-12 w-12 rounded-full border-2 border-white" />
              <Skeleton className="h-12 w-12 rounded-full border-2 border-white" />
              <Skeleton className="h-12 w-12 rounded-full border-2 border-white" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex w-full grow-1 justify-between gap-2">
            <div className="flex-1">
              <Skeleton className="mb-2 h-5 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            <div className="self-center">
              <Skeleton className="size-12 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
export function OrdersLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 gap-x-0 lg:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <OrderCardSkeleton key={i} />
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
export const SkeletonStore = () => (
  <div className="flex animate-pulse items-center justify-center gap-2">
    <div className="size-10 shrink-0 rounded-full bg-gray-300"></div>
    <div className="hidden w-24 items-center gap-1 sm:block space-y-2">
      <div className="h-4 w-full rounded bg-gray-300"></div>
      <div className="h-4 w-3/4 rounded bg-gray-300"></div>
    </div>
  </div>
);
