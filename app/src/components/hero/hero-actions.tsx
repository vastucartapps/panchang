"use client";

import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CitySearchModal } from "@/components/city-selector/city-search-modal";

interface HeroActionsProps {
  citySlug: string;
  cityName: string;
  variant?: "light" | "dark";
}

export function HeroActions({ citySlug, cityName, variant = "dark" }: HeroActionsProps) {
  return (
    <div className="mt-5 flex items-center gap-3">
      <CitySearchModal>
        <button className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-md">
          <MapPin className="h-4 w-4" />
          {cityName}
        </button>
      </CitySearchModal>
      <Link
        href={`/${citySlug}`}
        className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow transition-all hover:shadow-lg"
        style={{ background: "linear-gradient(135deg, #C4973B, #e36414)" }}
      >
        Full Panchang <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
