import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { fetchPanchang, fetchPanchangBuildSafe } from "@/lib/api";
import { getCityBySlug, getNearbyCities, getTopCitySlugs } from "@/lib/cities";
import { buildCityTopicQAPageSchema } from "@/lib/schema";
import { formatDate, formatDateShort, formatTime12h, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { getCityChoghadiyaFaqs } from "@/lib/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const revalidate = 3600;

export function generateStaticParams() {
  return []; // ISR-lazy; warmer pre-populates after deploy
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

interface PageProps {
  params: Promise<{ city: string; date: string }>;
}

function isValidDate(dateStr: string): boolean {
  if (!DATE_REGEX.test(dateStr)) return false;
  const d = new Date(dateStr + "T00:00:00");
  return !isNaN(d.getTime());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, date } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || !isValidDate(date)) return {};

  const formattedDate = formatDate(date);
  const shortDate = formatDateShort(date);
  const titleText = `Choghadiya ${city.name} ${shortDate} — Shubh & Ashubh Timings`;

  return {
    title: { absolute: titleText },
    description: `Choghadiya timings for ${city.name}, ${city.state} on ${formattedDate}. Find Amrit, Shubh, Labh, Chal, Rog, Kaal, and Udveg periods.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/choghadiya-today/${date}`,
    },
    openGraph: {
      title: titleText,
      description: `Day and night Choghadiya timings for ${city.name} on ${formattedDate}.`,
      url: `${SITE_CONFIG.url}/${city.slug}/choghadiya-today/${date}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

const NATURE_COLORS: Record<string, { bg: string; text: string }> = {
  auspicious: { bg: "bg-green-100", text: "text-green-800" },
  neutral: { bg: "bg-amber-100", text: "text-amber-800" },
  inauspicious: { bg: "bg-red-100", text: "text-red-800" },
};

export default async function CityChoghadiyaDatePage({ params }: PageProps) {
  const { city: citySlug, date } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  if (!isValidDate(date)) notFound();

  const data = await fetchPanchangBuildSafe({
    targetDate: date,
    latitude: city.lat,
    longitude: city.lng,
    timezone: city.tz,
  });
  if (!data) notFound();

  const { choghadiya } = data;
  const cityFaqs = getCityChoghadiyaFaqs(city.name, city.state);
  const otherCities = getNearbyCities(citySlug, 8);
  const firstDayPeriod = choghadiya.day_periods?.[0];
  const qaSchema = buildCityTopicQAPageSchema({
    cityName: city.name,
    citySlug,
    date,
    topic: "choghadiya-today",
    question: `What is the Choghadiya in ${city.name} on ${formatDateShort(date)}?`,
    answerText: firstDayPeriod
      ? `Choghadiya in ${city.name} on ${formatDate(date)} divides the day into eight 90-minute periods classified as Amrit, Shubh, Labh (auspicious), Char (neutral), or Rog, Kaal, Udveg (inauspicious). The first period of the day is ${firstDayPeriod.name} (${firstDayPeriod.nature}) starting at ${firstDayPeriod.start_time}. Use auspicious Choghadiya windows for travel, business starts, and ceremonies; avoid inauspicious windows for important new undertakings.`
      : `Choghadiya in ${city.name} on ${formatDate(date)} — the Vedic time-quality system dividing the day into eight 90-minute periods, each classified as auspicious, neutral, or inauspicious for activities like travel and business.`,
  });

  return (
    <>
      {qaSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(qaSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <JsonLd
        city={city.name}
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
          { name: `Choghadiya - ${formatDate(date)}`, url: `${SITE_CONFIG.url}/${city.slug}/choghadiya-today/${date}` },
        ]}
        faqs={cityFaqs}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Clock className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Choghadiya in {city.name}
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            {formatDate(date)} &middot; {city.state}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h2 className="mb-3 text-lg font-bold text-[var(--color-vedic)]">Day Choghadiya</h2>
        <div className="space-y-2">
          {choghadiya.day_periods.map((p, i) => {
            const nature = p.nature.toLowerCase();
            const colors = NATURE_COLORS[nature] || NATURE_COLORS.neutral;
            return (
              <div key={`day-${i}`} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${colors.bg} ${colors.text}`}>
                  {p.nature}
                </span>
                <span className="font-semibold text-foreground">{p.name}</span>
                <span className="ml-auto font-mono text-sm text-muted-foreground">
                  {formatTime12h(p.start_time)} – {formatTime12h(p.end_time)}
                </span>
              </div>
            );
          })}
        </div>

        <h2 className="mb-3 mt-8 text-lg font-bold text-[var(--color-vedic)]">Night Choghadiya</h2>
        <div className="space-y-2">
          {choghadiya.night_periods.map((p, i) => {
            const nature = p.nature.toLowerCase();
            const colors = NATURE_COLORS[nature] || NATURE_COLORS.neutral;
            return (
              <div key={`night-${i}`} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${colors.bg} ${colors.text}`}>
                  {p.nature}
                </span>
                <span className="font-semibold text-foreground">{p.name}</span>
                <span className="ml-auto font-mono text-sm text-muted-foreground">
                  {formatTime12h(p.start_time)} – {formatTime12h(p.end_time)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-center">
            <Link
              href={`/${city.slug}/${date}`}
              className="rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
            >
              Full Panchang for {city.name}
            </Link>
          </div>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">Choghadiya in Other Cities</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/choghadiya-today/${date}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {c.name}
              </Link>
            ))}
          </div>

          <FaqSection faqs={cityFaqs} />
        </div>
      </div>
    </>
  );
}
