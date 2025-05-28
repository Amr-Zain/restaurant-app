function Skeleton({ count,h, className } : { count: number, h:number, className?:string}) {
  return (
    <div className={"animate-pulse space-y-4 h-full "+className}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`h-${h} bg-gray-200 rounded-lg p-4`}></div>
      ))}
    </div>
  );
}

export default Skeleton;
