import { IDS, SITE_ORIGIN } from "./ids";
import type { FestivalContent } from "@/data/festival-content";

interface FestivalHowToInput {
  slug: string; // "diwali-2026"
  festivalName: string; // "Diwali"
  year: number;
  content: FestivalContent;
}

/**
 * HowTo schema for festival celebration-guide blocks. Google's HowTo
 * rich-result surfaces step-by-step instructions in search — highly
 * valuable for "how to celebrate {festival}" queries.
 *
 * Gated: only emits when celebrationGuide has ≥ 2 steps with substantive
 * text (≥ 20 chars per step). Reference Files/05 §B.8.
 */
export function buildFestivalHowToSchema(
  input: FestivalHowToInput
): object | null {
  const steps = input.content.celebrationGuide;
  if (!steps || steps.length < 2) return null;

  const validSteps = steps.filter(
    (s) => s.step?.length > 3 && s.detail?.length >= 20
  );
  if (validSteps.length < 2) return null;

  const pageUrl = `${SITE_ORIGIN}/hindu-festivals/${input.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${pageUrl}#howto`,
    name: `How to Celebrate ${input.festivalName} ${input.year}`,
    description: `Step-by-step traditional celebration guide for ${input.festivalName}, with practices observed across India.`,
    url: pageUrl,
    isPartOf: { "@id": IDS.website },
    inLanguage: "en-IN",
    totalTime: "P1D", // one day — celebration spans the day
    step: validSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.step,
      text: s.detail,
      url: `${pageUrl}#step-${i + 1}`,
    })),
  };
}
