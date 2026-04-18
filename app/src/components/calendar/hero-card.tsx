import { fetchPanchang } from "@/lib/api";
import type { City } from "@/schemas/city";
import { CAL_COLORS, scoreColors, prettifyEnum, weekdayName } from "@/lib/panchang-helpers";
import { MoonPhaseDot } from "./moon-phase-dot";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span
        className="text-[9.5px] font-medium uppercase"
        style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
      >
        {label}
      </span>
      <span className="mt-0.5 text-[13px] font-medium" style={{ color: CAL_COLORS.text.primary }}>
        {value}
      </span>
    </div>
  );
}

function StatPill({ label, value, dot, valueColor }: { label: string; value: string; dot?: string; valueColor?: string }) {
  return (
    <div
      className="flex flex-col rounded-[14px] px-4 py-2.5"
      style={{
        background: "rgba(255,255,255,0.5)",
        border: `1px solid ${CAL_COLORS.teal.border}33`,
      }}
    >
      <span
        className="text-[9.5px] font-medium uppercase"
        style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
      >
        {label}
      </span>
      <span className="mt-0.5 flex items-center gap-1.5 text-[14px] font-medium" style={{ color: valueColor ?? CAL_COLORS.text.primary }}>
        {dot && (
          <span
            aria-hidden
            className="inline-block rounded-full"
            style={{ width: 6, height: 6, background: dot, flexShrink: 0 }}
          />
        )}
        {value}
      </span>
    </div>
  );
}

export async function HeroCard({ city, todayISO }: { city: City; todayISO: string }) {
  let data;
  try {
    data = await fetchPanchang({
      targetDate: todayISO,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
  } catch {
    // Render a skeletal hero with labels only — never blank.
    return <HeroCardFallback todayISO={todayISO} city={city} />;
  }

  const [year, month, dayOfMonth] = todayISO.split("-").map(Number);
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const heroDateLabel = `${shortMonths[month - 1]} ${dayOfMonth}`;
  const heroSub = `${weekdayName(todayISO)} · ${year}`;

  const tithiName = prettifyEnum(data.panchang.tithi.tithi);
  const paksha = data.panchang.tithi.paksha;
  const nakshatraName = prettifyEnum(data.panchang.nakshatra.nakshatra);
  const pada = data.panchang.nakshatra.pada;
  const score = Math.round(data.day_quality.score);
  const scoreLabel = data.day_quality.label;
  const scoreStyle = scoreColors(score);

  return (
    <section
      aria-label="Today's Panchang"
      className="relative overflow-hidden"
      style={{
        background: CAL_COLORS.heroGradient,
        border: `1px solid ${CAL_COLORS.teal.border}`,
        borderRadius: 18,
        padding: "22px 24px",
      }}
    >
      {/* Decorative teal circle top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: CAL_COLORS.teal.decorative,
        }}
      />

      <div className="relative grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-8">
        {/* Left: big serif date */}
        <div>
          <div className="font-heading text-[40px] font-medium leading-none" style={{ color: CAL_COLORS.teal.textDark }}>
            {heroDateLabel}
          </div>
          <div className="mt-1 text-[13px] font-medium" style={{ color: CAL_COLORS.text.secondary }}>
            {heroSub}
          </div>
          <div className="mt-4">
            <div
              className="text-[10px] font-medium uppercase"
              style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
            >
              Tithi
            </div>
            <div className="mt-0.5 font-heading text-[22px] font-medium" style={{ color: CAL_COLORS.teal.textDark }}>
              {tithiName} <span className="text-[14px]" style={{ color: CAL_COLORS.text.secondary }}>· {paksha}</span>
            </div>
          </div>
        </div>

        {/* Right: stat pills */}
        <div className="flex flex-col gap-2.5 self-start">
          <div className="grid grid-cols-2 gap-2.5">
            <StatPill label="Nakshatra" value={`${nakshatraName} · Pada ${pada}`} />
            <StatPill
              label="Day score"
              value={`${score} · ${scoreLabel}`}
              dot={scoreStyle.dot}
              valueColor={scoreStyle.text}
            />
          </div>
        </div>
      </div>

      {/* Bottom row: 4 meta items */}
      <div className="relative mt-5 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
        <MetaItem label="Sunrise" value={data.timing.sunrise} />
        <MetaItem label="Sunset" value={data.timing.sunset} />
        <MetaItem
          label="Rahu Kaal"
          value={`${data.timing.rahu_kalam.start_time}–${data.timing.rahu_kalam.end_time}`}
        />
        <div className="flex flex-col">
          <span
            className="text-[9.5px] font-medium uppercase"
            style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
          >
            Moon phase
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[13px] font-medium" style={{ color: CAL_COLORS.text.primary }}>
            <MoonPhaseDot phaseKey={data.moon_phase.phase_key} />
            {data.moon_phase.phase_name}
          </span>
        </div>
      </div>
    </section>
  );
}

function HeroCardFallback({ todayISO, city }: { todayISO: string; city: City }) {
  const [year, month, dayOfMonth] = todayISO.split("-").map(Number);
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <section
      aria-label="Today's Panchang"
      className="relative overflow-hidden"
      style={{
        background: CAL_COLORS.heroGradient,
        border: `1px solid ${CAL_COLORS.teal.border}`,
        borderRadius: 18,
        padding: "22px 24px",
      }}
    >
      <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-8">
        <div>
          <div className="font-heading text-[40px] font-medium leading-none" style={{ color: CAL_COLORS.teal.textDark }}>
            {shortMonths[month - 1]} {dayOfMonth}
          </div>
          <div className="mt-1 text-[13px] font-medium" style={{ color: CAL_COLORS.text.secondary }}>
            {weekdayName(todayISO)} · {year} · {city.name}
          </div>
          <div className="mt-4">
            <div className="text-[10px] font-medium uppercase" style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}>
              Tithi
            </div>
            <div className="mt-0.5 font-heading text-[22px] font-medium" style={{ color: CAL_COLORS.text.secondary }}>
              Data unavailable
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
