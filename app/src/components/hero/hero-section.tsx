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
    <div className="overflow-hidden rounded-2xl shadow-lg" style={{ backgroundColor: "#003636" }}>
      {/* Three-panel visual row */}
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3">
        <div className="flex items-center justify-center">
          <DayQualityGauge dayQuality={data.day_quality} />
        </div>
        <div className="flex items-center justify-center border-y border-white/10 py-4 sm:border-x sm:border-y-0 sm:py-0">
          <TithiTracker
            tithi={data.panchang.tithi}
            tithiBreakdown={data.day_quality.breakdown.tithi}
          />
        </div>
        <div className="flex items-center justify-center">
          <MoonPhaseVisualizer moonPhase={data.moon_phase} />
        </div>
      </div>

      <div className="h-px bg-white/10" />

      <div className="p-5">
        <ActivityPills
          suitable={data.day_quality.suitable_activities}
          avoid={data.day_quality.avoid_activities}
        />
      </div>
    </div>
  );
}
