import { cookies } from "next/headers";

export type Locale = "en" | "hi";

export const LOCALE_COOKIE = "panchang_lang";

/**
 * Read locale from cookie (server-side).
 * Falls back to "en" if not set.
 */
export async function getLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const val = cookieStore.get(LOCALE_COOKIE)?.value;
    if (val === "hi") return "hi";
  } catch {
    // Outside of a request context
  }
  return "en";
}

// ─── Translation Dictionaries ────────────────────────

const en = {
  // General
  "site.name": "VastuCart Panchang",
  "nav.home": "Home",
  "nav.fullPanchang": "Full Panchang",

  // Hero / City page
  "hero.panchang": "Panchang",
  "hero.todaysPanchang": "Today's Panchang",
  "hero.weeklyPanchang": "Weekly Panchang",
  "hero.calendar": "Calendar",
  "hero.share": "Share",

  // Day Quality
  "dayQuality": "Day Quality",
  "dayQuality.score": "Score",
  "dayQuality.excellent": "Excellent",
  "dayQuality.good": "Good",
  "dayQuality.average": "Average",
  "dayQuality.belowAverage": "Below Average",
  "dayQuality.poor": "Poor",

  // Panchang Limbs
  "panchang.tithi": "Tithi",
  "panchang.nakshatra": "Nakshatra",
  "panchang.yoga": "Yoga",
  "panchang.karana": "Karana",
  "panchang.vara": "Vara (Day)",
  "panchang.paksha": "Paksha",
  "panchang.lord": "Lord",
  "panchang.deity": "Deity",
  "panchang.nature": "Nature",
  "panchang.elapsed": "Elapsed",

  // Timing
  "timing.sunrise": "Sunrise",
  "timing.sunset": "Sunset",
  "timing.rahuKaal": "Rahu Kaal",
  "timing.yamagandam": "Yamagandam",
  "timing.gulikaKalam": "Gulika Kalam",
  "timing.abhijitMuhurta": "Abhijit Muhurta",
  "timing.brahmaMuhurta": "Brahma Muhurta",
  "timing.dinamana": "Day Duration",

  // Time Quality
  "timeQuality.hora": "Hora",
  "timeQuality.choghadiya": "Choghadiya",
  "timeQuality.avoidTheseTimes": "Avoid These Times",
  "timeQuality.goodTimings": "Good Timings",
  "timeQuality.currentPeriod": "Current Period",

  // Activities
  "activities.suitable": "Suitable Activities",
  "activities.avoid": "Activities to Avoid",

  // Moon Phase
  "moon.phase": "Moon Phase",
  "moon.illumination": "Illumination",

  // Sections
  "section.panchangDetails": "Panchang Details",
  "section.timingDetails": "Timing Details",
  "section.planetaryPositions": "Planetary Positions",
  "section.dayQualityBreakdown": "Day Quality Breakdown",

  // Nature labels
  "nature.auspicious": "Auspicious",
  "nature.inauspicious": "Inauspicious",
  "nature.neutral": "Neutral",
  "nature.excellent": "Excellent",
  "nature.good": "Good",
  "nature.average": "Average",
  "nature.poor": "Poor",

  // Paksha
  "paksha.shukla": "Shukla Paksha",
  "paksha.krishna": "Krishna Paksha",

  // Days
  "day.monday": "Monday",
  "day.tuesday": "Tuesday",
  "day.wednesday": "Wednesday",
  "day.thursday": "Thursday",
  "day.friday": "Friday",
  "day.saturday": "Saturday",
  "day.sunday": "Sunday",

  // Planets
  "planet.sun": "Sun",
  "planet.moon": "Moon",
  "planet.mars": "Mars",
  "planet.mercury": "Mercury",
  "planet.jupiter": "Jupiter",
  "planet.venus": "Venus",
  "planet.saturn": "Saturn",
  "planet.rahu": "Rahu",
  "planet.ketu": "Ketu",

  // CTA
  "cta.viewFullPanchang": "View Full Panchang",
  "cta.viewForCity": "View for your city",
  "cta.today": "Today",
  "cta.prev": "Previous",
  "cta.next": "Next",
} as const;

