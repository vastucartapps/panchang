import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPillarArticleSchema, IDS, REFS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "What is Muhurta? — Auspicious Timing in Vedic Astrology",
  description:
    "Muhurta is the Vedic science of selecting auspicious timing for weddings, housewarming, business, and important life events. Complete guide with Panchang factors, Abhijit Muhurta, and key types.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/what-is-muhurta`,
  },
  openGraph: {
    title: "What is Muhurta? — Complete Guide",
    description: "Vedic auspicious-timing selection for weddings, housewarming, business launches.",
    url: `${SITE_CONFIG.url}/what-is-muhurta`,
    siteName: SITE_CONFIG.name,
    type: "article",
  },
};

const ARTICLE_BODY = `Muhurta is the Vedic science of selecting auspicious timing for important life events — weddings, housewarmings (griha pravesh), business inaugurations, naming ceremonies (Namakaran), sacred thread ceremonies (Upanayana), travel, medical procedures, and major financial decisions. The word muhurta literally means a 48-minute time unit (1/30 of a 24-hour day), but in practice muhurta refers both to specific named windows and to the broader art of timing selection. Muhurta selection combines multiple Panchang factors: the Tithi (lunar day should be favorable for the activity type — avoid Rikta tithis for auspicious work), the Nakshatra (should suit the activity — mobile nakshatras for travel, fixed for foundation-laying), the Vara (weekday — Thursday for learning starts, Friday for marriage, etc.), the Yoga (some Yogas like Vyatipata and Vaidhriti are universally avoided), and the Karana (certain karanas like Vishti/Bhadra are avoided). It also checks against inauspicious windows (Rahu Kaal, Yamaganda, Gulika Kaal — avoid), the Choghadiya (pick Amrit/Shubh/Labh), and specific doshas like Panchaka (five-day window where certain activities are avoided) and Triyodashi dosha. Abhijit Muhurta is a special 48-minute window centered on solar noon that is universally auspicious for almost any activity — the 'victorious hour' named after the Abhijit Nakshatra. Brahma Muhurta is a 96-minute window starting 96 minutes before sunrise, ideal for spiritual practice, meditation, and learning. Beyond these daily windows, major life events get custom muhurta computations that may take days of astrological work — for weddings, a matched-Nakshatra vivah muhurta accounts for both bride's and groom's birth charts. VastuCart's Shubh Muhurta service (muhurta.vastucart.in) handles bespoke muhurta selection; this Panchang page provides the daily raw materials — Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Abhijit Muhurta — that feed into every muhurta calculation.`;

