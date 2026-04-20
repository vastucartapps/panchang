import type { Metadata } from "next";
import Link from "next/link";
import { Star, BookOpen, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPillarArticleSchema, IDS, REFS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "What is a Nakshatra? — 27 Lunar Mansions, Pada, Deity & Lord",
  description:
    "A Nakshatra is a lunar mansion in Vedic astrology — one of 27 segments of the ecliptic through which the Moon travels. Complete guide with Pada, deity, ruling planet, and Gana.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/what-is-nakshatra`,
  },
  openGraph: {
    title: "What is a Nakshatra? — Complete Guide",
    description: "Lunar mansions of Vedic astrology. 27 Nakshatras, Pada, deity, ruling planet, Gana, and role in Jyotish.",
    url: `${SITE_CONFIG.url}/what-is-nakshatra`,
    siteName: SITE_CONFIG.name,
    type: "article",
  },
};

const ARTICLE_BODY = `A Nakshatra is a lunar mansion in Vedic astrology — one of 27 equal segments of the ecliptic, each 13 degrees 20 minutes wide, through which the Moon travels as it orbits the Earth. The Moon takes approximately 27.3 days to complete a full cycle through all 27 Nakshatras. In the Vedic Panchang, the Nakshatra occupied by the Moon is the third limb (panch-anga) — after Tithi and Vara (weekday) — and the most deeply meaningful for activity selection, birth chart interpretation, and muhurta. Each Nakshatra has four Padas (quarters) of 3 degrees 20 minutes each, a presiding deity, a ruling planet (used in Vimshottari Dasha cycle calculation), a Gana classification (Deva for divine nature, Manushya for human, Rakshasa for demonic), a Shakti (innate power), and an activity type (Chara for mobile, Sthira for fixed, Ugra for fierce, Mrudu for tender, Mishra for mixed, Kshipra for swift, Sadharana for universal) that guides which activities flourish. The 27 Nakshatras are: Ashwini, Bharani, Krittika, Rohini, Mrigashira, Ardra, Punarvasu, Pushya, Ashlesha, Magha, Purva Phalguni, Uttara Phalguni, Hasta, Chitra, Swati, Vishakha, Anuradha, Jyeshtha, Mula, Purva Ashadha, Uttara Ashadha, Shravana, Dhanishta, Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, and Revati. In Jyotish (Vedic astrology), your Janma Nakshatra (birth star) — the Nakshatra the Moon occupied at your birth moment — shapes personality, compatibility, dasha periods, and ritual timing. Because Nakshatra transitions happen at specific moments and because sunrise differs by city, the Nakshatra governing a civil date in one city can differ from that in another. VastuCart Panchang computes per-city Nakshatras using Lahiri Ayanamsa — the standard sidereal ayanamsa for Indian government panchangs.`;

