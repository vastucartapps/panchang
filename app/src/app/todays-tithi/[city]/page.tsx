import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Moon, MapPin, ArrowRight } from "lucide-react";
import { fetchPanchangBuildSafe } from "@/lib/api";
import { getCityBySlug, getNearbyCities } from "@/lib/cities";
import { formatDate, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";
import { getCityTithiFaqs } from "@/lib/faqs";
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
    title: `Tithi in ${city.name} Today — Aaj Ki Tithi with Paksha & Deity`,
    description: `Today's Tithi for ${city.name}, ${city.state} — the lunar day with Paksha, deity, nature, and category. Sunrise-anchored calculation per the Vedic Drik Ganita system.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/todays-tithi/${city.slug}`,
    },
    openGraph: {
      title: `Tithi in ${city.name} Today`,
      description: `Today's lunar day (Tithi) with Paksha & deity for ${city.name}, India.`,
      url: `${SITE_CONFIG.url}/todays-tithi/${city.slug}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function TodaysTithiCityHubPage({ params }: PageProps) {
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

  const { tithi } = data.panchang;
  const nearby = getNearbyCities(citySlug, 6);
  const faqs = getCityTithiFaqs(city.name, city.state);

  const answerText = `Today's Tithi in ${city.name}, ${city.state} is ${tithi.tithi} of ${tithi.paksha} Paksha. Deity: ${tithi.deity}. Nature: ${tithi.nature}. Category: ${tithi.category}. The Tithi is ${tithi.percent_elapsed.toFixed(1)}% elapsed. A Tithi is one of the five limbs (panch-anga) of the Vedic Panchang, defined as the time during which the angular distance between the Moon and Sun increases by 12°. There are 30 Tithis in a lunar month, split evenly between Shukla Paksha (waxing) and Krishna Paksha (waning). Because Tithi transitions happen at specific moments, the Tithi prevailing at ${city.name}'s sunrise governs the full civil day for festivals and vrat observances.`;

  const graph = buildProgrammaticCityHubGraph({
    topic: "todays-tithi",
    citySlug: city.slug,
    cityName: city.name,
    cityState: city.state,
    humanTopicName: "Today's Tithi",
    conceptRef: REFS.conceptTithiSet,
    question: `What is the Tithi in ${city.name} today?`,
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
          { name: "Aaj Ki Tithi", url: `${SITE_CONFIG.url}/todays-tithi` },
          { name: city.name, url: `${SITE_CONFIG.url}/todays-tithi/${city.slug}` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{
          background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Moon className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Tithi in {city.name} Today
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
            Today&apos;s Tithi
          </p>
          <p className="mt-3 text-center text-3xl font-bold uppercase tracking-wide text-[var(--color-vedic)] sm:text-4xl">
            {tithi.tithi}
          </p>
          <p className="mt-1 text-center text-base text-[#C4973B]">{tithi.paksha} Paksha</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Deity</p>
              <p className="mt-1 text-sm font-bold text-foreground">{tithi.deity}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nature</p>
              <p className="mt-1 text-sm font-bold text-foreground">{tithi.nature}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Category</p>
              <p className="mt-1 text-sm font-bold text-foreground">{tithi.category}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Elapsed</p>
              <p className="mt-1 text-sm font-bold text-foreground">{tithi.percent_elapsed.toFixed(1)}%</p>
            </div>
          </div>
        </section>

        <article className="mt-10 space-y-4 text-base leading-relaxed text-foreground">
          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            What is a Tithi, and why is it specific to {city.name}?
          </h2>
          <p>
            A <strong>Tithi</strong> is the lunar day in the Hindu calendar —
            one of the five limbs (panch-anga) that give the Panchang its
            name. There are 30 Tithis per lunar month, calculated from the
            angular separation between the Sun and the Moon (every 12° of
            separation equals one Tithi).
          </p>
          <p>
            A Tithi can start or end at any moment of the day. For religious
            observances, the Tithi prevailing at <strong>sunrise</strong>{" "}
            governs the entire civil day. Since sunrise in {city.name} happens
            at a specific local time — different from other Indian cities by
            several minutes — the Tithi that governs today in {city.name} can
            differ from what governs today in, say, Mumbai or Kolkata near
            Tithi transitions.
          </p>
          <p>
            The 30 Tithis are split into <strong>Shukla Paksha</strong>{" "}
            (waxing moon, 15 days ending at Purnima) and <strong>Krishna
            Paksha</strong> (waning moon, 15 days ending at Amavasya). Each
            Tithi has an associated deity, category (Nanda/Bhadra/Jaya/Rikta/
            Purna), and nature that guides rituals and muhurta selection.
          </p>
          <p>
            For the full Panchang including Nakshatra, Yoga, Karana, Rahu Kaal,
            and Choghadiya for {city.name} today,{" "}
            <Link href={`/${city.slug}`} className="text-[var(--color-saffron)] hover:underline">
              see {city.name}&apos;s complete Panchang page
            </Link>
            .
          </p>
        </article>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`/${city.slug}/todays-tithi/${targetDate}`}
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
          >
            Detailed Tithi for today
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
          linkPrefix="todays-tithi"
          heading={`Tithi for cities near ${city.name}`}
          subheading="Compare sunrise-anchored Tithi across neighboring cities"
        />

        <FaqSection faqs={faqs} cityName={city.name} />
      </div>
    </>
  );
}
