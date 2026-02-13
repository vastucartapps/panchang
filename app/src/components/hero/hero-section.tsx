import { DayQualityGauge } from "./day-quality-gauge";
import { TithiTracker } from "./tithi-tracker";
import { MoonPhaseVisualizer } from "./moon-phase-visualizer";
import { ActivityPills } from "./activity-pills";
import type { PanchangResponse } from "@/schemas/panchang";
import type { Locale } from "@/lib/i18n";

interface HeroSectionProps {
  data: PanchangResponse;
  locale?: Locale;
}

export function HeroSection({ data, locale = "en" }: HeroSectionProps) {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-white/[0.06] shadow-2xl shadow-black/20"
      style={{ background: "linear-gradient(180deg, #013f47 0%, #002828 100%)" }}
    >
      {/* Three-panel visual row */}
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
        <div className="flex items-center justify-center rounded-2xl bg-white/[0.03] p-4 m-2 sm:p-6 sm:m-3">
          <DayQualityGauge dayQuality={data.day_quality} locale={locale} />
        </div>
        <div className="flex items-center justify-center rounded-2xl bg-white/[0.03] p-4 m-2 sm:p-6 sm:m-3">
          <TithiTracker
            tithi={data.panchang.tithi}
            tithiBreakdown={data.day_quality.breakdown.tithi}
            locale={locale}
          />
        </div>
        <div className="flex items-center justify-center rounded-2xl bg-white/[0.03] p-4 m-2 sm:p-6 sm:m-3">
          <MoonPhaseVisualizer moonPhase={data.moon_phase} locale={locale} />
        </div>
      </div>

      <div className="border-t border-white/[0.06]" />

      <div className="p-4 sm:p-8">
        <ActivityPills
          suitable={data.day_quality.suitable_activities}
          avoid={data.day_quality.avoid_activities}
          locale={locale}
        />
      </div>
    </div>
  );
}
