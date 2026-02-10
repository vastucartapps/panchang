import type { MoonPhase } from "@/schemas/panchang";

interface MoonPhaseVisualizerProps {
  moonPhase: MoonPhase;
}

export function MoonPhaseVisualizer({ moonPhase }: MoonPhaseVisualizerProps) {
  const { phase_name, illumination_percent, is_waxing, paksha } = moonPhase;
  const illum = illumination_percent / 100;

  const r = 70;
  const cx = 90;
  const cy = 90;

  const terminatorRx = Math.abs(1 - 2 * illum) * r;
  const isGibbous = illum > 0.5;
  const litSide = is_waxing ? "right" : "left";

  function halfArc(side: "left" | "right") {
    const sweep = side === "right" ? 1 : 0;
    return `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${sweep} ${cx} ${cy + r}`;
  }

  function terminatorArc(curveRight: boolean) {
    const sweep = curveRight ? 1 : 0;
    return `A ${terminatorRx} ${r} 0 0 ${sweep} ${cx} ${cy - r}`;
  }

  let litPath: string;

  if (illum <= 0.01) {
    litPath = "";
  } else if (illum >= 0.99) {
    litPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`;
  } else if (isGibbous) {
    litPath =
      halfArc(litSide) + " " + terminatorArc(litSide === "right");
  } else {
    litPath =
      halfArc(litSide) + " " + terminatorArc(litSide !== "right");
  }

  // Crater positions on the lit portion
  const craters = [
    { cx: cx + 15, cy: cy - 20, r: 7 },
    { cx: cx - 10, cy: cy + 15, r: 5 },
    { cx: cx + 25, cy: cy + 10, r: 4 },
    { cx: cx - 5, cy: cy - 30, r: 3 },
    { cx: cx + 5, cy: cy + 30, r: 6 },
  ];

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 180 180" className="h-40 w-40 sm:h-48 sm:w-48">
        <defs>
          <radialGradient id="moonDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
          </radialGradient>
          <radialGradient id="moonLit" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#E8D5A3" />
            <stop offset="50%" stopColor="#C4973B" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
          <radialGradient id="moonHaze" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(196,151,59,0.08)" />
            <stop offset="100%" stopColor="rgba(196,151,59,0)" />
          </radialGradient>
          <filter id="moonGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="moonClip">
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
        </defs>

        {/* Ambient haze */}
        <circle cx={cx} cy={cy} r={85} fill="url(#moonHaze)" />

        {/* Outer glow ring */}
        <circle
          cx={cx}
          cy={cy}
          r={73}
          fill="none"
          stroke="rgba(196,151,59,0.15)"
          strokeWidth={3}
          filter="url(#moonGlow)"
        />

        {/* Dark moon background */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="url(#moonDark)"
        />

        {/* Lit portion with gold gradient */}
        {litPath && (
          <path
            d={litPath}
            fill="url(#moonLit)"
            opacity={0.9}
          />
        )}

        {/* Crater details (clipped to moon) */}
        <g clipPath="url(#moonClip)">
          {craters.map((crater, i) => (
            <circle
              key={i}
              cx={crater.cx}
              cy={crater.cy}
              r={crater.r}
              fill="rgba(0,0,0,0.08)"
            />
          ))}
        </g>

        {/* Moon outline */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
        />
      </svg>
      <p className="mt-1 text-base font-bold text-white">
        {phase_name}
      </p>
      <p className="mt-0.5 text-xs text-white/60">
        {illumination_percent.toFixed(0)}% illuminated
      </p>
      <p className="text-xs text-white/40">
        {paksha}
      </p>
    </div>
  );
}
