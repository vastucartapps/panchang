export interface FaqItem {
  question: string;
  answer: string;
}

export function getCityFaqs(cityName: string, stateName: string): FaqItem[] {
  return [
    {
      question: `What is today's Panchang for ${cityName}?`,
      answer: `Today's Panchang for ${cityName}, ${stateName} includes Tithi (lunar day), Nakshatra (lunar mansion), Yoga, Karana, and Vara. It also provides Rahu Kaal, Yamagandam, Gulika Kalam timings, Hora (planetary hours), and Choghadiya periods, all calculated precisely for ${cityName}'s geographical coordinates.`,
    },
    {
      question: `What is Rahu Kaal time in ${cityName} today?`,
      answer: `Rahu Kaal is an inauspicious time period that occurs every day and is calculated based on sunrise and sunset times specific to ${cityName}. It lasts approximately 1.5 hours and varies each day of the week. It is recommended to avoid starting new ventures, important tasks, or journeys during Rahu Kaal.`,
    },
    {
      question: `What is the significance of Tithi in ${cityName}'s Panchang?`,
      answer: `Tithi is the lunar day determined by the 12-degree angular distance between the Sun and Moon. There are 30 Tithis in a lunar month. Each Tithi has specific auspicious or inauspicious qualities that affect daily activities, religious rituals, and ceremonies in ${cityName} and across India.`,
    },
    {
      question: `How is Choghadiya calculated for ${cityName}?`,
      answer: `Choghadiya divides the day and night into 8 periods each, based on sunrise and sunset times in ${cityName}. Each period is classified as Amrit (excellent), Shubh (auspicious), Labh (profitable), Chal (moderate), Rog (inauspicious), Kaal (bad), or Udveg (adverse), helping you plan activities throughout the day.`,
    },
    {
      question: `What is Nakshatra and why does it matter?`,
      answer: `Nakshatra is the lunar mansion or constellation that the Moon occupies at any given time. There are 27 Nakshatras, each spanning 13 degrees 20 minutes of the zodiac. The ruling Nakshatra influences the nature of the day, making certain activities favorable or unfavorable. It is crucial for Muhurta selection, naming ceremonies, and daily planning.`,
    },
    {
      question: `What is Hora and how to use it for daily planning?`,
      answer: `Hora divides each day into 24 planetary hours, each ruled by one of the seven classical planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn). Different Horas are suitable for different activities. For example, Jupiter's Hora is excellent for education and religious activities, while Venus's Hora favors creative pursuits and relationships.`,
    },
    {
      question: `What are Yoga and Karana in Panchang?`,
      answer: `Yoga is one of the five limbs of Panchang, calculated from the combined longitudes of the Sun and Moon. There are 27 Yogas. Karana is half of a Tithi, with 11 Karanas in total. Both Yoga and Karana influence the auspiciousness of the day and are considered when selecting Muhurta for important events.`,
    },
    {
      question: `Why is Panchang different for different cities in India?`,
      answer: `Panchang timings vary by city because they depend on local sunrise and sunset times, which change based on geographical coordinates (latitude and longitude). ${cityName} has specific sunrise/sunset times that differ from other cities, making Rahu Kaal, Choghadiya, and Hora timings unique to this location.`,
    },
  ];
}

export const RAHU_KAAL_FAQS: FaqItem[] = [
  {
    question: "What is Rahu Kaal?",
    answer: "Rahu Kaal (also Rahu Kalam) is a daily inauspicious period in Vedic astrology ruled by the shadow planet Rahu. It lasts approximately 1.5 hours each day and is calculated based on sunrise and sunset times for your specific location.",
  },
  {
    question: "How is Rahu Kaal calculated?",
    answer: "Rahu Kaal is calculated by dividing the daylight hours (sunrise to sunset) into 8 equal parts. Each part is assigned to a planetary lord following a fixed sequence for each day of the week. The segment ruled by Rahu is Rahu Kaal.",
  },
  {
    question: "What should I avoid during Rahu Kaal?",
    answer: "Avoid starting new businesses, signing important contracts, beginning journeys, performing auspicious ceremonies, making major purchases, and taking important financial decisions during Rahu Kaal. However, ongoing work and routine activities can continue.",
  },
  {
    question: "Does Rahu Kaal change every day?",
    answer: "Yes, Rahu Kaal shifts to a different time slot each day of the week following a fixed pattern. It also varies slightly between cities because it depends on local sunrise and sunset times.",
  },
  {
    question: "Is Rahu Kaal the same for all cities?",
    answer: "No. Since Rahu Kaal is calculated from sunrise and sunset times, which vary by geographical location, the exact timings differ between cities. A city in eastern India will have different Rahu Kaal timings than one in western India.",
  },
  {
    question: "Can I continue existing work during Rahu Kaal?",
    answer: "Yes. Rahu Kaal specifically applies to starting new activities. Work already in progress, routine daily tasks, and ongoing projects can safely continue during Rahu Kaal without any concern.",
  },
];

