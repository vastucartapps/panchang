import { IDS, REFS, SITE_ORIGIN } from "./ids";

export type ProgrammaticTopic =
  | "rahu-kaal"
  | "choghadiya"
  | "todays-tithi"
  | "todays-nakshatra";

export interface ProgrammaticCityHubInput {
  topic: ProgrammaticTopic;
  citySlug: string;
  cityName: string;
  cityState: string;
  humanTopicName: string; // "Rahu Kaal", "Choghadiya", "Today's Tithi", "Today's Nakshatra"
  conceptRef: string; // REFS.conceptRahuKaal etc.
  question: string;
  answerText: string;
}

/**
 * @graph for /{topic}/{city} programmatic hub pages.
 *
 * Distinct from /{city}/{topic}-today/[date] (date-specific, drilldown).
 * This hub is TOPIC-FIRST: URL matches "rahu kaal in delhi" query pattern.
 * Always represents today's value. mainEntity references the city's
 * existing Dataset @id — so these hubs inherit into the existing entity
 * graph without re-declaring the dataset.
 *
 * Reference Files/05 §C.4 programmatic hubs.
 */
export function buildProgrammaticCityHubGraph(
  input: ProgrammaticCityHubInput
): object | null {
  if (!input.citySlug || !input.cityName) return null;

  const pageUrl = `${SITE_ORIGIN}/${input.topic}/${input.citySlug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: `${input.humanTopicName} in ${input.cityName} Today`,
        description: `${input.humanTopicName} timings for ${input.cityName}, ${input.cityState} — updated daily from the city's Vedic Panchang.`,
        isPartOf: { "@id": IDS.website },
        about: { "@id": input.conceptRef },
        mainEntity: { "@id": `${SITE_ORIGIN}/${input.citySlug}#dataset` },
        inLanguage: "en-IN",
        publisher: { "@id": REFS.organization },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${SITE_ORIGIN}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: input.humanTopicName,
              item: `${SITE_ORIGIN}/${input.topic === "rahu-kaal" ? "rahu-kaal-today" : input.topic === "choghadiya" ? "choghadiya-today" : input.topic}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: input.cityName,
            },
          ],
        },
      },
      {
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
      },
    ],
  };
}
