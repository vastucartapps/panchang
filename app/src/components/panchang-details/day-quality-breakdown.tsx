import { BarChart3 } from "lucide-react";
import { getNatureStyle } from "@/lib/constants";
import { parseWeight } from "@/lib/format";
import type { DayQuality } from "@/schemas/panchang";

interface DayQualityBreakdownProps {
  dayQuality: DayQuality;
}

export function DayQualityBreakdown({ dayQuality }: DayQualityBreakdownProps) {
  const { breakdown } = dayQuality;
  const items = [
    { key: "tithi", data: breakdown.tithi },
    { key: "nakshatra", data: breakdown.nakshatra },
    { key: "yoga", data: breakdown.yoga },
    { key: "karana", data: breakdown.karana },
    { key: "vara", data: breakdown.vara },
  ];

  return (
    <div
      className="overflow-hidden rounded-3xl border border-white/[0.06] shadow-lg"
      style={{ background: "linear-gradient(180deg, #003636 0%, #002828 100%)" }}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-4 sm:px-6">
        <BarChart3 className="h-5 w-5 text-white/70" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">
          Score Breakdown
        </h3>
        <span className="ml-auto text-2xl font-bold text-amber-300">
          {dayQuality.score}/100
        </span>
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        {items.map(({ key, data }) => {
          const weight = parseWeight(data.weight);
          const style = getNatureStyle(data.nature);
          const normalizedScore = (data.score / weight) * 100;

          return (
            <div key={key}>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium capitalize text-white">
                  {data.name}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {style.label}
                  </span>
                  <span className="font-semibold text-white/60">
                    {data.score.toFixed(1)}/{weight}
                  </span>
                </div>
              </div>
              {/* Bar with grid lines */}
              <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                {/* Faint grid lines */}
                <div className="absolute left-1/4 top-0 h-full w-px bg-white/5" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-white/5" />
                <div className="absolute left-3/4 top-0 h-full w-px bg-white/5" />
                {/* Fill bar */}
                <div
                  className="relative h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${Math.min(normalizedScore, 100)}%`,
                    backgroundColor: style.fill,
                  }}
                >
                  {/* Glowing endpoint */}
                  <div
                    className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
                    style={{
                      backgroundColor: style.fill,
                      boxShadow: `0 0 6px ${style.fill}`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
