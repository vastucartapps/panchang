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
