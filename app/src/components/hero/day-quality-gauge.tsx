import { getScoreNature, getNatureStyle } from "@/lib/constants";
import { getTranslations, type Locale } from "@/lib/i18n";
import type { DayQuality } from "@/schemas/panchang";

interface DayQualityGaugeProps {
  dayQuality: DayQuality;
  locale?: Locale;
}

export function DayQualityGauge({ dayQuality, locale = "en" }: DayQualityGaugeProps) {
  const { score, label } = dayQuality;
  const t = getTranslations(locale);
  const nature = getScoreNature(score);
  const style = getNatureStyle(nature);

  const radius = 95;
  const strokeWidth = 16;
  const cx = 120;
  const cy = 120;
  const startAngle = 135;
  const endAngle = 405;
  const totalAngle = endAngle - startAngle;
  const scoreAngle = startAngle + (score / 100) * totalAngle;

  function polarToCartesian(
    centerX: number,
    centerY: number,
    r: number,
    angleDeg: number
  ) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(rad),
      y: centerY + r * Math.sin(rad),
    };
  }

  function describeArc(
    x: number,
    y: number,
    r: number,
    startA: number,
    endA: number
  ) {
    const start = polarToCartesian(x, y, r, endA);
    const end = polarToCartesian(x, y, r, startA);
    const largeArc = endA - startA > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  }

  const bgArc = describeArc(cx, cy, radius, startAngle, endAngle);
  const bezelArc = describeArc(cx, cy, radius + 6, startAngle, endAngle);
  const scoreArc =
    score > 0
      ? describeArc(cx, cy, radius, startAngle, scoreAngle)
      : "";

  // Tick marks at every 10%
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const angle = startAngle + (i / 10) * totalAngle;
    const inner = polarToCartesian(cx, cy, radius - strokeWidth / 2 - 2, angle);
    const outer = polarToCartesian(cx, cy, radius - strokeWidth / 2 + 2, angle);
    return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
  });

  // Glowing endpoint
  const endPoint = score > 0 ? polarToCartesian(cx, cy, radius, scoreAngle) : null;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {t("dayQuality")}
      </p>
      <svg viewBox="0 0 240 240" className="h-56 w-60 sm:h-64 sm:w-68">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer bezel ring */}
        <path
          d={bezelArc}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* Background arc track */}
        <path
          d={bgArc}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Tick marks */}
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />
        ))}

        {/* Score arc with glow */}
        {scoreArc && (
          <path
            d={scoreArc}
            fill="none"
            stroke={style.fill}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            filter="url(#glow)"
          />
        )}

        {/* Glowing endpoint dot */}
        {endPoint && (
          <circle
            cx={endPoint.x}
            cy={endPoint.y}
            r={5}
            fill={style.fill}
            filter="url(#glow)"
          />
        )}

        {/* Score number */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill="white"
          style={{
            fontSize: "44px",
            fontFamily: "var(--font-merriweather), serif",
            fontWeight: 700,
            letterSpacing: "-1px",
          }}
        >
          {Math.round(score)}
        </text>
        {/* Label */}
        <text
          x={cx}
          y={cy + 24}
          textAnchor="middle"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            fill: style.fill,
          }}
        >
          {label}
        </text>
        {/* "out of 100" */}
        <text
          x={cx}
          y={cy + 42}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          style={{ fontSize: "10px", letterSpacing: "0.1em" }}
        >
          {locale === "hi" ? "100 में से" : "out of 100"}
        </text>
      </svg>
    </div>
  );
}
