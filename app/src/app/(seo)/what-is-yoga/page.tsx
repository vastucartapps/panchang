import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPillarArticleSchema, IDS, REFS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "What is Yoga in Panchang? — 27 Nityayogas Complete Guide",
  description:
    "Yoga in the Panchang (not to be confused with āsana-yoga) is the 4th limb — 27 Nitya Yogas calculated from combined Sun-Moon longitudes. Complete guide with names, nature, and which to avoid.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/what-is-yoga`,
  },
  openGraph: {
    title: "What is Yoga in the Panchang? — Complete Guide",
    description: "27 Nitya Yogas of the Hindu calendar explained — calculation, names, auspicious vs inauspicious.",
    url: `${SITE_CONFIG.url}/what-is-yoga`,
    siteName: SITE_CONFIG.name,
    type: "article",
  },
};

const ARTICLE_BODY = `Yoga in the Vedic Panchang is the fourth of the five limbs (panch-anga) — distinct from yoga-as-āsana (the physical practice). Panchang Yoga, more precisely called Nitya Yoga, is calculated from the combined angular longitude of the Sun and the Moon. When the sum of the Sun's and Moon's nirayana longitudes (Lahiri Ayanamsa) reaches a multiple of 13°20', one Yoga ends and the next begins — yielding 27 Yogas per full cycle (360° ÷ 13°20' = 27). Each Nitya Yoga is a specific temporal-astrological quality that colors the entire day. The 27 Yogas in order are: Vishkambha, Priti, Ayushman, Saubhagya, Shobhana, Atiganda, Sukarma, Dhriti, Shula, Ganda, Vriddhi, Dhruva, Vyaghata, Harshana, Vajra, Siddhi, Vyatipata, Variyan, Parigha, Shiva, Siddha, Sadhya, Shubha, Shukla, Brahma, Indra, and Vaidhriti. Of these, four are considered universally inauspicious and are avoided for all auspicious initiations: Vyatipata, Parigha, Vaidhriti, and (to a lesser extent) Vishkambha. Some muhurta traditions also avoid Atiganda, Shula, and Ganda. Favorable Yogas include Siddhi, Shubha, Shukla, Brahma, Siddha, and Sadhya — these support activities requiring grace, success, or spiritual purity. The remaining Yogas fall in a mixed or neutral range, usable but not specifically sought. Yoga is less central to daily muhurta than Tithi or Nakshatra, but muhurta selection for major events like marriage and housewarming always checks Yoga to avoid the four explicitly harmful ones. When an inauspicious Yoga coincides with an otherwise auspicious Tithi-Nakshatra combination, muhurta practitioners either shift the timing or prescribe specific countering rituals. Because Yoga depends on combined Sun-Moon longitude at sunrise, Yoga timing varies slightly by city — the same civil date can have a different Yoga prevailing at sunrise between different cities near Yoga transitions.`;

