import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Star, BookOpen, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllFestivals, getUpcomingFestivals } from "@/data/festivals";
import type { Festival } from "@/data/festivals";
import { getTodayISO, formatDateShort } from "@/lib/format";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllCities } from "@/lib/cities";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hindu Festivals & Vrat Dates 2025-2026 | Complete Calendar",
  description:
    "Complete list of Hindu festivals, vrat dates, and auspicious days for 2025-2026. Diwali, Holi, Navratri, Ekadashi, Karwa Chauth dates with Panchang details.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/hindu-festivals`,
  },
  openGraph: {
    title: "Hindu Festivals & Vrat Calendar 2025-2026 | VastuCart Panchang",
    description:
      "Complete Hindu festival calendar with accurate dates, significance, and Panchang details for 200+ cities.",
    url: `${SITE_CONFIG.url}/hindu-festivals`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

const CATEGORY_STYLES: Record<
  Festival["category"],
  { bg: string; text: string; label: string }
> = {
  major: { bg: "bg-[#C4973B]/10", text: "text-[#C4973B]", label: "Major Festival" },
  vrat: { bg: "bg-red-50", text: "text-red-700", label: "Vrat / Fasting" },
  regional: { bg: "bg-blue-50", text: "text-blue-700", label: "Regional" },
};

const FESTIVAL_FAQS = [
  {
    question: "How are Hindu festival dates determined?",
    answer:
      "Hindu festival dates follow the lunisolar calendar (Panchang), based on Tithi (lunar day), Nakshatra (star), and the position of the Sun and Moon. Most festivals fall on specific Tithis, which is why their Gregorian dates change each year.",
  },
  {
    question: "What is the difference between a festival and a vrat?",
    answer:
      "A festival (Utsav/Parv) is a celebration with community gatherings, feasts, and rituals. A Vrat is a religious fasting observance, often dedicated to a specific deity. Some occasions like Maha Shivaratri combine both.",
  },
  {
    question: "Why do Hindu festival dates vary each year?",
    answer:
      "Hindu festivals are based on the lunar calendar which has ~354 days per year (vs. 365 in Gregorian). An extra month (Adhik Maas) is added every 3 years to re-align. This causes festival dates to shift by 10-12 days annually.",
  },
  {
    question: "Which are the most important Hindu festivals?",
    answer:
      "Diwali (festival of lights), Holi (festival of colors), Navratri & Dussehra (victory of good over evil), Janmashtami (Krishna's birthday), and Ganesh Chaturthi are among the most widely celebrated Hindu festivals across India.",
  },
];

export default function HinduFestivalsPage() {
  const today = getTodayISO();
  const upcoming = getUpcomingFestivals(today, 10);
  const festivals2025 = getAllFestivals()
    .filter((f) => f.year === 2025)
    .sort((a, b) => a.date.localeCompare(b.date));
  const festivals2026 = getAllFestivals()
    .filter((f) => f.year === 2026)
    .sort((a, b) => a.date.localeCompare(b.date));
  const topCities = getAllCities().slice(0, 12);

  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          {
            name: "Hindu Festivals",
            url: `${SITE_CONFIG.url}/hindu-festivals`,
          },
        ]}
        faqs={FESTIVAL_FAQS}
      />

      {/* Hero */}
      <section
        className="py-12 sm:py-16"
        style={{
          background:
            "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Calendar className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Hindu Festivals &amp; Vrat Dates
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Complete calendar of major Hindu festivals, vrat dates, and
            auspicious days for 2025-2026
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Upcoming Festivals */}
        {upcoming.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-[#C4973B]" />
              <h2 className="text-xl font-bold text-[var(--color-vedic)] sm:text-2xl">
                Upcoming Festivals
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {upcoming.map((f) => (
                <FestivalCard key={f.slug} festival={f} highlight />
              ))}
            </div>
          </section>
        )}

        {/* 2026 Full Calendar */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-[var(--color-vedic)] sm:text-2xl">
            Hindu Festivals 2026
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {festivals2026.map((f) => (
              <FestivalCard key={f.slug} festival={f} />
            ))}
          </div>
        </section>

        {/* 2025 Full Calendar */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-[var(--color-vedic)] sm:text-2xl">
            Hindu Festivals 2025
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {festivals2025.map((f) => (
              <FestivalCard key={f.slug} festival={f} />
            ))}
          </div>
        </section>

        {/* Editorial content */}
        <section className="mb-12 rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-[#C4973B]" />
            <h2 className="text-lg font-bold text-[var(--color-vedic)]">
              About Hindu Festival Calendar
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              The Hindu calendar (Panchang) is a lunisolar system where festivals
              are anchored to specific Tithis (lunar days), Nakshatras (lunar
              mansions), and solar transits. Unlike the fixed Gregorian calendar,
              Hindu festival dates shift each year as they follow the Moon&apos;s
              cycle.
            </p>
            <p>
              <strong className="text-foreground">Major festivals</strong> like
              Diwali, Holi, and Navratri are celebrated pan-India with regional
              variations. <strong className="text-foreground">Vrat dates</strong>{" "}
              like Ekadashi (11th Tithi) and Pradosh (13th Tithi) occur twice a
              month and are observed by devoted practitioners for spiritual
              merit.
            </p>
            <p>
              Each festival page on VastuCart Panchang shows the complete
              Panchang details for that day — including Tithi, Nakshatra, Yoga,
              Rahu Kaal, and more — so you can plan your observance with full
              astrological context.
            </p>
          </div>
        </section>

        {/* City links */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-[var(--color-vedic)]">
            View Panchang by City
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {topCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-[var(--color-vedic)]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FESTIVAL_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border bg-card"
              >
                <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-foreground">
                  {faq.question}
                </summary>
                <div className="border-t px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function FestivalCard({
  festival,
  highlight,
}: {
  festival: Festival;
  highlight?: boolean;
}) {
  const catStyle = CATEGORY_STYLES[festival.category];
  return (
    <Link
      href={`/hindu-festivals/${festival.slug}`}
      className={`group block rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
        highlight
          ? "border-[#C4973B]/30 bg-[#C4973B]/5"
          : "border-border/50 bg-card"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-bold text-foreground group-hover:text-[#C4973B] transition-colors">
            {festival.name}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {festival.nameHindi}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {formatDateShort(festival.date)}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${catStyle.bg} ${catStyle.text}`}
        >
          {catStyle.label}
        </span>
      </div>
      {festival.deity && (
        <p className="mt-2 text-[11px] text-muted-foreground">
          Deity: {festival.deity}
        </p>
      )}
    </Link>
  );
}
