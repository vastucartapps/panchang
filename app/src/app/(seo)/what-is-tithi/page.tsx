import type { Metadata } from "next";
import Link from "next/link";
import { Moon, BookOpen, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPillarArticleSchema, IDS, REFS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "What is a Tithi? — Lunar Day, Paksha & Deity Complete Guide",
  description:
    "A Tithi is the lunar day of the Hindu Panchang — 30 per month, calculated from the Sun-Moon angular distance. Complete guide with Paksha, deity, category, and how it differs by city.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/what-is-tithi`,
  },
  openGraph: {
    title: "What is a Tithi? — Complete Guide",
    description: "Lunar day of the Hindu Panchang. 30 Tithis per month, Sun-Moon angular distance explained, with Paksha, deity, and category.",
    url: `${SITE_CONFIG.url}/what-is-tithi`,
    siteName: SITE_CONFIG.name,
    type: "article",
  },
};

const ARTICLE_BODY = `A Tithi is the lunar day in the Hindu calendar — one of the five limbs (panch-anga) of the Vedic Panchang. There are 30 Tithis per lunar month, calculated from the angular distance between the Sun and the Moon. Each Tithi spans 12 degrees of angular separation, so 30 × 12° = 360° completes one full lunar cycle. The 30 Tithis are split into two pakshas: Shukla Paksha (the waxing 15 days ending at Purnima, the full moon) and Krishna Paksha (the waning 15 days ending at Amavasya, the new moon). Each Tithi has a presiding deity, a category (Nanda, Bhadra, Jaya, Rikta, or Purna), a nature (Mangala/Shubh for auspicious, Ashubh for inauspicious), and a role in vrat, festival, and muhurta selection. Because a Tithi can start or end at any moment of the day, the Tithi prevailing at sunrise governs the civil day for religious observances — and since sunrise in different Indian cities differs by several minutes, the governing Tithi can differ by city near transition moments. The 15 Tithis per paksha are: Pratipada, Dwitiya, Tritiya, Chaturthi, Panchami, Shashthi, Saptami, Ashtami, Navami, Dashami, Ekadashi, Dwadashi, Trayodashi, Chaturdashi, and Purnima or Amavasya (culminating). Major religious observances anchor to specific Tithis — Ekadashi (eleventh) is observed with fasting by Vaishnavas, Chaturdashi is sacred to Shiva, Shashthi is sacred to Skanda, and Amavasya and Purnima are universally significant for ancestral rituals and spiritual practice respectively. VastuCart Panchang computes today's Tithi for 200+ Indian cities using the Drik Ganita (real-sky) system with Lahiri Ayanamsa, recomputed daily at local sunrise.`;

