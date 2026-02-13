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
  Quote,
  Globe,
  Heart,
  Lightbulb,
  ListChecks,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG, DEFAULT_LOCATION, NETWORK_LINKS, getNatureStyle } from "@/lib/constants";
import { getAllFestivals, getFestivalBySlug } from "@/data/festivals";
import type { Festival } from "@/data/festivals";
import { getFestivalContent } from "@/data/festival-content";
import type { FestivalContent } from "@/data/festival-content";
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
const FESTIVAL_HERO_IMAGES: Record<string, string> = {
  diwali: "/images/festivals/diwali.jpg",
  "holika-dahan": "/images/festivals/holi.jpg",
  holi: "/images/festivals/holi.jpg",
  "sharad-navratri": "/images/festivals/navratri.jpg",
  "chaitra-navratri": "/images/festivals/navratri.jpg",
  navratri: "/images/festivals/navratri.jpg",
  dussehra: "/images/festivals/dussehra.jpg",
  vijayadashami: "/images/festivals/dussehra.jpg",
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

function slugToApiKey(slug: string): string {
  return slug.replace(/-\d{4}$/, "").replace(/-/g, "_");
}

async function fetchFestivalData(festival: Festival) {
  const apiKey = slugToApiKey(festival.slug);
  const loc = {
    latitude: DEFAULT_LOCATION.lat,
    longitude: DEFAULT_LOCATION.lng,
    timezone: DEFAULT_LOCATION.tz,
  };

  let data: PanchangResponse | null = null;
  let actualDate = festival.date;

  try {
    data = await fetchPanchang({ targetDate: festival.date, ...loc }, 3600);
  } catch {
    data = null;
  }

  const hasMatch = data?.festivals?.some((f) => f.key === apiKey);

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
  return sorted.slice(0, 6);
}

function buildFaqs(
  festival: Festival,
  data: PanchangResponse | null,
  actualDate: string,
  apiFestival: FestivalEntry | null,
  content: FestivalContent | null,
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

  const deity = apiFestival?.deity || festival.deity;
  if (deity) {
    faqs.push({
      question: `Which deity is worshipped on ${festival.name}?`,
      answer: `${festival.name} is dedicated to ${deity}. Devotees perform special pujas and rituals to seek blessings on this auspicious day.`,
    });
  }

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

  if (data) {
    faqs.push({
      question: `What is the Rahu Kaal on ${festival.name} ${year}?`,
      answer: `On ${festival.name} ${year} (${dateStr}), the Rahu Kaal in ${DEFAULT_LOCATION.name} is from ${formatTime12h(data.timing.rahu_kalam.start_time)} to ${formatTime12h(data.timing.rahu_kalam.end_time)} (${data.timing.rahu_kalam.duration_minutes} minutes). It is advisable to avoid starting new activities during Rahu Kaal.`,
    });
  }

  if (data) {
    faqs.push({
      question: `What is the sunrise and sunset time on ${festival.name} ${year}?`,
      answer: `On ${festival.name} ${year} in ${DEFAULT_LOCATION.name}, sunrise is at ${formatTime12h(data.timing.sunrise)} and sunset is at ${formatTime12h(data.timing.sunset)}. The day duration is ${data.timing.dinamana_hours.toFixed(1)} hours.`,
    });
  }

  if (data) {
    faqs.push({
      question: `What is the Moon phase on ${festival.name} ${year}?`,
      answer: `On ${festival.name} ${year}, the Moon is in ${data.moon_phase.phase_name} phase with ${data.moon_phase.illumination_percent.toFixed(1)}% illumination. The Moon is ${data.moon_phase.is_waxing ? "waxing" : "waning"} (${data.moon_phase.paksha} Paksha).`,
    });
  }

  if (data) {
    faqs.push({
      question: `What is the Nakshatra on ${festival.name} ${year}?`,
      answer: `The prevailing Nakshatra on ${festival.name} ${year} is ${formatPanchangKey(data.panchang.nakshatra.nakshatra)} (Lord: ${data.panchang.nakshatra.lord}, Nature: ${data.panchang.nakshatra.nature}). It is a ${data.panchang.nakshatra.activity_type} type Nakshatra, belonging to ${data.panchang.nakshatra.gana} Gana.`,
    });
  }

  // Content-based FAQs
  if (content?.celebrationGuide) {
    faqs.push({
      question: `How to celebrate ${festival.name}?`,
      answer: content.celebrationGuide.map((g) => `${g.step}: ${g.detail}`).join(" "),
    });
  }

  if (content?.regionalNames && content.regionalNames.length > 0) {
    faqs.push({
      question: `What are the regional names of ${festival.name}?`,
      answer: `${festival.name} is celebrated across India with different names: ${content.regionalNames.map((r) => `${r.name} in ${r.region}`).join(", ")}. Each region has its own unique customs and traditions.`,
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
  const content = getFestivalContent(slug);

  return {
    title: `${festival.name} ${festival.year} — Date, Tithi, Significance, Story & Panchang Details`,
    description: `${festival.name} (${festival.nameHindi}) falls on ${formattedDate}. Know the exact Tithi, Nakshatra, Rahu Kaal, sunrise time, significance, traditions, and complete Panchang details for ${festival.name} ${festival.year}.${content?.story ? ` ${content.story.slice(0, 80)}...` : ""}`,
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
  const content = getFestivalContent(slug);

  const cities = getAllCities().slice(0, 20);
  const faqs = buildFaqs(festival, data, actualDate, apiFestival, content);
  const related = getRelatedFestivals(festival);
  const heroImage = getFestivalHeroImage(slug);

  const displayDate = actualDate;
  const formattedDate = formatDate(displayDate);

  const hinduMonth = data?.panchang.tithi.hindu_month;
  const tithiName = data ? formatPanchangKey(data.panchang.tithi.tithi) : null;
  const moonPhase = data?.moon_phase;
  const deity = apiFestival?.deity || festival.deity;
  const apiDesc = apiFestival?.description;

  // Days until festival
  const now = new Date();
  const festDate = new Date(displayDate);
  const daysUntil = Math.ceil((festDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

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
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(165deg, #003636 0%, #004D40 30%, #1B3A2D 60%, #2C1810 100%)",
          }}
        />

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

          {/* Category + Countdown */}
          <div className="mb-5 flex items-center justify-center gap-3">
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
            {daysUntil > 0 && (
              <span className="rounded-full bg-white/10 px-4 py-1 text-[11px] font-bold text-white/60">
                {daysUntil} days away
              </span>
            )}
            {daysUntil === 0 && (
              <span className="rounded-full bg-green-500/20 px-4 py-1 text-[11px] font-bold text-green-300">
                Today
              </span>
            )}
            {daysUntil < 0 && (
              <span className="rounded-full bg-white/10 px-4 py-1 text-[11px] font-bold text-white/40">
                {Math.abs(daysUntil)} days ago
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            {festival.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-[#C4973B] sm:text-2xl">
            {festival.nameHindi}
          </p>

          <div className="mt-5 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />

          <p className="mt-5 text-lg text-white/60">{formattedDate}</p>

          {hinduMonth && tithiName && (
            <p className="mt-2 text-sm tracking-wide text-[#C4973B]/70">
              {hinduMonth.month}{hinduMonth.is_adhik ? " (Adhik)" : ""} &middot; {data!.panchang.tithi.paksha} Paksha &middot; {tithiName}
            </p>
          )}

          {deity && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-white/40">
              <Sparkles className="h-3.5 w-3.5 text-[#C4973B]/60" />
              Dedicated to {deity}
            </p>
          )}

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
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">

        {/* ── Festival Greeting Card ─────────────────────── */}
        {content?.greeting && (
          <section className="mb-10">
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-center"
              style={{
                background: "linear-gradient(135deg, #003636 0%, #004D40 50%, #1B3A2D 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative">
                <Quote className="mx-auto h-8 w-8 text-[#C4973B]/30" />
                <p className="mt-4 text-lg sm:text-xl font-medium text-white/90 leading-relaxed max-w-2xl mx-auto">
                  {content.greeting.english}
                </p>
                <p className="mt-3 text-base text-[#C4973B]/80 font-medium">
                  {content.greeting.hindi}
                </p>
                <div className="mt-5 h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#C4973B]/30 to-transparent" />
                <p className="mt-3 text-xs text-white/30 uppercase tracking-[0.15em]">
                  {festival.name} {festival.year}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── API Festival / Vrat Cards ──────────────────── */}
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

        {/* ── About Section ──────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading icon={<BookOpen className="h-5 w-5" />} gradient="saffron">About {festival.name}</SectionHeading>
          <div className="rounded-2xl border border-border/50 bg-white p-6 shadow-sm">
            <p className="text-base leading-relaxed text-[#003636]/75">
              {festival.description}
            </p>
            {apiDesc && apiDesc !== festival.description && (
              <p className="mt-4 border-t border-border/30 pt-4 text-sm leading-relaxed text-[#003636]/60 italic">
                {apiDesc}
              </p>
            )}
          </div>
        </section>

        {/* ── The Legend / Story ──────────────────────────── */}
        {content?.story && (
          <section className="mb-10">
            <SectionHeading icon={<BookOpen className="h-5 w-5" />} gradient="gold">The Legend of {festival.name}</SectionHeading>
            <div
              className="relative overflow-hidden rounded-3xl p-6 sm:p-8"
              style={{
                background: "linear-gradient(180deg, #FFFBF0 0%, #FFF8E6 100%)",
                borderWidth: 1,
                borderColor: "rgba(196,151,59,0.15)",
              }}
            >
              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 h-32 w-32 opacity-[0.06]"
                style={{
                  background: "radial-gradient(circle at 100% 0%, #C4973B, transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="flex gap-4">
                  <div className="hidden sm:block shrink-0 mt-1">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "linear-gradient(135deg, #C4973B, #8B6914)" }}
                    >
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-[15px] leading-[1.8] text-[#3B2512]/80">
                    {content.story}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Significance + Traditions (side by side) ───── */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#C4973B]/15 bg-[#C4973B]/[0.03] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-[#C4973B]" />
              <h2 className="text-lg font-bold text-[#003636]">Significance</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#003636]/65">{festival.significance}</p>

            {hinduMonth && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2.5">
                <Calendar className="h-3.5 w-3.5 text-[#C4973B]" />
                <span className="text-xs text-[#003636]/50">Hindu Month:</span>
                <span className="text-xs font-semibold text-[#003636]">
                  {hinduMonth.month}{hinduMonth.is_adhik ? " (Adhik)" : ""}
                </span>
              </div>
            )}

            {data && (
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2.5">
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

            {festival.tithi && (
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2.5">
                <Calendar className="h-3.5 w-3.5 text-[#C4973B]" />
                <span className="text-xs text-[#003636]/50">Traditional Tithi:</span>
                <span className="text-xs font-semibold text-[#003636]">{festival.tithi}</span>
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-[#e36414]" />
              <h2 className="text-lg font-bold text-[#003636]">Traditions &amp; Customs</h2>
            </div>
            <div className="space-y-2.5">
              {festival.traditions.map((tradition, i) => (
                <div key={tradition} className="flex items-start gap-3 rounded-xl border border-border/50 bg-white px-4 py-3 shadow-sm">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #003636, #004D40)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#003636]/80 leading-relaxed">{tradition}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── How to Celebrate Guide ─────────────────────── */}
        {content?.celebrationGuide && content.celebrationGuide.length > 0 && (
          <section className="mb-10">
            <SectionHeading icon={<ListChecks className="h-5 w-5" />} gradient="teal">
              How to Celebrate {festival.name}
            </SectionHeading>
            <div className="space-y-4">
              {content.celebrationGuide.map((guide, i) => (
                <div key={guide.step} className="flex gap-4">
                  {/* Step number with connecting line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md"
                      style={{
                        background: "linear-gradient(135deg, #003636, #004D40)",
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < content.celebrationGuide!.length - 1 && (
                      <div className="mt-2 h-full w-px bg-gradient-to-b from-[#003636]/20 to-transparent" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-border/50 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-[#003636]">{guide.step}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#003636]/60">{guide.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Did You Know? Facts ────────────────────────── */}
        {content?.facts && content.facts.length > 0 && (
          <section className="mb-10">
            <SectionHeading icon={<Lightbulb className="h-5 w-5" />} gradient="gold">
              Did You Know?
            </SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.facts.map((fact, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm"
                  style={{ borderColor: "rgba(196,151,59,0.12)" }}
                >
                  <div
                    className="absolute top-0 left-0 h-full w-1 rounded-l-2xl"
                    style={{ background: "linear-gradient(180deg, #C4973B, #e36414)" }}
                  />
                  <div className="flex items-start gap-3 pl-2">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #C4973B, #8B6914)" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-[#003636]/70">{fact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Regional Celebrations ──────────────────────── */}
        {content?.regionalNames && content.regionalNames.length > 0 && (
          <section className="mb-10">
            <SectionHeading icon={<Globe className="h-5 w-5" />} gradient="saffron">
              {festival.name} Across India
            </SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.regionalNames.map((r) => (
                <div key={r.region} className="rounded-2xl border border-border/50 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-[#e36414]" />
                    <span className="text-xs font-bold uppercase tracking-wide text-[#003636]/40">{r.region}</span>
                  </div>
                  <p className="text-base font-bold text-[#003636]">{r.name}</p>
                  {r.note && (
                    <p className="mt-1 text-xs text-[#003636]/50">{r.note}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Spiritual Benefits ─────────────────────────── */}
        {content?.benefits && content.benefits.length > 0 && (
          <section className="mb-10">
            <SectionHeading icon={<Heart className="h-5 w-5" />} gradient="teal">
              Benefits of Observing {festival.name}
            </SectionHeading>
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, rgba(0,54,54,0.03), rgba(0,77,64,0.05))",
                borderWidth: 1,
                borderColor: "rgba(0,54,54,0.08)",
              }}
            >
              <div className="space-y-3">
                {content.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#003636]/10">
                      <Check className="h-3 w-3 text-[#003636]" />
                    </div>
                    <p className="text-sm leading-relaxed text-[#003636]/70">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Decorative Divider ─────────────────────────── */}
        <div className="my-12 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C4973B]/20" />
          <Sparkles className="h-4 w-4 text-[#C4973B]/20" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C4973B]/20" />
        </div>

        {/* ── Suitable & Avoid Activities ─────────────────── */}
        {data && (data.day_quality.suitable_activities.length > 0 || data.day_quality.avoid_activities.length > 0) && (
          <section className="mb-10">
            <SectionHeading icon={<Check className="h-5 w-5" />} gradient="teal">
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

        {/* ── Panchang Details Grid ──────────────────────── */}
        {data && (
          <section className="mb-10">
            <SectionHeading icon={<Calendar className="h-5 w-5" />} gradient="teal">
              Panchang Details — {festival.name} {festival.year}
            </SectionHeading>
            <p className="mb-5 text-xs text-[#003636]/40">
              Panchang for {DEFAULT_LOCATION.name} on {formattedDate}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Tithi */}
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#003636]/40">Tithi</p>
                  <Moon className="h-4 w-4 text-[#003636]/15" />
                </div>
                <p className="mt-2 text-xl font-bold text-[#003636]">{tithiName}</p>
                <p className="mt-0.5 text-xs text-[#003636]/50">{data.panchang.tithi.paksha} Paksha</p>
                <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getNatureStyle(data.panchang.tithi.nature).bg} ${getNatureStyle(data.panchang.tithi.nature).text}`}>
                  {getNatureStyle(data.panchang.tithi.nature).label}
                </span>
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

              <PanchangInfoCard
                label="Nakshatra"
                value={formatPanchangKey(data.panchang.nakshatra.nakshatra)}
                sublabel={`Lord: ${data.panchang.nakshatra.lord} · ${data.panchang.nakshatra.gana} Gana`}
                nature={data.panchang.nakshatra.nature}
                icon={<Sparkles className="h-4 w-4" />}
              />

              <PanchangInfoCard
                label="Yoga"
                value={formatPanchangKey(data.panchang.yoga.yoga)}
                sublabel={data.panchang.yoga.description || undefined}
                nature={data.panchang.yoga.nature}
                icon={<Star className="h-4 w-4" />}
              />

              <PanchangInfoCard
                label="Karana"
                value={formatPanchangKey(data.panchang.karana.karana)}
                sublabel={`Type: ${data.panchang.karana.type}`}
                nature={data.panchang.karana.nature}
                icon={<BookOpen className="h-4 w-4" />}
              />

              {moonPhase && (
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#003636]/40">Moon Phase</p>
                    <Moon className="h-4 w-4 text-[#003636]/15" />
                  </div>
                  <p className="mt-2 text-xl font-bold text-[#003636]">{moonPhase.phase_name}</p>
                  <p className="mt-0.5 text-xs text-[#003636]/50">
                    {moonPhase.illumination_percent.toFixed(1)}% illuminated · {moonPhase.is_waxing ? "Waxing" : "Waning"}
                  </p>
                  <p className="mt-1 text-[10px] text-[#003636]/40">
                    Age: {moonPhase.age_days.toFixed(1)} days
                  </p>
                </div>
              )}

              <div className="rounded-2xl border bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#003636]/40">
                  Key Timings
                </p>
                <div className="mt-3 space-y-2.5">
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

            {/* Muhurta Yogas */}
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

        {/* ── Decorative Divider ─────────────────────────── */}
        <div className="my-12 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C4973B]/20" />
          <Sparkles className="h-4 w-4 text-[#C4973B]/20" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C4973B]/20" />
        </div>

        {/* ── Explore Our Ecosystem CTAs ──────────────────── */}
        <section className="mb-10">
          <SectionHeading icon={<Sparkles className="h-5 w-5" />} gradient="gold">
            Explore More on VastuCart
          </SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <EcosystemCard
              title="Daily Panchang"
              description={`View complete Panchang for ${formattedDate} in your city`}
              href={`/${DEFAULT_LOCATION.slug}/${displayDate}`}
              icon={<Calendar className="h-5 w-5" />}
              gradient="linear-gradient(135deg, #003636, #004D40)"
            />
            <EcosystemCard
              title="Monthly Calendar"
              description="Browse the full monthly Panchang calendar view"
              href={`/${DEFAULT_LOCATION.slug}/calendar`}
              icon={<Calendar className="h-5 w-5" />}
              gradient="linear-gradient(135deg, #004D40, #1B3A2D)"
            />
            <EcosystemCard
              title="Free Kundali"
              description="Generate your birth chart with detailed analysis"
              href={NETWORK_LINKS.kundali}
              icon={<Star className="h-5 w-5" />}
              gradient="linear-gradient(135deg, #C4973B, #8B6914)"
              external
            />
            <EcosystemCard
              title="Muhurta Finder"
              description="Find the most auspicious time for any activity"
              href={NETWORK_LINKS.muhurta}
              icon={<Clock className="h-5 w-5" />}
              gradient="linear-gradient(135deg, #e36414, #C4973B)"
              external
            />
            <EcosystemCard
              title="Daily Horoscope"
              description="Read your zodiac predictions for today"
              href={NETWORK_LINKS.horoscope}
              icon={<Sun className="h-5 w-5" />}
              gradient="linear-gradient(135deg, #8B1A1A, #6B1010)"
              external
            />
            <EcosystemCard
              title="Stotra & Mantras"
              description="Sacred chants, stotras, and aarti collection"
              href={NETWORK_LINKS.stotra}
              icon={<BookOpen className="h-5 w-5" />}
              gradient="linear-gradient(135deg, #1B3A2D, #003636)"
              external
            />
          </div>
        </section>

        {/* ── View by City ──────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading icon={<MapPin className="h-5 w-5" />} gradient="saffron">{festival.name} Panchang by City</SectionHeading>
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
            <SectionHeading icon={<Flame className="h-5 w-5" />} gradient="gold">Related Hindu Festivals {festival.year}</SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                    <p className="font-bold text-[#003636] group-hover:text-[#C4973B] transition-colors text-sm">{rf.name}</p>
                    <p className="text-xs text-[#003636]/40">{rf.nameHindi}</p>
                    <p className="mt-1 text-xs text-[#003636]/50">{formatDate(rf.date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── FAQs ──────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading icon={<BookOpen className="h-5 w-5" />} gradient="teal">
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

function SectionHeading({ children, gradient, icon }: { children: React.ReactNode; gradient: "saffron" | "teal" | "gold"; icon?: React.ReactNode }) {
  const g = gradient === "saffron"
    ? "linear-gradient(180deg, #e36414, #C4973B)"
    : gradient === "gold"
      ? "linear-gradient(180deg, #C4973B, #e36414)"
      : "linear-gradient(180deg, #003636, #004D40)";
  const iconColor = gradient === "saffron"
    ? "#e36414"
    : gradient === "gold"
      ? "#C4973B"
      : "#003636";
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-8 w-1 rounded-full" style={{ background: g }} />
      {icon && <span style={{ color: iconColor }}>{icon}</span>}
      <h2 className="text-xl font-bold text-[#003636] tracking-tight sm:text-2xl">{children}</h2>
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
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#003636]/40">{label}</p>
        <span className="text-[#003636]/15">{icon}</span>
      </div>
      <p className="mt-2 text-xl font-bold text-[#003636]">{value}</p>
      {sublabel && <p className="mt-0.5 text-xs text-[#003636]/50">{sublabel}</p>}
      <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${style.bg} ${style.text}`}>{style.label}</span>
    </div>
  );
}

function EcosystemCard({ title, description, href, icon, gradient, external }: { title: string; description: string; href: string; icon: React.ReactNode; gradient: string; external?: boolean }) {
  const Tag = external ? "a" : Link;
  const extraProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Tag
      href={href}
      className="group flex items-start gap-3 rounded-2xl border border-border/50 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      {...extraProps}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
        style={{ background: gradient }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-bold text-[#003636] group-hover:text-[#C4973B] transition-colors">{title}</p>
          {external && <ExternalLink className="h-3 w-3 text-[#003636]/20" />}
        </div>
        <p className="mt-0.5 text-xs text-[#003636]/50 leading-relaxed">{description}</p>
      </div>
    </Tag>
  );
}
