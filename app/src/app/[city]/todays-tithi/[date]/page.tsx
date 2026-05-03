import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Moon, MapPin } from "lucide-react";
import { fetchPanchang, fetchPanchangBuildSafe } from "@/lib/api";
import { getCityBySlug, getNearbyCities, getTopCitySlugs } from "@/lib/cities";
import { buildCityTopicQAPageSchema } from "@/lib/schema";
import { formatDate, formatDateShort, formatTime12h, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { getNatureStyle } from "@/lib/constants";
import { getCityTithiFaqs } from "@/lib/faqs";
import { getTithiByName } from "@/data/tithis";
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

  let tithiName = "";
  let sunrise = "";
  try {
    const data = await fetchPanchang({
      targetDate: date,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
    tithiName = data.day_quality.breakdown.tithi.name;
    sunrise = formatTime12h(data.timing.sunrise);
  } catch {}

  // Tithi prevails at sunrise — including sunrise time in the title turns
  // 216 cities × otherwise-identical Tithi-name suffixes into 216 unique titles.
  const titleText = tithiName && sunrise
    ? `Tithi ${city.name} ${shortDate} — ${tithiName} (Sunrise ${sunrise})`
    : tithiName
      ? `Aaj Ki Tithi ${city.name} ${shortDate} — ${tithiName}`
      : `Aaj Ki Tithi ${city.name} ${shortDate} — Lunar Day`;

  return {
    title: titleText,
    description: tithiName && sunrise
      ? `${tithiName} prevails at ${city.name}'s sunrise (${sunrise}) on ${shortDate}. Paksha, deity, category & elapsed percentage — sunrise-anchored per Drik Ganita.`
      : tithiName
        ? `${tithiName} in ${city.name} on ${shortDate}. Paksha, deity, nature & elapsed time. Accurate Tithi details for Vedic rituals and fasting.`
        : `Tithi details for ${city.name} on ${shortDate}. Paksha, deity, nature & elapsed time. Accurate Tithi for Vedic rituals and fasting.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/todays-tithi/${date}`,
    },
    openGraph: {
      title: `Aaj Ki Tithi ${city.name} — ${shortDate}`,
      description: `Tithi and Paksha details for ${city.name} on ${shortDate}.`,
      url: `${SITE_CONFIG.url}/${city.slug}/todays-tithi/${date}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function CityTithiDatePage({ params }: PageProps) {
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

  const { tithi } = data.panchang;
  const style = getNatureStyle(tithi.nature);
  const cityFaqs = getCityTithiFaqs(city.name, city.state);
  const otherCities = getNearbyCities(citySlug, 8);
  // Authoritative Tithi entry — 16 unique 700-char bodies + paksha-specific
  // observances. Each city-date page rendering Pratipada gets the same
  // Pratipada prose; that's correct (the Tithi itself is shared) — what makes
  // city pages distinct is the paksha + sunrise + festivals layer above.
  const tithiInfo = getTithiByName(tithi.tithi);
  const isShukla = (tithi.paksha || "").toLowerCase().includes("shukla");
  const pakshaDeity = tithiInfo
    ? isShukla
      ? tithiInfo.shuklaDeity
      : tithiInfo.krishnaDeity
    : null;
  const pakshaObservance = tithiInfo
    ? isShukla
      ? tithiInfo.shuklaObservance
      : tithiInfo.krishnaObservance
    : null;
  const qaSchema = buildCityTopicQAPageSchema({
    cityName: city.name,
    citySlug,
    date,
    topic: "todays-tithi",
    question: `What is the Tithi in ${city.name} on ${formatDateShort(date)}?`,
    answerText: `The Tithi in ${city.name} on ${formatDate(date)} is ${tithi.tithi} (${tithi.paksha} Paksha). Deity: ${tithi.deity}. Nature: ${tithi.nature}. Category: ${tithi.category}. Elapsed: ${tithi.percent_elapsed.toFixed(1)}%. Tithi is the lunar day — one of the five limbs of Panchang — calculated from the angular difference between the Sun and Moon (12° per Tithi).`,
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
      {/* FAQPage schema removed — see /[city]/page.tsx comment. QAPage above
          carries the day-and-city-specific structured Q/A. */}
      <JsonLd
        city={city.name}
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
          { name: `Tithi - ${formatDate(date)}`, url: `${SITE_CONFIG.url}/${city.slug}/todays-tithi/${date}` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Moon className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Tithi in {city.name}
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            {formatDate(date)} &middot; {city.state}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Tithi card */}
        <div
          className="rounded-3xl border border-white/[0.08] p-6 sm:p-8"
          style={{ background: "linear-gradient(135deg, #013f47 0%, #002828 100%)" }}
        >
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">Current Tithi</p>
          <p className="mt-2 text-center text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            {tithi.tithi}
          </p>
          <p className="mt-1 text-center text-lg text-[#C4973B]">{tithi.paksha}</p>
          <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Nature</p>
              <p className={`mt-1 text-sm font-bold ${style.text}`}>{tithi.nature}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Deity</p>
              <p className="mt-1 text-sm font-bold text-white">{tithi.deity}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Category</p>
              <p className="mt-1 text-sm font-bold text-white">{tithi.category}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Elapsed</p>
              <p className="mt-1 text-sm font-bold text-white">{tithi.percent_elapsed.toFixed(1)}%</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${tithi.percent_elapsed}%`, backgroundColor: style.fill }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>{tithi.elapsed_degrees.toFixed(1)}° elapsed</span>
              <span>{tithi.remaining_degrees.toFixed(1)}° remaining</span>
            </div>
          </div>
        </div>

        {/* Authoritative Tithi prose — sourced from data/tithis.ts. 16
            distinct 700-char bodies × paksha-specific observances make this
            page genuinely substantive content, not a data card. */}
        {tithiInfo && (
          <article className="mt-10 space-y-5 rounded-2xl border bg-card p-6 sm:p-8">
            <div>
              <h2 className="heading-display text-2xl font-bold text-[var(--color-vedic)] sm:text-3xl">
                {tithiInfo.name} Tithi
                <span className="ml-2 align-middle text-base font-normal text-muted-foreground">
                  {tithiInfo.devanagari} · {tithi.paksha} Paksha
                </span>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {tithiInfo.categoryMeaning}
              </p>
            </div>
            <p className="text-base leading-relaxed text-foreground">
              {tithiInfo.body}
            </p>
            {pakshaObservance && (
              <div className="rounded-xl border-l-4 border-[var(--color-saffron)]/60 bg-[var(--color-saffron)]/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-saffron)]">
                  {tithi.paksha} Paksha · Observance
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {pakshaObservance}
                </p>
                {pakshaDeity && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Presiding deity: <span className="text-foreground">{pakshaDeity}</span>
                  </p>
                )}
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Favorable for
                </p>
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {tithiInfo.favorable.map((f) => (
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
                  {tithiInfo.avoid.map((a) => (
                    <li key={a} className="flex gap-1.5">
                      <span className="text-rose-600">✕</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href={`/tithi/${tithiInfo.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-saffron)] hover:underline"
              >
                Deep dive into {tithiInfo.name} Tithi →
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

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">Tithi in Other Cities</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/todays-tithi/${date}`}
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
