import { Flame, BookOpen, Calendar } from "lucide-react";
import { formatDateLong } from "@/lib/format";
import type { FestivalEntry, VratEntry, HinduMonth } from "@/schemas/panchang";
import type { Locale } from "@/lib/i18n";

interface FestivalVratSectionProps {
  festivals?: FestivalEntry[];
  vrat?: VratEntry[];
  hinduMonth?: HinduMonth;
  locale?: Locale;
  cityName?: string;
  date?: string;
}

export function FestivalVratSection({
  festivals = [],
  vrat = [],
  hinduMonth,
  locale = "en",
  cityName,
  date,
}: FestivalVratSectionProps) {
  if (festivals.length === 0 && vrat.length === 0) return null;

  const dateSuffix = cityName && date ? ` — ${cityName} | ${formatDateLong(date)}` : "";

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full" style={{ background: "linear-gradient(180deg, #e36414, #C4973B)" }} />
        <h2 className="text-2xl font-bold text-[#013f47] heading-display">
          {locale === "hi" ? `आज के व्रत और त्यौहार${dateSuffix}` : `Festivals & Vrat${dateSuffix}`}
        </h2>
      </div>

      {/* Hindu month badge */}
      {hinduMonth && (
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-[#C4973B]" />
          <span className="text-sm font-medium text-[#013f47]/70">
            {locale === "hi"
              ? `हिन्दू मास: ${hinduMonth.month}${hinduMonth.is_adhik ? " (अधिक)" : ""}`
              : `Hindu Month: ${hinduMonth.month}${hinduMonth.is_adhik ? " (Adhik)" : ""}`}
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Festivals */}
        {festivals.map((festival) => (
          <div
            key={festival.key}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "linear-gradient(135deg, #e36414, #C4973B)" }}
            >
              <Flame className="h-4 w-4 text-white" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-white">{festival.name}</h3>
                <p className="truncate text-xs text-white/70">{festival.name_hindi}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold capitalize text-white">
                {festival.category}
              </span>
            </div>
            <div className="space-y-2 bg-[#FFFBF5] p-4">
              {festival.deity && (
                <p className="text-xs text-[#013f47]/60">
                  <span className="font-semibold">{locale === "hi" ? "देवता" : "Deity"}:</span> {festival.deity}
                </p>
              )}
              {festival.description && (
                <p className="text-xs leading-relaxed text-gray-600">
                  {locale === "hi" && festival.description_hindi ? festival.description_hindi : festival.description}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Vrat */}
        {vrat.map((v) => (
          <div
            key={v.key}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "linear-gradient(135deg, #013f47, #004a4a)" }}
            >
              <BookOpen className="h-4 w-4 text-white" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-white">{v.name}</h3>
                <p className="truncate text-xs text-white/70">{v.name_hindi}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">
                {locale === "hi" ? "व्रत" : "Vrat"}
              </span>
            </div>
            {v.note && (
              <div className="bg-[#F5FAFA] p-4">
                <p className="text-xs leading-relaxed text-gray-600">{v.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
