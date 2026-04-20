import { IDS, SITE_ORIGIN } from "./ids";

export interface CityTopicQAInput {
  cityName: string;
  citySlug: string;
  date: string; // YYYY-MM-DD
  topic: "rahu-kaal-today" | "choghadiya-today" | "todays-tithi" | "todays-nakshatra" | "moon-phase-today" | "sunrise-sunset";
  question: string; // "What is Rahu Kaal in New Delhi on 2026-04-20?"
  answerText: string; // plain-text answer, ≥ 40 chars
}

/**
 * QAPage schema for /[city]/{topic}/[date] pages. Each page answers a
 * single canonical question ("What is Rahu Kaal in New Delhi today?")
 * with a concrete, data-backed answer derived from the Panchang fetch.
 *
 * QAPage differs from FAQPage: FAQPage is for multiple Q&A blocks on an
 * informational page; QAPage is for a page whose primary purpose IS
 * answering one specific question. Topic-date pages fit QAPage
 * perfectly — URL + title + H1 all frame a single user query, and the
 * top-of-page content IS the authoritative answer.
 *
 * Emitting QAPage alongside FAQPage is permitted by Google as long as
 * the question + mainEntity are non-overlapping. Reference Files/05 §B.7.
 */
export function buildCityTopicQAPageSchema(input: CityTopicQAInput): object | null {
  if (input.answerText.length < 40) return null;

  const pageUrl = `${SITE_ORIGIN}/${input.citySlug}/${input.topic}/${input.date}`;

  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "@id": `${pageUrl}#qa`,
    url: pageUrl,
    isPartOf: { "@id": IDS.website },
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "Question",
      name: input.question,
      text: input.question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: input.answerText,
        url: pageUrl,
        inLanguage: "en-IN",
      },
    },
  };
}
