import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";
import { formatDateLong } from "@/lib/format";
import type { MuhurtaYogas } from "@/schemas/panchang";
import type { Locale } from "@/lib/i18n";

interface MuhurtaYogasProps {
  muhurtaYogas: MuhurtaYogas;
  locale?: Locale;
  cityName?: string;
  date?: string;
}

const qualityColors: Record<string, string> = {
  Excellent: "#22c55e",
  Good: "#84cc16",
  Average: "#eab308",
  Poor: "#f97316",
  Avoid: "#ef4444",
};

export function MuhurtaYogasSection({ muhurtaYogas, locale = "en", cityName, date }: MuhurtaYogasProps) {
  const dateSuffix = cityName && date ? ` — ${cityName} | ${formatDateLong(date)}` : "";
  const qualityColor = qualityColors[muhurtaYogas.overall_muhurta_quality] || "#eab308";

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full" style={{ background: "linear-gradient(180deg, #013f47, #C4973B)" }} />
        <h2 className="text-2xl font-bold text-[#013f47] heading-display">
          {locale === "hi" ? `मुहूर्त योग${dateSuffix}` : `Muhurta Yogas & Auspicious Combinations${dateSuffix}`}
        </h2>
      </div>

      {/* Overall quality badge + Panchaka warning */}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ backgroundColor: qualityColor }}
        >
          {locale === "hi" ? "मुहूर्त गुणवत्ता" : "Muhurta Quality"}: {muhurtaYogas.overall_muhurta_quality}
        </span>
        {muhurtaYogas.panchaka_active && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-4 py-1.5 text-sm font-bold text-red-700">
            <AlertTriangle className="h-3.5 w-3.5" />
            {locale === "hi" ? "पंचक सक्रिय — सावधानी बरतें" : "Panchaka Active — Exercise Caution"}
          </span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Auspicious yogas */}
        {muhurtaYogas.auspicious.length > 0 && (
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "linear-gradient(135deg, #14532d, #0A3D1F)" }}
            >
              <ShieldCheck className="h-4 w-4 text-white" />
              <h3 className="text-sm font-bold text-white">
                {locale === "hi" ? "शुभ योग" : "Auspicious Yogas"}
              </h3>
              <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-white">
                {muhurtaYogas.count_auspicious}
              </span>
            </div>
            <div className="space-y-3 p-4" style={{ backgroundColor: "#f0fdf4" }}>
              {muhurtaYogas.auspicious.map((yoga) => (
                <div key={yoga.name} className="rounded-xl border border-green-100 bg-white p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-[#013f47]">{yoga.name}</p>
                      <p className="text-xs text-[#C4973B]">{yoga.name_hindi}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium capitalize text-green-700">
                      {yoga.rarity}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{yoga.description}</p>
                  {yoga.suitable_for.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {yoga.suitable_for.map((activity) => (
                        <span
                          key={activity}
                          className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium capitalize text-green-700"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inauspicious yogas */}
        {muhurtaYogas.inauspicious.length > 0 && (
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)" }}
            >
              <ShieldAlert className="h-4 w-4 text-white" />
              <h3 className="text-sm font-bold text-white">
                {locale === "hi" ? "अशुभ योग" : "Inauspicious Yogas"}
              </h3>
              <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-white">
                {muhurtaYogas.count_inauspicious}
              </span>
            </div>
            <div className="space-y-3 p-4" style={{ backgroundColor: "#fef2f2" }}>
              {muhurtaYogas.inauspicious.map((yoga) => (
                <div key={yoga.name} className="rounded-xl border border-red-100 bg-white p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-[#013f47]">{yoga.name}</p>
                      <p className="text-xs text-[#C4973B]">{yoga.name_hindi}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium capitalize text-red-700">
                      {yoga.rarity}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{yoga.description}</p>
                  {yoga.avoid_for.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {yoga.avoid_for.map((activity) => (
                        <span
                          key={activity}
                          className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium capitalize text-red-700"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
