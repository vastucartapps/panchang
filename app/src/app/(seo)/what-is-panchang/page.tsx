import type { Metadata } from "next";
import { BookOpen, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { PANCHANG_GUIDE_FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const metadata: Metadata = {
  title: "What is Panchang? - Complete Guide to the Vedic Calendar System",
  description:
    "Learn about Panchang, the ancient Hindu calendar system with its five limbs: Tithi, Nakshatra, Yoga, Karana, and Vara. Understand Rahu Kaal, Choghadiya, Hora, Muhurta selection, and how Panchang guides daily life.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/what-is-panchang`,
  },
  openGraph: {
    title: "What is Panchang? | VastuCart Panchang",
    description:
      "Complete guide to the Vedic Panchang calendar. Learn about Tithi, Nakshatra, Yoga, Karana, Vara, Rahu Kaal, Choghadiya, and Muhurta selection.",
    url: `${SITE_CONFIG.url}/what-is-panchang`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

const FIVE_LIMBS = [
  {
    name: "Tithi",
    desc: "The lunar day, determined by the angular distance between the Sun and Moon. There are 30 Tithis in a lunar month, each spanning 12 degrees.",
  },
  {
    name: "Nakshatra",
    desc: "The lunar mansion or constellation the Moon occupies. There are 27 Nakshatras, each with unique qualities, deities, and planetary lords.",
  },
  {
    name: "Yoga",
    desc: "The combination of Sun and Moon longitudes, producing 27 Yogas. Each Yoga has a distinct nature that influences the day's quality.",
  },
  {
    name: "Karana",
    desc: "Half of a Tithi. There are 11 Karanas in total, with some being fixed (occurring once per month) and others being moveable (recurring throughout).",
  },
  {
    name: "Vara",
    desc: "The weekday, ruled by a specific planet. Each Vara carries the qualities of its ruling planet and influences suitable activities.",
  },
];

const POPULAR_CITIES = [
  { name: "New Delhi", slug: "new-delhi" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
  { name: "Varanasi", slug: "varanasi" },
  { name: "Ujjain", slug: "ujjain" },
];

export default function WhatIsPanchangPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "What is Panchang?", url: `${SITE_CONFIG.url}/what-is-panchang` },
        ]}
        faqs={PANCHANG_GUIDE_FAQS}
      />

      <div className="mb-8 flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-[var(--color-vedic)]" />
        <h1 className="text-3xl font-bold text-[var(--color-vedic)]">
          What is Panchang?
        </h1>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          Panchang (also spelled Panchangam) is the traditional Hindu calendar and almanac.
          The word comes from Sanskrit: &ldquo;Pancha&rdquo; (five) + &ldquo;Anga&rdquo; (limb),
          referring to its five key elements that together describe the quality of any given day.
        </p>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            The Five Limbs of Panchang
          </h2>
          <div className="mt-4 space-y-4">
            {FIVE_LIMBS.map((limb, i) => (
              <div key={limb.name} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-vedic)] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-foreground">{limb.name}</p>
                  <p className="text-sm text-muted-foreground">{limb.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold text-[var(--color-vedic)]">
          Why is Panchang Important?
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>Determines auspicious and inauspicious times for daily activities</li>
          <li>Essential for selecting Muhurta (auspicious moments) for ceremonies</li>
          <li>Guides festival dates, fasting days, and religious observances</li>
          <li>Used in Vedic astrology for horoscope construction and predictions</li>
          <li>Helps farmers with agricultural planning based on lunar cycles</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--color-vedic)]">
          Additional Elements in Modern Panchang
        </h2>
        <p className="text-muted-foreground">
          Beyond the five limbs, a modern Panchang includes Rahu Kaal (inauspicious period
          ruled by Rahu), Yamagandam, Gulika Kalam, Hora (planetary hours), Choghadiya
          (time quality periods), sunrise/sunset times, and Moon phase information.
        </p>

        <h2 className="text-xl font-bold text-[var(--color-vedic)]">
          View Today&apos;s Panchang
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

      <FaqSection faqs={PANCHANG_GUIDE_FAQS} />
    </div>
  );
}
