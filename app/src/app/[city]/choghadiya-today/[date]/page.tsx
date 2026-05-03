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
  if (!city || !isValidDate(date)) notFound();

  const formattedDate = formatDate(date);
  const shortDate = formatDateShort(date);

  // Choghadiya boundaries derive from local sunrise — fetch to differentiate
  // 216 cities that would otherwise share the same generic title.
  let sunrise = "";
  let firstChoghadiya = "";
  try {
    const data = await fetchPanchang({
      targetDate: date,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
    sunrise = formatTime12h(data.timing.sunrise);
    firstChoghadiya = data.choghadiya?.day_periods?.[0]?.name ?? "";
  } catch {}

  const titleText = sunrise
    ? `Choghadiya ${city.name} ${shortDate} — From Sunrise ${sunrise}${firstChoghadiya ? ` (${firstChoghadiya})` : ""}`
    : `Choghadiya ${city.name} ${shortDate} — Shubh & Ashubh Timings`;

  return {
    title: { absolute: titleText },
    description: sunrise
      ? `${city.name} Choghadiya for ${formattedDate} — eight 90-minute windows starting at sunrise (${sunrise}). Amrit, Shubh, Labh auspicious; Rog, Kaal, Udveg avoided. Local-sunrise calculation.`
      : `Choghadiya timings for ${city.name}, ${city.state} on ${formattedDate}. Find Amrit, Shubh, Labh, Chal, Rog, Kaal, and Udveg periods.`,
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

  const { choghadiya, timing } = data;
  const cityFaqs = getCityChoghadiyaFaqs(city.name, city.state);
  const otherCities = getNearbyCities(citySlug, 8);
  const firstDayPeriod = choghadiya.day_periods?.[0];
  // Per-day auspicious-window summary: pick the first Amrit, Shubh, and
  // Labh occurrences in today's day periods so the prose narrative below
  // references concrete computed values for THIS city + THIS date.
  const auspiciousNames = ["Amrit", "Shubh", "Labh"];
  const auspiciousToday = (choghadiya.day_periods || [])
    .filter((p) => auspiciousNames.some((n) => p.name?.includes(n)))
    .slice(0, 3);
  const inauspiciousNames = ["Rog", "Kaal", "Udveg"];
  const firstInauspicious = (choghadiya.day_periods || []).find((p) =>
    inauspiciousNames.some((n) => p.name?.includes(n))
  );
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

        {/* Per-day narrative prose. Values inline below come from THIS city's
            sunrise + computed periods so the article changes by date AND
            city — fixing the 5-of-7 zero-prose templates audit finding. */}
        <article className="mt-10 space-y-4 rounded-2xl border bg-card p-6 sm:p-8">
          <h2 className="heading-display text-xl font-bold text-[var(--color-vedic)] sm:text-2xl">
            How to use Choghadiya in {city.name} on {formatDateShort(date)}
          </h2>
          <p className="text-base leading-relaxed text-foreground">
            Choghadiya divides {city.name}&apos;s daylight — from sunrise at{" "}
            <strong>{formatTime12h(timing.sunrise)}</strong> to sunset at{" "}
            <strong>{formatTime12h(timing.sunset)}</strong> — into eight
            equal 90-minute periods, each carrying a quality classification
            inherited from the planetary lord governing that segment. Because
            the segmentation anchors to {city.name}&apos;s local sunrise, the
            period start times above shift from cities just a few longitude
            degrees away by several minutes; on Amrit/Shubh transitions a
            household in Mumbai may be in Labh while one in Kolkata is already
            in Char.
          </p>
          {auspiciousToday.length > 0 && (
            <p className="text-base leading-relaxed text-foreground">
              <strong>Auspicious windows today</strong> in {city.name} include{" "}
              {auspiciousToday.map((p, i) => (
                <span key={i}>
                  {i > 0 && (i === auspiciousToday.length - 1 ? ", and " : ", ")}
                  <strong>{p.name}</strong> ({formatTime12h(p.start_time)}–{formatTime12h(p.end_time)})
                </span>
              ))}
              . These are the periods to schedule new ventures, contract
              signings, vehicle purchases, and travel starts. Amrit is the
              most concentrated auspiciousness; Shubh suits ceremonies and
              rituals; Labh favors financial and profit-oriented work.
            </p>
          )}
          {firstInauspicious && (
            <p className="text-base leading-relaxed text-foreground">
              The day&apos;s first inauspicious window in {city.name} is{" "}
              <strong>{firstInauspicious.name}</strong> from{" "}
              {formatTime12h(firstInauspicious.start_time)} to{" "}
              {formatTime12h(firstInauspicious.end_time)}. Traditional practice
              avoids new initiations during Rog (illness), Kaal (death/time),
              and Udveg (anxiety) Choghadiya, though Udveg is held acceptable
              for government work and dealings with authority. Existing work
              already underway can continue without concern — Choghadiya
              quality primarily affects the moment of beginning.
            </p>
          )}
          <p className="text-base leading-relaxed text-foreground">
            Night Choghadiya runs from sunset to next sunrise on a separate
            8-period cycle — useful when planning late-evening ceremonies or
            overnight journeys. For the complete Vedic snapshot today including
            Tithi, Nakshatra, Yoga, Karana, Rahu Kaal and Hora alongside
            Choghadiya, see{" "}
            <Link
              href={`/${city.slug}/${date}`}
              className="text-[var(--color-saffron)] hover:underline"
            >
              {city.name}&apos;s full Panchang for {formatDateShort(date)}
            </Link>
            .
          </p>
        </article>

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