export const CHOGHADIYA_FAQS: FaqItem[] = [
  {
    question: "What is Choghadiya?",
    answer: "Choghadiya (also Chaughadia) is a Vedic time-quality system that divides the day and night into 8 periods each, totaling 16 periods. Each period is classified as Amrit, Shubh, Labh, Chal, Rog, Kaal, or Udveg based on its planetary ruler.",
  },
  {
    question: "How is Choghadiya different from Hora?",
    answer: "Choghadiya divides day and night into 8 periods each based on sunrise/sunset. Hora divides the full 24-hour day into planetary hours. Choghadiya uses quality classifications (Amrit, Shubh, etc.) while Hora assigns each hour to a planet (Sun, Moon, Mars, etc.).",
  },
  {
    question: "Which Choghadiya is best for starting new work?",
    answer: "Amrit Choghadiya is the most auspicious, ideal for spiritual activities and major decisions. Shubh Choghadiya is great for ceremonies and rituals. Labh Choghadiya is best for financial transactions and business ventures.",
  },
  {
    question: "What activities are suitable during Chal Choghadiya?",
    answer: "Chal (meaning 'moving') Choghadiya is neutral and particularly suited for travel, journeys, and movement-related activities. It is neither highly auspicious nor inauspicious.",
  },
  {
    question: "Should I avoid all work during Rog, Kaal, or Udveg Choghadiya?",
    answer: "Rog, Kaal, and Udveg are considered inauspicious periods. It is best to avoid starting important new activities during these times. However, Udveg Choghadiya is considered acceptable for government-related work and dealings with authority.",
  },
];

export const TITHI_FAQS: FaqItem[] = [
  {
    question: "What is Tithi in Hindu calendar?",
    answer: "Tithi is the lunar day in the Hindu calendar, determined by the 12-degree angular distance between the Sun and Moon. There are 30 Tithis in a lunar month — 15 in Shukla Paksha (waxing) and 15 in Krishna Paksha (waning).",
  },
  {
    question: "How is Tithi different from a regular date?",
    answer: "A regular date (Gregorian) is exactly 24 hours based on the solar calendar. A Tithi is based on the lunar cycle and can be shorter or longer than 24 hours. This is why Tithi can start and end at different times within a calendar date.",
  },
  {
    question: "What is the significance of Ekadashi Tithi?",
    answer: "Ekadashi is the 11th Tithi occurring twice every lunar month. It is highly sacred for fasting and spiritual practices, especially for Vaishnavas. Observing Ekadashi fast is believed to purify the body, enhance spiritual growth, and bring divine blessings.",
  },
  {
    question: "What are the five categories of Tithi?",
    answer: "Tithis are classified into five groups: Nanda (1st, 6th, 11th — joyful), Bhadra (2nd, 7th, 12th — gentle), Jaya (3rd, 8th, 13th — victorious), Rikta (4th, 9th, 14th — empty/inauspicious), and Purna (5th, 10th, 15th — complete/fulfilling).",
  },
  {
    question: "Why does Tithi sometimes get skipped or repeated?",
    answer: "Because Tithi is based on the Moon's speed relative to the Sun, which varies, a Tithi can sometimes last less than 24 hours (getting 'skipped' on a date) or more than 24 hours (appearing on two consecutive dates). This is called Tithi Kshaya (loss) and Tithi Vriddhi (gain).",
  },
];

export const NAKSHATRA_FAQS: FaqItem[] = [
  {
    question: "What is Nakshatra?",
    answer: "Nakshatra is a lunar mansion or constellation that the Moon occupies in its orbit. There are 27 Nakshatras, each spanning 13 degrees 20 minutes of the zodiac. Each Nakshatra has a presiding deity, planetary lord, and distinct characteristics.",
  },
  {
    question: "What is Nakshatra Pada?",
    answer: "Each Nakshatra is divided into 4 Padas (quarters), each spanning 3 degrees 20 minutes. The Pada determines the Navamsa sign and adds specificity to the Nakshatra's influence, especially important in birth chart analysis and naming ceremonies.",
  },
  {
    question: "How does Nakshatra affect daily activities?",
    answer: "Each Nakshatra has a specific activity type: Fixed (Dhruva) Nakshatras are good for permanent works, Moveable (Chara) for travel, Sharp (Tikshna) for competitive tasks, Soft (Mridu) for arts and relationships, and Mixed (Mishra) for routine activities.",
  },
  {
    question: "What are the three Ganas of Nakshatra?",
    answer: "Nakshatras are classified into three Ganas: Deva (divine — gentle, spiritual), Manushya (human — balanced, practical), and Rakshasa (fierce — powerful, intense). Gana matching is a key factor in Vedic marriage compatibility (Kundali matching).",
  },
  {
    question: "Why is birth Nakshatra important?",
    answer: "The Nakshatra occupied by the Moon at the time of birth (Janma Nakshatra) defines core personality traits, determines the starting Dasha in Vimshottari system, guides naming conventions, and is crucial for compatibility matching in marriages.",
  },
];

