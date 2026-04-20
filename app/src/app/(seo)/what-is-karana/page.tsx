import type { Metadata } from "next";
import Link from "next/link";
import { Moon, BookOpen, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPillarArticleSchema, IDS, REFS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "What is Karana in Panchang? — 11 Karanas, Vishti (Bhadra) Explained",
  description:
    "Karana is the 5th limb of the Panchang — half a Tithi. 11 Karanas total: 7 moveable (Chara) + 4 fixed (Sthira). Vishti/Bhadra Karana is universally inauspicious for muhurta.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/what-is-karana`,
  },
  openGraph: {
    title: "What is Karana in the Panchang? — Complete Guide",
    description: "11 Karanas, 7 moveable + 4 fixed, with Vishti (Bhadra) Karana explained.",
    url: `${SITE_CONFIG.url}/what-is-karana`,
    siteName: SITE_CONFIG.name,
    type: "article",
  },
};

const ARTICLE_BODY = `Karana is the fifth limb (panch-anga) of the Vedic Panchang — specifically, half of a Tithi. Because each Tithi spans 12° of Sun-Moon angular separation, each Karana spans 6°. A full lunar month of 30 Tithis therefore contains 60 Karanas. However, there are only 11 Karana names in total — 7 of which repeat cyclically through the month, and 4 of which appear only once per month at fixed positions. The 7 moveable Karanas (Chara Karanas) are: Bava, Balava, Kaulava, Taitila, Gara, Vanija, and Vishti (also called Bhadra). They cycle in this order 8 times through the 56 Karanas from the second half of the Shukla Paksha Pratipada to the first half of the Krishna Paksha Chaturdashi. The 4 fixed Karanas (Sthira Karanas) are: Shakuni, Chatushpada, Naga, and Kimstughna — these occupy specific positions only: Shakuni (second half of Krishna Chaturdashi), Chatushpada (first half of Amavasya), Naga (second half of Amavasya), and Kimstughna (first half of Shukla Pratipada). The most significant Karana in muhurta practice is Vishti (Bhadra) — classically called the inauspicious Karana. Activities initiated during Vishti Karana are traditionally considered to face obstacles, opposition, or failure. Weddings, housewarming, business starts, and major financial decisions are explicitly avoided during Vishti. Among the Sthira Karanas, Shakuni, Chatushpada, and Naga are also avoided for auspicious initiations (they occur around Amavasya which is itself classically inauspicious for new undertakings). Kimstughna, on the other hand, is considered mildly favorable. Karana rarely acts as a standalone factor in activity selection — its main use in muhurta is the explicit avoidance of Vishti (Bhadra). Because Karana is calculated from Sun-Moon angular position, Karana timing can differ slightly between cities near Karana transitions, though practical differences are minimal.`;

