import { CAL_COLORS } from "@/lib/panchang-helpers";

/**
 * 10px circular moon-phase indicator. Eight phases rendered via CSS
 * linear-gradient. Colors fixed to our palette, contrast-safe against
 * light backgrounds.
 */
export function MoonPhaseDot({ phaseKey, size = 10 }: { phaseKey: string; size?: number }) {
  const key = (phaseKey || "").toUpperCase();
  const { dark, light, outline } = CAL_COLORS.moon;

  let background: string;
  switch (key) {
    case "NEW":
    case "NEW_MOON":
      background = dark;
      break;
    case "WAXING_CRESCENT":
      background = `linear-gradient(90deg, ${dark} 80%, ${light} 80%)`;
      break;
    case "FIRST_QUARTER":
      background = `linear-gradient(90deg, ${dark} 50%, ${light} 50%)`;
      break;
    case "WAXING_GIBBOUS":
      background = `linear-gradient(90deg, ${dark} 20%, ${light} 20%)`;
      break;
    case "FULL":
    case "FULL_MOON":
      background = light;
      break;
    case "WANING_GIBBOUS":
      background = `linear-gradient(90deg, ${light} 80%, ${dark} 80%)`;
      break;
    case "LAST_QUARTER":
    case "THIRD_QUARTER":
      background = `linear-gradient(90deg, ${light} 50%, ${dark} 50%)`;
      break;
    case "WANING_CRESCENT":
      background = `linear-gradient(90deg, ${light} 20%, ${dark} 20%)`;
      break;
    default:
      background = light;
  }

  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid ${outline}`,
        background,
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}
