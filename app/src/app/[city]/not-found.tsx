import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Metadata } from "next";

// Belt-and-suspenders: even if Next/CDN serves the not-found UI as HTTP 200
// instead of 404 (stale ISR cache), Google must not index this boilerplate.
// Without this, /madeupcity-style invalid slugs were getting indexed as
// near-duplicates of every other invalid slug.
export const metadata: Metadata = {
  title: "City Not Found",
  robots: { index: false, follow: false },
};

export default function CityNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <MapPin className="mb-4 h-12 w-12 text-[var(--color-saffron)]" />
      <h1 className="mb-2 text-2xl font-bold text-[var(--color-vedic)]">
        City Not Found
      </h1>
      <p className="mb-6 text-muted-foreground">
        We don&apos;t have Panchang data for this city yet. Try one of our 200+
        supported Indian cities.
      </p>
      <Link
        href="/new-delhi"
        className="rounded-lg bg-[var(--color-vedic)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-vedic-light)]"
      >
        View New Delhi Panchang
      </Link>
    </div>
  );
}