export const MOON_PHASE_FAQS: FaqItem[] = [
  {
    question: "How does the Moon phase affect Panchang?",
    answer: "The Moon phase is directly linked to Tithi in the Panchang. The waxing phase (Shukla Paksha) spans from New Moon to Full Moon and is generally favorable for growth activities. The waning phase (Krishna Paksha) spans Full Moon to New Moon and suits introspection and completion.",
  },
  {
    question: "What is the significance of Purnima (Full Moon)?",
    answer: "Purnima (Full Moon) is one of the most auspicious days in the Hindu calendar. It is observed for Satyanarayan Puja, Guru Purnima, Sharad Purnima, and various other festivals. Spiritual practices and prayers are believed to be especially powerful on Purnima.",
  },
  {
    question: "What is Amavasya (New Moon)?",
    answer: "Amavasya is the New Moon day when the Moon is not visible. It is sacred for performing Pitru Tarpan (ancestral offerings) and Shradh rituals. While considered inauspicious for starting new ventures, it is powerful for spiritual practices and tantra.",
  },
  {
    question: "What is Shukla Paksha and Krishna Paksha?",
    answer: "Shukla Paksha (bright half) is the 15-day waxing period from New Moon to Full Moon, considered auspicious for new beginnings. Krishna Paksha (dark half) is the 15-day waning period from Full Moon to New Moon, suited for spiritual practices and completing ongoing work.",
  },
  {
    question: "Does Moon phase differ by location?",
    answer: "The Moon phase itself (illumination percentage and phase name) is the same globally at any given moment. However, moonrise and moonset times vary by location, and the Tithi (which is tied to the Moon's position) can have different start/end times in different cities.",
  },
];

// City-specific FAQs for topic pages
export function getCityRahuKaalFaqs(cityName: string, stateName: string): FaqItem[] {
  return [
    {
      question: `What is Rahu Kaal time in ${cityName} today?`,
      answer: `Rahu Kaal timings for ${cityName}, ${stateName} are calculated daily based on the local sunrise and sunset times. The exact duration is approximately 1.5 hours and changes each day of the week. Check this page for today's accurate Rahu Kaal timing.`,
    },
    {
      question: `Should I avoid travel during Rahu Kaal in ${cityName}?`,
      answer: `Yes, starting a new journey during Rahu Kaal in ${cityName} is traditionally avoided. However, if you are already travelling, there is no need to stop. The restriction applies specifically to beginning new activities.`,
    },
    {
      question: `Is Rahu Kaal the same in ${cityName} and other cities?`,
      answer: `No. Rahu Kaal in ${cityName} differs from other cities because it depends on local sunrise and sunset times, which vary by geographical location. Even nearby cities can have slightly different timings.`,
    },
    {
      question: `What is Yamagandam and Gulika Kalam in ${cityName}?`,
      answer: `Yamagandam and Gulika Kalam are additional inauspicious periods calculated similarly to Rahu Kaal. Yamagandam is ruled by Yama, and Gulika Kalam by Saturn's son Gulika. Both last approximately 1.5 hours daily in ${cityName}.`,
    },
  ];
}

export function getCityChoghadiyaFaqs(cityName: string, stateName: string): FaqItem[] {
  return [
    {
      question: `What is today's best Choghadiya in ${cityName}?`,
      answer: `The best Choghadiya periods in ${cityName}, ${stateName} are Amrit (most auspicious), Shubh (auspicious), and Labh (profitable). Check the timings on this page to find the exact hours for each period today.`,
    },
    {
      question: `How many Choghadiya periods are there in ${cityName} today?`,
      answer: `There are 16 Choghadiya periods in ${cityName} each day — 8 during daytime (sunrise to sunset) and 8 during nighttime (sunset to next sunrise). Each period lasts about 1.5 hours.`,
    },
    {
      question: `Can I start a business during Labh Choghadiya in ${cityName}?`,
      answer: `Yes, Labh Choghadiya is considered favorable for business ventures, financial transactions, and profit-oriented activities in ${cityName}. It is one of the three auspicious periods in the Choghadiya system.`,
    },
    {
      question: `Is Choghadiya timing different for ${cityName} compared to other cities?`,
      answer: `Yes. Since Choghadiya is calculated based on sunrise and sunset times, which vary by location, the exact period timings in ${cityName} differ from those in other cities across India.`,
    },
  ];
}

