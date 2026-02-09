"use client";

import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CitySearchModal } from "@/components/city-selector/city-search-modal";

interface HeroActionsProps {
  citySlug: string;
  cityName: string;
}

export function HeroActions({ citySlug, cityName }: HeroActionsProps) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <CitySearchModal>
        <button className="inline-flex items-center gap-2 rounded-full border-2 border-[#003636]/30 bg-white/20 px-5 py-2.5 text-sm font-semibold text-[#003636] shadow-sm transition-all hover:bg-white/40 hover:shadow-md">
          <MapPin className="h-4 w-4" />
          {cityName}
        </button>
      </CitySearchModal>
      <Link
        href={`/${citySlug}`}
        className="inline-flex items-center gap-2 rounded-full bg-[#003636] px-6 py-2.5 text-sm font-semibold text-white shadow transition-all hover:bg-[#005a5a] hover:shadow-md"
      >
        Full Panchang <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
