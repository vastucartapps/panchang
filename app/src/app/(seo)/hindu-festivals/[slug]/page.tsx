import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Star,
  ArrowLeft,
  MapPin,
  Clock,
  Sun,
  Flame,
  BookOpen,
  Sparkles,
  Moon,
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  Check,
  X,
  CircleDot,
} from "lucide-react";
import { SITE_CONFIG, DEFAULT_LOCATION, getNatureStyle } from "@/lib/constants";
import { getAllFestivals, getFestivalBySlug } from "@/data/festivals";
import type { Festival } from "@/data/festivals";
import { fetchPanchang } from "@/lib/api";
import type { PanchangResponse, FestivalEntry, VratEntry } from "@/schemas/panchang";
import {
  formatDate,
  formatTime12h,
  formatDateLong,
  formatISOToTime12h,
  shiftDate,
  formatPanchangKey,
} from "@/lib/format";
import Image from "next/image";
import { getAllCities } from "@/lib/cities";
import { JsonLd } from "@/components/seo/json-ld";

// ─── Festival Hero Image Mapping ─────────────────────────
// Maps festival base name (without year suffix) to a hero overlay image.
const FESTIVAL_HERO_IMAGES: Record<string, string> = {
  diwali: "/images/festivals/diwali.jpg",
  "holika-dahan": "/images/festivals/holi.jpg",
  holi: "/images/festivals/holi.jpg",
  "sharad-navratri": "/images/festivals/navratri.jpg",
  "chaitra-navratri": "/images/festivals/navratri.jpg",
  navratri: "/images/festivals/navratri.jpg",
  dussehra: "/images/festivals/dussehra.jpg",
  "vijayadashami": "/images/festivals/dussehra.jpg",
  "maha-shivaratri": "/images/festivals/maha-shivaratri.jpg",
  "krishna-janmashtami": "/images/festivals/krishna-janmashtami.jpg",
  "ganesh-chaturthi": "/images/festivals/ganesh-chaturthi.jpg",
  "rama-navami": "/images/festivals/rama-navami.jpg",
  "raksha-bandhan": "/images/festivals/raksha-bandhan.jpg",
  "karwa-chauth": "/images/festivals/karwa-chauth.jpg",
  "chhath-puja": "/images/festivals/chhath-puja.jpg",
  "makar-sankranti": "/images/festivals/makar-sankranti.jpg",
  "vasant-panchami": "/images/festivals/vasant-panchami.jpg",
  "guru-purnima": "/images/festivals/guru-purnima.jpg",
  "akshaya-tritiya": "/images/festivals/akshaya-tritiya.jpg",
  "hanuman-jayanti": "/images/festivals/hanuman-jayanti.jpg",
  dhanteras: "/images/festivals/dhanteras.jpg",
  "bhai-dooj": "/images/festivals/bhai-dooj.jpg",
  "govardhan-puja": "/images/festivals/govardhan-puja.jpg",
  "nag-panchami": "/images/festivals/nag-panchami.jpg",
};

function getFestivalHeroImage(slug: string): string | null {
  const baseName = slug.replace(/-\d{4}$/, "");
  return FESTIVAL_HERO_IMAGES[baseName] || null;
}

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllFestivals().map((f) => ({ slug: f.slug }));
}

// ─── Helpers ───────────────────────────────────────────────

/** Derive API festival key from static slug: "maha-shivaratri-2026" → "maha_shivaratri" */
function slugToApiKey(slug: string): string {
  return slug.replace(/-\d{4}$/, "").replace(/-/g, "_");
}

