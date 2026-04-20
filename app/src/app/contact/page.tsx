import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, AlertCircle, Calendar, Building } from "lucide-react";
import { SITE_CONFIG, NETWORK_LINKS } from "@/lib/constants";
import { buildContactPageGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact VastuCart Panchang — Support, Corrections, Partnerships",
  description:
    "Contact the VastuCart team. Reach us for Panchang data corrections, muhurta questions, feature requests, media inquiries, or B2B partnerships.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: "Contact VastuCart Panchang",
    description: "Support, corrections, feature requests, and partnerships.",
    url: `${SITE_CONFIG.url}/contact`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function ContactPage() {
  const graph = buildContactPageGraph();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
        }}
      />

      <section
        className="py-14 sm:py-20"
        style={{
          background:
            "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Mail className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl heading-display">
            Contact VastuCart
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-lg text-white/70 sm:text-xl">
            We reply within one business day. India timezone (IST).
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-base leading-relaxed text-foreground">
          The VastuCart team reads every message. Pick the right channel
          below so your request lands with the team best equipped to help
          — this keeps replies fast and accurate.
        </p>

        <div className="mt-10 space-y-5">
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-[var(--color-saffron)]" />
              <h2 className="text-lg font-bold text-foreground">
                Support &amp; General Questions
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Panchang usage questions, site bugs, feature requests, or
              help choosing which city to search. First response within
              one business day.
            </p>
            <a
              href="mailto:hi@vastucart.in"
              className="mt-4 inline-block rounded-full px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #013f47, #004D40)",
              }}
            >
              hi@vastucart.in
            </a>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-[var(--color-saffron)]" />
              <h2 className="text-lg font-bold text-foreground">
                Panchang Data Corrections
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Spotted a Tithi, Nakshatra, Rahu Kaal, or festival date that
              looks wrong for your city? Send the URL, the value you see,
              and the value you expected (with your authoritative source).
              Corrections ship within 24 hours when confirmed.
            </p>
            <a
              href="mailto:hi@vastucart.in?subject=Panchang%20data%20correction"
              className="mt-4 inline-block rounded-full border border-[var(--color-saffron)]/40 px-5 py-2 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
            >
              Report a correction
            </a>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-[var(--color-saffron)]" />
              <h2 className="text-lg font-bold text-foreground">
                Muhurta &amp; Consultation
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Wedding muhurta, housewarming (griha pravesh), business
              start muhurta, and personalized astrology consultations are
              handled by our sister services. The Panchang here gives you
              the raw timings — these teams translate them into
              personalized recommendations.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={NETWORK_LINKS.muhurta}
                className="rounded-full px-4 py-1.5 text-xs font-bold text-white transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #013f47, #004D40)",
                }}
              >
                Shubh Muhurta →
              </a>
              <a
                href={NETWORK_LINKS.kundali}
                className="rounded-full px-4 py-1.5 text-xs font-bold text-white transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #013f47, #004D40)",
                }}
              >
                Kundali Decoded →
              </a>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-[var(--color-saffron)]" />
              <h2 className="text-lg font-bold text-foreground">
                Business, Press &amp; Partnerships
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              API licensing, content syndication, embeddable widgets for
              news outlets, brand partnerships, and press/media inquiries.
            </p>
            <a
              href="mailto:business@vastucart.in"
              className="mt-4 inline-block rounded-full border border-[var(--color-saffron)]/40 px-5 py-2 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
            >
              business@vastucart.in
            </a>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-[var(--color-saffron)]" />
              <h2 className="text-lg font-bold text-foreground">Careers</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We hire engineers, Vedic astrology subject-matter experts,
              and content editors. Remote-friendly. IST-overlap
              preferred.
            </p>
            <a
              href="mailto:careers@vastucart.in"
              className="mt-4 inline-block rounded-full border border-[var(--color-saffron)]/40 px-5 py-2 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
            >
              careers@vastucart.in
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border bg-muted/40 p-6">
          <h2 className="text-base font-bold text-foreground">
            Registered business
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            VastuCart is a sole proprietorship registered in India,
            operating from Jhunjhunu, Rajasthan 333307.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Back to today&rsquo;s Panchang
          </Link>
        </div>
      </div>
    </>
  );
}
