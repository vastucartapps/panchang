import Link from "next/link";
import type { DayEntry } from "@/lib/api";
import type { Festival } from "@/data/festivals";
import { CAL_COLORS, prettifyEnum, scoreColors } from "@/lib/panchang-helpers";
import { MoonPhaseDot } from "./moon-phase-dot";

export function DayCell({
  date,
  entry,
  citySlug,
  isToday,
  festival,
}: {
  date: string;
  entry: DayEntry;
  citySlug: string;
  isToday: boolean;
  festival?: Festival;
}) {
  const dayNum = parseInt(date.split("-")[2], 10);

  // Failed fetch state — non-clickable, dimmed, em-dash placeholders
  if (!entry.ok) {
    return (
      <div
        className="flex flex-col rounded-[14px]"
        aria-label={`Data unavailable for ${date}`}
        style={{
          minHeight: 96,
          padding: "10px 11px 28px",
          background: "#ffffff",
          border: `1px solid ${CAL_COLORS.text.secondary}22`,
          opacity: 0.6,
        }}
      >
        <span className="font-heading text-[22px] font-medium leading-none" style={{ color: CAL_COLORS.text.secondary }}>
          {dayNum}
        </span>
        <p className="mt-1 text-[10.5px] font-medium" style={{ color: CAL_COLORS.text.secondary }}>—</p>
        <p className="mt-0.5 text-[9.5px] italic" style={{ color: CAL_COLORS.text.secondary }}>—</p>
      </div>
    );
  }

  const data = entry.data;
  const tithi = prettifyEnum(data.panchang.tithi.tithi);
  const nakshatra = prettifyEnum(data.panchang.nakshatra.nakshatra);
  const score = Math.round(data.day_quality.score);
  const scoreStyle = scoreColors(score);

  const bg = isToday ? CAL_COLORS.teal.fill : festival ? CAL_COLORS.coral.fill : "#ffffff";
  const border = isToday
    ? `1.5px solid ${CAL_COLORS.teal.border}`
    : festival
      ? `1px solid ${CAL_COLORS.coral.border}`
      : `1px solid ${CAL_COLORS.text.secondary}22`;

  // Accessible label for screen readers
  const a11y = [
    `${date}`,
    `Tithi ${tithi}`,
    `Nakshatra ${nakshatra}`,
    `Day score ${score}`,
    festival ? `Festival: ${festival.name}` : "",
    isToday ? "Today" : "",
  ].filter(Boolean).join(", ");

  return (
    <Link
      href={`/${citySlug}/${date}`}
      prefetch={false}
      aria-label={a11y}
      className="group relative flex flex-col rounded-[14px] transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        minHeight: 96,
        padding: "10px 11px 28px",
        background: bg,
        border,
        outlineColor: CAL_COLORS.teal.border,
      }}
    >
      {/* TODAY pill */}
      {isToday && (
        <span
          className="absolute right-2 top-2 rounded-full px-1.5 py-0.5 text-[8.5px] font-medium uppercase"
          style={{
            letterSpacing: "1.2px",
            color: CAL_COLORS.teal.pillText,
            background: "#ffffff",
            border: `1px solid ${CAL_COLORS.teal.border}`,
          }}
        >
          Today
        </span>
      )}

      {/* Date numeral */}
      <span className="font-heading text-[22px] font-medium leading-none" style={{ color: CAL_COLORS.text.primary }}>
        {dayNum}
      </span>

      {/* Tithi */}
      <p
        className="mt-1 truncate text-[10.5px] font-medium"
        style={{ color: CAL_COLORS.text.primary }}
        title={tithi}
      >
        {tithi}
      </p>

      {/* Nakshatra */}
      <p
        className="mt-0.5 truncate text-[9.5px] italic"
        style={{ color: CAL_COLORS.text.secondary }}
        title={nakshatra}
      >
        {nakshatra}
      </p>

      {/* Festival name (bottom-of-cell for coral cells) */}
      {festival && (
        <p
          className="mt-1 truncate text-[10px] font-medium"
          style={{ color: CAL_COLORS.coral.text }}
          title={festival.name}
        >
          {festival.name}
        </p>
      )}

      {/* Moon phase bottom-left */}
      <div className="absolute bottom-2 left-2">
        <MoonPhaseDot phaseKey={data.moon_phase.phase_key} size={10} />
      </div>

      {/* Score bottom-right */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1">
        <span
          aria-hidden
          className="inline-block rounded-full"
          style={{ width: 6, height: 6, background: scoreStyle.dot, flexShrink: 0 }}
        />
        <span className="text-[10px] font-medium" style={{ color: scoreStyle.text }}>
          {score}
        </span>
      </div>
    </Link>
  );
}