const hi: Record<keyof typeof en, string> = {
  // General
  "site.name": "वास्तुकार्ट पंचांग",
  "nav.home": "होम",
  "nav.fullPanchang": "सम्पूर्ण पंचांग",

  // Hero / City page
  "hero.panchang": "पंचांग",
  "hero.todaysPanchang": "आज का पंचांग",
  "hero.weeklyPanchang": "साप्ताहिक पंचांग",
  "hero.calendar": "कैलेंडर",
  "hero.share": "शेयर करें",

  // Day Quality
  "dayQuality": "दिन की गुणवत्ता",
  "dayQuality.score": "स्कोर",
  "dayQuality.excellent": "उत्तम",
  "dayQuality.good": "अच्छा",
  "dayQuality.average": "सामान्य",
  "dayQuality.belowAverage": "सामान्य से कम",
  "dayQuality.poor": "खराब",

  // Panchang Limbs
  "panchang.tithi": "तिथि",
  "panchang.nakshatra": "नक्षत्र",
  "panchang.yoga": "योग",
  "panchang.karana": "करण",
  "panchang.vara": "वार",
  "panchang.paksha": "पक्ष",
  "panchang.lord": "स्वामी",
  "panchang.deity": "देवता",
  "panchang.nature": "प्रकृति",
  "panchang.elapsed": "बीता हुआ",

  // Timing
  "timing.sunrise": "सूर्योदय",
  "timing.sunset": "सूर्यास्त",
  "timing.rahuKaal": "राहु काल",
  "timing.yamagandam": "यमगण्ड",
  "timing.gulikaKalam": "गुलिक काल",
  "timing.abhijitMuhurta": "अभिजित मुहूर्त",
  "timing.brahmaMuhurta": "ब्रह्म मुहूर्त",
  "timing.dinamana": "दिन की अवधि",

  // Time Quality
  "timeQuality.hora": "होरा",
  "timeQuality.choghadiya": "चौघड़िया",
  "timeQuality.avoidTheseTimes": "अशुभ समय",
  "timeQuality.goodTimings": "शुभ समय",
  "timeQuality.currentPeriod": "वर्तमान अवधि",

  // Activities
  "activities.suitable": "शुभ कार्य",
  "activities.avoid": "अशुभ कार्य",

  // Moon Phase
  "moon.phase": "चंद्र कला",
  "moon.illumination": "चंद्र प्रकाश",

  // Sections
  "section.panchangDetails": "पंचांग विवरण",
  "section.timingDetails": "समय विवरण",
  "section.planetaryPositions": "ग्रह स्थिति",
  "section.dayQualityBreakdown": "दिन की गुणवत्ता विश्लेषण",

  // Nature labels
  "nature.auspicious": "शुभ",
  "nature.inauspicious": "अशुभ",
  "nature.neutral": "सामान्य",
  "nature.excellent": "उत्तम",
  "nature.good": "अच्छा",
  "nature.average": "सामान्य",
  "nature.poor": "खराब",

  // Paksha
  "paksha.shukla": "शुक्ल पक्ष",
  "paksha.krishna": "कृष्ण पक्ष",

  // Days
  "day.monday": "सोमवार",
  "day.tuesday": "मंगलवार",
  "day.wednesday": "बुधवार",
  "day.thursday": "गुरुवार",
  "day.friday": "शुक्रवार",
  "day.saturday": "शनिवार",
  "day.sunday": "रविवार",

  // Planets
  "planet.sun": "सूर्य",
  "planet.moon": "चंद्र",
  "planet.mars": "मंगल",
  "planet.mercury": "बुध",
  "planet.jupiter": "गुरु",
  "planet.venus": "शुक्र",
  "planet.saturn": "शनि",
  "planet.rahu": "राहु",
  "planet.ketu": "केतु",

  // CTA
  "cta.viewFullPanchang": "सम्पूर्ण पंचांग देखें",
  "cta.viewForCity": "अपने शहर के लिए देखें",
  "cta.today": "आज",
  "cta.prev": "पिछला",
  "cta.next": "अगला",
};

type TranslationKey = keyof typeof en;

const dictionaries = { en, hi } as const;

/**
 * Get a translation function for the given locale.
 */
export function getTranslations(locale: Locale) {
  const dict = dictionaries[locale];
  return function t(key: TranslationKey): string {
    return dict[key] || en[key] || key;
  };
}

// ─── Panchang term translations (Hindi names for API values) ─────

