import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { fetchPanchangBuildSafe } from "@/lib/api";
import { getCityBySlug, getNearbyCities } from "@/lib/cities";
import { formatDate, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";
import { getCityNakshatraFaqs } from "@/lib/faqs";
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
  if (!city) notFound();
  return {
    title: `Nakshatra in ${city.name} Today — Aaj Ka Nakshatra with Pada & Lord`,
    description: `Today's Nakshatra for ${city.name}, ${city.state} — lunar mansion with Pada, deity, lord, and Gana. Sunrise-anchored per the Vedic Drik Ganita system.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/todays-nakshatra/${city.slug}`,
    },
    openGraph: {
      title: `Nakshatra in ${city.name} Today`,
      description: `Today's lunar mansion (Nakshatra) with Pada & deity for ${city.name}, India.`,
      url: `${SITE_CONFIG.url}/todays-nakshatra/${city.slug}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function TodaysNakshatraCityHubPage({ params }: PageProps) {
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

  const { nakshatra } = data.panchang;
  const nearby = getNearbyCities(citySlug, 6);
  const faqs = getCityNakshatraFaqs(city.name, city.state);

  const answerText = `Today's Nakshatra in ${city.name}, ${city.state} is ${nakshatra.nakshatra} (Pada ${nakshatra.pada}). Lord: ${nakshatra.lord}. Deity: ${nakshatra.deity}. Gana: ${nakshatra.gana}. Nature: ${nakshatra.nature}. Activity type: ${nakshatra.activity_type}. A Nakshatra is one of 27 lunar mansions, each a 13°20' segment of the ecliptic through which the Moon moves. The Moon takes about 27.3 days to transit all Nakshatras. In Vedic astrology, the Nakshatra prevailing at ${city.name}'s sunrise governs activity selection for the day — certain Nakshatras favor travel, others marriage, others learning. Each Nakshatra has four padas (quarters) of 3°20' each.`;

  const graph = buildProgrammaticCityHubGraph({
    topic: "todays-nakshatra",
    citySlug: city.slug,
    cityName: city.name,
    cityState: city.state,
    humanTopicName: "Today's Nakshatra",
    conceptRef: REFS.conceptNakshatraSet,
    question: `What is the Nakshatra in ${city.name} today?`,
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
          { name: "Aaj Ka Nakshatra", url: `${SITE_CONFIG.url}/todays-nakshatra` },
          { name: city.name, url: `${SITE_CONFIG.url}/todays-nakshatra/${city.slug}` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{
          background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Star className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Nakshatra in {city.name} Today
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
            Today&apos;s Nakshatra
          </p>
          <p className="mt-3 text-center text-3xl font-bold uppercase tracking-wide text-[var(--color-vedic)] sm:text-4xl">
            {nakshatra.nakshatra}
          </p>
          <p className="mt-1 text-center text-base text-[#C4973B]">Pada {nakshatra.pada}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Lord</p>
              <p className="mt-1 text-sm font-bold text-foreground">{nakshatra.lord}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Deity</p>
              <p className="mt-1 text-sm font-bold text-foreground">{nakshatra.deity}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Gana</p>
              <p className="mt-1 text-sm font-bold text-foreground">{nakshatra.gana}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nature</p>
              <p className="mt-1 text-sm font-bold text-foreground">{nakshatra.nature}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Activity</p>
              <p className="mt-1 text-sm font-bold text-foreground">{nakshatra.activity_type}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Elapsed</p>
              <p className="mt-1 text-sm font-bold text-foreground">{nakshatra.percent_elapsed.toFixed(1)}%</p>
            </div>
          </div>
        </section>

        <article className="mt-10 space-y-4 text-base leading-relaxed text-foreground">
          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            What is a Nakshatra, and why is it specific to {city.name}?
          </h2>
          <p>
            A <strong>Nakshatra</strong> is a lunar mansion — one of 27 equal
            segments of the ecliptic (each 13°20&apos; wide) through which
            the Moon travels. The Moon completes a full cycle of all 27
            Nakshatras roughly every 27.3 days. In Vedic astrology, the
            Nakshatra occupied by the Moon at any given moment deeply shapes
            the quality of that time — which activities succeed, which
            struggle.
          </p>
          <p>
            Each Nakshatra has four <strong>padas</strong> (quarters) of 3°20&apos;
            each, a ruling <strong>planet</strong>, a presiding{" "}
            <strong>deity</strong>, a <strong>Gana</strong> classification
            (Deva / Manushya / Rakshasa — divine / human / demonic nature),
            and an assigned <strong>activity type</strong> (Chara / Sthira /
            Ugra / Mrudu / etc.) that indicates what kinds of work flourish
            under it.
          </p>
          <p>
            Because the Moon&apos;s position and sunrise time both differ by
            location, the Nakshatra governing today in {city.name} is
            calculated specifically for {city.name}&apos;s sunrise. Near
            Nakshatra transitions, cities separated by minutes of longitude
            can have different governing Nakshatras on the same civil date.
          </p>
          <p>
            For the full Panchang including Tithi, Yoga, Karana, Rahu Kaal
            and Choghadiya for {city.name} today,{" "}
            <Link href={`/${city.slug}`} className="text-[var(--color-saffron)] hover:underline">
              see {city.name}&apos;s complete Panchang page
            </Link>
            .
          </p>
        </article>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`/${city.slug}/todays-nakshatra/${targetDate}`}
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
          >
            Detailed Nakshatra for today
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
          linkPrefix="todays-nakshatra"
          heading={`Nakshatra for cities near ${city.name}`}
          subheading="Compare sunrise-anchored Nakshatra across neighboring cities"
        />

        <FaqSection faqs={faqs} cityName={city.name} />
      </div>
    </>
  );
}