export default function WhatIsKaranaPage() {
  const articleSchema = buildPillarArticleSchema({
    id: IDS.subPillarKarana,
    url: `${SITE_CONFIG.url}/what-is-karana`,
    headline: "What is Karana in the Panchang? The 11 Karanas Explained",
    description:
      "Complete guide to Karana — the 5th limb of the Vedic Panchang. 7 moveable + 4 fixed Karanas, with emphasis on Vishti/Bhadra avoidance.",
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
          { name: "What is Karana?", url: `${SITE_CONFIG.url}/what-is-karana` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Moon className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            What is Karana?
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            The 5th limb of the Panchang — half of a Tithi
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose prose-neutral">
        <p className="text-base leading-relaxed text-foreground">
          <strong>Karana</strong> is the fifth and final limb of the Vedic{" "}
          <Link href="/what-is-panchang" className="text-[var(--color-saffron)] hover:underline">
            Panchang
          </Link>
          . Specifically, a Karana is <strong>half of a Tithi</strong>. Since
          each Tithi spans 12° of angular separation between Sun and Moon,
          each Karana spans 6°. A complete lunar month of 30 Tithis therefore
          contains 60 Karanas.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          11 Karana names: 7 moveable + 4 fixed
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Although there are 60 Karanas per month, they carry only{" "}
          <strong>11 names</strong>. Seven of these (Chara Karanas) recur
          cyclically eight times through the month; four (Sthira Karanas)
          appear only once per month at fixed positions around Amavasya.
        </p>

        <div className="mt-5 rounded-xl border bg-card p-5">
          <h3 className="text-sm font-bold text-[var(--color-vedic)]">
            7 Chara (Moveable) Karanas — recur 8 times per month
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { name: "Bava", nature: "Auspicious" },
              { name: "Balava", nature: "Auspicious" },
              { name: "Kaulava", nature: "Auspicious" },
              { name: "Taitila", nature: "Auspicious" },
              { name: "Gara", nature: "Auspicious" },
              { name: "Vanija", nature: "Auspicious" },
              { name: "Vishti (Bhadra)", nature: "INAUSPICIOUS — avoid" },
            ].map((k) => {
              const bad = k.name.includes("Vishti");
              return (
                <div key={k.name} className="rounded-lg border p-2 text-center" style={{ borderColor: bad ? "#dc262640" : undefined }}>
                  <p className="text-sm font-bold" style={{ color: bad ? "#dc2626" : "#16a34a" }}>
                    {k.name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{k.nature}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-xl border bg-card p-5">
          <h3 className="text-sm font-bold text-[var(--color-vedic)]">
            4 Sthira (Fixed) Karanas — once per month, around Amavasya
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground">
            <li>
              <strong>Shakuni</strong> — 2nd half of Krishna Chaturdashi.
              Inauspicious for new starts.
            </li>
            <li>
              <strong>Chatushpada</strong> — 1st half of Amavasya.
              Inauspicious.
            </li>
            <li>
              <strong>Naga</strong> — 2nd half of Amavasya. Inauspicious.
            </li>
            <li>
              <strong>Kimstughna</strong> — 1st half of Shukla Pratipada.
              Mildly favorable (marks beginning of the waxing fortnight).
            </li>
          </ul>
        </div>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Vishti (Bhadra) Karana — the single most important to avoid
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Among all 11 Karanas, <strong>Vishti</strong> (also called{" "}
          <strong>Bhadra</strong>) is the one that matters most for muhurta
          selection. It is universally classified as{" "}
          <strong>inauspicious</strong> — activities initiated during Vishti
          Karana are traditionally said to face obstacles, opposition, or
          outright failure. All classical muhurta texts explicitly exclude
          Vishti/Bhadra Karana for weddings, housewarming, business starts,
          signing contracts, and any major financial decision.
        </p>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Vishti appears twice during each Tithi cycle — roughly in the
          second half of every 4th Tithi. Approximate positions: 2nd half
          of Shukla Chaturthi, 2nd half of Shukla Ashtami, 2nd half of
          Shukla Dwadashi, 1st half of Krishna Pratipada, 2nd half of
          Krishna Saptami, 2nd half of Krishna Ekadashi, 1st half of Krishna
          Chaturdashi. These are the approximate &ldquo;Bhadra windows&rdquo;
          to avoid.
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Karana in everyday muhurta
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          For routine daily activities, Karana is rarely consulted
          standalone — Tithi and Nakshatra carry more weight. Karana&apos;s
          practical function in muhurta is a single negative check: avoid
          Vishti (Bhadra). For major muhurtas like weddings and housewarming,
          all five limbs are evaluated — including verifying the Karana is
          not Vishti, Shakuni, Chatushpada, or Naga.
        </p>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          If an otherwise-perfect muhurta coincides with Vishti, muhurta
          practitioners either shift the timing slightly (Vishti lasts only
          6 hours) or, if critical to preserve the day, prescribe specific
          countering prayers and rituals.
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
                Lunar day — Karana is half of this
              </p>
            </div>
          </Link>
          <Link
            href="/what-is-yoga"
            prefetch={false}
            className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[var(--color-saffron)]" />
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                What is Yoga?
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                The 4th limb — 27 Nitya Yogas
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
