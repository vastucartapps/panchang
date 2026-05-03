import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { fetchPanchang, fetchPanchangBuildSafe } from "@/lib/api";
import { getCityBySlug, getTopCitySlugs } from "@/lib/cities";
import { formatDate, formatDateShort, formatTime12h, getTodayISO } from "@/lib/format";
import { SITE_CONFIG, NAKSHATRA_TO_SIGN } from "@/lib/constants";
import { getCityFaqs } from "@/lib/faqs";
import { HeroSection } from "@/components/hero/hero-section";
import { TimeQualitySection } from "@/components/time-quality/time-quality-section";
import { PanchangGrid } from "@/components/panchang-details/panchang-grid";
import { WidgetSidebar } from "@/components/network-widgets/widget-sidebar";
import { JsonLd } from "@/components/seo/json-ld";
import { NearbyCitiesBlock } from "@/components/seo/nearby-cities";
import { TopicHubLinks } from "@/components/seo/topic-hub-links";
import { getNearbyCities } from "@/lib/cities";
import { HeroActions } from "@/components/hero/hero-actions";
import { DateNavigator } from "@/components/hero/date-navigator";
import { FaqSection } from "@/components/seo/faq-section";
import { ShareButton } from "@/components/hero/share-button";
import { DailySummary } from "@/components/panchang-details/daily-summary";
import { MuhurtaYogasSection } from "@/components/panchang-details/muhurta-yogas";
import { FestivalVratSection } from "@/components/panchang-details/festival-vrat-section";

export const revalidate = 3600;