export default function WhatIsMuhurtaPage() {
  const articleSchema = buildPillarArticleSchema({
    id: IDS.subPillarMuhurta,
    url: `${SITE_CONFIG.url}/what-is-muhurta`,
    headline: "What is Muhurta? The Vedic Science of Auspicious Timing",
    description:
      "Complete guide to Muhurta — selecting auspicious timing for weddings, housewarming, business launches. Factors, types, and key daily windows.",
    body: ARTICLE_BODY,
    datePublished: "2025-08-01T00:00:00+05:30",
    dateModified: "2026-04-20T00:00:00+05:30",
    aboutRefs: [REFS.conceptPanchang],
    authorRef: REFS.authorJyotish,
  });

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "What is Panchang?", url: `${SITE_CONFIG.url}/what-is-panchang` },
          { name: "What is Muhurta?", url: `${SITE_CONFIG.url}/what-is-muhurta` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Sparkles className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            What is Muhurta?
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            The Vedic science of auspicious timing
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose prose-neutral">
        <p className="text-base leading-relaxed text-foreground">
          <strong>Muhurta</strong> is the Vedic science of selecting
          auspicious timing for important life events. The word literally
          means a 48-minute time unit (1/30 of a 24-hour day), but in
          practice &ldquo;muhurta&rdquo; refers both to specific named
          windows and to the broader art of timing selection for weddings,
          housewarming, business inaugurations, naming ceremonies, and more.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Why muhurta matters
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Vedic tradition holds that a new undertaking&apos;s success is
          strongly influenced by the astrological quality of the moment it
          begins. A wedding initiated during an auspicious muhurta is
          believed to carry blessings forward; a business launched during
          an inauspicious muhurta is believed to face headwinds regardless
          of merit. Whether or not one accepts the metaphysics, muhurta
          selection is woven into Indian cultural practice across castes,
          regions, and communities.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Factors in muhurta selection
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          A complete muhurta calculation checks all five limbs of the
          Panchang plus several additional factors:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <Link href="/what-is-tithi" className="text-[var(--color-saffron)] hover:underline">
              <strong>Tithi</strong>
            </Link>{" "}
            — the lunar day should suit the activity. Rikta tithis (4, 9,
            14) are avoided for auspicious new work; Purna tithis (5, 10,
            15) favor completions.
          </li>
          <li>
            <Link href="/what-is-nakshatra" className="text-[var(--color-saffron)] hover:underline">
              <strong>Nakshatra</strong>
            </Link>{" "}
            — must match the activity type. Mobile (Chara) nakshatras for
            travel, fixed (Sthira) for foundation-laying, tender (Mrudu)
            for learning.
          </li>
          <li>
            <strong>Vara (weekday)</strong> — Thursday (Guruvara) rules
            learning and wisdom activities, Friday (Shukravara) favors
            marriage and beauty, Sunday (Ravivara) suits leadership and
            authority work.
          </li>
          <li>
            <strong>Yoga</strong> — certain Yogas (Vyatipata, Vaidhriti)
            are universally avoided. Siddha Yoga is universally auspicious.
          </li>
          <li>
            <strong>Karana</strong> — half-Tithis. Vishti (Bhadra) Karana
            is avoided for almost all auspicious undertakings.
          </li>
          <li>
            <Link href="/what-is-rahu-kaal" className="text-[var(--color-saffron)] hover:underline">
              <strong>Rahu Kaal</strong>
            </Link>
            , Yamaganda, Gulika Kaal — the three daily inauspicious windows,
            avoided.
          </li>
          <li>
            <Link href="/what-is-choghadiya" className="text-[var(--color-saffron)] hover:underline">
              <strong>Choghadiya</strong>
            </Link>{" "}
            — pick Amrit, Shubh, or Labh windows.
          </li>
          <li>
            <strong>Panchaka dosha</strong> — a five-day window (Dhanishta
            2nd pada to Revati) where certain construction activities,
            cremations, and journeys south are avoided.
          </li>
          <li>
            <strong>Graha balam (planetary strength)</strong> — ruling
            planet&apos;s position and aspects in the ongoing transit and
            in the individual&apos;s birth chart.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Abhijit Muhurta — the universally auspicious window
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Abhijit Muhurta is a special 48-minute window centered on{" "}
          <strong>solar noon</strong> (exactly midway between sunrise and
          sunset for the day). Named after the Abhijit Nakshatra
          (traditionally considered the 28th Nakshatra, excluded from the
          standard 27-Nakshatra cycle), this window is universally
          considered auspicious — strong enough to override most other
          negative factors. When in doubt about timing, Abhijit Muhurta is
          a safe default for most activities.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Brahma Muhurta — the spiritual hour
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          <strong>Brahma Muhurta</strong> is a 96-minute window starting 96
          minutes before sunrise. This pre-dawn time is considered ideal
          for spiritual practice (japa, meditation, scriptural study),
          yoga, and learning. Vedic tradition recommends waking during
          Brahma Muhurta as foundational for health, clarity, and spiritual
          growth. Our Panchang page shows Brahma Muhurta timing per city.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Types of muhurta
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Vivah Muhurta</strong> — wedding muhurta, computed
            specifically for the bride-groom pair with their birth
            Nakshatras, the wedding date range, and family preferences.
            Usually requires professional astrological computation.
          </li>
          <li>
            <strong>Griha Pravesh Muhurta</strong> — housewarming muhurta.
            Different rules for new construction vs. moving into an existing
            built house.
          </li>
          <li>
            <strong>Namakaran Muhurta</strong> — naming ceremony muhurta,
            traditionally 11 or 12 days after birth.
          </li>
          <li>
            <strong>Vidyarambha Muhurta</strong> — starting formal education,
            often chosen on Vasant Panchami or a Guruvara in Shukla Paksha.
          </li>
          <li>
            <strong>Vahan Muhurta</strong> — purchasing or starting a vehicle.
          </li>
          <li>
            <strong>Shilanyas Muhurta</strong> — foundation-laying for
            construction.
          </li>
          <li>
            <strong>Yatra Muhurta</strong> — starting a journey.
          </li>
          <li>
            <strong>Vyavsaya Muhurta</strong> — starting a business or
            signing founding documents.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Muhurta services (beyond daily Panchang)
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          A daily Panchang (like this one) provides the{" "}
          <strong>raw materials</strong> for muhurta — Tithi, Nakshatra,
          Rahu Kaal, Choghadiya, Abhijit Muhurta timings. These are enough
          to self-select muhurta for routine activities (start a new book,
          travel, small financial decisions).
        </p>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          For <strong>major life events</strong> (weddings, housewarming,
          business launches), muhurta selection also accounts for the
          individual&apos;s birth chart, the specific activity type, and
          family tradition. This requires a qualified astrologer. VastuCart
          runs a dedicated Shubh Muhurta service at{" "}
          <a href="https://muhurta.vastucart.in" className="text-[var(--color-saffron)] hover:underline">
            muhurta.vastucart.in
          </a>{" "}
          for bespoke muhurta consultation.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Related Panchang concepts
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link
            href="/what-is-tithi"
            prefetch={false}
            className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[var(--color-saffron)]" />
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                What is a Tithi?
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Lunar day — foundational for muhurta
              </p>
            </div>
          </Link>
          <Link
            href="/what-is-choghadiya"
            prefetch={false}
            className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[var(--color-saffron)]" />
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                What is Choghadiya?
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                8 time-quality periods per day
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/what-is-panchang"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
          >
            Full Panchang guide
            <ArrowRight className="ml-1.5 inline h-4 w-4" />
          </Link>
          <a
            href="https://muhurta.vastucart.in"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            Shubh Muhurta consultation →
          </a>
        </div>
      </article>
    </>
  );
}
