import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <div
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Skeleton className="mx-auto h-10 w-10 rounded-full bg-white/10" />
          <Skeleton className="mx-auto mt-4 h-10 w-64 bg-white/10" />
          <Skeleton className="mx-auto mt-4 h-5 w-48 bg-white/10" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Timing cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border bg-card p-5 shadow-sm">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-32 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Sunrise/sunset */}
        <div className="flex justify-center gap-8 mb-8">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-32" />
        </div>

        {/* About section */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm mb-8">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* City links */}
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </>
  );
}