export function generateStaticParams() {
  // Zero build-time prerender — all URLs are ISR-lazy. Warmer cron pre-populates
  // hot URLs after deploy. Prevents upstream-API concurrency failures from
  // crashing the build (see commit fc884cb context).
  return [];
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

interface CityDatePageProps {
  params: Promise<{ city: string; date: string }>;
}

function isValidDate(dateStr: string): boolean {
  if (!DATE_REGEX.test(dateStr)) return false;
  const d = new Date(dateStr + "T00:00:00");
  return !isNaN(d.getTime());
}

export async function generateMetadata({
  params,
}: CityDatePageProps): Promise<Metadata> {
  const { city: citySlug, date } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || !isValidDate(date)) notFound();

  const formattedDate = formatDate(date);
  const shortDate = formatDateShort(date);

  // Fetch panchang data for data-rich title (Next.js deduplicates with page fetch)
  let tithi = "";
  let nakshatra = "";
  let sunrise = "";
  try {
    const data = await fetchPanchang({
      targetDate: date,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
    tithi = data.day_quality.breakdown.tithi.name;
    nakshatra = data.day_quality.breakdown.nakshatra.name;
    sunrise = formatTime12h(data.timing.sunrise);
  } catch {
    // Fallback handled below
  }

  // Sunrise time is per-city unique (Tithi/Nakshatra are global). Including
  // sunrise here keeps 216 cities × this date from collapsing as near-dupes.
  const titleText = tithi && sunrise
    ? `${city.name} Panchang ${shortDate} — Sunrise ${sunrise}, ${tithi}`
    : tithi
      ? `${city.name} Panchang ${shortDate} — ${tithi}`
      : `${city.name} Panchang ${shortDate}`;

  const description = sunrise && tithi
    ? `${city.name} Panchang for ${formattedDate}: Sunrise ${sunrise}, ${tithi}${nakshatra ? `, ${nakshatra}` : ""}. Yoga, Karana, Rahu Kaal & Choghadiya timings calculated from ${city.name}'s local sunrise.`
    : `Panchang for ${city.name}, ${city.state} on ${formattedDate}. Accurate Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Choghadiya timings for ${city.name}.`;

  return {
    title: { absolute: titleText },
    description,
    alternates: {
      canonical: date === getTodayISO()
        ? `${SITE_CONFIG.url}/${city.slug}`
        : `${SITE_CONFIG.url}/${city.slug}/${date}`,
    },
    openGraph: {
      title: `${city.name} Panchang ${shortDate} — ${tithi || "Tithi"}, ${nakshatra || "Nakshatra"}`,
      description: `Accurate Panchang for ${city.name} on ${formattedDate}. Tithi, Nakshatra, Rahu Kaal, Choghadiya timings.`,
      url: `${SITE_CONFIG.url}/${city.slug}/${date}`,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og/${city.slug}/${date}`,
          width: 1200,
          height: 630,
          alt: `Panchang for ${city.name} on ${formattedDate}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.name} Panchang ${shortDate} — ${tithi || "Tithi"}, ${nakshatra || "Nakshatra"}`,
      description: `Tithi, Nakshatra, Rahu Kaal for ${city.name} on ${formattedDate}.`,
      images: [`${SITE_CONFIG.url}/api/og/${city.slug}/${date}`],
    },
  };
}

export default async function CityDatePanchangPage({
  params,
}: CityDatePageProps) {
  const { city: citySlug, date } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  if (!isValidDate(date)) notFound();
  if (date === getTodayISO()) redirect(`/${city.slug}`);

  const faqs = getCityFaqs(city.name, city.state);
  const nearbyCities = getNearbyCities(citySlug, 8);

  const data = await fetchPanchangBuildSafe({
    targetDate: date,
    latitude: city.lat,
    longitude: city.lng,
    timezone: city.tz,
  });
  if (!data) notFound();

  const nakshatraKey = data.panchang.nakshatra.nakshatra.toLowerCase().replace(/\s+/g, "_");
  const nakshatraSign = NAKSHATRA_TO_SIGN[nakshatraKey];
  const nakshatraDisplayName = data.day_quality.breakdown.nakshatra.name;

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
              {city.name} Panchang &mdash; {formatDateShort(date)}
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
              <ShareButton cityName={city.name} citySlug={city.slug} date={date} />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <DateNavigator currentDate={data.date} citySlug={city.slug} variant="dark" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[92%] overflow-hidden px-4 py-6 sm:px-6">
        {/* No FAQPage schema on the date template — same 8 substituted FAQs
            across 216 cities × 270 dates ≈ 58K identical FAQ blocks. Article
            schema below + visible FaqSection cover the user/Google needs. */}
        <JsonLd
          city={city.name}
          breadcrumbs={[
            { name: "Home", url: SITE_CONFIG.url },
            { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
            { name: formatDate(date), url: `${SITE_CONFIG.url}/${city.slug}/${date}` },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: `${city.name} Panchang for ${formatDate(date)}`,
              datePublished: `${date}T00:00:00+05:30`,
              dateModified: `${date}T01:00:00+05:30`,
              author: {
                "@type": "Organization",
                name: SITE_CONFIG.brandName,
                url: SITE_CONFIG.brandUrl,
              },
              publisher: {
                "@type": "Organization",
                name: SITE_CONFIG.brandName,
                url: SITE_CONFIG.brandUrl,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE_CONFIG.url}/${city.slug}/${date}`,
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
        <HeroSection data={data} locale="en" />

        <div className="mt-6">
          <DailySummary data={data} cityName={city.name} date={date} />
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
              date={date}
            />
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-8">
            <TimeQualitySection hora={data.hora} choghadiya={data.choghadiya} cityName={city.name} date={date} />
            <PanchangGrid data={data} locale="en" cityName={city.name} date={date} />
            {nakshatraSign && (
              <a
                href={`https://horoscope.vastucart.in/${nakshatraSign}/daily/${date}`}
                className="text-[13px] text-muted-foreground hover:underline"
              >
                {`See how ${nakshatraDisplayName} affects your sign today →`}
              </a>
            )}
            {data.muhurta_yogas && (
              <MuhurtaYogasSection muhurtaYogas={data.muhurta_yogas} locale="en" cityName={city.name} date={date} />
            )}
          </div>
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <WidgetSidebar />
          </aside>
        </div>

        <TopicHubLinks citySlug={city.slug} cityName={city.name} date={date} />

        <NearbyCitiesBlock
          cities={nearbyCities}
          currentDate={date}
          heading={`Panchang for cities near ${city.name} on ${formatDateShort(date)}`}
          subheading="Same date, neighboring cities — compare Tithi and sunrise timings"
        />

        <FaqSection faqs={faqs} cityName={city.name} />
      </div>
    </>
  );
}
