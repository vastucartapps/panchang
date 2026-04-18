import { fetchPanchangBatch } from "@/lib/api";
import { getAllFestivals } from "@/data/festivals";
import type { City } from "@/schemas/city";
import { CAL_COLORS } from "@/lib/panchang-helpers";
import { DayCell } from "./day-cell";

const WEEKDAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function MonthGrid({
  city,
  dates,
  citySlug,
  firstDayOfWeek,
}: {
  city: { name: string; state: string; lat: number; lng: number; tz: string; slug: string };
  dates: string[];
  citySlug: string;
  firstDayOfWeek: number;
}) {
  const todayISO = new Date().toISOString().slice(0, 10);
  const dataMap = await fetchPanchangBatch(dates, {
    latitude: city.lat,
    longitude: city.lng,
    timezone: city.tz,
  });
  const festivals = new Map(getAllFestivals().map((f) => [f.date, f]));

  return (
    <div className="grid grid-cols-7 gap-2">
      {/* Weekday headers */}
      {WEEKDAY_HEADERS.map((d) => (
        <div
          key={d}
          className="pb-2 text-center text-[9.5px] font-medium uppercase"
          style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
        >
          {d}
        </div>
      ))}
      {/* Empty offset cells */}
      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
        <div key={`pre-${i}`} />
      ))}
      {/* Day cells */}
      {dates.map((d) => (
        <DayCell
          key={d}
          date={d}
          entry={dataMap.get(d) ?? { ok: false }}
          citySlug={citySlug}
          isToday={d === todayISO}
          festival={festivals.get(d)}
        />
      ))}
    </div>
  );
}

export function MonthGridSkeleton({ firstDayOfWeek, dayCount }: { firstDayOfWeek: number; dayCount: number }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-center gap-2 text-[11px] font-medium" style={{ color: CAL_COLORS.text.secondary }}>
        <span
          aria-hidden
          className="inline-block h-2 w-2 animate-pulse rounded-full"
          style={{ background: CAL_COLORS.teal.border }}
        />
        Loading the full month
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAY_HEADERS.map((d) => (
          <div
            key={d}
            className="pb-2 text-center text-[9.5px] font-medium uppercase"
            style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
          >
            {d}
          </div>
        ))}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`pre-${i}`} />
        ))}
        {Array.from({ length: dayCount }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-[14px]"
            style={{
              minHeight: 96,
              background: `linear-gradient(135deg, ${CAL_COLORS.text.secondary}11 0%, ${CAL_COLORS.teal.fill}55 100%)`,
              border: `1px solid ${CAL_COLORS.text.secondary}22`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
