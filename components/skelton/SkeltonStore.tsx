export const SkeletonStore = () => (
  <div className="flex animate-pulse items-center justify-center gap-2">
    <div className="size-10 shrink-0 rounded-full bg-gray-300"></div>
    <div className="hidden w-24 items-center gap-1 sm:block space-y-2">
      <div className="h-4 w-full rounded bg-gray-300"></div>
      <div className="h-4 w-3/4 rounded bg-gray-300"></div>
    </div>
  </div>
);
