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
import { formatTime12h, formatDuration, formatDateLong } from "@/lib/format";
import { getTranslations, getHindiName, type Locale } from "@/lib/i18n";
import type { PanchangResponse } from "@/schemas/panchang";

interface PanchangGridProps {
  data: PanchangResponse;
  locale?: Locale;
  cityName?: string;
  date?: string;
}

export function PanchangGrid({ data, locale = "en", cityName, date }: PanchangGridProps) {
  const t = getTranslations(locale);
  const { panchang, timing, day_quality } = data;
  const dateSuffix = cityName && date ? ` — ${cityName} | ${formatDateLong(date)}` : "";

  return (
    <section className="space-y-8">
      {/* Section heading */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full" style={{ background: "linear-gradient(180deg, #003636, #C4973B)" }} />
        <h2 className="text-2xl font-bold text-[#003636] heading-display">
          {locale === "hi" ? `तिथि, नक्षत्र, योग और करण${dateSuffix}` : `Tithi, Nakshatra, Yoga & Karana${dateSuffix}`}
        </h2>
      </div>

      {/* Panchang Limbs Grid */}
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        {/* Nakshatra */}
        <PanchangCard
          title={t("panchang.nakshatra")}
          icon={<Star className="h-4 w-4" />}
          watermarkIcon={<Star className="h-20 w-20" />}
          name={panchang.nakshatra.nakshatra}
          hindiName={locale === "hi" ? getHindiName("nakshatra", panchang.nakshatra.nakshatra) : undefined}
          nature={panchang.nakshatra.nature}
          gradientAccent="rgba(196,151,59,0.12)"
        >
          <p className="text-xs text-white"><span className="text-white/60">Pada:</span> {panchang.nakshatra.pada}</p>
          <p className="text-xs text-white"><span className="text-white/60">Lord:</span> {panchang.nakshatra.lord}</p>
          <p className="text-xs text-white"><span className="text-white/60">Deity:</span> {panchang.nakshatra.deity}</p>
          <p className="text-xs text-white"><span className="text-white/60">Gana:</span> {panchang.nakshatra.gana}</p>
          <p className="text-xs text-white"><span className="text-white/60">Activity:</span> {panchang.nakshatra.activity_type}</p>
        </PanchangCard>

        {/* Yoga */}
        <PanchangCard
          title={t("panchang.yoga")}
          icon={<Sparkles className="h-4 w-4" />}
          watermarkIcon={<Sparkles className="h-20 w-20" />}
          name={panchang.yoga.yoga}
          hindiName={locale === "hi" ? getHindiName("yoga", panchang.yoga.yoga) : undefined}
          nature={panchang.yoga.nature}
          gradientAccent="rgba(34,197,94,0.1)"
        >
          <p className="text-xs leading-relaxed text-white/70">
            {panchang.yoga.description}
          </p>
        </PanchangCard>

        {/* Karana */}
        <PanchangCard
          title={t("panchang.karana")}
          icon={<Layers className="h-4 w-4" />}
          watermarkIcon={<Layers className="h-20 w-20" />}
          name={panchang.karana.karana}
          nature={panchang.karana.nature}
          gradientAccent="rgba(227,100,20,0.1)"
        >
          <p className="text-xs text-white"><span className="text-white/60">Type:</span> {panchang.karana.type}</p>
          <p className="text-xs text-white"><span className="text-white/60">Half:</span> {panchang.karana.is_first_half ? "First" : "Second"}</p>
        </PanchangCard>

        {/* Vara */}
        <PanchangCard
          title={t("panchang.vara")}
          icon={<CalendarDays className="h-4 w-4" />}
          watermarkIcon={<CalendarDays className="h-20 w-20" />}
          name={`${panchang.vara.name} (${panchang.vara.day})`}
          nature={panchang.vara.nature}
          gradientAccent="rgba(139,105,20,0.1)"
        >
          <p className="text-xs text-white"><span className="text-white/60">Lord:</span> {panchang.vara.lord}</p>
        </PanchangCard>
      </div>

      {/* Day Quality Breakdown */}
      <DayQualityBreakdown dayQuality={day_quality} />

      {/* Important Timings */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full" style={{ background: "linear-gradient(180deg, #003636, #C4973B)" }} />
        <h2 className="text-2xl font-bold text-[#003636] heading-display">
          {locale === "hi" ? `सूर्योदय, सूर्यास्त और मुहूर्त${dateSuffix}` : `Sunrise, Sunset & Muhurta Timings${dateSuffix}`}
        </h2>
      </div>

      {/* Sunrise/Sunset bar */}
      <div
        className="overflow-hidden rounded-3xl border border-white/[0.06] shadow-lg"
        style={{ background: "linear-gradient(135deg, #003636 0%, #002828 100%)" }}
      >
        <div className="flex items-center justify-between p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 sm:h-10 sm:w-10">
              <Sunrise className="h-4 w-4 text-amber-300 sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">Sunrise</p>
              <p className="text-lg font-bold tracking-tight text-white sm:text-2xl">{formatTime12h(timing.sunrise)}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">Day Length</p>
            <p className="text-base font-bold text-amber-300 sm:text-lg">{timing.dinamana_hours.toFixed(1)} hrs</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">Sunset</p>
              <p className="text-lg font-bold tracking-tight text-white sm:text-2xl">{formatTime12h(timing.sunset)}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/20 sm:h-10 sm:w-10">
              <Sunrise className="h-4 w-4 rotate-180 text-orange-300 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Avoid These Times */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg">
        <div
          className="flex items-center gap-3 px-4 py-3 sm:px-6"
          style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)" }}
        >
          <ShieldAlert className="h-5 w-5 text-white" />
          <h2 className="text-base font-bold text-white">{locale === "hi" ? `राहु काल और अशुभ समय${dateSuffix}` : `Rahu Kaal & Inauspicious Timings${dateSuffix}`}</h2>
        </div>
        <div className="grid gap-3 p-3 sm:grid-cols-3 sm:p-4" style={{ backgroundColor: "#fef2f2" }}>
          {[
            { entry: timing.rahu_kalam },
            { entry: timing.yamagandam },
            { entry: timing.gulika_kalam },
          ].map((t) => (
            <div
              key={t.entry.name}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] p-4 sm:p-5"
              style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">{t.entry.name}</p>
              <div className="mt-2 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <p className="mt-3 font-mono text-2xl font-bold tracking-tight text-white sm:text-4xl">
                {formatTime12h(t.entry.start_time)}
              </p>
              <p className="text-xs text-white/50">to</p>
              <p className="font-mono text-2xl font-bold tracking-tight text-white sm:text-4xl">
                {formatTime12h(t.entry.end_time)}
              </p>
              <span className="mt-3 rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-white/80">
                {formatDuration(t.entry.duration_minutes)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Times */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg">
        <div
          className="flex items-center gap-3 px-4 py-3 sm:px-6"
          style={{ background: "linear-gradient(135deg, #14532d, #0A3D1F)" }}
        >
          <ShieldCheck className="h-5 w-5 text-white" />
          <h2 className="text-base font-bold text-white">{locale === "hi" ? `शुभ मुहूर्त${dateSuffix}` : `Shubh Muhurta & Auspicious Timings${dateSuffix}`}</h2>
        </div>
        <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4" style={{ backgroundColor: "#f0fdf4" }}>
          {[
            ...(timing.abhijit_muhurta ? [{ entry: timing.abhijit_muhurta }] : []),
            { entry: timing.brahma_muhurta },
          ].map((t) => (
            <div
              key={t.entry.name}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] p-4 sm:p-5"
              style={{ background: "linear-gradient(135deg, #14532d, #0A3D1F)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">{t.entry.name}</p>
              <div className="mt-2 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <p className="mt-3 font-mono text-2xl font-bold tracking-tight text-white sm:text-4xl">
                {formatTime12h(t.entry.start_time)}
              </p>
              <p className="text-xs text-white/50">to</p>
              <p className="font-mono text-2xl font-bold tracking-tight text-white sm:text-4xl">
                {formatTime12h(t.entry.end_time)}
              </p>
              <span className="mt-3 rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-white/80">
                {formatDuration(t.entry.duration_minutes)}
              </span>
              {t.entry.note && (
                <p className="mt-2 max-w-[200px] text-center text-[10px] leading-tight text-white/40 italic">
                  {t.entry.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
