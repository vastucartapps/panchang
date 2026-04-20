import citiesData from "@/data/cities.json";
import type { City } from "@/schemas/city";

const cities: City[] = citiesData;

export function getAllCities(): City[] {
  return cities;
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function searchCities(query: string): City[] {
  const q = query.toLowerCase().trim();
  if (!q) return cities.slice(0, 20);
  return cities.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.slug.includes(q)
  );
}

export function findNearestCity(lat: number, lng: number): City {
  let nearest = cities[0];
  let minDist = Infinity;

  for (const city of cities) {
    const dlat = city.lat - lat;
    const dlng = city.lng - lng;
    const dist = dlat * dlat + dlng * dlng;
    if (dist < minDist) {
      minDist = dist;
      nearest = city;
    }
  }

  return nearest;
}

export function getCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}

/**
 * Return the N cities geographically closest to the given slug (excluding
 * the city itself). Used for "nearby cities" cross-links that form
 * geographically-coherent link clusters — Google's entity graph rewards
 * tight local clusters over random alphabetical neighbor lists.
 */
export function getNearbyCities(slug: string, count = 6): City[] {
  const origin = cities.find((c) => c.slug === slug);
  if (!origin) return cities.slice(0, count);

  return cities
    .filter((c) => c.slug !== slug)
    .map((c) => {
      const dlat = c.lat - origin.lat;
      const dlng = c.lng - origin.lng;
      return { city: c, dist2: dlat * dlat + dlng * dlng };
    })
    .sort((a, b) => a.dist2 - b.dist2)
    .slice(0, count)
    .map((x) => x.city);
}

/** Top 20 cities by traffic potential — used for generateStaticParams pre-rendering */
const TOP_CITY_SLUGS = [
  "new-delhi", "mumbai", "bangalore", "chennai", "kolkata",
  "hyderabad", "pune", "ahmedabad", "jaipur", "lucknow",
  "varanasi", "indore", "chandigarh", "patna", "bhopal",
  "surat", "nagpur", "coimbatore", "visakhapatnam", "ujjain",
];

export function getTopCitySlugs(): string[] {
  return TOP_CITY_SLUGS.filter((s) => cities.some((c) => c.slug === s));
}
