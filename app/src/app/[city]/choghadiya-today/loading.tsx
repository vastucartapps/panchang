import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
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
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="space-y-4 mb-8">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-14 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </div>
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
