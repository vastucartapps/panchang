import { z } from "zod";

export const CitySchema = z.object({
  slug: z.string(),
  name: z.string(),
  state: z.string(),
  lat: z.number(),
  lng: z.number(),
  tz: z.string(),
});

export type City = z.infer<typeof CitySchema>;