export default function WhatIsYogaPage() {
  const articleSchema = buildPillarArticleSchema({
    id: IDS.subPillarYoga,
    url: `${SITE_CONFIG.url}/what-is-yoga`,
    headline: "What is Yoga in the Panchang? The 27 Nitya Yogas Explained",
    description:
      "Complete guide to Yoga — the fourth limb of the Vedic Panchang. 27 Nitya Yogas, calculation, auspicious and inauspicious names, role in muhurta.",
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
          { name: "What is Yoga?", url: `${SITE_CONFIG.url}/what-is-yoga` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Sparkles className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            What is Yoga in the Panchang?
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            The 27 Nitya Yogas — fourth limb of the Vedic calendar
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose prose-neutral">
        <p className="text-base leading-relaxed text-foreground">
          <strong>Yoga</strong> in the Vedic Panchang is the fourth of the
          five limbs (panch-anga) — and is <em>not</em> the same as yoga
          as āsana (the physical practice). Panchang Yoga, more precisely
          called <strong>Nitya Yoga</strong>, is a specific temporal-
          astrological quality of the day derived from the combined
          longitudes of the Sun and the Moon.
        </p>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/30 p-4">
          <p className="text-sm text-amber-900">
            <strong>Note:</strong> Yoga here is a time calculation, not a
            physical or meditative practice. The English word &ldquo;yoga&rdquo;
            translates &ldquo;union&rdquo; in both contexts, but Panchang Yoga
            is specifically the union of Sun+Moon longitude arcs.
          </p>
        </div>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Calculation
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Add the Sun&apos;s nirayana (sidereal) longitude to the Moon&apos;s
          nirayana longitude. Divide by 13°20&apos;. The integer result
          modulo 27 gives the Yoga number (1-27) currently in effect; the
          remainder tells you how far into that Yoga you are. When the sum
          crosses the next 13°20&apos; boundary, the Yoga changes to the next
          one in sequence.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          The 27 Nitya Yogas in order
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana",
            "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi",
            "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi",
            "Vyatipata", "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya",
            "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti",
          ].map((name, i) => {
            const inauspicious = ["Vyatipata", "Parigha", "Vaidhriti", "Vishkambha", "Atiganda", "Shula", "Ganda"].includes(name);
            const auspicious = ["Siddhi", "Shubha", "Shukla", "Brahma", "Siddha", "Sadhya", "Priti", "Ayushman", "Saubhagya", "Shobhana"].includes(name);
            const color = inauspicious ? "#dc2626" : auspicious ? "#16a34a" : "#64748b";
            return (
              <div key={name} className="rounded-lg border bg-card p-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  #{i + 1}
                </p>
                <p className="mt-1 text-sm font-bold" style={{ color }}>
                  {name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-green-600" />
            <span className="text-muted-foreground">Auspicious</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-red-600" />
            <span className="text-muted-foreground">Inauspicious</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-slate-500" />
            <span className="text-muted-foreground">Neutral / Mixed</span>
          </span>
        </div>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          The four definitively inauspicious Yogas
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Vyatipata (17th)</strong> — causes obstacles and mishaps.
            Universally avoided for weddings, housewarming, and auspicious
            initiations. Some traditions also avoid travel during Vyatipata.
          </li>
          <li>
            <strong>Parigha (19th)</strong> — causes opposition and
            interference. Avoided for critical decisions, confrontations,
            and initiations.
          </li>
          <li>
            <strong>Vaidhriti (27th)</strong> — causes separation, inability
            to hold things together. Universally avoided.
          </li>
          <li>
            <strong>Vishkambha (1st, first 3 hours)</strong> — the beginning
            portion (about 3 hours) of Vishkambha is avoided. After that
            portion, Vishkambha is considered neutral. Some muhurta
            traditions waive this caution entirely.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Most auspicious Yogas
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Siddhi (16th)</strong> — brings achievement. Very strong
            for new undertakings.
          </li>
          <li>
            <strong>Siddha (21st)</strong> — achievement through grace;
            spiritually potent.
          </li>
          <li>
            <strong>Sadhya (22nd)</strong> — what is aimed at is attained.
          </li>
          <li>
            <strong>Shubha (23rd)</strong> — generically auspicious, good for
            most initiations.
          </li>
          <li>
            <strong>Shukla (24th)</strong> — bright, favorable for all benign
            work.
          </li>
          <li>
            <strong>Brahma (25th)</strong> — sacred; supports spiritual and
            scholarly work.
          </li>
          <li>
            <strong>Priti (2nd)</strong> — brings love, harmony, relationship
            starts.
          </li>
          <li>
            <strong>Ayushman (3rd)</strong> — longevity; good for health
            initiations.
          </li>
          <li>
            <strong>Saubhagya (4th)</strong> — good fortune, favorable for
            wedding muhurta.
          </li>
          <li>
            <strong>Shobhana (5th)</strong> — beautification, celebration.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Role in muhurta selection
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Yoga is the least-weighted of the five Panchang limbs for routine
          activity selection — Tithi and Nakshatra carry more direct import.
          However, for major muhurtas (marriage, housewarming, business
          inauguration, foundation-laying), Yoga is always checked: the four
          definitively inauspicious Yogas are strict disqualifiers, and the
          presence of a favorable Yoga strengthens the overall muhurta
          quality. A muhurta that combines a favorable Tithi, favorable
          Nakshatra, and a Siddhi or Siddha Yoga is considered exceptionally
          powerful.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Related Panchang concepts
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link
            href="/what-is-karana"
            prefetch={false}
            className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[var(--color-saffron)]" />
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                What is Karana?
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                The 5th limb — half-Tithi divisions
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
                Auspicious timing framework using all 5 limbs
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
        </div>
      </article>
    </>
  );
}
