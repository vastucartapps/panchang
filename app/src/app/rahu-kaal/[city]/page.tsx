import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ShieldAlert, MapPin, ArrowRight } from "lucide-react";
import { fetchPanchangBuildSafe } from "@/lib/api";
import { getCityBySlug, getNearbyCities } from "@/lib/cities";
import { formatDate, formatDateShort, formatTime12h, formatDuration, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";
import { getCityRahuKaalFaqs } from "@/lib/faqs";
import { NearbyCitiesBlock } from "@/components/seo/nearby-cities";
import { buildProgrammaticCityHubGraph, REFS } from "@/lib/schema";

export const revalidate = 300;

export function generateStaticParams() {
  return []; // ISR-lazy; warmer pre-populates after deploy
}

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  return {
    title: `Rahu Kaal in ${city.name} Today — Timing & How to Observe`,
    description: `Today's Rahu Kaal timing for ${city.name}, ${city.state}. The inauspicious 90-minute window each day — avoid travel, new work, and ceremonies during this period. Updated daily.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/rahu-kaal/${city.slug}`,
    },
    openGraph: {
      title: `Rahu Kaal in ${city.name} Today`,
      description: `Daily Rahu Kaal timing for ${city.name}, India.`,
      url: `${SITE_CONFIG.url}/rahu-kaal/${city.slug}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function RahuKaalCityHubPage({ params }: PageProps) {
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

  const { timing } = data;
  const rahu = timing.rahu_kalam;
  const nearby = getNearbyCities(citySlug, 6);
  const faqs = getCityRahuKaalFaqs(city.name, city.state);

  const answerText = `Today's Rahu Kaal in ${city.name}, ${city.state} is from ${formatTime12h(rahu.start_time)} to ${formatTime12h(rahu.end_time)} (duration ${formatDuration(rahu.duration_minutes)}). Rahu Kaal is the inauspicious 90-minute window of each day associated with the shadow planet Rahu — traditionally avoided for starting new ventures, travel, ceremonies, and important decisions. The window shifts daily based on ${city.name}'s sunrise and sunset times. Yamaganda runs ${formatTime12h(timing.yamagandam.start_time)}–${formatTime12h(timing.yamagandam.end_time)}, and Gulika Kaal ${formatTime12h(timing.gulika_kalam.start_time)}–${formatTime12h(timing.gulika_kalam.end_time)}.`;

  const graph = buildProgrammaticCityHubGraph({
    topic: "rahu-kaal",
    citySlug: city.slug,
    cityName: city.name,
    cityState: city.state,
    humanTopicName: "Rahu Kaal",
    conceptRef: REFS.conceptRahuKaal,
    question: `What is the Rahu Kaal in ${city.name} today?`,
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
          { name: "Rahu Kaal Today", url: `${SITE_CONFIG.url}/rahu-kaal-today` },
          { name: city.name, url: `${SITE_CONFIG.url}/rahu-kaal/${city.slug}` },
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
          <ShieldAlert className="mx-auto h-10 w-10 text-[#ef4444]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Rahu Kaal in {city.name} Today
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
            Inauspicious window — avoid new work
          </p>
          <p className="mt-3 text-center font-mono text-4xl font-bold tracking-tight text-[#ef4444] sm:text-5xl">
            {formatTime12h(rahu.start_time)} – {formatTime12h(rahu.end_time)}
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Duration {formatDuration(rahu.duration_minutes)}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Yamaganda</p>
              <p className="mt-1 font-mono text-base font-bold text-foreground">
                {formatTime12h(timing.yamagandam.start_time)} – {formatTime12h(timing.yamagandam.end_time)}
              </p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Gulika Kaal</p>
              <p className="mt-1 font-mono text-base font-bold text-foreground">
                {formatTime12h(timing.gulika_kalam.start_time)} – {formatTime12h(timing.gulika_kalam.end_time)}
              </p>
            </div>
          </div>
        </section>

        <article className="mt-10 space-y-4 text-base leading-relaxed text-foreground">
          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            What is Rahu Kaal in {city.name}?
          </h2>
          <p>
            Rahu Kaal is a 90-minute inauspicious window that occurs every day,
            ruled by the shadow planet Rahu in Vedic astrology. Because the
            window is calculated as a fraction of the period between sunrise
            and sunset (1/8th of the day), and because sunrise in {city.name}{" "}
            differs from other cities by several minutes, the Rahu Kaal timing
            above is specific to {city.name}&apos;s local astronomical conditions
            today — not a generic national value.
          </p>
          <p>
            During Rahu Kaal, traditional Vedic practice advises avoiding:
            starting new business ventures, embarking on journeys, conducting
            auspicious ceremonies (weddings, griha pravesh, naming rituals),
            and making major financial or life decisions. Existing work already
            in progress can continue — Rahu Kaal primarily affects initiations.
          </p>
          <p>
            Two related inauspicious windows also appear on this page:{" "}
            <strong>Yamaganda</strong>, ruled by Yama (the deity of time and
            death), and <strong>Gulika Kaal</strong>, ruled by Gulika (the son
            of Shani). Together with Rahu Kaal, these three periods are known
            as the three inauspicious muhurtas of the day.
          </p>
          <p>
            For the complete Panchang (Tithi, Nakshatra, Yoga, Karana, sunrise,
            sunset, Choghadiya) for {city.name} today, see{" "}
            <Link
              href={`/${city.slug}`}
              className="text-[var(--color-saffron)] hover:underline"
            >
              {city.name}&apos;s full Panchang page
            </Link>
            .
          </p>
        </article>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`/${city.slug}/rahu-kaal-today/${targetDate}`}
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
          >
            Detailed Rahu Kaal for today
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
          linkPrefix="rahu-kaal"
          heading={`Rahu Kaal for cities near ${city.name}`}
          subheading="Same topic, neighboring cities — compare sunrise-anchored Rahu Kaal timings"
        />

        <FaqSection faqs={faqs} cityName={city.name} />
      </div>
    </>
  );
}
