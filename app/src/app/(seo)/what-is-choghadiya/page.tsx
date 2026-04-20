import type { Metadata } from "next";
import Link from "next/link";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPillarArticleSchema, IDS, REFS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "What is Choghadiya? — Shubh Muhurat, 8 Periods & Complete Guide",
  description:
    "Choghadiya is the Vedic time-quality system dividing the day into eight 90-minute periods (Amrit, Shubh, Labh, Char, Rog, Kaal, Udveg). Complete guide with weekday tables and activity selection.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/what-is-choghadiya`,
  },
  openGraph: {
    title: "What is Choghadiya? — Complete Guide",
    description: "8 Vedic time-quality periods explained. Shubh, Amrit, Labh vs Rog, Kaal, Udveg.",
    url: `${SITE_CONFIG.url}/what-is-choghadiya`,
    siteName: SITE_CONFIG.name,
    type: "article",
  },
};

const ARTICLE_BODY = `Choghadiya is a Vedic time-quality system that divides each day into eight 90-minute periods, each classified as auspicious, neutral, or inauspicious. The word derives from Sanskrit 'chau' (four) and 'ghadi' (a traditional Indian time unit of 24 minutes) — so each Choghadiya period is 4 ghadis = 96 minutes, though in modern practice each is treated as 1/8 of the day-span between sunrise and sunset. The day is divided into eight day-time (Dinmaan) Choghadiyas from sunrise to sunset, and eight night-time (Ratrimaan) Choghadiyas from sunset to next sunrise. The seven classifications are: Amrit (ambrosia, highly auspicious), Shubh (auspicious, favorable), Labh (profit, good for wealth activities), Char (mobile, neutral, suitable for travel), Rog (disease, inauspicious), Kaal (death/time, most inauspicious), and Udveg (anxiety, inauspicious). The sequence of periods varies by weekday — Sunday starts with Udveg, Monday with Amrit, Tuesday with Rog, Wednesday with Labh, Thursday with Shubh, Friday with Char, Saturday with Kaal — and cycles through all seven in a fixed order. Choghadiya is most widely used across Gujarat, Maharashtra, and Rajasthan for picking muhurat (auspicious moment) for travel, starting a business, financial transactions, and important meetings. Auspicious periods (Amrit, Shubh, Labh) are chosen for new initiations; inauspicious periods (Rog, Kaal, Udveg) are avoided for important undertakings. Char is the universally neutral period, commonly picked for travel. Because the Choghadiya table is calculated from the city's local sunrise and sunset, Choghadiya periods differ between cities — a muhurat that falls in Shubh Choghadiya in Delhi may fall in Amrit Choghadiya in Chennai on the same date due to sunrise differences.`;

