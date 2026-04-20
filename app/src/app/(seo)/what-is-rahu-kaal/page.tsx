import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, BookOpen, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPillarArticleSchema, IDS, REFS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "What is Rahu Kaal? — Complete Guide to the Inauspicious Window",
  description:
    "Rahu Kaal is the inauspicious 90-minute window each day ruled by the shadow planet Rahu. Complete guide to its calculation, what to avoid, weekday timings, and how it differs by city.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/what-is-rahu-kaal`,
  },
  openGraph: {
    title: "What is Rahu Kaal? — Complete Guide",
    description: "The inauspicious 90-minute window each day. Calculation, weekday timings, and what to avoid.",
    url: `${SITE_CONFIG.url}/what-is-rahu-kaal`,
    siteName: SITE_CONFIG.name,
    type: "article",
  },
};

const ARTICLE_BODY = `Rahu Kaal is an inauspicious 90-minute window that occurs every day, ruled by the shadow planet Rahu (north lunar node) in Vedic astrology. It is calculated as one-eighth of the period between sunrise and sunset — so a day with 12 hours between sunrise and sunset has a Rahu Kaal of exactly 90 minutes; longer or shorter days scale proportionally. The position of Rahu Kaal within the day is fixed by weekday: on Monday it is the second 1/8th segment after sunrise, Tuesday the seventh, Wednesday the fifth, Thursday the sixth, Friday the fourth, Saturday the third, and Sunday the eighth (last). Traditional Vedic practice advises avoiding important initiations during Rahu Kaal: starting a new business venture, embarking on a journey, conducting auspicious ceremonies (weddings, griha pravesh, naming, thread ceremony), and making major financial or life decisions. Work already in progress can continue unaffected — Rahu Kaal primarily affects initiations. Two related inauspicious windows accompany Rahu Kaal: Yamaganda (ruled by Yama, the deity of death) and Gulika Kaal (ruled by Gulika, the son of Shani). Together these three constitute the inauspicious muhurtas of the day. Because sunrise and sunset differ by city, Rahu Kaal timing is city-specific — it can shift by 30+ minutes between Kolkata and Mumbai on the same date. VastuCart Panchang computes Rahu Kaal individually for 200+ Indian cities using each city's exact sunrise and sunset calculated from its latitude, longitude, and timezone via the Drik Ganita system.`;

