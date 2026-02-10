import { getNatureStyle } from "@/lib/constants";
import type { Tithi } from "@/schemas/panchang";
import type { DayQualityBreakdownItem } from "@/schemas/panchang";

interface TithiTrackerProps {
  tithi: Tithi;
  tithiBreakdown: DayQualityBreakdownItem;
}

export function TithiTracker({ tithi, tithiBreakdown }: TithiTrackerProps) {
  const style = getNatureStyle(tithi.nature);
  const percent = Math.min(tithi.percent_elapsed, 100);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        Tithi
      </p>
      <div className="text-center">
        <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          {tithiBreakdown.name}
        </p>
        <p className="mt-1 text-sm text-white/60">
          {tithi.paksha} Paksha
        </p>
      </div>

      {/* Progress bar with segment marks */}
      <div className="w-full max-w-[240px]">
        <div className="relative mb-1.5 h-4 w-full overflow-hidden rounded-full bg-white/10">
          {/* Segment marks at 25/50/75% */}
          <div className="absolute left-1/4 top-0 h-full w-px bg-white/10" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
          <div className="absolute left-3/4 top-0 h-full w-px bg-white/10" />
          {/* Fill bar */}
          <div
            className="relative h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${percent}%`,
              backgroundColor: style.fill,
            }}
          >
            {/* Glowing endpoint dot */}
            <div
              className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full"
              style={{
                backgroundColor: style.fill,
                boxShadow: `0 0 8px ${style.fill}`,
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>{percent.toFixed(1)}% elapsed</span>
          <span>{tithi.remaining_degrees.toFixed(1)}&deg; remaining</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-sm font-semibold capitalize"
          style={{ color: style.fill, backgroundColor: `${style.fill}15` }}
        >
          {tithi.nature}
        </span>
        {tithiBreakdown.deity && (
          <>
            <span className="text-xs text-white/30">&middot;</span>
            <span className="text-xs text-white/50">
              {tithiBreakdown.deity}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
