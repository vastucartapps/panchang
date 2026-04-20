import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPanchang } from "@/lib/api";
import { getCityBySlug } from "@/lib/cities";
import { getTodayISO, formatDate, formatDateShort } from "@/lib/format";
import { SITE_CONFIG, NAKSHATRA_TO_SIGN } from "@/lib/constants";
import { getCityFaqs } from "@/lib/faqs";
import { HeroSection } from "@/components/hero/hero-section";
import { TimeQualitySection } from "@/components/time-quality/time-quality-section";
import { PanchangGrid } from "@/components/panchang-details/panchang-grid";
import { WidgetSidebar } from "@/components/network-widgets/widget-sidebar";
import { JsonLd } from "@/components/seo/json-ld";
import { buildCityPageGraph } from "@/lib/schema";
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
  if (!city) return {};

  const todayISO = getTodayISO();
  const shortToday = formatDateShort(todayISO);

  let tithi = "";
  let nakshatra = "";
  try {
    const data = await fetchPanchang({
      targetDate: todayISO,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
    tithi = data.day_quality.breakdown.tithi.name;
    nakshatra = data.day_quality.breakdown.nakshatra.name;
  } catch {}

  const titleText = tithi && nakshatra
    ? `Panchang Today ${city.name} — ${tithi}, ${nakshatra}`
    : `Panchang Today ${city.name} — Tithi, Nakshatra & Rahu Kaal`;

  return {
    title: { absolute: titleText },
    description: `Today's Panchang for ${city.name} on ${shortToday}. Tithi, Nakshatra, Rahu Kaal & Choghadiya timings. Accurate Vedic calendar updated daily.`,
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

  const data = await fetchPanchang({
    targetDate,
    latitude: city.lat,
    longitude: city.lng,
    timezone: city.tz,
  });

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
              Panchang &mdash; {city.name}
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
        <JsonLd
          city={city.name}
          breadcrumbs={[
            { name: "Home", url: SITE_CONFIG.url },
            { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
          ]}
          faqs={faqs}
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

        <FaqSection faqs={faqs} cityName={city.name} />
      </div>
    </>
  );
}
