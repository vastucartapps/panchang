import {
  Star,
  Sparkles,
  Layers,
  CalendarDays,
  ShieldAlert,
  ShieldCheck,
  Sunrise,
} from "lucide-react";
import { PanchangCard } from "./panchang-card";
import { DayQualityBreakdown } from "./day-quality-breakdown";
import { formatTime12h, formatDuration } from "@/lib/format";
import type { PanchangResponse } from "@/schemas/panchang";

interface PanchangGridProps {
  data: PanchangResponse;
}

export function PanchangGrid({ data }: PanchangGridProps) {
  const { panchang, timing, day_quality } = data;

  return (
    <section className="space-y-8">
      {/* Section heading */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#003636]" />
        <h2 className="text-xl font-bold text-[#003636]">
          Panchang Details
        </h2>
      </div>

      {/* Panchang Limbs Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Nakshatra */}
        <PanchangCard
          title="Nakshatra"
          icon={<Star className="h-4 w-4" />}
          watermarkIcon={<Star className="h-20 w-20" />}
          name={panchang.nakshatra.nakshatra}
          nature={panchang.nakshatra.nature}
        >
          <p className="text-xs text-white"><span className="text-white/60">Pada:</span> {panchang.nakshatra.pada}</p>
          <p className="text-xs text-white"><span className="text-white/60">Lord:</span> {panchang.nakshatra.lord}</p>
          <p className="text-xs text-white"><span className="text-white/60">Deity:</span> {panchang.nakshatra.deity}</p>
          <p className="text-xs text-white"><span className="text-white/60">Gana:</span> {panchang.nakshatra.gana}</p>
          <p className="text-xs text-white"><span className="text-white/60">Activity:</span> {panchang.nakshatra.activity_type}</p>
        </PanchangCard>

        {/* Yoga */}
        <PanchangCard
          title="Yoga"
          icon={<Sparkles className="h-4 w-4" />}
          watermarkIcon={<Sparkles className="h-20 w-20" />}
          name={panchang.yoga.yoga}
          nature={panchang.yoga.nature}
        >
          <p className="text-xs leading-relaxed text-white/70">
            {panchang.yoga.description}
          </p>
        </PanchangCard>

        {/* Karana */}
        <PanchangCard
          title="Karana"
          icon={<Layers className="h-4 w-4" />}
          watermarkIcon={<Layers className="h-20 w-20" />}
          name={panchang.karana.karana}
          nature={panchang.karana.nature}
        >
          <p className="text-xs text-white"><span className="text-white/60">Type:</span> {panchang.karana.type}</p>
          <p className="text-xs text-white"><span className="text-white/60">Half:</span> {panchang.karana.is_first_half ? "First" : "Second"}</p>
        </PanchangCard>

        {/* Vara */}
        <PanchangCard
          title="Vara (Day)"
          icon={<CalendarDays className="h-4 w-4" />}
          watermarkIcon={<CalendarDays className="h-20 w-20" />}
          name={`${panchang.vara.name} (${panchang.vara.day})`}
          nature={panchang.vara.nature}
        >
          <p className="text-xs text-white"><span className="text-white/60">Lord:</span> {panchang.vara.lord}</p>
        </PanchangCard>
      </div>

      {/* Day Quality Breakdown */}
      <DayQualityBreakdown dayQuality={day_quality} />

      {/* Important Timings */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#003636]" />
        <h2 className="text-xl font-bold text-[#003636]">
          Important Timings
        </h2>
      </div>

      {/* Sunrise/Sunset bar */}
      <div className="overflow-hidden rounded-2xl shadow-lg" style={{ backgroundColor: "#003636" }}>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/20">
              <Sunrise className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <p className="text-xs font-medium text-white/60">Sunrise</p>
              <p className="text-2xl font-bold text-white">{formatTime12h(timing.sunrise)}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-white/60">Day Length</p>
            <p className="text-lg font-bold text-amber-300">{timing.dinamana_hours.toFixed(1)} hrs</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-medium text-white/60">Sunset</p>
              <p className="text-2xl font-bold text-white">{formatTime12h(timing.sunset)}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400/20">
              <Sunrise className="h-5 w-5 rotate-180 text-orange-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Avoid These Times */}
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 px-6 py-3" style={{ backgroundColor: "#8B1A1A" }}>
          <ShieldAlert className="h-5 w-5 text-white" />
          <h2 className="text-base font-bold text-white">Avoid These Times</h2>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-3" style={{ backgroundColor: "#fef2f2" }}>
          {[
            { entry: timing.rahu_kalam },
            { entry: timing.yamagandam },
            { entry: timing.gulika_kalam },
          ].map((t) => (
            <div
              key={t.entry.name}
              className="flex flex-col items-center justify-center rounded-2xl p-5"
              style={{ backgroundColor: "#8B1A1A" }}
            >
              <p className="text-lg font-bold text-amber-300">{t.entry.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              <p className="mt-2 text-xl font-bold text-white">
                {formatTime12h(t.entry.start_time)} – {formatTime12h(t.entry.end_time)}
              </p>
              <span className="mt-2 rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-white/80">
                {formatDuration(t.entry.duration_minutes)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Times */}
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 px-6 py-3" style={{ backgroundColor: "#003636" }}>
          <ShieldCheck className="h-5 w-5 text-white" />
          <h2 className="text-base font-bold text-white">Best Times Today</h2>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2" style={{ backgroundColor: "#f0fdf4" }}>
          {[
            { entry: timing.abhijit_muhurta },
            { entry: timing.brahma_muhurta },
          ].map((t) => (
            <div
              key={t.entry.name}
              className="flex flex-col items-center justify-center rounded-2xl p-5"
              style={{ backgroundColor: "#14532d" }}
            >
              <p className="text-lg font-bold text-amber-300">{t.entry.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              <p className="mt-2 text-xl font-bold text-white">
                {formatTime12h(t.entry.start_time)} – {formatTime12h(t.entry.end_time)}
              </p>
              <span className="mt-2 rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-white/80">
                {formatDuration(t.entry.duration_minutes)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
