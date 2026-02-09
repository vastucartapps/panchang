import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";

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
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Choghadiya Today", url: `${SITE_CONFIG.url}/choghadiya-today` },
        ]}
      />

      <div className="mb-8 flex items-center gap-3">
        <Clock className="h-8 w-8 text-[var(--color-vedic)]" />
        <h1 className="text-3xl font-bold text-[var(--color-vedic)]">
          Choghadiya Today
        </h1>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
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
              className="flex items-start gap-3 rounded-lg border bg-card p-3"
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
              className="flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-[var(--color-saffron)]/30 hover:bg-accent"
            >
              <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
