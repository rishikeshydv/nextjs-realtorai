export default function Loading() {
  return (
    <div className="space-y-4 px-16 py-8">
      <p
        className="text-[32px] tracking-tight"
        style={{
          background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
       Loading Analytics...
      </p>
      <div className="h-8 w-1/3 bg-gray-200 rounded-md animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
