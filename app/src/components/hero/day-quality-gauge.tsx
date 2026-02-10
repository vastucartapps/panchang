import { getScoreNature, getNatureStyle } from "@/lib/constants";
import type { DayQuality } from "@/schemas/panchang";

interface DayQualityGaugeProps {
  dayQuality: DayQuality;
}

export function DayQualityGauge({ dayQuality }: DayQualityGaugeProps) {
  const { score, label, summary } = dayQuality;
  const nature = getScoreNature(score);
  const style = getNatureStyle(nature);

  const radius = 80;
  const strokeWidth = 14;
  const cx = 100;
  const cy = 100;
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
  const scoreArc =
    score > 0
      ? describeArc(cx, cy, radius, startAngle, scoreAngle)
      : "";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 200" className="h-44 w-48 sm:h-52 sm:w-56">
        {/* Background arc */}
        <path
          d={bgArc}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Score arc */}
        {scoreArc && (
          <path
            d={scoreArc}
            fill="none"
            stroke={style.fill}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}
        {/* Score text */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill="white"
          style={{
            fontSize: "36px",
            fontFamily: "var(--font-merriweather), serif",
            fontWeight: 700,
          }}
        >
          {Math.round(score)}
        </text>
        {/* Label */}
        <text
          x={cx}
          y={cy + 22}
          textAnchor="middle"
          style={{
            fontSize: "13px",
            fontWeight: 600,
            fill: style.fill,
          }}
        >
          {label}
        </text>
        {/* "out of 100" */}
        <text
          x={cx}
          y={cx + 38}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          style={{ fontSize: "10px" }}
        >
          out of 100
        </text>
      </svg>
    </div>
  );
}
