import type { MoonPhase } from "@/schemas/panchang";

interface MoonPhaseVisualizerProps {
  moonPhase: MoonPhase;
}

export function MoonPhaseVisualizer({ moonPhase }: MoonPhaseVisualizerProps) {
  const { phase_name, illumination_percent, is_waxing, paksha } = moonPhase;
  const illum = illumination_percent / 100;

  const r = 50;
  const cx = 60;
  const cy = 60;

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

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 120" className="h-28 w-28 sm:h-32 sm:w-32">
        {/* Dark moon background */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="rgba(255,255,255,0.08)"
        />
        {/* Lit portion */}
        {litPath && (
          <path
            d={litPath}
            fill="var(--color-brand-gold-end)"
            opacity={0.85}
          />
        )}
        {/* Moon outline */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1.5}
        />
      </svg>
      <p className="mt-2 text-sm font-semibold text-white">
        {phase_name}
      </p>
      <p className="text-xs text-white/60">
        {illumination_percent.toFixed(0)}% illuminated &middot; {paksha}
      </p>
    </div>
  );
}