export function getCityTithiFaqs(cityName: string, stateName: string): FaqItem[] {
  return [
    {
      question: `What is today's Tithi in ${cityName}?`,
      answer: `The current Tithi for ${cityName}, ${stateName} is shown on this page with its name, Paksha (lunar fortnight), deity, and progression. Tithi is the lunar day based on the angular distance between the Sun and Moon.`,
    },
    {
      question: `Does Tithi change during the day in ${cityName}?`,
      answer: `Yes, a Tithi can start or end at any point during the day. Unlike a calendar date which is exactly 24 hours, a Tithi can be shorter or longer. This is why checking the exact Tithi for ${cityName} at the current time is important.`,
    },
    {
      question: `Which Tithis are auspicious for ceremonies in ${cityName}?`,
      answer: `Nanda Tithis (1st, 6th, 11th) and Purna Tithis (5th, 10th, 15th) are generally auspicious for ceremonies in ${cityName}. Rikta Tithis (4th, 9th, 14th) are considered inauspicious and should be avoided for important events.`,
    },
    {
      question: `What is the difference between Shukla and Krishna Paksha in ${cityName}'s Panchang?`,
      answer: `Shukla Paksha (bright half) is the waxing period from New Moon to Full Moon, generally favorable for new beginnings. Krishna Paksha (dark half) is the waning period from Full Moon to New Moon, suited for spiritual practices and completing ongoing work.`,
    },
  ];
}

export function getCityNakshatraFaqs(cityName: string, stateName: string): FaqItem[] {
  return [
    {
      question: `What is today's Nakshatra in ${cityName}?`,
      answer: `The current Nakshatra for ${cityName}, ${stateName} is displayed on this page along with its Pada, ruling Lord, Deity, Gana, and activity type. Nakshatra determines the quality and nature of the day.`,
    },
    {
      question: `How does Nakshatra affect activities in ${cityName}?`,
      answer: `Each Nakshatra has an activity type: Fixed (Dhruva) for permanent works, Moveable (Chara) for travel, Sharp (Tikshna) for competitive tasks, Soft (Mridu) for arts and relationships, and Mixed (Mishra) for routine activities in ${cityName}.`,
    },
    {
      question: `Is the Nakshatra the same across all cities including ${cityName}?`,
      answer: `The Nakshatra itself is the same globally since it depends on the Moon's position in the sky, which is the same for all locations. However, the start and end times of a Nakshatra transition may appear at different local times.`,
    },
    {
      question: `What is Nakshatra Pada and why does it matter for ${cityName}?`,
      answer: `Each Nakshatra has 4 Padas (quarters). The Pada adds specificity to the Nakshatra's influence and is used for naming ceremonies, Navamsa chart analysis, and determining more precise astrological predictions for people in ${cityName}.`,
    },
  ];
}

export function getCityMoonPhaseFaqs(cityName: string, stateName: string): FaqItem[] {
  return [
    {
      question: `What is today's Moon Phase in ${cityName}?`,
      answer: `The current Moon Phase for ${cityName}, ${stateName} is shown on this page with its name, illumination percentage, Paksha, and age. The Moon phase directly influences Tithis and the nature of the day.`,
    },
    {
      question: `Is the Moon phase different in ${cityName} versus other cities?`,
      answer: `The Moon phase (illumination and phase name) is the same globally at any given moment. However, moonrise and moonset times vary by location, so when you can see the Moon in ${cityName} differs from other cities.`,
    },
    {
      question: `How does Moon Phase affect Panchang in ${cityName}?`,
      answer: `The Moon Phase is directly tied to Tithi in ${cityName}'s Panchang. Waxing phases (Shukla Paksha) are generally favorable for growth and new beginnings. Waning phases (Krishna Paksha) suit spiritual practices and introspection.`,
    },
    {
      question: `When is the next Full Moon visible in ${cityName}?`,
      answer: `Full Moon (Purnima) occurs approximately every 29.5 days. Check the daily Panchang for ${cityName} to track the Moon's progress toward the next Full Moon by monitoring the illumination percentage shown on this page.`,
    },
  ];
}

