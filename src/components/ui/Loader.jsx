export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-surface border border-border rounded-xl p-4 h-32">
      <div className="h-4 bg-border rounded w-2/3 mb-3" />
      <div className="h-3 bg-border rounded w-full mb-2" />
      <div className="h-3 bg-border rounded w-1/2" />
    </div>
  );
}

export function SkeletonGrid({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