export default function WhatIsTithiPage() {
  const articleSchema = buildPillarArticleSchema({
    id: IDS.subPillarTithi,
    url: `${SITE_CONFIG.url}/what-is-tithi`,
    headline: "What is a Tithi? The Lunar Day in the Hindu Panchang",
    description:
      "Complete guide to the Tithi — the lunar day of the Hindu calendar. 30 Tithis, Shukla/Krishna Paksha, deities, categories, and why it differs by city sunrise.",
    body: ARTICLE_BODY,
    datePublished: "2025-08-01T00:00:00+05:30",
    dateModified: "2026-04-20T00:00:00+05:30",
    aboutRefs: [REFS.conceptTithiSet, REFS.conceptPanchang],
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
          { name: "What is a Tithi?", url: `${SITE_CONFIG.url}/what-is-tithi` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Moon className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            What is a Tithi?
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            The lunar day of the Hindu Panchang
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose prose-neutral">
        <p className="text-base leading-relaxed text-foreground">
          A <strong>Tithi</strong> is the lunar day in the Hindu calendar —
          one of the five limbs (panch-anga) that give the{" "}
          <Link href="/what-is-panchang" className="text-[var(--color-saffron)] hover:underline">
            Panchang
          </Link>{" "}
          its name. There are 30 Tithis per lunar month, calculated from the
          angular distance between the Sun and the Moon. Each Tithi spans
          exactly 12 degrees of angular separation (30 × 12° = 360°, one
          full cycle).
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          The two Pakshas
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          The 30 Tithis split into two fortnights:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Shukla Paksha</strong> — the waxing 15 days from the day
            after Amavasya (new moon) to Purnima (full moon). The moon grows
            brighter each night. Traditionally favored for growth-oriented
            rituals, weddings, and new beginnings.
          </li>
          <li>
            <strong>Krishna Paksha</strong> — the waning 15 days from the day
            after Purnima to Amavasya. The moon darkens each night. Favored
            for inward practice, pitra (ancestor) rituals, and completion
            work.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          The 15 Tithi names
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Each paksha has the same 15 Tithi names, differing only in which
          paksha they fall under:
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            ["Pratipada", "1"], ["Dwitiya", "2"], ["Tritiya", "3"],
            ["Chaturthi", "4"], ["Panchami", "5"], ["Shashthi", "6"],
            ["Saptami", "7"], ["Ashtami", "8"], ["Navami", "9"],
            ["Dashami", "10"], ["Ekadashi", "11"], ["Dwadashi", "12"],
            ["Trayodashi", "13"], ["Chaturdashi", "14"], ["Purnima/Amavasya", "15"],
          ].map(([name, num]) => (
            <div key={name} className="rounded-lg border bg-card p-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {num}
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">{name}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Tithi categories (five groups of three)
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          The 15 Tithis also group into five categories (each containing three
          Tithis) that describe the general nature of activities favored:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Nanda (joy)</strong> — 1, 6, 11 — learning, celebrations,
            new ventures.
          </li>
          <li>
            <strong>Bhadra (welfare)</strong> — 2, 7, 12 — travel, healing,
            sustained work.
          </li>
          <li>
            <strong>Jaya (victory)</strong> — 3, 8, 13 — competition, strategic
            moves, conflict resolution.
          </li>
          <li>
            <strong>Rikta (empty)</strong> — 4, 9, 14 — traditionally avoided
            for auspicious undertakings, suits cleansing and banishment rituals.
          </li>
          <li>
            <strong>Purna (complete)</strong> — 5, 10, 15 — fulfillment,
            completions, generous giving.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Why the Tithi is specific to your city
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          A Tithi can start or end at any moment of the day. For religious
          observances (festivals, vrat, muhurta), the Tithi prevailing at{" "}
          <strong>sunrise</strong> governs the entire civil day. Because
          sunrise in Indian cities differs by several minutes — earlier in
          the east, later in the west — the Tithi governing today&apos;s
          date can differ between cities near a Tithi transition. A festival
          observed on Chaturdashi in Kolkata might fall on Trayodashi in
          Mumbai if the transition happened between their respective sunrises.
        </p>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          This is why VastuCart Panchang computes each city&apos;s Tithi
          individually, using the city&apos;s exact latitude, longitude, and
          timezone to calculate local sunrise before determining the governing
          Tithi. The result you see on our page is correct for{" "}
          <Link href="/new-delhi/todays-tithi/" className="text-[var(--color-saffron)] hover:underline">
            your city specifically
          </Link>
          , not a generic national value.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Major religious observances by Tithi
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Ekadashi (11th)</strong> — fasted twice monthly by
            Vaishnavas; Nirjala Ekadashi (Shukla Paksha of Jyestha) is the
            most austere.
          </li>
          <li>
            <strong>Chaturdashi (14th)</strong> — Krishna Paksha Chaturdashi
            is sacred to Shiva; Maha Shivratri is the grand annual
            observance.
          </li>
          <li>
            <strong>Purnima (Full Moon, 15th of Shukla)</strong> — monthly
            observance with bathing in sacred rivers; Guru Purnima, Buddha
            Purnima, Kartik Purnima are major annual festivals.
          </li>
          <li>
            <strong>Amavasya (New Moon, 15th of Krishna)</strong> — monthly
            pitra tarpan (ancestral offerings); Mahalaya Amavasya is the
            major annual pitra paksha day.
          </li>
          <li>
            <strong>Chaturthi (4th)</strong> — Krishna Paksha Chaturthi is
            Ganesh Chaturthi vrat; Vinayak Chaturthi (Shukla) is Ganesha
            worship.
          </li>
          <li>
            <strong>Shashthi (6th)</strong> — sacred to Skanda/Murugan.
          </li>
          <li>
            <strong>Saptami (7th)</strong> — Surya worship day (Ratha Saptami,
            etc.).
          </li>
          <li>
            <strong>Ashtami (8th)</strong> — Krishna Janmashtami falls on
            Krishna Paksha Ashtami of Bhadrapada; Durga Ashtami during
            Navratri is sacred to the Goddess.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Tithi vs. Western calendar date
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          The Western (Gregorian) calendar is purely solar — each date is a
          fixed civil day. The Hindu Panchang is luni-solar — Tithi tracks
          the Moon, while the Vikram Samvat year tracks solar position. This
          is why Hindu festivals fall on different Western dates each year:
          the underlying Tithi is what matters, not the Gregorian date. For
          example, Diwali (Amavasya of Kartik, Shukla Paksha Pratipada of
          Kartik for some traditions) falls in late October to mid-November
          depending on when that Amavasya occurs in the solar year.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Related Panchang concepts
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link
            href="/what-is-nakshatra"
            prefetch={false}
            className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[var(--color-saffron)]" />
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                What is a Nakshatra?
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Lunar mansion — 27 segments of the ecliptic
              </p>
            </div>
          </Link>
          <Link
            href="/what-is-rahu-kaal"
            prefetch={false}
            className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[var(--color-saffron)]" />
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                What is Rahu Kaal?
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Inauspicious 90-minute window each day
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
          <Link
            href="/todays-tithi"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            Today&apos;s Tithi in your city
          </Link>
        </div>
      </article>
    </>
  );
}
