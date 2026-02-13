import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header skeleton */}
      <div className="h-10 bg-[#013f47]" />
      <div className="h-12 border-b bg-white" />

      {/* Hero skeleton */}
      <section className="py-14 sm:py-20" style={{ background: "linear-gradient(165deg, #013f47, #004D40, #1B3A2D)" }}>
        <div className="mx-auto flex flex-col items-center gap-4 px-4 text-center" style={{ maxWidth: "92%" }}>
          <Skeleton className="h-12 w-72 bg-white/10" />
          <Skeleton className="h-px w-24 bg-white/10" />
          <Skeleton className="h-5 w-48 bg-white/10" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-10 w-32 rounded-full bg-white/10" />
            <Skeleton className="h-10 w-36 rounded-full bg-white/10" />
          </div>
        </div>
      </section>

      {/* Cards skeleton */}
      <section className="mx-auto px-4 pt-10 pb-4 sm:px-6" style={{ maxWidth: "92%" }}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-3xl p-7 shadow-lg" style={{ backgroundColor: "#013f47" }}>
              <Skeleton className="mb-3 h-3 w-20 bg-white/10" />
              <Skeleton className="mb-2 h-px w-10 bg-white/10" />
              <Skeleton className="h-14 w-24 bg-white/10" />
              <Skeleton className="mt-4 h-6 w-20 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </section>

      {/* Timing sections skeleton */}
      <section className="mx-auto px-4 py-4 sm:px-6" style={{ maxWidth: "92%" }}>
        <Skeleton className="h-64 w-full rounded-3xl" />
      </section>
      <section className="mx-auto px-4 py-4 sm:px-6" style={{ maxWidth: "92%" }}>
        <Skeleton className="h-64 w-full rounded-3xl" />
      </section>
    </div>
  );
}
