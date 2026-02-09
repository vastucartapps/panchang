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
      <div className="text-center">
        <p className="text-lg font-bold text-white sm:text-xl">
          {tithiBreakdown.name}
        </p>
        <p className="text-sm text-white/60">
          {tithi.paksha} Paksha
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[240px]">
        <div className="mb-1.5 h-3 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${percent}%`,
              backgroundColor: style.fill,
            }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>{percent.toFixed(1)}% elapsed</span>
          <span>{tithi.remaining_degrees.toFixed(1)}&deg; remaining</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: style.fill }}
        />
        <span className="text-xs capitalize" style={{ color: style.fill }}>
          {tithi.nature}
        </span>
        {tithiBreakdown.deity && (
          <>
            <span className="text-xs text-white/40">&middot;</span>
            <span className="text-xs text-white/60">
              Deity: {tithiBreakdown.deity}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