export default function WhatIsRahuKaalPage() {
  const articleSchema = buildPillarArticleSchema({
    id: IDS.subPillarRahuKaal,
    url: `${SITE_CONFIG.url}/what-is-rahu-kaal`,
    headline: "What is Rahu Kaal? The Inauspicious 90-Minute Window Explained",
    description:
      "Complete guide to Rahu Kaal — the daily inauspicious window in Vedic astrology. Calculation, weekday timings, what to avoid, and related windows.",
    body: ARTICLE_BODY,
    datePublished: "2025-08-01T00:00:00+05:30",
    dateModified: "2026-04-20T00:00:00+05:30",
    aboutRefs: [REFS.conceptRahuKaal, REFS.conceptPanchang],
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
          { name: "What is Rahu Kaal?", url: `${SITE_CONFIG.url}/what-is-rahu-kaal` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ShieldAlert className="mx-auto h-10 w-10 text-[#ef4444]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            What is Rahu Kaal?
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            The inauspicious 90-minute window each day
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose prose-neutral">
        <p className="text-base leading-relaxed text-foreground">
          <strong>Rahu Kaal</strong> (also spelled Rahu Kalam or Rahu Kala) is
          an inauspicious 90-minute window that occurs every day, ruled by the
          shadow planet Rahu (north lunar node) in Vedic astrology.
          Traditional practice advises avoiding important initiations during
          this period.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          How Rahu Kaal is calculated
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Rahu Kaal is exactly <strong>one-eighth</strong> of the period from
          sunrise to sunset. On a typical day with 12 hours of daylight, that
          is 90 minutes. On longer summer days it can stretch to 100+ minutes,
          and on shorter winter days it can shrink below 80 minutes — it
          scales with the length of the day.
        </p>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          The <em>position</em> of Rahu Kaal within the day is determined by
          the weekday. Starting from sunrise and dividing into eight equal
          segments:
        </p>
        <div className="mt-3 overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Weekday</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Segment (from sunrise)</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Approx. timing</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Monday", "2nd (1.5h after sunrise)", "7:30 AM – 9:00 AM"],
                ["Tuesday", "7th", "3:00 PM – 4:30 PM"],
                ["Wednesday", "5th", "12:00 PM – 1:30 PM"],
                ["Thursday", "6th", "1:30 PM – 3:00 PM"],
                ["Friday", "4th", "10:30 AM – 12:00 PM"],
                ["Saturday", "3rd", "9:00 AM – 10:30 AM"],
                ["Sunday", "8th (last before sunset)", "4:30 PM – 6:00 PM"],
              ].map(([day, seg, time]) => (
                <tr key={day} className="border-t">
                  <td className="px-3 py-2 font-medium text-foreground">{day}</td>
                  <td className="px-3 py-2 text-muted-foreground">{seg}</td>
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground italic">
          Approximate timings assume a 6:00 AM sunrise / 6:00 PM sunset.
          Actual Rahu Kaal shifts with your city&apos;s real sunrise.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          What to avoid during Rahu Kaal
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Starting a new business</strong>, signing founding
            documents, opening a new shop or practice.
          </li>
          <li>
            <strong>Travel initiation</strong> — departing on a journey. If
            travel begins just before Rahu Kaal, it is considered unaffected
            (Rahu Kaal governs initiations, not continuations).
          </li>
          <li>
            <strong>Auspicious ceremonies</strong> — weddings, griha pravesh
            (housewarming), naming ceremony (Namakaran), sacred thread
            (Upanayana), engagement rituals.
          </li>
          <li>
            <strong>Major financial moves</strong> — large purchases, loan
            disbursement, property registration.
          </li>
          <li>
            <strong>Taking important decisions</strong> — legal filings,
            critical meetings, interviews that start a new role.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          What is unaffected
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Work in progress</strong> — tasks begun before Rahu Kaal
            can continue without concern.
          </li>
          <li>
            <strong>Routine activities</strong> — eating, household work,
            rest, regular commutes.
          </li>
          <li>
            <strong>Medical and emergency action</strong> — Rahu Kaal should
            never delay medical treatment or emergency response.
          </li>
          <li>
            <strong>Spiritual practice</strong> — japa, meditation, chanting.
            Some traditions specifically recommend Rahu-related mantras during
            Rahu Kaal (Durga worship, Mrityunjaya mantra) as remedial
            practice.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Related inauspicious windows
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Rahu Kaal is one of three inauspicious daily muhurtas:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Yamaganda (Yamagandam)</strong> — ruled by Yama, the
            deity of time and death. A 90-minute window with a different
            weekday position from Rahu Kaal. Same avoidances apply.
          </li>
          <li>
            <strong>Gulika Kaal (Gulika Kalam)</strong> — ruled by Gulika,
            son of Shani (Saturn). A third 90-minute window per day. Used
            especially by South Indian traditions; some practitioners
            consider it more important than Rahu Kaal.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Why Rahu Kaal is specific to your city
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Because Rahu Kaal is calculated as 1/8 of the span from sunrise to
          sunset, and because sunrise in Mumbai happens about 40 minutes
          later than in Kolkata on the same date, the actual clock time of
          Rahu Kaal differs meaningfully by city. Using a national average
          would give a timing wrong by up to an hour for some cities. This
          is why VastuCart Panchang computes Rahu Kaal individually for 200+
          Indian cities using each city&apos;s exact astronomical sunrise —{" "}
          <Link href="/rahu-kaal-today" className="text-[var(--color-saffron)] hover:underline">
            check today&apos;s Rahu Kaal for your specific city here
          </Link>
          .
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Rahu in Vedic astrology (context)
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Rahu is the <em>northern lunar node</em> — the ascending intersection
          point where the Moon&apos;s orbit crosses the ecliptic. It has no
          physical body (hence &ldquo;shadow planet&rdquo;) but exerts strong
          karmic influence in Vedic astrology. Rahu represents desire,
          obsession, materialism, and amplification — both of the grahas it
          conjoins in a chart and of the area of life where it sits. Its
          100-year Dasha is one of the most intense periods in any life.
          The daily Rahu Kaal is a micro-echo of Rahu&apos;s larger
          astrological weight — the single stretch of each day when Rahu
          resonance is at its strongest.
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
                Lunar day — first limb of the Panchang
              </p>
            </div>
          </Link>
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
                Lunar mansion — the 27 segments of the ecliptic
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
            href="/rahu-kaal-today"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            Today&apos;s Rahu Kaal for your city
          </Link>
        </div>
      </article>
    </>
  );
}
