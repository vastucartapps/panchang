import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { City } from "@/schemas/city";
import { DEFAULT_LOCATION } from "@/lib/constants";

interface LocationState {
  city: City;
  setCity: (city: City) => void;
  resetCity: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      city: DEFAULT_LOCATION as City,
      setCity: (city: City) => set({ city }),
      resetCity: () => set({ city: DEFAULT_LOCATION as City }),
    }),
    {
      name: "panchang-location",
    }
  )
);
