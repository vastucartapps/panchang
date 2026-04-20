import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Moon, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAllTithis,
  getTithiBySlug,
} from "@/data/tithis";
import { buildTithiPageGraph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTithis().map((t) => ({ slug: t.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = getTithiBySlug(slug);
  if (!t) return {};

  return {
    title: `${t.name} Tithi (${t.devanagari}) — Category, Deity, Observances & Significance`,
    description: `Complete guide to ${t.name} Tithi. Category: ${t.category}. Shukla Paksha deity: ${t.shuklaDeity}. Krishna Paksha deity: ${t.krishnaDeity}. Major vrats and festivals.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/tithi/${t.slug}`,
    },
    openGraph: {
      title: `${t.name} Tithi — Complete Guide`,
      description: `${t.category} category. Shukla: ${t.shuklaDeity}. Krishna: ${t.krishnaDeity}.`,
      url: `${SITE_CONFIG.url}/tithi/${t.slug}`,
      siteName: SITE_CONFIG.name,
      type: "article",
    },
  };
}

export default async function TithiDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const t = getTithiBySlug(slug);
  if (!t) notFound();

  const all = getAllTithis();
  const idx = all.findIndex((x) => x.slug === t.slug);
  const prev = all[idx - 1] ?? all[all.length - 1];
  const next = all[idx + 1] ?? all[0];
  const graph = buildTithiPageGraph(t);

  return (
    <>
      {graph && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "16 Tithis", url: `${SITE_CONFIG.url}/tithi` },
          { name: t.name, url: `${SITE_CONFIG.url}/tithi/${t.slug}` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Moon className="mx-auto h-10 w-10 text-[#C4973B]" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Tithi {t.number}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl lg:text-6xl heading-display">
            {t.name}
          </h1>
          <p className="mt-2 text-2xl text-[#C4973B]">{t.devanagari}</p>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Category: <strong className="text-white">{t.category}</strong>
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose prose-neutral">
        <section className="rounded-3xl border bg-card p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground text-center">
            Quick reference
          </p>
          <div className="mt-4 space-y-3">
            <Row label="Tithi Number" value={`${t.number}${t.slug === "purnima" || t.slug === "amavasya" ? " (final of paksha)" : ""}`} />
            <Row label="Category" value={`${t.category} — ${t.categoryMeaning}`} />
            <Row label="Shukla Paksha Deity" value={t.shuklaDeity} />
            <Row label="Krishna Paksha Deity" value={t.krishnaDeity} />
            <Row label="Nature" value={t.nature} />
          </div>
        </section>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          About {t.name} Tithi
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          {t.body}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-green-200 bg-green-50/30 p-5">
            <h3 className="text-sm font-bold text-green-800">Shukla Paksha observance</h3>
            <p className="mt-2 text-sm text-foreground">{t.shuklaObservance}</p>
          </section>
          <section className="rounded-2xl border border-purple-200 bg-purple-50/30 p-5">
            <h3 className="text-sm font-bold text-purple-800">Krishna Paksha observance</h3>
            <p className="mt-2 text-sm text-foreground">{t.krishnaObservance}</p>
          </section>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-5">
            <h3 className="text-sm font-bold text-emerald-800">Favorable activities</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground">
              {t.favorable.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-red-200 bg-red-50/30 p-5">
            <h3 className="text-sm font-bold text-red-800">Activities to avoid</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground">
              {t.avoid.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        </div>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Using {t.name} in muhurta selection
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          {t.name} falls in the <strong>{t.category}</strong> category of
          Tithis — {t.categoryMeaning.split(" — ")[1] ?? ""}. For muhurta
          (auspicious-timing) selection, check whether today&apos;s Tithi in
          your city is {t.name} via{" "}
          <Link href="/todays-tithi" className="text-[var(--color-saffron)] hover:underline">
            the Aaj Ki Tithi page
          </Link>{" "}
          — since Tithi transitions can happen mid-day and sunrise differs by
          city, the governing Tithi may differ between your location and a
          generic national calendar.
        </p>

        <nav className="mt-12 flex items-center justify-between border-t pt-6">
          <Link
            href={`/tithi/${prev.slug}`}
            prefetch={false}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--color-saffron)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>
              <span className="block text-[10px] uppercase tracking-wider">Previous</span>
              <span className="font-bold">{prev.name}</span>
            </span>
          </Link>
          <Link
            href={`/tithi/${next.slug}`}
            prefetch={false}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--color-saffron)]"
          >
            <span className="text-right">
              <span className="block text-[10px] uppercase tracking-wider">Next</span>
              <span className="font-bold">{next.name}</span>
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/tithi"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
          >
            All 16 Tithis
            <BookOpen className="ml-1.5 inline h-4 w-4" />
          </Link>
          <Link
            href="/what-is-tithi"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            What is a Tithi?
          </Link>
          <Link
            href="/todays-tithi"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            Today&apos;s Tithi
          </Link>
        </div>
      </article>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:w-36 sm:shrink-0">
        {label}
      </p>
      <p className="text-sm text-foreground sm:flex-1">{value}</p>
    </div>
  );
}
