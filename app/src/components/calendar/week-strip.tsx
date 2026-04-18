import Link from "next/link";
import { fetchPanchangBatch } from "@/lib/api";
import type { City } from "@/schemas/city";
import { getAllFestivals } from "@/data/festivals";
import { CAL_COLORS, getWeekDatesAround, prettifyEnum, scoreColors } from "@/lib/panchang-helpers";

const WEEKDAY_ABBR = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export async function WeekStrip({ city, todayISO }: { city: City; todayISO: string }) {
  const dates = getWeekDatesAround(todayISO);
  const dataMap = await fetchPanchangBatch(dates, {
    latitude: city.lat,
    longitude: city.lng,
    timezone: city.tz,
  });
  const festivals = new Map(getAllFestivals().map((f) => [f.date, f]));

  return (
    <div className="flex gap-2 overflow-x-auto sm:grid sm:grid-cols-7 sm:gap-2 scrollbar-hide">
      {dates.map((d, i) => {
        const entry = dataMap.get(d);
        const festival = festivals.get(d);
        const isToday = d === todayISO;
        const dayNum = parseInt(d.split("-")[2], 10);

        const okEntry = entry && entry.ok ? entry.data : null;
        const tithi = okEntry ? prettifyEnum(okEntry.panchang.tithi.tithi) : "—";
        const score = okEntry ? Math.round(okEntry.day_quality.score) : null;
        const scoreStyle = score !== null ? scoreColors(score) : null;

        const bg = isToday
          ? CAL_COLORS.teal.fill
          : festival
            ? CAL_COLORS.coral.fill
            : "#ffffff";
        const border = isToday
          ? `1.5px solid ${CAL_COLORS.teal.border}`
          : festival
            ? `1px solid ${CAL_COLORS.coral.border}`
            : `1px solid ${CAL_COLORS.text.secondary}33`;

        return (
          <Link
            key={d}
            href={`/${city.slug}/${d}`}
            className="group flex min-w-[92px] flex-col rounded-[14px] px-3 pb-3 pt-2 transition-all hover:-translate-y-0.5 hover:border-[--hover-teal]"
            style={{
              background: bg,
              border,
              ["--hover-teal" as string]: CAL_COLORS.teal.border,
            }}
          >
            <span
              className="text-[9.5px] font-medium uppercase"
              style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
            >
              {WEEKDAY_ABBR[i]}
            </span>
            <span className="mt-1 font-heading text-[20px] font-medium leading-none" style={{ color: isToday ? CAL_COLORS.teal.textDark : CAL_COLORS.text.primary }}>
              {dayNum}
            </span>
            <span
              className="mt-1.5 truncate text-[9.5px] font-medium"
              style={{ color: CAL_COLORS.text.primary }}
              title={tithi}
            >
              {tithi}
            </span>
            {scoreStyle && (
              <span
                aria-hidden
                className="mt-auto inline-block self-start rounded-full"
                style={{ width: 6, height: 6, background: scoreStyle.dot }}
                title={`Day score: ${score}`}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export function WeekStripSkeleton() {
  return (
    <div className="flex gap-2 sm:grid sm:grid-cols-7">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="min-w-[92px] animate-pulse rounded-[14px] px-3 pb-3 pt-2"
          style={{
            background: "#ffffff",
            border: `1px solid ${CAL_COLORS.text.secondary}22`,
            minHeight: 92,
          }}
        />
      ))}
    </div>
  );
}
