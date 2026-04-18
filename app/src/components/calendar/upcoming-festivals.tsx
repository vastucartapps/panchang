import Link from "next/link";
import { getUpcomingFestivals } from "@/data/festivals";
import { CAL_COLORS, daysUntil, shortMonthDay, weekdayName } from "@/lib/panchang-helpers";

const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function UpcomingFestivals({ todayISO }: { todayISO: string }) {
  const upcoming = getUpcomingFestivals(todayISO, 3);
  if (upcoming.length === 0) return null;

  return (
    <section aria-label="Upcoming festivals" className="grid gap-3 sm:grid-cols-3">
      {upcoming.map((f) => {
        const diff = daysUntil(f.date, todayISO);
        const countdownLabel =
          diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : `In ${diff} days`;
        const dayOfMonth = parseInt(f.date.split("-")[2], 10);
        const monthIdx = parseInt(f.date.split("-")[1], 10) - 1;

        return (
          <Link
            key={f.slug}
            href={`/hindu-festivals/${f.slug}`}
            className="group flex flex-col gap-1 rounded-[14px] px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-[--hover]"
            style={{
              background: "#ffffff",
              border: `1px solid ${CAL_COLORS.text.secondary}22`,
              ["--hover" as string]: CAL_COLORS.coral.border,
            }}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-[24px] font-medium leading-none" style={{ color: CAL_COLORS.coral.text }}>
                {dayOfMonth}
              </span>
              <span
                className="text-[10px] font-medium uppercase"
                style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
              >
                {weekdayName(f.date).slice(0, 3)} · {SHORT_MONTHS[monthIdx]}
              </span>
            </div>
            <span className="text-[14px] font-medium" style={{ color: CAL_COLORS.text.primary }}>
              {f.name}
            </span>
            <span className="text-[10.5px] font-medium" style={{ color: CAL_COLORS.coral.countdown }}>
              {countdownLabel}
            </span>
          </Link>
        );
      })}
    </section>
  );
}
