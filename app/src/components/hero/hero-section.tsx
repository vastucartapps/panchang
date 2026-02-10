import { DayQualityGauge } from "./day-quality-gauge";
import { TithiTracker } from "./tithi-tracker";
import { MoonPhaseVisualizer } from "./moon-phase-visualizer";
import { ActivityPills } from "./activity-pills";
import type { PanchangResponse } from "@/schemas/panchang";

interface HeroSectionProps {
  data: PanchangResponse;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-white/[0.06] shadow-2xl shadow-black/20"
      style={{ background: "linear-gradient(180deg, #003636 0%, #002828 100%)" }}
    >
      {/* Three-panel visual row */}
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
        <div className="flex items-center justify-center rounded-2xl bg-white/[0.03] p-6 m-3">
          <DayQualityGauge dayQuality={data.day_quality} />
        </div>
        <div className="flex items-center justify-center rounded-2xl bg-white/[0.03] p-6 m-3">
          <TithiTracker
            tithi={data.panchang.tithi}
            tithiBreakdown={data.day_quality.breakdown.tithi}
          />
        </div>
        <div className="flex items-center justify-center rounded-2xl bg-white/[0.03] p-6 m-3">
          <MoonPhaseVisualizer moonPhase={data.moon_phase} />
        </div>
      </div>

      <div className="border-t border-white/[0.06]" />

      <div className="p-6 sm:p-8">
        <ActivityPills
          suitable={data.day_quality.suitable_activities}
          avoid={data.day_quality.avoid_activities}
        />
      </div>
    </div>
  );
}