/** Fetch panchang, try static date first; if API doesn't confirm the festival, try +1 day */
async function fetchFestivalData(festival: Festival) {
  const apiKey = slugToApiKey(festival.slug);
  const loc = {
    latitude: DEFAULT_LOCATION.lat,
    longitude: DEFAULT_LOCATION.lng,
    timezone: DEFAULT_LOCATION.tz,
  };

  // Try the static date first
  let data: PanchangResponse | null = null;
  let actualDate = festival.date;

  try {
    data = await fetchPanchang({ targetDate: festival.date, ...loc }, 3600);
  } catch {
    data = null;
  }

  // Check if API confirms the festival on this date
  const hasMatch = data?.festivals?.some((f) => f.key === apiKey);

  // If no match, try the next day (Hindu dates can shift by 1 due to tithi-at-sunrise rule)
  if (!hasMatch && data) {
    const nextDay = shiftDate(festival.date, 1);
    try {
      const nextData = await fetchPanchang({ targetDate: nextDay, ...loc }, 3600);
      const nextMatch = nextData.festivals?.some((f) => f.key === apiKey);
      if (nextMatch) {
        data = nextData;
        actualDate = nextDay;
      }
    } catch {
      // Keep the original data
    }
  }

  // Also try the previous day
  if (!data?.festivals?.some((f) => f.key === apiKey) && data) {
    const prevDay = shiftDate(festival.date, -1);
    try {
      const prevData = await fetchPanchang({ targetDate: prevDay, ...loc }, 3600);
      const prevMatch = prevData.festivals?.some((f) => f.key === apiKey);
      if (prevMatch) {
        data = prevData;
        actualDate = prevDay;
      }
    } catch {
      // Keep the original data
    }
  }

  const apiFestival = data?.festivals?.find((f) => f.key === apiKey) ?? null;
  return { data, actualDate, apiFestival };
}

/** Find related festivals from the same year */
function getRelatedFestivals(festival: Festival): Festival[] {
  const all = getAllFestivals().filter(
    (f) => f.slug !== festival.slug && f.year === festival.year
  );
  const sameCategory = all.filter((f) => f.category === festival.category);
  const others = all.filter((f) => f.category !== festival.category);
  const sorted = [...sameCategory, ...others].sort((a, b) => {
    const distA = Math.abs(new Date(a.date).getTime() - new Date(festival.date).getTime());
    const distB = Math.abs(new Date(b.date).getTime() - new Date(festival.date).getTime());
    return distA - distB;
  });
  return sorted.slice(0, 4);
}

/** Build fully dynamic FAQs — every answer uses API data where available */
function buildFaqs(
  festival: Festival,
  data: PanchangResponse | null,
  actualDate: string,
  apiFestival: FestivalEntry | null,
) {
  const year = festival.year;
  const dateStr = formatDate(actualDate);
  const hinduMonth = data?.panchang.tithi.hindu_month;
  const tithiName = data ? formatPanchangKey(data.panchang.tithi.tithi) : null;

  const faqs = [
    {
      question: `When is ${festival.name} in ${year}?`,
      answer: `${festival.name} (${festival.nameHindi}) will be celebrated on ${dateStr} in ${year}.${
        hinduMonth
          ? ` As per the Hindu calendar, it falls in ${hinduMonth.month}${hinduMonth.is_adhik ? " (Adhik)" : ""} month, ${data!.panchang.tithi.paksha} Paksha, ${tithiName}.`
          : festival.tithi ? ` It falls on ${festival.tithi}.` : ""
      }`,
    },
    {
      question: `What is the significance of ${festival.name}?`,
      answer: festival.significance,
    },
    {
      question: `What are the main traditions of ${festival.name}?`,
      answer: `The key traditions of ${festival.name} include: ${festival.traditions.join("; ")}. These customs vary by region and community across India.`,
    },
  ];

  // Deity — prefer API deity if available
  const deity = apiFestival?.deity || festival.deity;
  if (deity) {
    faqs.push({
      question: `Which deity is worshipped on ${festival.name}?`,
      answer: `${festival.name} is dedicated to ${deity}. Devotees perform special pujas and rituals to seek blessings on this auspicious day.`,
    });
  }

  // Tithi FAQ — use API data
  if (data) {
    const tithiEnd = data.panchang.tithi.end_time
      ? formatISOToTime12h(data.panchang.tithi.end_time)
      : null;
    faqs.push({
      question: `What is the Tithi on ${festival.name} ${year}?`,
      answer: `On ${festival.name} ${year}, the prevailing Tithi at sunrise in ${DEFAULT_LOCATION.name} is ${tithiName} (${data.panchang.tithi.paksha} Paksha).${
        tithiEnd ? ` This Tithi ends at ${tithiEnd}.` : ""
      }${
        data.panchang.tithi.next_tithi
          ? ` The next Tithi is ${formatPanchangKey(data.panchang.tithi.next_tithi.tithi)}.`
          : ""
      }`,
    });
  }

  // Rahu Kaal — fully dynamic
  if (data) {
    faqs.push({
      question: `What is the Rahu Kaal on ${festival.name} ${year}?`,
      answer: `On ${festival.name} ${year} (${dateStr}), the Rahu Kaal in ${DEFAULT_LOCATION.name} is from ${formatTime12h(data.timing.rahu_kalam.start_time)} to ${formatTime12h(data.timing.rahu_kalam.end_time)} (${data.timing.rahu_kalam.duration_minutes} minutes). It is advisable to avoid starting new activities during Rahu Kaal.`,
    });
  }

  // Sunrise / Sunset — fully dynamic
  if (data) {
    faqs.push({
      question: `What is the sunrise and sunset time on ${festival.name} ${year}?`,
      answer: `On ${festival.name} ${year} in ${DEFAULT_LOCATION.name}, sunrise is at ${formatTime12h(data.timing.sunrise)} and sunset is at ${formatTime12h(data.timing.sunset)}. The day duration is ${data.timing.dinamana_hours.toFixed(1)} hours.`,
    });
  }

  // Moon phase — dynamic
  if (data) {
    faqs.push({
      question: `What is the Moon phase on ${festival.name} ${year}?`,
      answer: `On ${festival.name} ${year}, the Moon is in ${data.moon_phase.phase_name} phase with ${data.moon_phase.illumination_percent.toFixed(1)}% illumination. The Moon is ${data.moon_phase.is_waxing ? "waxing" : "waning"} (${data.moon_phase.paksha} Paksha).`,
    });
  }

  // Nakshatra — dynamic
  if (data) {
    faqs.push({
      question: `What is the Nakshatra on ${festival.name} ${year}?`,
      answer: `The prevailing Nakshatra on ${festival.name} ${year} is ${formatPanchangKey(data.panchang.nakshatra.nakshatra)} (Lord: ${data.panchang.nakshatra.lord}, Nature: ${data.panchang.nakshatra.nature}). It is a ${data.panchang.nakshatra.activity_type} type Nakshatra, belonging to ${data.panchang.nakshatra.gana} Gana.`,
    });
  }

  return faqs;
}