export default function WhatIsChoghadiyaPage() {
  const articleSchema = buildPillarArticleSchema({
    id: IDS.subPillarChoghadiya,
    url: `${SITE_CONFIG.url}/what-is-choghadiya`,
    headline: "What is Choghadiya? The Vedic Time-Quality System Explained",
    description:
      "Complete guide to Choghadiya — the 8-period Vedic time-quality system. Amrit, Shubh, Labh, Char, Rog, Kaal, Udveg with weekday tables and activity selection.",
    body: ARTICLE_BODY,
    datePublished: "2025-08-01T00:00:00+05:30",
    dateModified: "2026-04-20T00:00:00+05:30",
    aboutRefs: [REFS.conceptChoghadiya, REFS.conceptPanchang],
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
          { name: "What is Choghadiya?", url: `${SITE_CONFIG.url}/what-is-choghadiya` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Clock className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            What is Choghadiya?
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            The 8-period Vedic time-quality system for muhurat selection
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose prose-neutral">
        <p className="text-base leading-relaxed text-foreground">
          <strong>Choghadiya</strong> (also spelled Chogadiya or Chowghadiya)
          is a Vedic time-quality system that divides each day into eight
          90-minute periods, each classified as auspicious, neutral, or
          inauspicious. The word comes from Sanskrit <em>chau</em> (four) +{" "}
          <em>ghadi</em> (a 24-minute traditional time unit) — so each
          Choghadiya spans 4 ghadis ≈ 96 minutes, though in modern practice
          each period is 1/8 of the day-span from sunrise to sunset.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Day Choghadiya vs Night Choghadiya
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Each day actually has <strong>sixteen</strong> Choghadiya periods:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Dinmaan (day) Choghadiya</strong> — 8 periods from sunrise
            to sunset.
          </li>
          <li>
            <strong>Ratrimaan (night) Choghadiya</strong> — 8 periods from
            sunset to next sunrise.
          </li>
        </ul>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Day Choghadiyas are primarily used for business, travel, and
          ceremonial muhurat. Night Choghadiyas matter for emergency travel,
          wedding rituals that extend into night, and some specific
          observances.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          The seven Choghadiya classifications
        </h2>
        <div className="mt-3 overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Name</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Meaning</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Nature</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Amrit", "Ambrosia / nectar", "Highly auspicious"],
                ["Shubh", "Auspicious", "Favorable"],
                ["Labh", "Profit / gain", "Auspicious for wealth"],
                ["Char", "Mobile / moving", "Neutral — favors travel"],
                ["Rog", "Disease", "Inauspicious"],
                ["Kaal", "Time / death", "Most inauspicious"],
                ["Udveg", "Anxiety", "Inauspicious"],
              ].map(([name, meaning, nature]) => {
                const auspicious = ["Amrit", "Shubh", "Labh"].includes(name);
                const inauspicious = ["Rog", "Kaal", "Udveg"].includes(name);
                const color = auspicious ? "#16a34a" : inauspicious ? "#dc2626" : "#C4973B";
                return (
                  <tr key={name} className="border-t">
                    <td className="px-3 py-2 font-bold" style={{ color }}>
                      {name}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{meaning}</td>
                    <td className="px-3 py-2 text-foreground">{nature}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Choghadiya order by weekday (day periods)
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          The starting Choghadiya differs by weekday, then cycles through the
          seven classifications in fixed order (Amrit → Shubh → Labh → Char →
          Rog → Kaal → Udveg, then wrapping). The first day-time period on
          each weekday:
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["Sun", "Udveg"],
            ["Mon", "Amrit"],
            ["Tue", "Rog"],
            ["Wed", "Labh"],
            ["Thu", "Shubh"],
            ["Fri", "Char"],
            ["Sat", "Kaal"],
          ].map(([day, first]) => (
            <div key={day} className="rounded-lg border bg-card p-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {day}
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">{first}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Activity selection by Choghadiya
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Amrit</strong> — most auspicious. Any new initiation:
            weddings, griha pravesh, starting a business, buying property.
          </li>
          <li>
            <strong>Shubh</strong> — auspicious. General new work,
            investments, worship.
          </li>
          <li>
            <strong>Labh</strong> — auspicious for wealth. Opening an
            account, signing contracts, launching a product.
          </li>
          <li>
            <strong>Char</strong> — neutral, ideal for travel (&quot;mobile
            time&quot;). Short trips, starting a journey.
          </li>
          <li>
            <strong>Rog, Kaal, Udveg</strong> — traditionally avoided for
            important new undertakings. Ongoing work unaffected.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Regional usage
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Choghadiya is most intensively used in <strong>Gujarat,
          Maharashtra, and Rajasthan</strong>. In these regions, many families
          check Choghadiya before travel, shop openings, and daily business
          activities. South Indian traditions often use a similar system
          called <strong>Hora</strong> (planetary hours), which we compute
          alongside Choghadiya in our Panchang. North Indian traditions place
          more emphasis on Tithi + Nakshatra + Rahu Kaal; Choghadiya is less
          central there.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Why Choghadiya is city-specific
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Because Choghadiya is calculated from 1/8 of each city&apos;s
          local sunrise-to-sunset span, the clock times differ meaningfully
          by city. A Shubh Choghadiya starting at 10:15 AM in Delhi might
          start at 10:45 AM in Mumbai on the same date. VastuCart Panchang
          computes Choghadiya per-city using exact sunrise and sunset —{" "}
          <Link href="/choghadiya-today" className="text-[var(--color-saffron)] hover:underline">
            see today&apos;s Choghadiya for your city
          </Link>
          .
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Related Panchang concepts
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                Related inauspicious window
              </p>
            </div>
          </Link>
          <Link
            href="/what-is-muhurta"
            prefetch={false}
            className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[var(--color-saffron)]" />
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                What is Muhurta?
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                The broader auspicious-timing framework
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
            href="/choghadiya-today"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            Today&apos;s Choghadiya in your city
          </Link>
        </div>
      </article>
    </>
  );
}
