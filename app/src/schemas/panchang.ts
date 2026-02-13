import { z } from "zod";

const DayQualityBreakdownItemSchema = z.object({
  name: z.string(),
  score: z.number(),
  weight: z.string(),
  nature: z.string(),
  category: z.string().optional(),
  deity: z.string().optional(),
  gana: z.string().optional(),
  activity_type: z.string().optional(),
  lord: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
});

const DayQualitySchema = z.object({
  score: z.number(),
  label: z.string(),
  color: z.string(),
  breakdown: z.object({
    tithi: DayQualityBreakdownItemSchema,
    nakshatra: DayQualityBreakdownItemSchema,
    yoga: DayQualityBreakdownItemSchema,
    karana: DayQualityBreakdownItemSchema,
    vara: DayQualityBreakdownItemSchema,
  }),
  summary: z.string(),
  suitable_activities: z.array(z.string()),
  avoid_activities: z.array(z.string()),
});

const NextTithiSchema = z.object({
  tithi: z.string(),
  tithi_number: z.number(),
  paksha: z.string(),
  start_time: z.string(),
});

const HinduMonthSchema = z.object({
  month: z.string(),
  month_number: z.number(),
  is_adhik: z.boolean(),
  amanta_month: z.string(),
  purnimanta_month: z.string(),
});