export const TITHI_HINDI: Record<string, string> = {
  PRATIPADA: "प्रतिपदा",
  DWITIYA: "द्वितीया",
  TRITIYA: "तृतीया",
  CHATURTHI: "चतुर्थी",
  PANCHAMI: "पंचमी",
  SHASHTHI: "षष्ठी",
  SAPTAMI: "सप्तमी",
  ASHTAMI: "अष्टमी",
  NAVAMI: "नवमी",
  DASHAMI: "दशमी",
  EKADASHI: "एकादशी",
  DWADASHI: "द्वादशी",
  TRAYODASHI: "त्रयोदशी",
  CHATURDASHI: "चतुर्दशी",
  PURNIMA: "पूर्णिमा",
  AMAVASYA: "अमावस्या",
};

export const NAKSHATRA_HINDI: Record<string, string> = {
  ASHWINI: "अश्विनी",
  BHARANI: "भरणी",
  KRITTIKA: "कृत्तिका",
  ROHINI: "रोहिणी",
  MRIGASHIRA: "मृगशिरा",
  ARDRA: "आर्द्रा",
  PUNARVASU: "पुनर्वसु",
  PUSHYA: "पुष्य",
  ASHLESHA: "आश्लेषा",
  MAGHA: "मघा",
  PURVA_PHALGUNI: "पूर्व फाल्गुनी",
  UTTARA_PHALGUNI: "उत्तर फाल्गुनी",
  HASTA: "हस्त",
  CHITRA: "चित्रा",
  SWATI: "स्वाती",
  VISHAKHA: "विशाखा",
  ANURADHA: "अनुराधा",
  JYESHTHA: "ज्येष्ठा",
  MULA: "मूल",
  PURVA_ASHADHA: "पूर्वाषाढ़ा",
  UTTARA_ASHADHA: "उत्तराषाढ़ा",
  SHRAVANA: "श्रवण",
  DHANISHTA: "धनिष्ठा",
  SHATABHISHA: "शतभिषा",
  PURVA_BHADRAPADA: "पूर्व भाद्रपदा",
  UTTARA_BHADRAPADA: "उत्तर भाद्रपदा",
  REVATI: "रेवती",
};

export const YOGA_HINDI: Record<string, string> = {
  VISHKUMBHA: "विष्कम्भ",
  PRITI: "प्रीति",
  AYUSHMAN: "आयुष्मान",
  SAUBHAGYA: "सौभाग्य",
  SHOBHANA: "शोभन",
  ATIGANDA: "अतिगण्ड",
  SUKARMA: "सुकर्मा",
  DHRITI: "धृति",
  SHULA: "शूल",
  GANDA: "गण्ड",
  VRIDDHI: "वृद्धि",
  DHRUVA: "ध्रुव",
  VYAGHATA: "व्याघात",
  HARSHANA: "हर्षण",
  VAJRA: "वज्र",
  SIDDHI: "सिद्धि",
  VYATIPATA: "व्यतीपात",
  VARIYAN: "वरीयान",
  PARIGHA: "परिघ",
  SHIVA: "शिव",
  SIDDHA: "सिद्ध",
  SADHYA: "साध्य",
  SHUBHA: "शुभ",
  SHUKLA: "शुक्ल",
  BRAHMA: "ब्रह्म",
  INDRA: "इन्द्र",
  VAIDHRITI: "वैधृति",
};

export const PLANET_HINDI: Record<string, string> = {
  Sun: "सूर्य",
  Moon: "चंद्र",
  Mars: "मंगल",
  Mercury: "बुध",
  Jupiter: "गुरु",
  Venus: "शुक्र",
  Saturn: "शनि",
  Rahu: "राहु",
  Ketu: "केतु",
};

/**
 * Get the Hindi name for a Panchang term, or return the English name.
 */
export function getHindiName(
  type: "tithi" | "nakshatra" | "yoga" | "planet",
  englishKey: string
): string {
  const key = englishKey.toUpperCase().replace(/\s+/g, "_");
  switch (type) {
    case "tithi":
      // Strip paksha prefix if present (e.g., "SHUKLA_PRATIPADA" -> "PRATIPADA")
      for (const [k, v] of Object.entries(TITHI_HINDI)) {
        if (key.includes(k)) return v;
      }
      return englishKey;
    case "nakshatra":
      return NAKSHATRA_HINDI[key] || englishKey;
    case "yoga":
      return YOGA_HINDI[key] || englishKey;
    case "planet":
      return PLANET_HINDI[englishKey] || englishKey;
    default:
      return englishKey;
  }
}
