import { MapPin } from "lucide-react";
import { CitySearchModal } from "@/components/city-selector/city-search-modal";
import type { City } from "@/schemas/city";

interface LocationBarProps {
  city: City;
}

export function LocationBar({ city }: LocationBarProps) {
  return (
    <div className="flex items-center gap-2">
      <MapPin className="h-4 w-4 text-[var(--color-saffron)]" />
      <span className="text-sm font-medium text-foreground">
        {city.name}, {city.state}
      </span>
      <CitySearchModal>
        <button className="text-xs font-medium text-[var(--color-saffron)] hover:underline">
          Change
        </button>
      </CitySearchModal>
    </div>
  );
}