const TithiSchema = z.object({
  tithi: z.string(),
  tithi_number: z.number(),
  paksha: z.string(),
  elapsed_degrees: z.number(),
  remaining_degrees: z.number(),
  percent_elapsed: z.number(),
  nature: z.string(),
  deity: z.string(),
  category: z.string(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  prevails_at_sunrise: z.boolean().optional(),
  next_tithi: NextTithiSchema.optional(),
  hindu_month: HinduMonthSchema.optional(),
});

const NakshatraSchema = z.object({
  nakshatra: z.string(),
  nakshatra_number: z.number(),
  pada: z.number(),
  elapsed_degrees: z.number(),
  remaining_degrees: z.number(),
  percent_elapsed: z.number(),
  nature: z.string(),
  deity: z.string(),
  gana: z.string(),
  lord: z.string(),
  activity_type: z.string(),
});

const YogaSchema = z.object({
  yoga: z.string(),
  yoga_number: z.number(),
  elapsed_degrees: z.number(),
  remaining_degrees: z.number(),
  percent_elapsed: z.number(),
  nature: z.string(),
  description: z.string(),
});

const KaranaSchema = z.object({
  karana: z.string(),
  karana_number: z.number(),
  is_first_half: z.boolean(),
  elapsed_degrees: z.number(),
  remaining_degrees: z.number(),
  percent_elapsed: z.number(),
  nature: z.string(),
  type: z.string(),
});

const VaraSchema = z.object({
  name: z.string(),
  day: z.string(),
  lord: z.string(),
  nature: z.string(),
});

const PanchangLimbsSchema = z.object({
  tithi: TithiSchema,
  nakshatra: NakshatraSchema,
  yoga: YogaSchema,
  karana: KaranaSchema,
  vara: VaraSchema,
  sun_longitude: z.number(),
  moon_longitude: z.number(),
});

const MoonPhaseSchema = z.object({
  phase_name: z.string(),
  phase_key: z.string(),
  phase_icon: z.string(),
  illumination_percent: z.number(),
  elongation_degrees: z.number(),
  age_days: z.number(),
  is_waxing: z.boolean(),
  paksha: z.string(),
});

const HoraEntrySchema = z.object({
  hora_number: z.number(),
  ruling_planet: z.string(),
  nature: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  is_day: z.boolean(),
  duration_minutes: z.number(),
});

const HoraSchema = z.object({
  date: z.string(),
  vara: z.string(),
  vara_lord: z.string(),
  current_hora: HoraEntrySchema.nullable(),
  sunrise: z.string(),
  sunset: z.string(),
  all_horas: z.array(HoraEntrySchema),
});

const TimingEntrySchema = z.object({
  name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  duration_minutes: z.number(),
  note: z.string().optional(),
});

const TimingSchema = z.object({
  rahu_kalam: TimingEntrySchema,
  yamagandam: TimingEntrySchema,
  gulika_kalam: TimingEntrySchema,
  abhijit_muhurta: TimingEntrySchema.nullable(),
  brahma_muhurta: TimingEntrySchema,
  sunrise: z.string(),
  sunset: z.string(),
  dinamana_hours: z.number(),
});

const PlanetPositionSchema = z.object({
  planet: z.string(),
  sign: z.string(),
  sign_number: z.number(),
  degree: z.number(),
  degree_in_sign: z.number(),
  nakshatra: z.string(),
  is_retrograde: z.boolean(),
});

const ChoghadiyaPeriodSchema = z.object({
  name: z.string(),
  nature: z.string(),
  ruler: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  duration_minutes: z.number(),
  is_day: z.boolean(),
  period_number: z.number(),
});

const ChoghadiyaSchema = z.object({
  day_periods: z.array(ChoghadiyaPeriodSchema),
  night_periods: z.array(ChoghadiyaPeriodSchema),
  weekday: z.number(),
  sunrise_hour: z.number(),
  sunset_hour: z.number(),
});

const MuhurtaYogaEntrySchema = z.object({
  name: z.string(),
  name_hindi: z.string(),
  category: z.string(),
  type: z.string(),
  description: z.string(),
  significance: z.string(),
  suitable_for: z.array(z.string()),
  avoid_for: z.array(z.string()),
  rarity: z.string(),
});

const MuhurtaYogasSchema = z.object({
  auspicious: z.array(MuhurtaYogaEntrySchema),
  inauspicious: z.array(MuhurtaYogaEntrySchema),
  count_auspicious: z.number(),
  count_inauspicious: z.number(),
  overall_muhurta_quality: z.string(),
  panchaka_active: z.boolean(),
  panchaka_type: z.string().nullable(),
});

const FestivalEntrySchema = z.object({
  key: z.string(),
  name: z.string(),
  name_hindi: z.string(),
  category: z.string(),
  type: z.string(),
  deity: z.string().optional(),
  description: z.string().optional(),
  description_hindi: z.string().optional(),
});

const VratEntrySchema = z.object({
  key: z.string(),
  name: z.string(),
  name_hindi: z.string(),
  category: z.string(),
  note: z.string().optional(),
});

export const PanchangResponseSchema = z.object({
  date: z.string(),
  day_name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  day_quality: DayQualitySchema,
  panchang: PanchangLimbsSchema,
  moon_phase: MoonPhaseSchema,
  hora: HoraSchema,
  timing: TimingSchema,
  planetary_positions: z.array(PlanetPositionSchema),
  choghadiya: ChoghadiyaSchema,
  muhurta_yogas: MuhurtaYogasSchema.optional(),
  festivals: z.array(FestivalEntrySchema).optional(),
  vrat: z.array(VratEntrySchema).optional(),
  _warnings: z.array(z.string()).optional(),
});

export type PanchangResponse = z.infer<typeof PanchangResponseSchema>;
export type DayQuality = z.infer<typeof DayQualitySchema>;
export type DayQualityBreakdownItem = z.infer<
  typeof DayQualityBreakdownItemSchema
>;
export type Tithi = z.infer<typeof TithiSchema>;
export type NextTithi = z.infer<typeof NextTithiSchema>;
export type HinduMonth = z.infer<typeof HinduMonthSchema>;
export type Nakshatra = z.infer<typeof NakshatraSchema>;
export type Yoga = z.infer<typeof YogaSchema>;
export type Karana = z.infer<typeof KaranaSchema>;
export type Vara = z.infer<typeof VaraSchema>;
export type MoonPhase = z.infer<typeof MoonPhaseSchema>;
export type HoraEntry = z.infer<typeof HoraEntrySchema>;
export type Hora = z.infer<typeof HoraSchema>;
export type TimingEntry = z.infer<typeof TimingEntrySchema>;
export type Timing = z.infer<typeof TimingSchema>;
export type PlanetPosition = z.infer<typeof PlanetPositionSchema>;
export type ChoghadiyaPeriod = z.infer<typeof ChoghadiyaPeriodSchema>;
export type Choghadiya = z.infer<typeof ChoghadiyaSchema>;
export type MuhurtaYogaEntry = z.infer<typeof MuhurtaYogaEntrySchema>;
export type MuhurtaYogas = z.infer<typeof MuhurtaYogasSchema>;
export type FestivalEntry = z.infer<typeof FestivalEntrySchema>;
export type VratEntry = z.infer<typeof VratEntrySchema>;
