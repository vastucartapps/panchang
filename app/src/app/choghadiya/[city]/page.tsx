import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { fetchPanchangBuildSafe } from "@/lib/api";
import { getCityBySlug, getNearbyCities } from "@/lib/cities";
import { formatDate, getTodayISO, formatTime12h } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";
import { getCityChoghadiyaFaqs } from "@/lib/faqs";
import { NearbyCitiesBlock } from "@/components/seo/nearby-cities";
import { buildProgrammaticCityHubGraph, REFS } from "@/lib/schema";

export const revalidate = 300;

export function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Choghadiya in ${city.name} Today — Shubh Muhurat & Period Guide`,
    description: `Today's Choghadiya periods for ${city.name}, ${city.state}. Eight 90-minute time-quality windows — find Shubh, Labh, Amrit (auspicious) and Rog, Kaal (inauspicious) muhurtas for travel and business.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/choghadiya/${city.slug}`,
    },
    openGraph: {
      title: `Choghadiya in ${city.name} Today`,
      description: `Daily Choghadiya periods for ${city.name}, India.`,
      url: `${SITE_CONFIG.url}/choghadiya/${city.slug}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function ChoghadiyaCityHubPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const targetDate = getTodayISO();
  const data = await fetchPanchangBuildSafe({
    targetDate,
    latitude: city.lat,
    longitude: city.lng,
    timezone: city.tz,
  });
  if (!data) notFound();

  const { choghadiya } = data;
  const dayPeriods = choghadiya.day_periods ?? [];
  const auspicious = dayPeriods.filter((p) =>
    ["Amrit", "Shubh", "Labh"].some((n) => p.name?.includes(n))
  );
  const nearby = getNearbyCities(citySlug, 6);
  const faqs = getCityChoghadiyaFaqs(city.name, city.state);

  const firstAuspicious = auspicious[0];
  const answerText = `Today's Choghadiya in ${city.name}, ${city.state} divides daylight into eight 90-minute periods. ${firstAuspicious ? `The next auspicious window is ${firstAuspicious.name} (${firstAuspicious.nature}) from ${formatTime12h(firstAuspicious.start_time)} to ${formatTime12h(firstAuspicious.end_time)}.` : ""} Amrit, Shubh, and Labh periods are considered auspicious for starting new work, travel, and important decisions. Char is neutral. Rog, Kaal, and Udveg are inauspicious and traditionally avoided for new undertakings. The Choghadiya table is calculated from ${city.name}'s local sunrise and sunset, so periods differ between cities.`;

  const graph = buildProgrammaticCityHubGraph({
    topic: "choghadiya",
    citySlug: city.slug,
    cityName: city.name,
    cityState: city.state,
    humanTopicName: "Choghadiya",
    conceptRef: REFS.conceptChoghadiya,
    question: `What is the Choghadiya in ${city.name} today?`,
    answerText,
  });

  return (
    <>
      {graph && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <JsonLd
        city={city.name}
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Choghadiya Today", url: `${SITE_CONFIG.url}/choghadiya-today` },
          { name: city.name, url: `${SITE_CONFIG.url}/choghadiya/${city.slug}` },
        ]}
        faqs={faqs}
      />

      <section
        className="py-12 sm:py-16"
        style={{
          background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Clock className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Choghadiya in {city.name} Today
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-3 text-base text-white/70 sm:text-lg">
            {formatDate(targetDate)} · {city.state}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <section className="panchang-today-summary rounded-3xl border bg-card p-6 sm:p-8">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Day periods (eight 90-minute Choghadiya windows)
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {dayPeriods.map((p, i) => {
              const isAusp = ["Amrit", "Shubh", "Labh"].some((n) => p.name?.includes(n));
              const isInausp = ["Rog", "Kaal", "Udveg"].some((n) => p.name?.includes(n));
              const borderColor = isAusp ? "#16a34a" : isInausp ? "#dc2626" : "#C4973B";
              return (
                <div
                  key={i}
                  className="rounded-xl border p-3 text-center"
                  style={{ borderColor: `${borderColor}40` }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: borderColor }}>
                    {p.name}
                  </p>
                  <p className="mt-1 font-mono text-xs font-bold text-foreground">
                    {formatTime12h(p.start_time)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{p.nature}</p>
                </div>
              );
            })}
          </div>
        </section>

        <article className="mt-10 space-y-4 text-base leading-relaxed text-foreground">
          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            What is Choghadiya in {city.name}?
          </h2>
          <p>
            Choghadiya is a Vedic time-quality system that divides the day
            into eight 90-minute periods, each classified as auspicious,
            neutral, or inauspicious. It is most widely used across Gujarat,
            Maharashtra, and Rajasthan for picking muhurat (auspicious moment)
            for travel, starting a business, or making important decisions.
            Because the system anchors to {city.name}&apos;s local sunrise,
            the period start times above differ from other cities by minutes.
          </p>
          <p>
            <strong>Auspicious periods</strong> — Amrit (ambrosia), Shubh
            (auspicious), Labh (profit) — are ideal for new initiations.
            <strong className="ml-1">Char (mobile)</strong> is neutral,
            commonly used for travel.{" "}
            <strong>Inauspicious periods</strong> — Rog (disease), Kaal
            (death/time), Udveg (anxiety) — are traditionally avoided for
            anything important.
          </p>
          <p>
            The Choghadiya table also has night periods (Ratri Choghadiya)
            calculated from sunset to next sunrise. For the full Panchang
            including Tithi, Nakshatra, and Rahu Kaal in {city.name} today,{" "}
            <Link href={`/${city.slug}`} className="text-[var(--color-saffron)] hover:underline">
              see {city.name}&apos;s complete Panchang page
            </Link>
            .
          </p>
        </article>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`/${city.slug}/choghadiya-today/${targetDate}`}
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
          >
            Full Choghadiya timeline for today
            <ArrowRight className="ml-1.5 inline h-4 w-4" />
          </Link>
          <Link
            href={`/${city.slug}`}
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            Full Panchang for {city.name}
            <MapPin className="ml-1.5 inline h-4 w-4" />
          </Link>
        </div>

        <NearbyCitiesBlock
          cities={nearby}
          linkPrefix="choghadiya"
          heading={`Choghadiya for cities near ${city.name}`}
          subheading="Compare sunrise-anchored Choghadiya periods across neighbors"
        />

        <FaqSection faqs={faqs} cityName={city.name} />
      </div>
    </>
  );
}
