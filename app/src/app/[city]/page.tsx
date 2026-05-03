import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPanchang } from "@/lib/api";
import { getCityBySlug } from "@/lib/cities";
import { getTodayISO, formatDate, formatDateShort, formatTime12h } from "@/lib/format";
import { SITE_CONFIG, NAKSHATRA_TO_SIGN } from "@/lib/constants";
import { getCityFaqs } from "@/lib/faqs";
import { HeroSection } from "@/components/hero/hero-section";
import { TimeQualitySection } from "@/components/time-quality/time-quality-section";
import { PanchangGrid } from "@/components/panchang-details/panchang-grid";
import { WidgetSidebar } from "@/components/network-widgets/widget-sidebar";
import { JsonLd } from "@/components/seo/json-ld";
import { NearbyCitiesBlock } from "@/components/seo/nearby-cities";
import { TopicHubLinks } from "@/components/seo/topic-hub-links";
import { buildCityPageGraph } from "@/lib/schema";
import { getNearbyCities } from "@/lib/cities";
import { HeroActions } from "@/components/hero/hero-actions";
import { DateNavigator } from "@/components/hero/date-navigator";
import { FaqSection } from "@/components/seo/faq-section";
import { ShareButton } from "@/components/hero/share-button";
import { DailySummary } from "@/components/panchang-details/daily-summary";
import { MuhurtaYogasSection } from "@/components/panchang-details/muhurta-yogas";
import { FestivalVratSection } from "@/components/panchang-details/festival-vrat-section";

export const revalidate = 300;

// Returning [] unlocks ISR classification for this dynamic route without
// prebuilding any URL at build time. Without this, Next.js 16 treats the
// route as fully dynamic (ƒ) and emits `Cache-Control: private, no-store`.
// With this, every URL is lazy-ISR (generated on first request, cached per
// revalidate). Warmer cron pre-populates hot URLs post-deploy.
export function generateStaticParams() {
  return [];
}

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  // notFound() in generateMetadata aborts the metadata phase entirely so
  // Next.js never caches metadata for an invalid slug — preventing the
  // stale-200-prerender pathology where /madeupcity gets prerendered with
  // the parent layout's `index, follow` robots meta and is then served from
  // CDN cache for weeks. Pair with the noindex in [city]/not-found.tsx.
  if (!city) notFound();

  const todayISO = getTodayISO();
  const shortToday = formatDateShort(todayISO);

  let tithi = "";
  let nakshatra = "";
  let sunrise = "";
  try {
    const data = await fetchPanchang({
      targetDate: todayISO,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
    tithi = data.day_quality.breakdown.tithi.name;
    nakshatra = data.day_quality.breakdown.nakshatra.name;
    sunrise = formatTime12h(data.timing.sunrise);
  } catch {}

  // Sunrise is the genuinely-per-city differentiator (~30 min spread across
  // India). Tithi/Nakshatra are global so 216 cities otherwise ship identical
  // suffixes — Google's near-duplicate detector then collapses them. Keeping
  // sunrise in title makes every city's title meaningfully unique.
  const titleText = tithi && sunrise
    ? `Panchang Today ${city.name} — Sunrise ${sunrise}, ${tithi}`
    : `Panchang Today ${city.name} — Tithi, Nakshatra & Rahu Kaal`;

  const description = sunrise && tithi
    ? `${city.name} Panchang for ${shortToday}: Sunrise ${sunrise}, ${tithi}${nakshatra ? `, ${nakshatra}` : ""}. Rahu Kaal & Choghadiya timings calculated from local sunrise.`
    : `Today's Panchang for ${city.name} on ${shortToday}. Tithi, Nakshatra, Rahu Kaal & Choghadiya timings. Accurate Vedic calendar updated daily.`;

  return {
    title: { absolute: titleText },
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}`,
    },
    openGraph: {
      title: titleText,
      description: `Accurate daily Panchang for ${city.name}. Tithi, Nakshatra, Rahu Kaal, Choghadiya timings.`,
      url: `${SITE_CONFIG.url}/${city.slug}`,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og/${city.slug}/${todayISO}`,
          width: 1200,
          height: 630,
          alt: `Panchang for ${city.name} today`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: `Tithi, Nakshatra, Rahu Kaal for ${city.name} today.`,
      images: [`${SITE_CONFIG.url}/api/og/${city.slug}/${todayISO}`],
    },
  };
}

