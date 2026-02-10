import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { CHOGHADIYA_FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const metadata: Metadata = {
  title: "Choghadiya Today - Auspicious Time Periods for Every Activity",
  description:
    "Today's Choghadiya timings for your city. Find the most auspicious muhurta for travel, business, and important decisions using this ancient Vedic time-quality system.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/choghadiya-today`,
  },
  openGraph: {
    title: "Choghadiya Today | VastuCart Panchang",
    description:
      "Accurate daily Choghadiya timings. Know the best muhurta for your activities today.",
    url: `${SITE_CONFIG.url}/choghadiya-today`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

const CHOGHADIYA_TYPES = [
  { name: "Amrit", nature: "Auspicious", desc: "Best for all activities, especially spiritual" },
  { name: "Shubh", nature: "Auspicious", desc: "Good for auspicious work, ceremonies" },
  { name: "Labh", nature: "Auspicious", desc: "Favorable for financial transactions, business" },
  { name: "Char", nature: "Neutral", desc: "Good for travel and movement" },
  { name: "Rog", nature: "Inauspicious", desc: "Avoid health-related decisions" },
  { name: "Kaal", nature: "Inauspicious", desc: "Avoid important beginnings" },
  { name: "Udveg", nature: "Inauspicious", desc: "Avoid new ventures; government work may be okay" },
];

const POPULAR_CITIES = [
  { name: "New Delhi", slug: "new-delhi" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
  { name: "Kolkata", slug: "kolkata" },
  { name: "Hyderabad", slug: "hyderabad" },
];

export default function ChoghadiyaPage() {
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Choghadiya Today", url: `${SITE_CONFIG.url}/choghadiya-today` },
        ]}
        faqs={CHOGHADIYA_FAQS}
      />

      {/* Hero bar */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Clock className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Choghadiya Today
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Find the best muhurta for your activities
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="prose prose-neutral max-w-none space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Choghadiya (also Chaughadia) is a Vedic time-quality system that divides the day and
            night into 8 periods each. Each period is classified as auspicious, neutral, or
            inauspicious, helping you choose the best time for important activities.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            Types of Choghadiya
          </h2>
          <div className="space-y-2">
            {CHOGHADIYA_TYPES.map((type) => (
              <div
                key={type.name}
                className="flex items-start gap-3 rounded-xl border bg-card p-3 shadow-sm"
              >
                <span
                  className={`mt-0.5 h-3 w-3 shrink-0 rounded-full ${
                    type.nature === "Auspicious"
                      ? "bg-[var(--color-nature-auspicious)]"
                      : type.nature === "Neutral"
                        ? "bg-[var(--color-nature-neutral)]"
                        : "bg-[var(--color-nature-inauspicious)]"
                  }`}
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {type.name}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      ({type.nature})
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            Check Choghadiya for Your City
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {POPULAR_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {city.name}
              </Link>
            ))}
          </div>

          <FaqSection faqs={CHOGHADIYA_FAQS} />
        </div>
      </div>
    </>
  );
}
