import { Skeleton } from "@/components/ui/skeleton";

export default function DatePageLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="py-14 sm:py-20" style={{ background: "linear-gradient(165deg, #013f47, #004D40, #1B3A2D)" }}>
        <div className="mx-auto flex flex-col items-center gap-4 px-4 text-center" style={{ maxWidth: "92%" }}>
          <Skeleton className="h-12 w-80 bg-white/10" />
          <Skeleton className="h-px w-24 bg-white/10" />
          <Skeleton className="h-5 w-52 bg-white/10" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-10 w-32 rounded-full bg-white/10" />
            <Skeleton className="h-10 w-36 rounded-full bg-white/10" />
          </div>
          <div className="mt-3 flex gap-2">
            <Skeleton className="h-8 w-8 rounded bg-white/10" />
            <Skeleton className="h-8 w-40 rounded bg-white/10" />
            <Skeleton className="h-8 w-8 rounded bg-white/10" />
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <div className="mx-auto max-w-[92%] overflow-hidden px-4 py-6 sm:px-6">
        {/* Hero section card */}
        <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
          <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3" style={{ backgroundColor: "#013f47" }}>
            <div className="flex items-center justify-center">
              <Skeleton className="h-36 w-36 rounded-full bg-white/10" />
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <Skeleton className="h-6 w-32 bg-white/10" />
              <Skeleton className="h-3 w-48 bg-white/10" />
              <Skeleton className="h-4 w-24 bg-white/10" />
            </div>
            <div className="flex items-center justify-center">
              <Skeleton className="h-32 w-32 rounded-full bg-white/10" />
            </div>
          </div>
        </div>

        {/* Summary skeleton */}
        <div className="mt-6">
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>

        {/* Grid skeleton */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-36 w-full rounded-2xl" />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