export default async function CityPanchangPage({
  params,
}: CityPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const targetDate = getTodayISO();
  const faqs = getCityFaqs(city.name, city.state);
  const nearbyCities = getNearbyCities(city.slug, 8);

  const data = await fetchPanchang({
    targetDate,
    latitude: city.lat,
    longitude: city.lng,
    timezone: city.tz,
  }).catch(() => notFound());

  const nakshatraKey = data.panchang.nakshatra.nakshatra.toLowerCase().replace(/\s+/g, "_");
  const nakshatraSign = NAKSHATRA_TO_SIGN[nakshatraKey];
  const nakshatraDisplayName = data.day_quality.breakdown.nakshatra.name;

  // Dataset + Service + WebPage @graph. dateModified uses IST so past-date
  // crawl comparisons match the civil-calendar freshness model. Gate handled
  // inside builder — returns null if lat/lng missing (data-quality issue).
  const cityGraph = buildCityPageGraph({
    slug: city.slug,
    name: city.name,
    state: city.state,
    lat: city.lat,
    lng: city.lng,
    dateModified: `${targetDate}T00:00:00+05:30`,
  });

  return (
    <>
      {/* Hero Banner */}
      <section
        className="py-14 sm:py-20"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="flex flex-col items-center text-center">
            <h1 className="animate-fade-in-up heading-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Panchang Today &mdash; {city.name}
            </h1>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
            <p className="animate-fade-in-up-delay mt-4 text-lg tracking-wide text-white/60">
              {formatDate(data.date)} &middot; {city.state}
            </p>
            {data.panchang.tithi.hindu_month && (
              <p className="mt-1 text-sm tracking-wide text-[#C4973B]/70">
                {data.panchang.tithi.hindu_month.month} {data.panchang.tithi.paksha} {data.day_quality.breakdown.tithi.name}
              </p>
            )}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <HeroActions citySlug={city.slug} cityName={city.name} variant="dark" />
              <ShareButton cityName={city.name} citySlug={city.slug} date={targetDate} />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <DateNavigator currentDate={data.date} citySlug={city.slug} variant="dark" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[92%] overflow-hidden px-4 py-6 sm:px-6">
        {cityGraph && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(cityGraph).replace(/</g, "\\u003c"),
            }}
          />
        )}
        {/* FAQPage schema intentionally NOT emitted here. The same 8 FAQs
            string-substituted across 216 cities triggers Google's spam-FAQ
            classifier. The visual FaqSection still renders for users; the
            page-level WebPage + cityGraph schemas carry the entity weight. */}
        <JsonLd
          city={city.name}
          breadcrumbs={[
            { name: "Home", url: SITE_CONFIG.url },
            { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
          ]}
        />
        <HeroSection data={data} locale="en" />

        <div className="mt-6">
          <DailySummary data={data} cityName={city.name} date={targetDate} />
        </div>

        {/* Festival & Vrat — shown above the grid when present */}
        {((data.festivals && data.festivals.length > 0) || (data.vrat && data.vrat.length > 0)) && (
          <div className="mt-6">
            <FestivalVratSection
              festivals={data.festivals}
              vrat={data.vrat}
              hinduMonth={data.panchang.tithi.hindu_month}
              locale="en"
              cityName={city.name}
              date={targetDate}
            />
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-8">
            <TimeQualitySection hora={data.hora} choghadiya={data.choghadiya} cityName={city.name} date={targetDate} />
            <PanchangGrid data={data} locale="en" cityName={city.name} date={targetDate} />
            {nakshatraSign && (
              <a
                href={`https://horoscope.vastucart.in/${nakshatraSign}/daily/${targetDate}`}
                className="text-[13px] text-muted-foreground hover:underline"
              >
                {`See how ${nakshatraDisplayName} affects your sign today →`}
              </a>
            )}
            {data.muhurta_yogas && (
              <MuhurtaYogasSection muhurtaYogas={data.muhurta_yogas} locale="en" cityName={city.name} date={targetDate} />
            )}
          </div>
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <WidgetSidebar />
          </aside>
        </div>

        <TopicHubLinks citySlug={city.slug} cityName={city.name} date={targetDate} />

        <NearbyCitiesBlock
          cities={nearbyCities}
          heading={`Panchang for cities near ${city.name}`}
          subheading="Sunrise-specific timings for your geographic cluster"
        />

        <FaqSection faqs={faqs} cityName={city.name} />
      </div>
    </>
  );
}