// ─── Metadata ──────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) return {};

  const formattedDate = formatDate(festival.date);

  return {
    title: `${festival.name} ${festival.year} — Date, Tithi, Significance & Panchang Details`,
    description: `${festival.name} (${festival.nameHindi}) falls on ${formattedDate}. Know the exact Tithi, Nakshatra, Rahu Kaal, sunrise time, and Panchang details for ${festival.name} ${festival.year}. ${festival.description.slice(0, 100)}`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/hindu-festivals/${slug}`,
    },
    openGraph: {
      title: `${festival.name} ${festival.year} — Date, Significance & Panchang`,
      description: `${festival.name} (${festival.nameHindi}) on ${formattedDate}. Complete Panchang details, significance, traditions, and FAQs.`,
      url: `${SITE_CONFIG.url}/hindu-festivals/${slug}`,
      siteName: SITE_CONFIG.name,
      type: "article",
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og/${DEFAULT_LOCATION.slug}/${festival.date}`,
          width: 1200,
          height: 630,
          alt: `${festival.name} ${festival.year} Panchang`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${festival.name} ${festival.year} — Date & Panchang`,
      description: `${festival.name} on ${formattedDate}. Tithi, Nakshatra, Rahu Kaal & more.`,
      images: [`${SITE_CONFIG.url}/api/og/${DEFAULT_LOCATION.slug}/${festival.date}`],
    },
  };
}

// ─── Page ──────────────────────────────────────────────────

export default async function FestivalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) notFound();

  const { data, actualDate, apiFestival } = await fetchFestivalData(festival);

  const cities = getAllCities().slice(0, 20);
  const faqs = buildFaqs(festival, data, actualDate, apiFestival);
  const related = getRelatedFestivals(festival);
  const heroImage = getFestivalHeroImage(slug);

  // Use API-corrected date for display, fall back to static
  const displayDate = actualDate;
  const formattedDate = formatDate(displayDate);

  // Dynamic data from API
  const hinduMonth = data?.panchang.tithi.hindu_month;
  const tithiName = data ? formatPanchangKey(data.panchang.tithi.tithi) : null;
  const moonPhase = data?.moon_phase;

  // Deity: prefer API, fall back to static
  const deity = apiFestival?.deity || festival.deity;

  // Description: prefer API (has Hindi too), fall back to static
  const apiDesc = apiFestival?.description;

  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Hindu Festivals", url: `${SITE_CONFIG.url}/hindu-festivals` },
          { name: `${festival.name} ${festival.year}`, url: `${SITE_CONFIG.url}/hindu-festivals/${slug}` },
        ]}
        faqs={faqs}
      />

      {/* ── Hero Section ────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Base gradient — always present */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(165deg, #003636 0%, #004D40 30%, #1B3A2D 60%, #2C1810 100%)",
          }}
        />

        {/* Festival-specific hero image overlay */}
        {heroImage && (
          <Image
            src={heroImage}
            alt=""
            fill
            className="absolute inset-0 object-cover opacity-25"
            sizes="100vw"
            priority
          />
        )}

        {/* Dark overlay on top of image for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: heroImage
              ? "linear-gradient(to bottom, rgba(0,54,54,0.6) 0%, rgba(0,54,54,0.85) 100%)"
              : "radial-gradient(ellipse at 50% 0%, rgba(196,151,59,0.15) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Link
            href="/hindu-festivals"
            className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/50 transition-colors hover:border-white/30 hover:text-white/80"
          >
            <ArrowLeft className="h-3 w-3" /> All Festivals
          </Link>

          {/* Category pill */}
          <div className="mb-5 flex justify-center">
            <span
              className="rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[0.15em]"
              style={{
                background: festival.category === "vrat"
                  ? "rgba(139,26,26,0.3)"
                  : festival.category === "regional"
                    ? "rgba(59,130,246,0.2)"
                    : "rgba(196,151,59,0.2)",
                color: festival.category === "vrat"
                  ? "#fca5a5"
                  : festival.category === "regional"
                    ? "#93c5fd"
                    : "#E8D5A3",
              }}
            >
              {festival.category === "vrat" ? "Vrat / Fasting" : festival.category === "regional" ? "Regional Festival" : "Major Festival"}
            </span>
          </div>

          <h1 className="animate-fade-in-up heading-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {festival.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-[#C4973B] sm:text-2xl">
            {festival.nameHindi}
          </p>

          <div className="mt-5 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />

          {/* Date — from API-corrected date */}
          <p className="mt-5 text-lg text-white/60">{formattedDate}</p>

          {/* Hindu month + tithi from API */}
          {hinduMonth && tithiName && (
            <p className="mt-2 text-sm tracking-wide text-[#C4973B]/70">
              {hinduMonth.month}{hinduMonth.is_adhik ? " (Adhik)" : ""} &middot; {data!.panchang.tithi.paksha} Paksha &middot; {tithiName}
            </p>
          )}

          {/* Deity — from API or static */}
          {deity && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-white/40">
              <Sparkles className="h-3.5 w-3.5 text-[#C4973B]/60" />
              Dedicated to {deity}
            </p>
          )}

          {/* Moon phase from API */}
          {moonPhase && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-white/30">
              <Moon className="h-3 w-3" />
              {moonPhase.phase_name} &middot; {moonPhase.illumination_percent.toFixed(0)}% illumination
            </p>
          )}
        </div>
      </section>

      {/* ── Quick Stats Strip ───────────────────────────── */}
      {data && (
        <div className="border-b" style={{ backgroundColor: "#FBFAF5" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
              <StatCell
                label="Day Quality"
                value={String(Math.round(data.day_quality.score))}
                sub={data.day_quality.label}
                color={data.day_quality.score >= 70 ? "#22c55e" : data.day_quality.score >= 40 ? "#C4973B" : "#ef4444"}
              />
              <StatCell
                label="Sunrise"
                value={formatTime12h(data.timing.sunrise)}
                sub={DEFAULT_LOCATION.name}
              />
              <StatCell
                label="Sunset"
                value={formatTime12h(data.timing.sunset)}
                sub={DEFAULT_LOCATION.name}
              />
              <StatCell
                label="Rahu Kaal"
                value={`${data.timing.rahu_kalam.start_time}–${data.timing.rahu_kalam.end_time}`}
                sub="Avoid new tasks"
                color="#dc2626"
                small
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">

        {/* API Festival / Vrat Cards — dynamic from API */}
        {data && ((data.festivals && data.festivals.length > 0) || (data.vrat && data.vrat.length > 0)) && (
          <section className="mb-10">
            <div className="grid gap-3 sm:grid-cols-2">
              {data.festivals?.map((f: FestivalEntry) => (
                <div key={f.key} className="overflow-hidden rounded-2xl shadow-md">
                  <div
                    className="flex items-center gap-2 px-4 py-3"
                    style={{ background: "linear-gradient(135deg, #e36414, #C4973B)" }}
                  >
                    <Flame className="h-4 w-4 text-white" />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-white">{f.name}</h3>
                      <p className="truncate text-xs text-white/70">{f.name_hindi}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold capitalize text-white">
                      {f.category}
                    </span>
                  </div>
                  <div className="space-y-1.5 bg-[#FFFBF5] p-4">
                    {f.deity && (
                      <p className="text-xs text-[#003636]/60">
                        <span className="font-semibold">Deity:</span> {f.deity}
                      </p>
                    )}
                    {f.description && (
                      <p className="text-xs leading-relaxed text-gray-600">{f.description}</p>
                    )}
                  </div>
                </div>
              ))}
              {data.vrat?.map((v: VratEntry) => (
                <div key={v.key} className="overflow-hidden rounded-2xl shadow-md">
                  <div
                    className="flex items-center gap-2 px-4 py-3"
                    style={{ background: "linear-gradient(135deg, #003636, #004a4a)" }}
                  >
                    <BookOpen className="h-4 w-4 text-white" />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-white">{v.name}</h3>
                      <p className="truncate text-xs text-white/70">{v.name_hindi}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">
                      Vrat
                    </span>
                  </div>
                  {v.note && (
                    <div className="bg-[#F5FAFA] p-4">
                      <p className="text-xs leading-relaxed text-gray-600">{v.note}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* About Section */}
        <section className="mb-10">
          <SectionHeading gradient="saffron">About {festival.name}</SectionHeading>
          <p className="text-base leading-relaxed text-[#003636]/70">
            {festival.description}
          </p>
          {/* Show API description if different from static */}
          {apiDesc && apiDesc !== festival.description && (
            <p className="mt-3 text-sm leading-relaxed text-[#003636]/60 italic">
              {apiDesc}
            </p>
          )}
        </section>

        {/* Significance + Traditions */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#C4973B]/15 bg-[#C4973B]/[0.03] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-[#C4973B]" />
              <h2 className="text-lg font-bold text-[#003636]">Significance</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#003636]/65">{festival.significance}</p>

            {/* Hindu month badge from API */}
            {hinduMonth && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2">
                <Calendar className="h-3.5 w-3.5 text-[#C4973B]" />
                <span className="text-xs text-[#003636]/50">Hindu Month:</span>
                <span className="text-xs font-semibold text-[#003636]">
                  {hinduMonth.month}{hinduMonth.is_adhik ? " (Adhik)" : ""}
                </span>
              </div>
            )}

            {/* Tithi from API with timing */}
            {data && (
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2">
                <Moon className="h-3.5 w-3.5 text-[#C4973B]" />
                <span className="text-xs text-[#003636]/50">Tithi:</span>
                <span className="text-xs font-semibold text-[#003636]">
                  {tithiName} ({data.panchang.tithi.paksha})
                </span>
                {data.panchang.tithi.end_time && (
                  <span className="text-[10px] text-[#003636]/40">
                    ends {formatISOToTime12h(data.panchang.tithi.end_time)}
                  </span>
                )}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-4 w-4 text-[#e36414]" />
              <h2 className="text-lg font-bold text-[#003636]">Traditions &amp; Customs</h2>
            </div>
            <div className="space-y-2.5">
              {festival.traditions.map((tradition, i) => (
                <div key={tradition} className="flex items-start gap-3 rounded-xl border border-border/50 bg-white px-4 py-3 shadow-sm">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #003636, #004D40)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#003636]/80">{tradition}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Suitable & Avoid Activities — from API ───── */}
        {data && (data.day_quality.suitable_activities.length > 0 || data.day_quality.avoid_activities.length > 0) && (
          <section className="mb-10">
            <SectionHeading gradient="teal">
              What to Do &amp; Avoid on {festival.name} {festival.year}
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.day_quality.suitable_activities.length > 0 && (
                <div className="rounded-2xl border border-green-200/50 bg-green-50/50 p-5">
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold text-green-800">
                    <Check className="h-4 w-4" /> Suitable Activities
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.day_quality.suitable_activities.map((a) => (
                      <span key={a} className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-medium capitalize text-green-700">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.day_quality.avoid_activities.length > 0 && (
                <div className="rounded-2xl border border-red-200/50 bg-red-50/50 p-5">
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold text-red-800">
                    <X className="h-4 w-4" /> Activities to Avoid
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.day_quality.avoid_activities.map((a) => (
                      <span key={a} className="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-medium capitalize text-red-700">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Panchang Details Grid — all from API ──────── */}
        {data && (
          <section className="mb-10">
            <SectionHeading gradient="teal">
              Panchang Details — {festival.name} {festival.year}
            </SectionHeading>
            <p className="mb-5 text-xs text-[#003636]/40">
              Panchang for {DEFAULT_LOCATION.name} on {formattedDate}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Tithi with timing */}
              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#003636]/40">Tithi</p>
                  <Moon className="h-4 w-4 text-[#003636]/15" />
                </div>
                <p className="mt-2 text-lg font-bold text-[#003636]">{tithiName}</p>
                <p className="mt-0.5 text-xs text-[#003636]/50">{data.panchang.tithi.paksha} Paksha</p>
                <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getNatureStyle(data.panchang.tithi.nature).bg} ${getNatureStyle(data.panchang.tithi.nature).text}`}>
                  {getNatureStyle(data.panchang.tithi.nature).label}
                </span>
                {/* Tithi timing */}
                {data.panchang.tithi.start_time && data.panchang.tithi.end_time && (
                  <div className="mt-2 space-y-0.5 border-t border-border/30 pt-2">
                    <p className="text-[10px] text-[#003636]/40">
                      Starts: <span className="font-semibold text-[#003636]/70">{formatISOToTime12h(data.panchang.tithi.start_time)}</span>
                    </p>
                    <p className="text-[10px] text-[#003636]/40">
                      Ends: <span className="font-semibold text-[#003636]/70">{formatISOToTime12h(data.panchang.tithi.end_time)}</span>
                    </p>
                  </div>
                )}
                {data.panchang.tithi.next_tithi && (
                  <p className="mt-1 text-[10px] text-[#C4973B]/70">
                    Next: {formatPanchangKey(data.panchang.tithi.next_tithi.tithi)}
                  </p>
                )}
              </div>

              {/* Nakshatra */}
              <PanchangInfoCard
                label="Nakshatra"
                value={formatPanchangKey(data.panchang.nakshatra.nakshatra)}
                sublabel={`Lord: ${data.panchang.nakshatra.lord} · ${data.panchang.nakshatra.gana} Gana`}
                nature={data.panchang.nakshatra.nature}
                icon={<Sparkles className="h-4 w-4" />}
              />

              {/* Yoga */}
              <PanchangInfoCard
                label="Yoga"
                value={formatPanchangKey(data.panchang.yoga.yoga)}
                sublabel={data.panchang.yoga.description || undefined}
                nature={data.panchang.yoga.nature}
                icon={<Star className="h-4 w-4" />}
              />

              {/* Karana */}
              <PanchangInfoCard
                label="Karana"
                value={formatPanchangKey(data.panchang.karana.karana)}
                sublabel={`Type: ${data.panchang.karana.type}`}
                nature={data.panchang.karana.nature}
                icon={<BookOpen className="h-4 w-4" />}
              />

              {/* Moon Phase */}
              {moonPhase && (
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#003636]/40">Moon Phase</p>
                    <Moon className="h-4 w-4 text-[#003636]/15" />
                  </div>
                  <p className="mt-2 text-lg font-bold text-[#003636]">{moonPhase.phase_name}</p>
                  <p className="mt-0.5 text-xs text-[#003636]/50">
                    {moonPhase.illumination_percent.toFixed(1)}% illuminated · {moonPhase.is_waxing ? "Waxing" : "Waning"}
                  </p>
                  <p className="mt-1 text-[10px] text-[#003636]/40">
                    Age: {moonPhase.age_days.toFixed(1)} days
                  </p>
                </div>
              )}

              {/* Key Timings — wide card */}
              <div className="rounded-2xl border bg-white p-4 shadow-sm sm:col-span-2 lg:col-span-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#003636]/40">
                  Key Timings
                </p>
                <div className="mt-3 space-y-2">
                  <TimingRow icon={<Sun className="h-3.5 w-3.5 text-amber-500" />} label="Sunrise" value={formatTime12h(data.timing.sunrise)} />
                  <TimingRow icon={<Sun className="h-3.5 w-3.5 text-orange-500" />} label="Sunset" value={formatTime12h(data.timing.sunset)} />
                  <TimingRow icon={<Clock className="h-3.5 w-3.5 text-red-500" />} label="Rahu Kaal" value={`${data.timing.rahu_kalam.start_time}–${data.timing.rahu_kalam.end_time}`} danger />
                  <TimingRow icon={<Clock className="h-3.5 w-3.5 text-orange-400" />} label="Yamagandam" value={`${data.timing.yamagandam.start_time}–${data.timing.yamagandam.end_time}`} danger />
                  <TimingRow icon={<Clock className="h-3.5 w-3.5 text-purple-400" />} label="Gulika Kalam" value={`${data.timing.gulika_kalam.start_time}–${data.timing.gulika_kalam.end_time}`} danger />
                  {data.timing.abhijit_muhurta && (
                    <TimingRow icon={<Sparkles className="h-3.5 w-3.5 text-green-500" />} label="Abhijit Muhurta" value={`${data.timing.abhijit_muhurta.start_time}–${data.timing.abhijit_muhurta.end_time}`} good />
                  )}
                  <TimingRow icon={<Sun className="h-3.5 w-3.5 text-indigo-400" />} label="Brahma Muhurta" value={`${data.timing.brahma_muhurta.start_time}–${data.timing.brahma_muhurta.end_time}`} good />
                </div>
              </div>
            </div>

            {/* Muhurta Yogas from API */}
            {data.muhurta_yogas && (data.muhurta_yogas.count_auspicious > 0 || data.muhurta_yogas.count_inauspicious > 0) && (
              <div className="mt-4 rounded-2xl border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-[#003636]">Muhurta Yogas</p>
                  <span
                    className="rounded-full px-3 py-0.5 text-[10px] font-bold"
                    style={{
                      background: data.muhurta_yogas.overall_muhurta_quality === "Excellent" ? "rgba(34,197,94,0.1)" : data.muhurta_yogas.overall_muhurta_quality === "Good" ? "rgba(132,204,22,0.1)" : "rgba(234,179,8,0.1)",
                      color: data.muhurta_yogas.overall_muhurta_quality === "Excellent" ? "#15803d" : data.muhurta_yogas.overall_muhurta_quality === "Good" ? "#4d7c0f" : "#a16207",
                    }}
                  >
                    {data.muhurta_yogas.overall_muhurta_quality}
                  </span>
                </div>
                {data.muhurta_yogas.panchaka_active && (
                  <div className="mb-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                    <span className="text-xs font-semibold text-red-700">Panchaka Active{data.muhurta_yogas.panchaka_type ? ` — ${data.muhurta_yogas.panchaka_type}` : ""}</span>
                  </div>
                )}
                <div className="grid gap-2 sm:grid-cols-2">
                  {data.muhurta_yogas.auspicious.map((y) => (
                    <div key={y.name} className="flex items-start gap-2 rounded-lg bg-green-50/50 px-3 py-2">
                      <CircleDot className="mt-0.5 h-3 w-3 shrink-0 text-green-600" />
                      <div>
                        <p className="text-xs font-bold text-green-800">{y.name} <span className="font-normal text-green-600">({y.name_hindi})</span></p>
                        <p className="text-[10px] text-green-700/60">{y.description}</p>
                      </div>
                    </div>
                  ))}
                  {data.muhurta_yogas.inauspicious.map((y) => (
                    <div key={y.name} className="flex items-start gap-2 rounded-lg bg-red-50/50 px-3 py-2">
                      <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
                      <div>
                        <p className="text-xs font-bold text-red-800">{y.name} <span className="font-normal text-red-600">({y.name_hindi})</span></p>
                        <p className="text-[10px] text-red-700/60">{y.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 text-center">
              <Link
                href={`/${DEFAULT_LOCATION.slug}/${displayDate}`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #003636, #004D40)" }}
              >
                <Calendar className="h-4 w-4" />
                Full Panchang for {formatDateLong(displayDate)}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>
        )}

        {/* ── View by City ──────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading gradient="saffron">{festival.name} Panchang by City</SectionHeading>
          <p className="mb-4 text-xs text-[#003636]/40">
            View detailed Panchang for {festival.name} {festival.year} in your city
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/${displayDate}`}
                className="flex items-center gap-1.5 rounded-xl border bg-white px-3 py-2.5 text-sm font-medium text-[#003636] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#C4973B]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[#e36414]" />
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Related Festivals ─────────────────────────── */}
        {related.length > 0 && (
          <section className="mb-10">
            <SectionHeading gradient="gold">Related Hindu Festivals {festival.year}</SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((rf) => (
                <Link
                  key={rf.slug}
                  href={`/hindu-festivals/${rf.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#C4973B]/30 hover:shadow-md"
                >
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{
                      background: rf.category === "vrat"
                        ? "linear-gradient(135deg, #8B1A1A, #6B1010)"
                        : "linear-gradient(135deg, #003636, #004D40)",
                    }}
                  >
                    {rf.category === "vrat" ? <BookOpen className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#003636] group-hover:text-[#C4973B] transition-colors">{rf.name}</p>
                    <p className="text-xs text-[#003636]/40">{rf.nameHindi}</p>
                    <p className="mt-1 text-xs text-[#003636]/50">{formatDate(rf.date)}</p>
                  </div>
                  <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-[#003636]/20 group-hover:text-[#C4973B] transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── FAQs ──────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading gradient="teal">
            Frequently Asked Questions — {festival.name} {festival.year}
          </SectionHeading>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={faq.question}
                className="group rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-[#003636]">
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#003636]/30 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="border-t border-border/50 px-5 py-4 text-sm leading-relaxed text-[#003636]/65">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/hindu-festivals"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#003636] transition-colors hover:text-[#C4973B]"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse All Hindu Festivals
          </Link>
        </div>
      </div>
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────

function SectionHeading({ children, gradient }: { children: React.ReactNode; gradient: "saffron" | "teal" | "gold" }) {
  const g = gradient === "saffron"
    ? "linear-gradient(180deg, #e36414, #C4973B)"
    : gradient === "gold"
      ? "linear-gradient(180deg, #C4973B, #e36414)"
      : "linear-gradient(180deg, #003636, #004D40)";
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-8 w-1 rounded-full" style={{ background: g }} />
      <h2 className="text-xl font-bold text-[#003636] heading-display sm:text-2xl">{children}</h2>
    </div>
  );
}

function StatCell({ label, value, sub, color, small }: { label: string; value: string; sub: string; color?: string; small?: boolean }) {
  return (
    <div className="flex flex-col items-center py-5 sm:py-6">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#003636]/40">{label}</span>
      <span className={`mt-1 font-bold ${small ? "text-lg" : "text-2xl"}`} style={{ color: color || "#003636" }}>{value}</span>
      <span className="text-[10px] text-[#003636]/40">{sub}</span>
    </div>
  );
}

function TimingRow({ icon, label, value, danger, good }: { icon: React.ReactNode; label: string; value: string; danger?: boolean; good?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-[10px] text-[#003636]/40 w-24">{label}</span>
      <span className={`text-xs font-bold ${danger ? "text-red-600" : good ? "text-green-700" : "text-[#003636]"}`}>{value}</span>
    </div>
  );
}

function PanchangInfoCard({ label, value, sublabel, nature, icon }: { label: string; value: string; sublabel?: string; nature: string; icon: React.ReactNode }) {
  const style = getNatureStyle(nature);
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#003636]/40">{label}</p>
        <span className="text-[#003636]/15">{icon}</span>
      </div>
      <p className="mt-2 text-lg font-bold text-[#003636]">{value}</p>
      {sublabel && <p className="mt-0.5 text-xs text-[#003636]/50">{sublabel}</p>}
      <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${style.bg} ${style.text}`}>{style.label}</span>
    </div>
  );
}
