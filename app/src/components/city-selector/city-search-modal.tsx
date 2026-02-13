"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Navigation, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllCities, searchCities, findNearestCity } from "@/lib/cities";
import { useGeolocation } from "@/hooks/use-geolocation";
import type { City } from "@/schemas/city";

interface CitySearchModalProps {
  children: React.ReactNode;
}

const POPULAR_CITIES = [
  "new-delhi",
  "mumbai",
  "bangalore",
  "chennai",
  "kolkata",
  "hyderabad",
  "pune",
  "ahmedabad",
  "jaipur",
  "varanasi",
  "lucknow",
  "indore",
];

export function CitySearchModal({ children }: CitySearchModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { loading: geoLoading, coords, requestLocation } = useGeolocation();

  const allCities = useMemo(() => getAllCities(), []);

  const popularCities = useMemo(
    () =>
      POPULAR_CITIES.map((slug) =>
        allCities.find((c) => c.slug === slug)
      ).filter(Boolean) as City[],
    [allCities]
  );

  const results = useMemo(() => {
    if (!query.trim()) return popularCities;
    return searchCities(query).slice(0, 20);
  }, [query, popularCities]);

  const handleSelect = useCallback(
    (city: City) => {
      setOpen(false);
      setQuery("");
      router.push(`/${city.slug}`);
    },
    [router]
  );

  // Auto-detect: when coords arrive, find nearest city
  const handledCoordsRef = useRef(false);
  useEffect(() => {
    if (coords && !handledCoordsRef.current) {
      handledCoordsRef.current = true;
      const nearest = findNearestCity(coords.latitude, coords.longitude);
      if (nearest) {
        // Navigate directly — component unmounts on route change
        router.push(`/${nearest.slug}`);
      }
    }
  }, [coords, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[var(--color-vedic)]">
            Select Your City
          </DialogTitle>
        </DialogHeader>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>

        {/* Auto-detect button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-[var(--color-saffron)]"
          onClick={requestLocation}
          disabled={geoLoading}
        >
          {geoLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Navigation className="h-4 w-4" />
          )}
          {geoLoading ? "Detecting location..." : "Auto-detect my city"}
        </Button>

        {/* City list */}
        <div className="max-h-[45vh] overflow-y-auto -mx-1">
          {!query.trim() && (
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Popular Cities
            </p>
          )}
          <div className="space-y-0.5">
            {results.map((city) => (
              <button
                key={city.slug}
                onClick={() => handleSelect(city)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="font-medium text-foreground">{city.name}</span>
                <span className="text-xs text-muted-foreground">
                  {city.state}
                </span>
              </button>
            ))}
            {results.length === 0 && query.trim() && (
              <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                No cities found for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
