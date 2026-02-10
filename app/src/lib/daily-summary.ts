import type { PanchangResponse } from "@/schemas/panchang";
import { formatTime12h } from "@/lib/format";

/**
 * Generate a natural-language daily Panchang summary from the API data.
 * This is a template-based approach — no external AI calls needed.
 */
export function generateDailySummary(
  data: PanchangResponse,
  cityName: string
): string {
  const { day_quality, panchang, timing, moon_phase } = data;
  const score = Math.round(day_quality.score);
  const tithi = formatName(panchang.tithi.tithi);
  const nakshatra = formatName(panchang.nakshatra.nakshatra);
  const yoga = formatName(panchang.yoga.yoga);
  const vara = panchang.vara.name;
  const paksha = panchang.tithi.paksha;
  const moonPhase = moon_phase.phase_name;
  const sunrise = formatTime12h(timing.sunrise);
  const sunset = formatTime12h(timing.sunset);

  const qualityDesc = getQualityDescription(score);
  const tithiNature = panchang.tithi.nature.toLowerCase();
  const nakshatraNature = panchang.nakshatra.nature.toLowerCase();

  const parts: string[] = [];

  // Opening line
  parts.push(
    `Today's Panchang for ${cityName} shows a ${qualityDesc} day with an overall score of ${score}/100.`
  );

  // Tithi + Paksha
  parts.push(
    `The day falls on ${tithi} of ${paksha} Paksha, which is considered ${tithiNature} in nature${
      panchang.tithi.deity ? `, with ${panchang.tithi.deity} as the presiding deity` : ""
    }.`
  );

  // Nakshatra
  parts.push(
    `The ruling Nakshatra is ${nakshatra} (Pada ${panchang.nakshatra.pada}), governed by ${panchang.nakshatra.lord}, and is ${nakshatraNature} — making it ${getNakshatraRecommendation(nakshatraNature)}.`
  );

  // Yoga
  const yogaNature = panchang.yoga.nature.toLowerCase();
  parts.push(
    `The Yoga for today is ${yoga}, which is ${yogaNature} in character.`
  );

  // Moon phase
  parts.push(
    `The Moon is in ${moonPhase} phase with ${moon_phase.illumination_percent.toFixed(0)}% illumination.`
  );

  // Timing highlights
  parts.push(
    `Sunrise is at ${sunrise} and sunset at ${sunset}. Rahu Kaal falls between ${timing.rahu_kalam.start_time}–${timing.rahu_kalam.end_time} — avoid starting important tasks during this period.`
  );

  // Suitable activities
  if (day_quality.suitable_activities.length > 0) {
    const top3 = day_quality.suitable_activities.slice(0, 3);
    parts.push(
      `This day is favorable for ${formatList(top3)}.`
    );
  }

  // Avoid activities
  if (day_quality.avoid_activities.length > 0) {
    const top2 = day_quality.avoid_activities.slice(0, 2);
    parts.push(
      `It is best to avoid ${formatList(top2)}.`
    );
  }

  // Best time
  if (timing.abhijit_muhurta) {
    parts.push(
      `The most auspicious window is Abhijit Muhurta from ${timing.abhijit_muhurta.start_time} to ${timing.abhijit_muhurta.end_time}.`
    );
  }

  return parts.join(" ");
}

function formatName(raw: string): string {
  return raw
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function getQualityDescription(score: number): string {
  if (score >= 80) return "highly auspicious";
  if (score >= 65) return "good and favorable";
  if (score >= 50) return "moderately favorable";
  if (score >= 35) return "mixed";
  if (score >= 20) return "below average";
  return "challenging";
}

function getNakshatraRecommendation(nature: string): string {
  switch (nature) {
    case "auspicious":
    case "excellent":
      return "suitable for important ceremonies and new beginnings";
    case "good":
      return "generally supportive for positive endeavors";
    case "neutral":
    case "average":
      return "acceptable for routine activities";
    case "inauspicious":
    case "poor":
      return "best suited for introspection and spiritual practices";
    default:
      return "suitable for mindful activities";
  }
}

function formatList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