export default function WhatIsNakshatraPage() {
  const articleSchema = buildPillarArticleSchema({
    id: IDS.subPillarNakshatra,
    url: `${SITE_CONFIG.url}/what-is-nakshatra`,
    headline: "What is a Nakshatra? Lunar Mansions in Vedic Astrology",
    description:
      "Complete guide to Nakshatras — the 27 lunar mansions of Vedic astrology. Pada, deity, ruling planet, Gana, activity type, and role in Jyotish.",
    body: ARTICLE_BODY,
    datePublished: "2025-08-01T00:00:00+05:30",
    dateModified: "2026-04-20T00:00:00+05:30",
    aboutRefs: [REFS.conceptNakshatraSet, REFS.conceptPanchang],
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
          { name: "What is a Nakshatra?", url: `${SITE_CONFIG.url}/what-is-nakshatra` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Star className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            What is a Nakshatra?
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            The 27 lunar mansions of Vedic astrology
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose prose-neutral">
        <p className="text-base leading-relaxed text-foreground">
          A <strong>Nakshatra</strong> is a lunar mansion — one of 27 equal
          segments of the ecliptic, each 13°20&apos; wide, through which the
          Moon travels as it orbits the Earth. The Moon takes approximately
          27.3 days to complete a full cycle through all 27 Nakshatras. In
          the Vedic{" "}
          <Link href="/what-is-panchang" className="text-[var(--color-saffron)] hover:underline">
            Panchang
          </Link>
          , the Nakshatra occupied by the Moon is the third of the five
          limbs (panch-anga) — and in Jyotish (Vedic astrology) it is the
          single most meaningful data point for activity selection, birth
          chart interpretation, and muhurta.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Structure: 27 × 13°20&apos; segments
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          360° of zodiac ÷ 27 = 13.333° per Nakshatra. Each Nakshatra is
          further divided into four <strong>Padas</strong> (quarters), each
          3°20&apos; wide. A full Nakshatra cycle of 27 × 4 = 108 Padas
          corresponds to the sacred number of beads on a traditional mala.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Attributes of each Nakshatra
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Presiding deity (Devata)</strong> — e.g., Ashwini Kumaras
            for Ashwini, Yama for Bharani, Agni for Krittika, Brahma for
            Rohini, Indra for Jyeshtha, Ganesha for Mula, Surya for Uttara
            Phalguni. Worshipping the Nakshatra&apos;s deity on its recurring
            day is a daily remedial practice.
          </li>
          <li>
            <strong>Ruling planet (Dasha lord)</strong> — one of the nine
            grahas. Determines the Vimshottari Dasha sequence for a birth
            chart. E.g., Ketu rules Ashwini, Shukra (Venus) rules Bharani,
            Surya (Sun) rules Krittika, and so on.
          </li>
          <li>
            <strong>Gana classification</strong> — Deva (divine, e.g., Ashwini,
            Mrigashira), Manushya (human, e.g., Bharani, Rohini), or Rakshasa
            (demonic/assertive, e.g., Krittika, Ashlesha). Used in marriage
            compatibility (Guna Milan).
          </li>
          <li>
            <strong>Activity type</strong> — Chara (mobile), Sthira (fixed),
            Ugra (fierce), Mrudu (tender), Mishra (mixed), Kshipra (swift),
            Sadharana (universal). Different activities favor different types.
          </li>
          <li>
            <strong>Shakti (innate power)</strong> — the core energy each
            Nakshatra carries, e.g., quickness for Ashwini, upliftment for
            Bharani, burning for Krittika.
          </li>
          <li>
            <strong>Symbol</strong> — a visual archetype, e.g., horse head
            for Ashwini, yoni for Bharani, razor for Krittika, chariot for
            Rohini.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          The 27 Nakshatras in order
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            "Ashwini", "Bharani", "Krittika",
            "Rohini", "Mrigashira", "Ardra",
            "Punarvasu", "Pushya", "Ashlesha",
            "Magha", "Purva Phalguni", "Uttara Phalguni",
            "Hasta", "Chitra", "Swati",
            "Vishakha", "Anuradha", "Jyeshtha",
            "Mula", "Purva Ashadha", "Uttara Ashadha",
            "Shravana", "Dhanishta", "Shatabhisha",
            "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
          ].map((name, i) => (
            <div key={name} className="rounded-lg border bg-card p-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {i + 1}
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">{name}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Nakshatra in Jyotish (Vedic astrology)
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Your <strong>Janma Nakshatra</strong> — the Nakshatra the Moon
          occupied at your birth moment — shapes personality patterns,
          emotional architecture, and the unfolding of your life&apos;s
          Vimshottari Dasha (120-year planetary period cycle). The first
          Dasha period of your life is ruled by the planet that rules your
          Janma Nakshatra, with the balance determined by how far through
          that Nakshatra the Moon had already traveled at birth.
        </p>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          In marriage compatibility analysis (Guna Milan), eight of the 36
          points come from matching the bride&apos;s and groom&apos;s
          Nakshatras across the Varna, Vashya, Tara, Yoni, Graha Maitri, Gana,
          Bhakoot, and Nadi kootas. A Nakshatra mismatch across multiple
          kootas is the traditional basis for advising against a match (or
          prescribing remedies).
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Why today&apos;s Nakshatra is specific to your city
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          A Nakshatra transition occurs when the Moon crosses from one 13°20&apos;
          segment to the next — at a precise instant. Because a civil date
          is observed from sunrise to sunrise (not midnight to midnight) in
          Vedic tradition, the Nakshatra prevailing at{" "}
          <strong>your city&apos;s local sunrise</strong> governs the
          entire civil day. Near transitions, a city whose sunrise happens
          30 minutes earlier might see the new Nakshatra govern today, while
          a western city still has yesterday&apos;s Nakshatra. This is why
          VastuCart Panchang computes Nakshatra per-city, not nationally.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Activity selection by Nakshatra
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Auspicious for marriage</strong> — Rohini, Mrigashira,
            Magha (partial), Uttara Phalguni, Hasta, Swati, Anuradha, Mula,
            Uttara Ashadha, Uttara Bhadrapada, Revati.
          </li>
          <li>
            <strong>Auspicious for travel</strong> — mobile (Chara) Nakshatras:
            Punarvasu, Swati, Shravana, Dhanishta, Shatabhisha.
          </li>
          <li>
            <strong>Auspicious for education / skill-start</strong> — Mrudu
            Nakshatras: Mrigashira, Chitra, Anuradha, Revati; and swift
            (Kshipra): Ashwini, Pushya, Hasta.
          </li>
          <li>
            <strong>Avoid initiations</strong> — during Ugra Nakshatras
            (Bharani, Magha, Purva Phalguni, Purva Ashadha, Purva Bhadrapada)
            and during Jyeshtha Gandanta / Ashlesha Gandanta junctions.
          </li>
        </ul>

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
                Lunar day — the first limb of the Panchang
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
            href="/todays-nakshatra"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            Today&apos;s Nakshatra in your city
          </Link>
        </div>
      </article>
    </>
  );
}