export const PANCHANG_GUIDE_FAQS: FaqItem[] = [
  {
    question: "What is Panchang?",
    answer: "Panchang (also called Panchangam) is the traditional Hindu calendar and almanac. The word comes from Sanskrit: 'Pancha' (five) + 'Anga' (limb), referring to its five key elements — Tithi, Nakshatra, Yoga, Karana, and Vara — that together describe the quality of any given day.",
  },
  {
    question: "What are the five limbs (Pancha Anga) of Panchang?",
    answer: "The five limbs are: 1) Tithi - the lunar day based on Sun-Moon angular distance, 2) Nakshatra - the lunar mansion or constellation the Moon occupies, 3) Yoga - combination of Sun and Moon longitudes producing 27 Yogas, 4) Karana - half of a Tithi with 11 types, and 5) Vara - the weekday ruled by a specific planet.",
  },
  {
    question: "How is Panchang used in daily life?",
    answer: "Panchang is used to determine auspicious times (Muhurta) for starting new ventures, weddings, house warmings, travel, and religious ceremonies. It helps identify Rahu Kaal (inauspicious periods), guides fasting schedules like Ekadashi, and provides festival dates based on the lunar calendar.",
  },
  {
    question: "What is Rahu Kaal and why should it be avoided?",
    answer: "Rahu Kaal is an inauspicious period of approximately 1.5 hours that occurs every day. It is ruled by Rahu, a shadow planet considered malefic in Vedic astrology. Starting new work, signing contracts, or beginning journeys during Rahu Kaal is traditionally avoided. However, ongoing work can continue without concern.",
  },
  {
    question: "What is the difference between Tithi and Date?",
    answer: "A date follows the solar calendar (Gregorian) and is exactly 24 hours. A Tithi follows the lunar calendar and is based on the 12-degree difference between Sun and Moon positions. A Tithi can be shorter or longer than 24 hours, which is why Tithi can start and end at different times within a date.",
  },
  {
    question: "What is Choghadiya and how is it different from Hora?",
    answer: "Choghadiya divides day and night into 8 periods each (total 16), based on sunrise/sunset. Hora divides the full day into 24 planetary hours. Choghadiya uses classifications like Amrit, Shubh, Labh, Chal, Rog, Kaal, and Udveg. Hora assigns each hour to a planet (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn).",
  },
  {
    question: "What is Abhijit Muhurta?",
    answer: "Abhijit Muhurta is a universally auspicious period of approximately 48 minutes around solar noon. It is considered the most powerful Muhurta of the day, suitable for starting any important activity. The exact timing varies by location and is calculated based on local sunrise and sunset.",
  },
  {
    question: "How does Moon Phase affect Panchang?",
    answer: "The Moon phase is directly connected to Tithi. The waxing phase (Shukla Paksha, new moon to full moon) is generally considered more auspicious for growth-oriented activities. The waning phase (Krishna Paksha, full moon to new moon) is suited for introspection, spiritual practices, and completing existing work.",
  },
  {
    question: "What is Yamagandam and Gulika Kalam?",
    answer: "Yamagandam and Gulika Kalam are inauspicious time periods similar to Rahu Kaal. Yamagandam is ruled by Yama (the lord of death) and is avoided for new beginnings. Gulika Kalam is ruled by Saturn's son Gulika. Both last approximately 1.5 hours daily and their timings vary based on sunrise.",
  },
  {
    question: "Is Panchang the same across India?",
    answer: "No. While Tithi, Nakshatra, Yoga, Karana, and Vara are the same everywhere, time-based elements like Rahu Kaal, Choghadiya, Hora, sunrise, and sunset vary by city. This is because they depend on the geographical coordinates (latitude/longitude) of the location, which determine local sunrise and sunset times.",
  },
  {
    question: "What is the significance of Ekadashi in Panchang?",
    answer: "Ekadashi is the 11th Tithi occurring twice every lunar month — once during Shukla Paksha and once during Krishna Paksha. It is considered highly auspicious for fasting, prayer, and spiritual activities. Observing Ekadashi fast is believed to purify the mind and body and bring spiritual merit.",
  },
  {
    question: "How to select an auspicious time using Panchang?",
    answer: "To find an auspicious time (Muhurta), check that the Tithi, Nakshatra, and Yoga are favorable for your activity. Avoid Rahu Kaal, Yamagandam, and Gulika Kalam. Prefer Shubh or Amrit Choghadiya periods. Consider the Hora of the ruling planet that supports your activity. Abhijit Muhurta around noon is universally good.",
  },
];
