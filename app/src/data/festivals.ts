export interface Festival {
  slug: string;
  name: string;
  nameHindi: string;
  date: string; // YYYY-MM-DD
  year: number;
  category: "major" | "vrat" | "regional";
  description: string;
  significance: string;
  tithi?: string;
  deity?: string;
  traditions: string[];
}

/**
 * Major Hindu festivals and vrat dates.
 *
 * IMPORTANT — ANNUAL UPDATE REQUIRED:
 * Hindu festival dates are based on the Panchang (lunar calendar) and shift every year.
 * Before each new year begins, add the next year's festivals below.
 * For example, add 2027 festivals before Jan 2027.
 *
 * Festival dates for future years can be sourced from:
 * - drikpanchang.com (most authoritative)
 * - iskcondesiretree.com/page/vaisnava-calendar
 * - The project's own Panchang API (check specific Tithis)
 */
export const FESTIVALS: Festival[] = [
  // ─── 2025 ──────────────────────────────────────────
  {
    slug: "makar-sankranti-2025",
    name: "Makar Sankranti",
    nameHindi: "मकर संक्रान्ति",
    date: "2025-01-14",
    year: 2025,
    category: "major",
    description:
      "Makar Sankranti marks the transition of the Sun into Capricorn (Makara), signaling the end of the winter solstice and the beginning of longer days.",
    significance:
      "One of the few Hindu festivals based on the solar calendar. It celebrates the harvest season and is observed across India with regional names like Pongal, Lohri, and Uttarayan.",
    deity: "Surya (Sun God)",
    traditions: [
      "Til-gul (sesame-jaggery) sweets sharing",
      "Kite flying (Uttarayan)",
      "Holy dip in sacred rivers",
      "Pongal feast in South India",
    ],
  },
  {
    slug: "vasant-panchami-2025",
    name: "Vasant Panchami",
    nameHindi: "वसंत पंचमी",
    date: "2025-02-02",
    year: 2025,
    category: "major",
    description:
      "Vasant Panchami celebrates the arrival of spring and is dedicated to Goddess Saraswati, the deity of knowledge, music, and arts.",
    significance:
      "Also known as Saraswati Puja, this festival marks the preparation for spring. Yellow is the color of the day, symbolizing the vibrancy of life and the mustard fields in bloom.",
    tithi: "Magha Shukla Panchami",
    deity: "Goddess Saraswati",
    traditions: [
      "Wearing yellow clothes",
      "Saraswati Puja in schools",
      "Placing books near Saraswati idol",
      "Flying kites",
    ],
  },
  {
    slug: "maha-shivaratri-2025",
    name: "Maha Shivaratri",
    nameHindi: "महाशिवरात्रि",
    date: "2025-02-26",
    year: 2025,
    category: "major",
    description:
      "Maha Shivaratri, the great night of Lord Shiva, is one of the most significant Hindu festivals dedicated to the worship of Lord Shiva.",
    significance:
      "Devotees observe an all-night vigil (jagran), fasting, and worship. It is believed that on this night, Lord Shiva performed the cosmic dance (Tandava) of creation, preservation, and destruction.",
    tithi: "Phalguna Krishna Chaturdashi",
    deity: "Lord Shiva",
    traditions: [
      "All-night vigil and prayers",
      "Fasting throughout the day",
      "Abhishekam with milk, water, and bilva leaves",
      "Chanting Om Namah Shivaya",
    ],
  },
  {
    slug: "holi-2025",
    name: "Holi",
    nameHindi: "होली",
    date: "2025-03-14",
    year: 2025,
    category: "major",
    description:
      "Holi, the festival of colors, celebrates the triumph of good over evil and the arrival of spring.",
    significance:
      "Holika Dahan on the night before symbolizes the victory of devotee Prahlada over demoness Holika. The next day, people play with colors celebrating joy, love, and forgiveness.",
    tithi: "Phalguna Purnima",
    deity: "Lord Vishnu / Krishna",
    traditions: [
      "Holika Dahan bonfire",
      "Playing with colored powders (gulal)",
      "Thandai and gujiya sweets",
      "Community celebrations",
    ],
  },
  {
    slug: "chaitra-navratri-2025",
    name: "Chaitra Navratri",
    nameHindi: "चैत्र नवरात्रि",
    date: "2025-03-30",
    year: 2025,
    category: "major",
    description:
      "Chaitra Navratri marks the beginning of the Hindu New Year and nine nights of Goddess Durga worship.",
    significance:
      "These nine nights honor the nine forms of Goddess Durga. The first day is celebrated as Gudi Padwa in Maharashtra and Ugadi in Karnataka and Andhra Pradesh.",
    tithi: "Chaitra Shukla Pratipada",
    deity: "Goddess Durga (Navadurga)",
    traditions: [
      "Nine-day fasting",
      "Daily puja of different Durga forms",
      "Gudi Padwa and Ugadi celebrations",
      "Kanya Pujan on Ashtami/Navami",
    ],
  },
  {
    slug: "ram-navami-2025",
    name: "Ram Navami",
    nameHindi: "राम नवमी",
    date: "2025-04-06",
    year: 2025,
    category: "major",
    description:
      "Ram Navami celebrates the birth of Lord Rama, the seventh avatar of Lord Vishnu.",
    significance:
      "Falling on the ninth day of Chaitra Navratri, it marks the culmination of the spring Navratri. Lord Rama is revered as the ideal man (Maryada Purushottam).",
    tithi: "Chaitra Shukla Navami",
    deity: "Lord Rama",
    traditions: [
      "Ramayana recitation",
      "Temple processions (Shobha Yatra)",
      "Fasting and prayers",
      "Distribution of Panakam (jaggery drink)",
    ],
  },
  {
    slug: "akshaya-tritiya-2025",
    name: "Akshaya Tritiya",
    nameHindi: "अक्षय तृतीया",
    date: "2025-04-30",
    year: 2025,
    category: "major",
    description:
      "Akshaya Tritiya is considered one of the most auspicious days in the Hindu calendar. 'Akshaya' means imperishable — anything started on this day is believed to bring lasting prosperity.",
    significance:
      "It is believed that any charity, japa, or investment done on this day multiplies infinitely. Traditionally, this is the most popular day for buying gold.",
    tithi: "Vaishakha Shukla Tritiya",
    deity: "Lord Vishnu & Goddess Lakshmi",
    traditions: [
      "Buying gold and valuables",
      "Starting new ventures",
      "Charity and donations",
      "Vishnu-Lakshmi puja",
    ],
  },
  {
    slug: "guru-purnima-2025",
    name: "Guru Purnima",
    nameHindi: "गुरु पूर्णिमा",
    date: "2025-07-10",
    year: 2025,
    category: "major",
    description:
      "Guru Purnima is dedicated to spiritual and academic teachers. It honors Sage Vyasa, who classified the Vedas.",
    significance:
      "This full moon day in Ashadha month is dedicated to expressing gratitude to gurus. It marks the day when Shiva became the first guru (Adi Guru) and transmitted yoga to the Saptarishis.",
    tithi: "Ashadha Purnima",
    deity: "Sage Vyasa / Lord Shiva (Adi Guru)",
    traditions: [
      "Honoring teachers and mentors",
      "Vyasa Puja rituals",
      "Offering dakshina to gurus",
      "Spiritual discourses",
    ],
  },
  {
    slug: "raksha-bandhan-2025",
    name: "Raksha Bandhan",
    nameHindi: "रक्षा बंधन",
    date: "2025-08-09",
    year: 2025,
    category: "major",
    description:
      "Raksha Bandhan celebrates the sacred bond between brothers and sisters, where sisters tie a protective thread (rakhi) on their brothers' wrists.",
    significance:
      "The festival symbolizes a brother's duty to protect his sister and a sister's prayers for her brother's well-being. It falls on the full moon day of Shravana month.",
    tithi: "Shravana Purnima",
    deity: "Lord Indra (historically)",
    traditions: [
      "Sister ties rakhi on brother's wrist",
      "Brother gives gifts and promises protection",
      "Family feast and sweets",
      "Priests tie rakhi to patrons",
    ],
  },
  {
    slug: "janmashtami-2025",
    name: "Krishna Janmashtami",
    nameHindi: "कृष्ण जन्माष्टमी",
    date: "2025-08-16",
    year: 2025,
    category: "major",
    description:
      "Janmashtami celebrates the birth of Lord Krishna, the eighth avatar of Lord Vishnu, at midnight in the prison of Mathura.",
    significance:
      "One of the most widely celebrated Hindu festivals. Devotees fast until midnight, the time of Krishna's birth, and then break their fast with festive food.",
    tithi: "Bhadrapada Krishna Ashtami",
    deity: "Lord Krishna",
    traditions: [
      "Midnight celebrations and prayers",
      "Dahi Handi (pot-breaking competition)",
      "Fasting until midnight",
      "Decorating Krishna temples and homes",
    ],
  },
  {
    slug: "ganesh-chaturthi-2025",
    name: "Ganesh Chaturthi",
    nameHindi: "गणेश चतुर्थी",
    date: "2025-08-27",
    year: 2025,
    category: "major",
    description:
      "Ganesh Chaturthi celebrates the birth of Lord Ganesha, the elephant-headed god of wisdom and new beginnings.",
    significance:
      "A 10-day festival, especially grand in Maharashtra, where elaborate Ganesh idols are installed in homes and public pandals before being immersed in water on Anant Chaturdashi.",
    tithi: "Bhadrapada Shukla Chaturthi",
    deity: "Lord Ganesha",
    traditions: [
      "Installation of Ganesh idols",
      "Modak preparation",
      "10-day worship and cultural events",
      "Grand immersion procession (Visarjan)",
    ],
  },
  {
    slug: "sharad-navratri-2025",
    name: "Sharad Navratri",
    nameHindi: "शरद नवरात्रि",
    date: "2025-09-22",
    year: 2025,
    category: "major",
    description:
      "Sharad Navratri is the most celebrated Navratri, spanning nine nights of Goddess Durga worship in the autumn season.",
    significance:
      "The most important of the four Navratris. Each night honors a different form of Goddess Durga. Garba and Dandiya dances in Gujarat and grand Durga Puja in Bengal are highlights.",
    tithi: "Ashwin Shukla Pratipada",
    deity: "Goddess Durga (Navadurga)",
    traditions: [
      "Nine nights of fasting and puja",
      "Garba and Dandiya Raas",
      "Durga Puja pandals",
      "Kanya Pujan on Ashtami",
    ],
  },
  {
    slug: "dussehra-2025",
    name: "Dussehra (Vijayadashami)",
    nameHindi: "दशहरा (विजयादशमी)",
    date: "2025-10-02",
    year: 2025,
    category: "major",
    description:
      "Dussehra celebrates the victory of Lord Rama over the demon king Ravana and Goddess Durga's triumph over Mahishasura.",
    significance:
      "The tenth day after Navratri symbolizes the triumph of good over evil. Grand effigies of Ravana are burned across North India, while in Bengal it marks Durga Visarjan.",
    tithi: "Ashwin Shukla Dashami",
    deity: "Lord Rama / Goddess Durga",
    traditions: [
      "Burning Ravana effigies",
      "Ramlila performances",
      "Durga idol immersion (in Bengal)",
      "Shami tree worship",
    ],
  },
  {
    slug: "karwa-chauth-2025",
    name: "Karwa Chauth",
    nameHindi: "करवा चौथ",
    date: "2025-10-05",
    year: 2025,
    category: "vrat",
    description:
      "Karwa Chauth is a one-day festival observed by married Hindu women who fast from sunrise to moonrise for the longevity of their husbands.",
    significance:
      "Married women observe a strict nirjala (without water) fast and break it only after sighting the moon. The festival celebrates marital love and devotion.",
    tithi: "Kartik Krishna Chaturthi",
    deity: "Goddess Parvati / Lord Shiva",
    traditions: [
      "Nirjala (waterless) fast",
      "Applying mehendi (henna)",
      "Listening to Karwa Chauth Katha",
      "Breaking fast after moon sighting",
    ],
  },
  {
    slug: "diwali-2025",
    name: "Diwali (Deepavali)",
    nameHindi: "दीपावली",
    date: "2025-10-20",
    year: 2025,
    category: "major",
    description:
      "Diwali, the festival of lights, is the most widely celebrated Hindu festival, marking Lord Rama's return to Ayodhya after 14 years of exile.",
    significance:
      "A five-day celebration symbolizing the victory of light over darkness. Homes are lit with diyas, rangoli decorates entrances, and Goddess Lakshmi is worshipped for prosperity.",
    tithi: "Kartik Amavasya",
    deity: "Goddess Lakshmi / Lord Rama",
    traditions: [
      "Lighting diyas and candles",
      "Lakshmi-Ganesh puja",
      "Rangoli decoration",
      "Fireworks and sweets distribution",
    ],
  },
  {
    slug: "govardhan-puja-2025",
    name: "Govardhan Puja",
    nameHindi: "गोवर्धन पूजा",
    date: "2025-10-21",
    year: 2025,
    category: "major",
    description:
      "Govardhan Puja, celebrated the day after Diwali, honors Lord Krishna's lifting of Govardhan Hill to protect the villagers of Vrindavan.",
    significance:
      "Also known as Annakut, devotees prepare a mountain of food offerings. The festival celebrates gratitude toward nature and Krishna's protection.",
    tithi: "Kartik Shukla Pratipada",
    deity: "Lord Krishna",
    traditions: [
      "Annakut (mountain of food) offering",
      "Govardhan Hill worship",
      "Cow and bull worship",
      "Community feasts",
    ],
  },
  {
    slug: "chhath-puja-2025",
    name: "Chhath Puja",
    nameHindi: "छठ पूजा",
    date: "2025-10-26",
    year: 2025,
    category: "major",
    description:
      "Chhath Puja is an ancient Vedic festival dedicated to the Sun God (Surya) and Chhathi Maiya, observed mainly in Bihar, Jharkhand, and eastern UP.",
    significance:
      "A four-day festival involving holy bathing, fasting, standing in water, and offering prayers to the setting and rising sun. It is known for its rigorous discipline.",
    tithi: "Kartik Shukla Shashthi",
    deity: "Surya (Sun God) & Chhathi Maiya",
    traditions: [
      "Nahay Khay (holy bathing and eating)",
      "36-hour waterless fast",
      "Offering Arghya to setting sun",
      "Final offering to rising sun",
    ],
  },

  // ─── 2026 ──────────────────────────────────────────
  {
    slug: "makar-sankranti-2026",
    name: "Makar Sankranti",
    nameHindi: "मकर संक्रान्ति",
    date: "2026-01-14",
    year: 2026,
    category: "major",
    description:
      "Makar Sankranti marks the transition of the Sun into Capricorn (Makara), signaling the end of the winter solstice and the beginning of longer days.",
    significance:
      "One of the few Hindu festivals based on the solar calendar. It celebrates the harvest season and is observed across India with regional names like Pongal, Lohri, and Uttarayan.",
    deity: "Surya (Sun God)",
    traditions: [
      "Til-gul (sesame-jaggery) sweets sharing",
      "Kite flying (Uttarayan)",
      "Holy dip in sacred rivers",
      "Pongal feast in South India",
    ],
  },
  {
    slug: "vasant-panchami-2026",
    name: "Vasant Panchami",
    nameHindi: "वसंत पंचमी",
    date: "2026-01-23",
    year: 2026,
    category: "major",
    description:
      "Vasant Panchami celebrates the arrival of spring and is dedicated to Goddess Saraswati, the deity of knowledge, music, and arts.",
    significance:
      "Also known as Saraswati Puja, this festival marks the preparation for spring. Yellow is the color of the day, symbolizing the vibrancy of life.",
    tithi: "Magha Shukla Panchami",
    deity: "Goddess Saraswati",
    traditions: [
      "Wearing yellow clothes",
      "Saraswati Puja in schools",
      "Placing books near Saraswati idol",
      "Flying kites",
    ],
  },
  {
    slug: "maha-shivaratri-2026",
    name: "Maha Shivaratri",
    nameHindi: "महाशिवरात्रि",
    date: "2026-02-15",
    year: 2026,
    category: "major",
    description:
      "Maha Shivaratri, the great night of Lord Shiva, is one of the most significant Hindu festivals dedicated to the worship of Lord Shiva.",
    significance:
      "Devotees observe an all-night vigil (jagran), fasting, and worship. It is believed that on this night, Lord Shiva performed the cosmic dance (Tandava).",
    tithi: "Phalguna Krishna Chaturdashi",
    deity: "Lord Shiva",
    traditions: [
      "All-night vigil and prayers",
      "Fasting throughout the day",
      "Abhishekam with milk, water, and bilva leaves",
      "Chanting Om Namah Shivaya",
    ],
  },
  {
    slug: "holi-2026",
    name: "Holi",
    nameHindi: "होली",
    date: "2026-03-04",
    year: 2026,
    category: "major",
    description:
      "Holi, the festival of colors, celebrates the triumph of good over evil and the arrival of spring.",
    significance:
      "Holika Dahan on the night before symbolizes the victory of devotee Prahlada over demoness Holika. The next day, people play with colors celebrating joy and forgiveness.",
    tithi: "Phalguna Purnima",
    deity: "Lord Vishnu / Krishna",
    traditions: [
      "Holika Dahan bonfire",
      "Playing with colored powders (gulal)",
      "Thandai and gujiya sweets",
      "Community celebrations",
    ],
  },
  {
    slug: "chaitra-navratri-2026",
    name: "Chaitra Navratri",
    nameHindi: "चैत्र नवरात्रि",
    date: "2026-03-19",
    year: 2026,
    category: "major",
    description:
      "Chaitra Navratri marks the beginning of the Hindu New Year and nine nights of Goddess Durga worship.",
    significance:
      "These nine nights honor the nine forms of Goddess Durga. The first day is celebrated as Gudi Padwa and Ugadi in different regions.",
    tithi: "Chaitra Shukla Pratipada",
    deity: "Goddess Durga (Navadurga)",
    traditions: [
      "Nine-day fasting",
      "Daily puja of different Durga forms",
      "Gudi Padwa and Ugadi celebrations",
      "Kanya Pujan on Ashtami/Navami",
    ],
  },
  {
    slug: "ram-navami-2026",
    name: "Ram Navami",
    nameHindi: "राम नवमी",
    date: "2026-03-27",
    year: 2026,
    category: "major",
    description:
      "Ram Navami celebrates the birth of Lord Rama, the seventh avatar of Lord Vishnu.",
    significance:
      "Falling on the ninth day of Chaitra Navratri, it marks the culmination of the spring Navratri. Lord Rama is revered as the ideal man (Maryada Purushottam).",
    tithi: "Chaitra Shukla Navami",
    deity: "Lord Rama",
    traditions: [
      "Ramayana recitation",
      "Temple processions (Shobha Yatra)",
      "Fasting and prayers",
      "Distribution of Panakam",
    ],
  },
  {
    slug: "akshaya-tritiya-2026",
    name: "Akshaya Tritiya",
    nameHindi: "अक्षय तृतीया",
    date: "2026-04-19",
    year: 2026,
    category: "major",
    description:
      "Akshaya Tritiya is considered one of the most auspicious days in the Hindu calendar. 'Akshaya' means imperishable — anything started on this day brings lasting prosperity.",
    significance:
      "It is believed that any charity, japa, or investment done on this day multiplies infinitely. Traditionally, this is the most popular day for buying gold.",
    tithi: "Vaishakha Shukla Tritiya",
    deity: "Lord Vishnu & Goddess Lakshmi",
    traditions: [
      "Buying gold and valuables",
      "Starting new ventures",
      "Charity and donations",
      "Vishnu-Lakshmi puja",
    ],
  },
  {
    slug: "buddha-purnima-2026",
    name: "Buddha Purnima",
    nameHindi: "बुद्ध पूर्णिमा",
    date: "2026-05-01",
    year: 2026,
    category: "major",
    description:
      "Buddha Purnima commemorates the birth, enlightenment, and death (Mahaparinirvana) of Gautama Buddha.",
    significance:
      "Also known as Vesak, it falls on the full moon of Vaishakha. It is a day of reflection on Buddha's teachings of compassion, peace, and the Middle Path.",
    tithi: "Vaishakha Purnima",
    deity: "Gautama Buddha",
    traditions: [
      "Visiting Buddhist temples",
      "Meditation and prayer",
      "Offering food and alms",
      "Reciting Buddhist scriptures",
    ],
  },
  {
    slug: "guru-purnima-2026",
    name: "Guru Purnima",
    nameHindi: "गुरु पूर्णिमा",
    date: "2026-06-29",
    year: 2026,
    category: "major",
    description:
      "Guru Purnima is dedicated to spiritual and academic teachers. It honors Sage Vyasa, who classified the Vedas.",
    significance:
      "This full moon day in Ashadha month is dedicated to expressing gratitude to gurus. It marks the day when Shiva became the first guru.",
    tithi: "Ashadha Purnima",
    deity: "Sage Vyasa / Lord Shiva (Adi Guru)",
    traditions: [
      "Honoring teachers and mentors",
      "Vyasa Puja rituals",
      "Offering dakshina to gurus",
      "Spiritual discourses",
    ],
  },
  {
    slug: "raksha-bandhan-2026",
    name: "Raksha Bandhan",
    nameHindi: "रक्षा बंधन",
    date: "2026-07-29",
    year: 2026,
    category: "major",
    description:
      "Raksha Bandhan celebrates the sacred bond between brothers and sisters, where sisters tie a protective thread (rakhi) on their brothers' wrists.",
    significance:
      "The festival symbolizes a brother's duty to protect his sister and a sister's prayers for her brother's well-being.",
    tithi: "Shravana Purnima",
    deity: "Lord Indra (historically)",
    traditions: [
      "Sister ties rakhi on brother's wrist",
      "Brother gives gifts and promises protection",
      "Family feast and sweets",
      "Priests tie rakhi to patrons",
    ],
  },
  {
    slug: "janmashtami-2026",
    name: "Krishna Janmashtami",
    nameHindi: "कृष्ण जन्माष्टमी",
    date: "2026-08-15",
    year: 2026,
    category: "major",
    description:
      "Janmashtami celebrates the birth of Lord Krishna, the eighth avatar of Lord Vishnu, at midnight in the prison of Mathura.",
    significance:
      "One of the most widely celebrated Hindu festivals. Devotees fast until midnight, the time of Krishna's birth.",
    tithi: "Bhadrapada Krishna Ashtami",
    deity: "Lord Krishna",
    traditions: [
      "Midnight celebrations and prayers",
      "Dahi Handi (pot-breaking competition)",
      "Fasting until midnight",
      "Decorating Krishna temples and homes",
    ],
  },
  {
    slug: "ganesh-chaturthi-2026",
    name: "Ganesh Chaturthi",
    nameHindi: "गणेश चतुर्थी",
    date: "2026-08-17",
    year: 2026,
    category: "major",
    description:
      "Ganesh Chaturthi celebrates the birth of Lord Ganesha, the elephant-headed god of wisdom and new beginnings.",
    significance:
      "A 10-day festival, especially grand in Maharashtra, where elaborate Ganesh idols are installed before being immersed on Anant Chaturdashi.",
    tithi: "Bhadrapada Shukla Chaturthi",
    deity: "Lord Ganesha",
    traditions: [
      "Installation of Ganesh idols",
      "Modak preparation",
      "10-day worship and cultural events",
      "Grand immersion procession (Visarjan)",
    ],
  },
  {
    slug: "onam-2026",
    name: "Onam",
    nameHindi: "ओणम",
    date: "2026-09-02",
    year: 2026,
    category: "regional",
    description:
      "Onam is the harvest festival of Kerala, celebrating the homecoming of the legendary King Mahabali.",
    significance:
      "A 10-day festival marking the Malayalam New Year. It showcases Kerala's rich cultural heritage through Pookalam, Onasadya, and Vallam Kali.",
    deity: "King Mahabali / Lord Vishnu (Vamana)",
    traditions: [
      "Pookalam (flower rangoli)",
      "Onasadya (grand feast)",
      "Vallam Kali (boat race)",
      "Pulikali (tiger dance)",
    ],
  },
  {
    slug: "sharad-navratri-2026",
    name: "Sharad Navratri",
    nameHindi: "शरद नवरात्रि",
    date: "2026-10-11",
    year: 2026,
    category: "major",
    description:
      "Sharad Navratri is the most celebrated Navratri, spanning nine nights of Goddess Durga worship in the autumn season.",
    significance:
      "The most important of the four Navratris. Garba and Dandiya dances in Gujarat and grand Durga Puja in Bengal are the highlights.",
    tithi: "Ashwin Shukla Pratipada",
    deity: "Goddess Durga (Navadurga)",
    traditions: [
      "Nine nights of fasting and puja",
      "Garba and Dandiya Raas",
      "Durga Puja pandals",
      "Kanya Pujan on Ashtami",
    ],
  },
  {
    slug: "dussehra-2026",
    name: "Dussehra (Vijayadashami)",
    nameHindi: "दशहरा (विजयादशमी)",
    date: "2026-10-20",
    year: 2026,
    category: "major",
    description:
      "Dussehra celebrates the victory of Lord Rama over the demon king Ravana and Goddess Durga's triumph over Mahishasura.",
    significance:
      "The tenth day after Navratri symbolizes the triumph of good over evil. Grand effigies of Ravana are burned across North India.",
    tithi: "Ashwin Shukla Dashami",
    deity: "Lord Rama / Goddess Durga",
    traditions: [
      "Burning Ravana effigies",
      "Ramlila performances",
      "Durga idol immersion (in Bengal)",
      "Shami tree worship",
    ],
  },
  {
    slug: "karwa-chauth-2026",
    name: "Karwa Chauth",
    nameHindi: "करवा चौथ",
    date: "2026-10-24",
    year: 2026,
    category: "vrat",
    description:
      "Karwa Chauth is a one-day festival observed by married Hindu women who fast from sunrise to moonrise for the longevity of their husbands.",
    significance:
      "Married women observe a strict nirjala (without water) fast and break it only after sighting the moon through a sieve.",
    tithi: "Kartik Krishna Chaturthi",
    deity: "Goddess Parvati / Lord Shiva",
    traditions: [
      "Nirjala (waterless) fast",
      "Applying mehendi (henna)",
      "Listening to Karwa Chauth Katha",
      "Breaking fast after moon sighting",
    ],
  },
  {
    slug: "diwali-2026",
    name: "Diwali (Deepavali)",
    nameHindi: "दीपावली",
    date: "2026-11-08",
    year: 2026,
    category: "major",
    description:
      "Diwali, the festival of lights, is the most widely celebrated Hindu festival, marking Lord Rama's return to Ayodhya after 14 years of exile.",
    significance:
      "A five-day celebration symbolizing the victory of light over darkness. Homes are lit with diyas, rangoli decorates entrances, and Goddess Lakshmi is worshipped for prosperity.",
    tithi: "Kartik Amavasya",
    deity: "Goddess Lakshmi / Lord Rama",
    traditions: [
      "Lighting diyas and candles",
      "Lakshmi-Ganesh puja",
      "Rangoli decoration",
      "Fireworks and sweets distribution",
    ],
  },
  {
    slug: "govardhan-puja-2026",
    name: "Govardhan Puja",
    nameHindi: "गोवर्धन पूजा",
    date: "2026-11-09",
    year: 2026,
    category: "major",
    description:
      "Govardhan Puja, celebrated the day after Diwali, honors Lord Krishna's lifting of Govardhan Hill to protect the villagers of Vrindavan.",
    significance:
      "Also known as Annakut, devotees prepare a mountain of food offerings. The festival celebrates gratitude toward nature.",
    tithi: "Kartik Shukla Pratipada",
    deity: "Lord Krishna",
    traditions: [
      "Annakut (mountain of food) offering",
      "Govardhan Hill worship",
      "Cow and bull worship",
      "Community feasts",
    ],
  },
  {
    slug: "bhai-dooj-2026",
    name: "Bhai Dooj",
    nameHindi: "भाई दूज",
    date: "2026-11-11",
    year: 2026,
    category: "major",
    description:
      "Bhai Dooj is celebrated two days after Diwali, honoring the bond between brothers and sisters, similar to Raksha Bandhan.",
    significance:
      "Sisters pray for the long life of their brothers and apply tilak on their foreheads. It is also known as Yama Dwitiya.",
    tithi: "Kartik Shukla Dwitiya",
    deity: "Yama and Yamuna",
    traditions: [
      "Tilak ceremony by sisters",
      "Special meals prepared by sisters",
      "Gift exchange between siblings",
      "Prayers for brothers' well-being",
    ],
  },
  {
    slug: "chhath-puja-2026",
    name: "Chhath Puja",
    nameHindi: "छठ पूजा",
    date: "2026-11-14",
    year: 2026,
    category: "major",
    description:
      "Chhath Puja is an ancient Vedic festival dedicated to the Sun God (Surya) and Chhathi Maiya.",
    significance:
      "A four-day festival involving holy bathing, fasting, standing in water, and offering prayers to the setting and rising sun.",
    tithi: "Kartik Shukla Shashthi",
    deity: "Surya (Sun God) & Chhathi Maiya",
    traditions: [
      "Nahay Khay (holy bathing and eating)",
      "36-hour waterless fast",
      "Offering Arghya to setting sun",
      "Final offering to rising sun",
    ],
  },

  // ─── Major Vrat Dates 2026 ─────────────────────────
  {
    slug: "pausha-putrada-ekadashi-2026",
    name: "Pausha Putrada Ekadashi",
    nameHindi: "पौष पुत्रदा एकादशी",
    date: "2026-01-05",
    year: 2026,
    category: "vrat",
    description:
      "Pausha Putrada Ekadashi is observed for the blessing of progeny. Fasting on this day is believed to fulfill the desire for a son.",
    significance:
      "This Ekadashi falls in the Shukla Paksha of Pausha month. It is dedicated to Lord Vishnu.",
    tithi: "Pausha Shukla Ekadashi",
    deity: "Lord Vishnu",
    traditions: [
      "Complete fasting or fruit diet",
      "Vishnu puja and aarti",
      "Reciting Ekadashi Vrat Katha",
      "Charity and donations",
    ],
  },
  {
    slug: "saphala-ekadashi-2026",
    name: "Saphala Ekadashi",
    nameHindi: "सफला एकादशी",
    date: "2026-01-20",
    year: 2026,
    category: "vrat",
    description:
      "Saphala Ekadashi falls in Krishna Paksha of Magha month. Observing this vrat is believed to bring success and prosperity.",
    significance:
      "Devotees who fast on this day are said to be blessed with success in all endeavors.",
    tithi: "Magha Krishna Ekadashi",
    deity: "Lord Vishnu",
    traditions: [
      "Fasting from grains",
      "Night vigil with Vishnu prayers",
      "Offering fruits and tulsi",
      "Breaking fast next morning",
    ],
  },
  {
    slug: "magh-purnima-2026",
    name: "Magh Purnima",
    nameHindi: "माघ पूर्णिमा",
    date: "2026-02-12",
    year: 2026,
    category: "vrat",
    description:
      "Magh Purnima is the full moon day of Magha month, considered highly auspicious for holy bathing and charity.",
    significance:
      "Devotees take a holy dip at the confluence of sacred rivers. It is the concluding day of the month-long Magh Snan.",
    tithi: "Magha Purnima",
    deity: "Lord Vishnu",
    traditions: [
      "Holy dip in Sangam/Ganga",
      "Charity and feeding the poor",
      "Satyanarayan Puja",
      "Lamp offering at rivers",
    ],
  },
  {
    slug: "pradosh-vrat-feb-2026",
    name: "Pradosh Vrat (Phalguna)",
    nameHindi: "प्रदोष व्रत",
    date: "2026-03-01",
    year: 2026,
    category: "vrat",
    description:
      "Pradosh Vrat is observed on the Trayodashi (13th day) of every lunar fortnight, dedicated to Lord Shiva and Goddess Parvati.",
    significance:
      "Pradosh Kaal — the twilight period — is considered the most auspicious time for Shiva worship. The vrat removes sins and bestows blessings.",
    tithi: "Phalguna Shukla Trayodashi",
    deity: "Lord Shiva & Goddess Parvati",
    traditions: [
      "Fasting until sunset",
      "Shiva puja during Pradosh Kaal",
      "Offering bilva leaves and milk",
      "Reciting Shiva Stotras",
    ],
  },
];

// ─── Helper functions ────────────────────────────────

export function getAllFestivals(): Festival[] {
  return FESTIVALS;
}

export function getFestivalBySlug(slug: string): Festival | undefined {
  return FESTIVALS.find((f) => f.slug === slug);
}

export function getFestivalsByYear(year: number): Festival[] {
  return FESTIVALS.filter((f) => f.year === year);
}

export function getUpcomingFestivals(fromDate: string, limit = 12): Festival[] {
  return FESTIVALS.filter((f) => f.date >= fromDate)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function getFestivalsByCategory(category: Festival["category"]): Festival[] {
  return FESTIVALS.filter((f) => f.category === category);
}
