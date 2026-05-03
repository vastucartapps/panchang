import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { fetchPanchang, fetchPanchangBuildSafe } from "@/lib/api";
import { getCityBySlug, getNearbyCities, getTopCitySlugs } from "@/lib/cities";
import { buildCityTopicQAPageSchema } from "@/lib/schema";
import { formatDate, formatDateShort, formatTime12h, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { getNatureStyle } from "@/lib/constants";
import { getCityNakshatraFaqs } from "@/lib/faqs";
import { getNakshatraByName } from "@/data/nakshatras";
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

  const shortDate = formatDateShort(date);

  let nakshatraName = "";
  let sunrise = "";
  try {
    const data = await fetchPanchang({
      targetDate: date,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
    nakshatraName = data.day_quality.breakdown.nakshatra.name;
    sunrise = formatTime12h(data.timing.sunrise);
  } catch {}

  // Sunrise injection — Nakshatra is global; sunrise is per-city. Combining
  // them prevents 216 cities × same-day Nakshatra producing identical titles.
  const titleText = nakshatraName && sunrise
    ? `Nakshatra ${city.name} ${shortDate} — ${nakshatraName} (Sunrise ${sunrise})`
    : nakshatraName
      ? `Aaj Ka Nakshatra ${city.name} ${shortDate} — ${nakshatraName}`
      : `Aaj Ka Nakshatra ${city.name} ${shortDate} — Lunar Mansion`;

  return {
    title: titleText,
    description: nakshatraName && sunrise
      ? `${nakshatraName} Nakshatra at ${city.name}'s sunrise (${sunrise}) on ${shortDate}. Pada, deity, lord, Gana & activity-type — calculated locally for ${city.name}.`
      : nakshatraName
        ? `${nakshatraName} Nakshatra in ${city.name} on ${shortDate}. Pada, deity, lord & Gana details. Essential for Vedic astrology and daily planning.`
        : `Nakshatra details for ${city.name} on ${shortDate}. Pada, deity, lord & Gana. Essential for Vedic astrology and daily planning.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/todays-nakshatra/${date}`,
    },
    openGraph: {
      title: `Aaj Ka Nakshatra ${city.name} — ${shortDate}`,
      description: `Nakshatra and Pada details for ${city.name} on ${shortDate}.`,
      url: `${SITE_CONFIG.url}/${city.slug}/todays-nakshatra/${date}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function CityNakshatraDatePage({ params }: PageProps) {
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

  const { nakshatra } = data.panchang;
  const style = getNatureStyle(nakshatra.nature);
  const cityFaqs = getCityNakshatraFaqs(city.name, city.state);
  const otherCities = getNearbyCities(citySlug, 8);
  // Look up the 800-char authoritative Nakshatra entry. This is what makes
  // 5,832 city-date pages have *unique* prose: 27 Nakshatras × the body
  // text that changes per Nakshatra. Without this the page is just a data
  // card and Google deduplicates across cities.
  const nakshatraInfo = getNakshatraByName(
    data.day_quality.breakdown.nakshatra.name || nakshatra.nakshatra
  );
  const qaSchema = buildCityTopicQAPageSchema({
    cityName: city.name,
    citySlug,
    date,
    topic: "todays-nakshatra",
    question: `What is the Nakshatra in ${city.name} on ${formatDateShort(date)}?`,
    answerText: `The Nakshatra in ${city.name} on ${formatDate(date)} is ${nakshatra.nakshatra} (Pada ${nakshatra.pada}). Lord: ${nakshatra.lord}. Deity: ${nakshatra.deity}. Gana: ${nakshatra.gana}. Nature: ${nakshatra.nature}. Activity: ${nakshatra.activity_type}. Nakshatra is the lunar mansion occupied by the Moon — one of the 27 Vedic constellations each spanning 13°20' of the zodiac.`,
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
          { name: `Nakshatra - ${formatDate(date)}`, url: `${SITE_CONFIG.url}/${city.slug}/todays-nakshatra/${date}` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Star className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Nakshatra in {city.name}
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            {formatDate(date)} &middot; {city.state}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Nakshatra card */}
        <div
          className="rounded-3xl border border-white/[0.08] p-6 sm:p-8"
          style={{ background: "linear-gradient(135deg, #013f47 0%, #002828 100%)" }}
        >
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">Current Nakshatra</p>
          <p className="mt-2 text-center text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            {nakshatra.nakshatra}
          </p>
          <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Pada</p>
              <p className="mt-1 text-lg font-bold text-[#C4973B]">{nakshatra.pada}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Nature</p>
              <p className={`mt-1 text-sm font-bold ${style.text}`}>{nakshatra.nature}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Lord</p>
              <p className="mt-1 text-sm font-bold text-white">{nakshatra.lord}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Deity</p>
              <p className="mt-1 text-sm font-bold text-white">{nakshatra.deity}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Gana</p>
              <p className="mt-1 text-sm font-bold text-white">{nakshatra.gana}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Activity</p>
              <p className="mt-1 text-sm font-bold text-white">{nakshatra.activity_type}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${nakshatra.percent_elapsed}%`, backgroundColor: style.fill }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>{nakshatra.elapsed_degrees.toFixed(1)}° elapsed</span>
              <span>{nakshatra.remaining_degrees.toFixed(1)}° remaining</span>
            </div>
          </div>
        </div>

        {/* Authoritative Nakshatra prose — sourced from data/nakshatras.ts.
            This is the SEO-critical content that makes the page genuinely
            unique per-Nakshatra (27 distinct articles vs templated chrome). */}
        {nakshatraInfo && (
          <article className="mt-10 space-y-5 rounded-2xl border bg-card p-6 sm:p-8">
            <div>
              <h2 className="heading-display text-2xl font-bold text-[var(--color-vedic)] sm:text-3xl">
                {nakshatraInfo.name} Nakshatra
                <span className="ml-2 align-middle text-base font-normal text-muted-foreground">
                  {nakshatraInfo.devanagari} · #{nakshatraInfo.number} of 27
                </span>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {nakshatraInfo.degreesStart.toFixed(2)}° to {nakshatraInfo.degreesEnd.toFixed(2)}° of the zodiac · spans {nakshatraInfo.rashis.join(", ")} · ruled by {nakshatraInfo.lord}
              </p>
            </div>
            <p className="text-base leading-relaxed text-foreground">
              {nakshatraInfo.body}
            </p>
            <div className="rounded-xl border-l-4 border-[var(--color-saffron)]/60 bg-[var(--color-saffron)]/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-saffron)]">
                Shakti (the Nakshatra&apos;s power)
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">
                {nakshatraInfo.shakti}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Favorable for
                </p>
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {nakshatraInfo.favorable.map((f) => (
                    <li key={f} className="flex gap-1.5">
                      <span className="text-emerald-600">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-rose-50 p-4 dark:bg-rose-950/30">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                  Best avoided
                </p>
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {nakshatraInfo.avoid.map((a) => (
                    <li key={a} className="flex gap-1.5">
                      <span className="text-rose-600">✕</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Symbol</p>
                <p className="mt-1 text-sm font-medium text-foreground">{nakshatraInfo.symbol}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Deity</p>
                <p className="mt-1 text-sm font-medium text-foreground">{nakshatraInfo.deity.split(" (")[0]}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Gana</p>
                <p className="mt-1 text-sm font-medium text-foreground">{nakshatraInfo.gana}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Activity</p>
                <p className="mt-1 text-sm font-medium text-foreground">{nakshatraInfo.activity}</p>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href={`/nakshatra/${nakshatraInfo.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-saffron)] hover:underline"
              >
                Deep dive into {nakshatraInfo.name} Nakshatra →
              </Link>
            </div>
          </article>
        )}

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

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">Nakshatra in Other Cities</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/todays-nakshatra/${date}`}
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
