import { Skeleton } from "@/components/ui/skeleton";

export default function CityLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Location + Date bar */}
      <div className="mb-5 flex items-center justify-between">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-8 w-56" />
      </div>

      {/* Hero card */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3">
          <div className="flex items-center justify-center">
            <Skeleton className="h-36 w-36 rounded-full" />
          </div>
          <div className="flex flex-col items-center justify-center gap-3 border-y border-border py-4 sm:border-x sm:border-y-0 sm:py-0">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-3 w-full max-w-[200px]" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="h-32 w-32 rounded-full" />
          </div>
        </div>
        <div className="border-t p-5">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          {/* Time Quality skeleton */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <Skeleton className="mb-4 h-6 w-36" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>

          {/* Panchang detail cards skeleton */}
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <Skeleton className="mb-3 h-4 w-20" />
                <Skeleton className="mb-2 h-6 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="mb-1 h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
