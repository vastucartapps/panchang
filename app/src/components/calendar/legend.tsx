import { CAL_COLORS } from "@/lib/panchang-helpers";
import { MoonPhaseDot } from "./moon-phase-dot";

function LegendItem({ children }: { children: React.ReactNode }) {
  return <span className="flex items-center gap-1.5">{children}</span>;
}

function Dot({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="inline-block rounded-full"
      style={{ width: 8, height: 8, background: color, flexShrink: 0 }}
    />
  );
}

export function Legend() {
  return (
    <div className="flex flex-col items-center gap-2.5 pt-4" style={{ borderTop: `1px solid ${CAL_COLORS.text.secondary}22` }}>
      <div
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] font-medium"
        style={{ color: CAL_COLORS.text.secondary }}
      >
        <LegendItem>
          <Dot color={CAL_COLORS.score.goodDot} />
          Auspicious (70+)
        </LegendItem>
        <LegendItem>
          <Dot color={CAL_COLORS.score.moderateDot} />
          Moderate (40–69)
        </LegendItem>
        <LegendItem>
          <Dot color={CAL_COLORS.score.poorDot} />
          Inauspicious (&lt;40)
        </LegendItem>
        <LegendItem>
          <MoonPhaseDot phaseKey="FIRST_QUARTER" size={10} />
          Moon phase
        </LegendItem>
        <LegendItem>
          <span
            aria-hidden
            className="inline-block rounded-sm"
            style={{
              width: 10,
              height: 10,
              background: CAL_COLORS.coral.fill,
              border: `1px solid ${CAL_COLORS.coral.border}`,
              flexShrink: 0,
            }}
          />
          Festival day
        </LegendItem>
      </div>
    </div>
  );
}
