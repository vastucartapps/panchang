// 16 Tithi evergreen entries. Each represents a canonical Tithi name that
// appears in BOTH pakshas (Shukla and Krishna) — except Purnima (Shukla
// 15th only) and Amavasya (Krishna 15th only). Slugs match shared-contracts
// §3.4.
//
// Category system (Nanda/Bhadra/Jaya/Rikta/Purna): a traditional 5-group
// classification where each group contains 3 Tithis (e.g., Nanda = 1, 6, 11)
// and describes the activity-nature the Tithi favors.

export type TithiCategory = "Nanda" | "Bhadra" | "Jaya" | "Rikta" | "Purna";

export interface Tithi {
  slug: string;
  number: number; // 1..15 (within each paksha)
  name: string;
  devanagari: string;
  category: TithiCategory;
  categoryMeaning: string;
  shuklaDeity: string; // deity for Shukla Paksha variant
  krishnaDeity: string; // deity for Krishna Paksha variant (can be same)
  nature: string;
  shuklaObservance: string; // main festival/vrat on Shukla variant
  krishnaObservance: string; // main festival/vrat on Krishna variant
  body: string; // ≥ 700 chars
  favorable: string[];
  avoid: string[];
}

export const TITHIS: Tithi[] = [
  {
    slug: "pratipada",
    number: 1,
    name: "Pratipada",
    devanagari: "प्रतिपदा",
    category: "Nanda",
    categoryMeaning: "Nanda (joy) — favorable for celebrations, learning starts, new ventures",
    shuklaDeity: "Agni (fire god)",
    krishnaDeity: "Brahma",
    nature: "Growth-oriented, initiating",
    shuklaObservance: "The day after Amavasya; marks the first day of the waxing moon. New Year Pratipadas (Chaitra Shukla for Hindu New Year; Kartik Shukla as Govardhan Puja; Vaishakha Shukla as Akshaya Tritiya is nearby but that is 3rd)",
    krishnaObservance: "The day after Purnima; marks the first day of the waning moon. Less active in observance than Shukla Pratipada.",
    body: "Pratipada is the first Tithi in each paksha — the day immediately after either Amavasya (new moon, starting Shukla Paksha) or Purnima (full moon, starting Krishna Paksha). As the first in the Nanda (joy) category, Pratipada carries beginner's energy — good for launching new ventures, starting learning, celebrating, and taking initial steps. The Shukla Paksha Pratipada has more auspicious weight because it opens the waxing fortnight; many regional New Year observances fall on Shukla Pratipada of specific months (Chaitra Shukla Pratipada is Gudi Padwa in Maharashtra, Ugadi in Karnataka/Andhra, Cheti Chand for Sindhis). Kartik Shukla Pratipada is Govardhan Puja (Annakut) in northern India, the day Lord Krishna lifted Mount Govardhan. Religious ritual is light on Krishna Pratipada — it is primarily a continuity day in the waning fortnight.",
    favorable: ["starting a new learning", "celebrations", "new ventures", "worship of Agni"],
    avoid: ["harsh conflicts", "activities requiring maturity or depth"],
  },
  {
    slug: "dwitiya",
    number: 2,
    name: "Dwitiya",
    devanagari: "द्वितीया",
    category: "Bhadra",
    categoryMeaning: "Bhadra (welfare) — favorable for travel, healing, sustained work",
    shuklaDeity: "Brahma / Vidhata",
    krishnaDeity: "Vidhata",
    nature: "Stable, establishing",
    shuklaObservance: "Shukla Dwitiya features regional observances; Chandra Darshan (first sighting of the crescent moon) falls on Shukla Dwitiya. Ashwin Shukla Dwitiya starts Sharad Navratri's second day.",
    krishnaObservance: "Bhai Dooj (Bhau Beej, Yama Dwitiya) falls on Kartik Krishna Dwitiya — the second day after Diwali, celebrated between brothers and sisters.",
    body: "Dwitiya is the second Tithi and the first in the Bhadra (welfare) category, favoring sustained work, travel, and healing activities. Shukla Dwitiya marks Chandra Darshan — the first visible sliver of the waxing crescent moon after Amavasya — a traditionally auspicious sighting observed with moon-directed prayers. Kartik Krishna Dwitiya is Bhai Dooj (also called Bhau Beej or Yama Dwitiya), the second day of the Diwali festival complex, dedicated to the bond between brothers and sisters. Its mythological origin ties to Yama visiting his sister Yamuna on this day, her warm welcome establishing the tradition of sisters receiving brothers and praying for their long life. Dwitiya generally favors initiations of stable, welfare-oriented work — starting a healing regimen, embarking on a necessary journey, or establishing a household good.",
    favorable: ["travel", "healing regimens", "sibling gatherings", "sustained work initiations"],
    avoid: ["drastic breaks", "activities requiring sharpness or urgency"],
  },
  {
    slug: "tritiya",
    number: 3,
    name: "Tritiya",
    devanagari: "तृतीया",
    category: "Jaya",
    categoryMeaning: "Jaya (victory) — favorable for competition, strategic moves, conflict resolution",
    shuklaDeity: "Gauri / Parvati",
    krishnaDeity: "Vishnu",
    nature: "Victorious, auspicious",
    shuklaObservance: "Vaishakha Shukla Tritiya is Akshaya Tritiya — one of the most auspicious days of the Hindu year, when every action is said to yield imperishable (akshaya) fruit. Also called Akha Teej. Favored for starting businesses, marriages, and buying gold. Chaitra Shukla Tritiya is Teej, Jyestha Shukla Tritiya is Rambha Tritiya.",
    krishnaObservance: "Bhadrapada Krishna Tritiya is Kajari Teej in northern India.",
    body: "Tritiya is the third Tithi, first in the Jaya (victory) category. It carries highly auspicious weight — its Shukla Paksha variants include Akshaya Tritiya (Vaishakha Shukla), one of the most sacred days of the Hindu calendar. Akshaya Tritiya is believed to cause every meritorious action performed that day — charity, investments, starting a business, buying gold — to yield 'imperishable' (akshaya) results. Classical astrological texts consider this day inherently auspicious, overriding many otherwise inauspicious factors. Chaitra Shukla Tritiya is Gangaur (celebrated by married women in Rajasthan honoring Parvati), and Shravan Shukla Tritiya is Hariyali Teej. Tritiya is excellent for starting ventures that must succeed through strategy or competition, and for making significant commitments.",
    favorable: ["starting a business", "marriage", "buying gold or property (especially Akshaya Tritiya)", "charitable giving", "strategic moves"],
    avoid: ["defensive retreat", "activities requiring cautious delay"],
  },
  {
    slug: "chaturthi",
    number: 4,
    name: "Chaturthi",
    devanagari: "चतुर्थी",
    category: "Rikta",
    categoryMeaning: "Rikta (empty) — traditionally avoided for new auspicious work; suits cleansing, banishment, obstacle-removal",
    shuklaDeity: "Ganesha",
    krishnaDeity: "Ganesha",
    nature: "Obstacle-removing, transformative",
    shuklaObservance: "Vinayaka Chaturthi — Ganesha observance on Shukla Chaturthi of every month; Bhadrapada Shukla Chaturthi is the grand annual Ganesh Chaturthi, birthday of Lord Ganesha and 10-day festival.",
    krishnaObservance: "Sankashti Chaturthi / Sankata Hara Chaturthi — Ganesha fast observed on Krishna Chaturthi of every month to remove obstacles. Magh Krishna Chaturthi is the major Sankashti observance.",
    body: "Chaturthi is the fourth Tithi and falls in the Rikta (empty) category — classically avoided for auspicious new beginnings. However, both pakshas of Chaturthi are deeply sacred to Ganesha, the obstacle-remover. Shukla Chaturthi is Vinayaka Chaturthi, observed monthly with Ganesha worship and culminating in Bhadrapada Shukla Chaturthi — the grand Ganesh Chaturthi festival, Ganesha's birthday, celebrated for 10 days especially in Maharashtra, Karnataka, and Goa. Krishna Chaturthi is Sankashti Chaturthi (also called Sankata Hara Chaturthi) — fasted monthly by devotees seeking removal of difficulties. Because Chaturthi is a Rikta Tithi, muhurta texts explicitly forbid marriage, housewarming, or starting auspicious new ventures on it — but it is perfect for Ganesha worship, obstacle-removal rituals, fasting, and spiritual clearing work.",
    favorable: ["Ganesha worship", "obstacle-removal rituals", "fasting", "clearing and banishment"],
    avoid: ["marriage", "housewarming", "starting new ventures (Rikta classification)"],
  },
  {
    slug: "panchami",
    number: 5,
    name: "Panchami",
    devanagari: "पञ्चमी",
    category: "Purna",
    categoryMeaning: "Purna (complete) — favorable for fulfillment, completions, generous giving, learning",
    shuklaDeity: "Nagas (serpent deities) / Saraswati",
    krishnaDeity: "Nagas",
    nature: "Fulfilling, nurturing",
    shuklaObservance: "Magh Shukla Panchami is Vasant Panchami — Saraswati Puja, celebrating the goddess of learning, wisdom, and arts; start of spring. Shravan Shukla Panchami is Nag Panchami — worship of serpent deities. Kartik Shukla Panchami is Labh Panchami.",
    krishnaObservance: "Rang Panchami falls on Phalguna Krishna Panchami — part of the Holi festival complex in some regions, celebrated 5 days after Holi.",
    body: "Panchami is the fifth Tithi, first in the Purna (complete) category — highly auspicious for activities requiring fulfillment, completion, and generous expansion. The most celebrated Panchami observance is Vasant Panchami (Magh Shukla Panchami) — the festival of Saraswati, goddess of knowledge, music, arts, and speech. Children are often formally introduced to letters (Vidyarambha / Aksharabhyasam) on this day. It also marks the start of spring in many regional calendars. Shravan Shukla Panchami is Nag Panchami, when the Naga serpent deities are propitiated — important in Jyeshtha, Ashlesha, and Shravan contexts. Panchami broadly favors learning starts, fulfillment ceremonies, and expansive generous work. Because it is Purna, it suits activities that need to feel 'full' and mature — perfect for seeing initiatives through to completion.",
    favorable: ["Saraswati worship", "starting education", "learning arts or languages", "Naga worship", "generous giving"],
    avoid: ["incomplete half-measures", "beginner-level errors"],
  },
  {
    slug: "shashthi",
    number: 6,
    name: "Shashthi",
    devanagari: "षष्ठी",
    category: "Nanda",
    categoryMeaning: "Nanda (joy) — favorable for celebrations, learning, new ventures",
    shuklaDeity: "Skanda / Kartikeya / Murugan",
    krishnaDeity: "Skanda",
    nature: "Protective, youthful, warrior",
    shuklaObservance: "Shukla Shashthi is sacred to Skanda (Kartikeya / Murugan, son of Shiva-Parvati). Magh Shukla Shashthi is Skanda Shashthi. Kartik Shukla Shashthi is Chhath Puja's main day — dedicated to the Sun god, especially observed in Bihar and eastern Uttar Pradesh.",
    krishnaObservance: "Shiv Shashthi (some traditions) and regional Skanda observances.",
    body: "Shashthi is the sixth Tithi, second in the Nanda (joy) category. Both Shukla and Krishna Shashthi are sacred to Skanda (also called Kartikeya, Murugan, or Subrahmanya) — the warrior-god son of Shiva and Parvati, commander of the celestial armies, slayer of the demon Tarakasura. Skanda Shashthi, observed especially in South India, falls on Shukla Shashthi of Kartik month in the solar calendar and is a major Murugan festival. Kartik Shukla Shashthi is also the main day of Chhath Puja — a 4-day Sun-worship festival especially sacred in Bihar, Jharkhand, eastern UP, and Nepal, observed with fasting and offerings at sunset and sunrise. Shashthi broadly favors youthful, protective, and celebratory activities.",
    favorable: ["Skanda worship", "child naming and protection rituals", "celebrations", "warrior/competitive starts"],
    avoid: ["pessimistic or withdrawing activities"],
  },
  {
    slug: "saptami",
    number: 7,
    name: "Saptami",
    devanagari: "सप्तमी",
    category: "Bhadra",
    categoryMeaning: "Bhadra (welfare) — favorable for travel, healing, sustained work",
    shuklaDeity: "Surya (Sun god)",
    krishnaDeity: "Surya",
    nature: "Radiant, authoritative",
    shuklaObservance: "Magh Shukla Saptami is Ratha Saptami — the birthday of Surya, celebrated especially in South India and along the Ganga; auspicious bath + Sun worship at sunrise.",
    krishnaObservance: "Bhanu Saptami (any Shukla Saptami falling on Sunday) is especially auspicious for Sun worship.",
    body: "Saptami is the seventh Tithi, second in the Bhadra (welfare) category. Both pakshas are dedicated to Surya, the Sun god. The most celebrated is Ratha Saptami (Magh Shukla Saptami), marking Surya's birthday — observed with pre-dawn bathing in sacred rivers, Sun worship at sunrise, and the ritual lighting of seven oil lamps representing the seven horses of Surya's chariot. Ratha Saptami marks the Sun's increasing strength as it begins its northern journey (Uttarayana was earlier at Makar Sankranti, Jan 14). Any Saptami falling on Sunday is called Bhanu Saptami and is especially auspicious for Surya worship. Saptami broadly favors activities requiring authority, radiance, and recognition.",
    favorable: ["Sun worship", "claiming recognition", "health restoration", "government work"],
    avoid: ["hiding or withdrawing from recognition"],
  },
  {
    slug: "ashtami",
    number: 8,
    name: "Ashtami",
    devanagari: "अष्टमी",
    category: "Jaya",
    categoryMeaning: "Jaya (victory) — favorable for competition, strategic moves, conflict resolution",
    shuklaDeity: "Rudra / Shiva / Durga (Goddess)",
    krishnaDeity: "Krishna (most important — see Janmashtami)",
    nature: "Powerful, transformative",
    shuklaObservance: "Ashwin Shukla Ashtami is Durga Ashtami during Sharad Navratri — the most powerful day for Goddess Durga worship. Chaitra Shukla Ashtami is similarly sacred during Chaitra Navratri. Shravan Shukla Ashtami features Durga Puja in Bengal.",
    krishnaObservance: "Bhadrapada Krishna Ashtami is Krishna Janmashtami / Gokulashtami — the birthday of Lord Krishna, one of the most important Hindu festivals. The Moon is in Rohini Nakshatra at that auspicious moment.",
    body: "Ashtami is the eighth Tithi, second in the Jaya (victory) category. It is among the most spiritually charged Tithis in the Hindu calendar. Shukla Ashtami is sacred to the Goddess (Durga) — Ashwin Shukla Ashtami during Sharad Navratri is Durga Ashtami, the peak day of Devi worship. Krishna Ashtami is sacred to Krishna — Bhadrapada Krishna Ashtami is Krishna Janmashtami, the birthday of Lord Krishna, traditionally observed with fasting until midnight (Krishna's birth moment) when the Moon transits Rohini Nakshatra. Janmashtami is celebrated across India with devotional songs, dramatic re-enactments (Krishna Lila), and the Dahi Handi tradition (pot-breaking) especially in Maharashtra. Shravan Krishna Ashtami is Kalashtami, sacred to Kala Bhairava. Ashtami broadly favors powerful transformative work and Goddess/Krishna worship.",
    favorable: ["Goddess worship", "Krishna worship", "transformative spiritual practice", "powerful initiations"],
    avoid: ["half-hearted action", "indulgence when discipline is called for"],
  },
  {
    slug: "navami",
    number: 9,
    name: "Navami",
    devanagari: "नवमी",
    category: "Rikta",
    categoryMeaning: "Rikta (empty) — traditionally avoided for new auspicious work",
    shuklaDeity: "Durga / Rama",
    krishnaDeity: "Durga",
    nature: "Culminating, powerful",
    shuklaObservance: "Chaitra Shukla Navami is Rama Navami — birthday of Lord Rama, celebrated with recitation of the Ramayana. Ashwin Shukla Navami is Maha Navami during Sharad Navratri — final day of Durga worship before Vijayadashami.",
    krishnaObservance: "Fewer major observances on Krishna Navami; some regional Durga observances.",
    body: "Navami is the ninth Tithi, second in the Rikta (empty) category — classically avoided for new auspicious starts, yet home to two of the most important festivals of the year. Chaitra Shukla Navami is Rama Navami — the birthday of Lord Rama, celebrated with temple processions, recitation of the Ramayana, and special worship; Rama is the seventh avatar of Vishnu. Ashwin Shukla Navami is Maha Navami during Sharad Navratri — the ninth and culminating day of the Goddess's battle against Mahishasura, marked by Kanya Puja (worship of young girls as manifestations of Durga) in many traditions. While Rikta discourages new auspicious initiations on Navami generally, the Rama Navami and Maha Navami observances are exceptions by virtue of their deity-specific sacredness.",
    favorable: ["Rama worship", "Goddess worship (especially Navratri)", "devotional recitation", "culminating spiritual practice"],
    avoid: ["marriage (Rikta)", "housewarming", "routine new initiations"],
  },
  {
    slug: "dashami",
    number: 10,
    name: "Dashami",
    devanagari: "दशमी",
    category: "Purna",
    categoryMeaning: "Purna (complete) — favorable for fulfillment, completions, generous giving",
    shuklaDeity: "Dharma (moral order)",
    krishnaDeity: "Dharma",
    nature: "Victorious, completing",
    shuklaObservance: "Ashwin Shukla Dashami is Vijayadashami / Dussehra — celebrating Rama's victory over Ravana and Durga's victory over Mahishasura. One of the four most auspicious days of the Hindu year (along with Akshaya Tritiya, Vasant Panchami, and Gudi Padwa).",
    krishnaObservance: "Fewer major observances; some regional festivals.",
    body: "Dashami is the tenth Tithi, second in the Purna (complete) category — highly auspicious for completion, victory celebrations, and starting ventures meant to achieve lasting success. Ashwin Shukla Dashami is Vijayadashami (also called Dussehra), one of the most important days of the Hindu year — commemorating Rama's victory over the demon Ravana (after his 10-day battle), and simultaneously celebrating Durga's victory over Mahishasura (culminating Sharad Navratri). The day is considered so auspicious that traditional muhurta overrides many otherwise inauspicious factors — ventures started on Vijayadashami are believed to succeed. It is the classical day for Shastra Puja (worship of weapons/tools of one's trade), beginning a new course of study, and launching ambitious campaigns. Dashami broadly favors activities requiring decisive victory and fulfillment.",
    favorable: ["starting ambitious ventures", "buying vehicles or weapons", "beginning new courses of study", "Shastra Puja", "Victory-oriented launches"],
    avoid: ["timidity", "activities that require prolonged deliberation"],
  },
  {
    slug: "ekadashi",
    number: 11,
    name: "Ekadashi",
    devanagari: "एकादशी",
    category: "Nanda",
    categoryMeaning: "Nanda (joy) — favorable for celebrations, learning, new ventures; fasting day",
    shuklaDeity: "Vishnu",
    krishnaDeity: "Vishnu",
    nature: "Spiritually powerful, ascetic",
    shuklaObservance: "Every Shukla Ekadashi is observed by Vaishnavas with fasting. Each has a specific name (Vaikunth Ekadashi in Margashirsha Shukla, Putrada Ekadashi in Paush Shukla, etc.). Jyestha Shukla Ekadashi is Nirjala Ekadashi — the most austere fast, without water.",
    krishnaObservance: "Every Krishna Ekadashi is also observed with fasting. Specific named fasts include Rama Ekadashi (Kartik Krishna), Aja Ekadashi (Bhadrapada Krishna), and others.",
    body: "Ekadashi is the eleventh Tithi, third in the Nanda category — and the single most important recurring Tithi for Vaishnavas. Every Ekadashi — both Shukla and Krishna — is observed with fasting, making it 24 observed days per year (some years include adhika maas, creating 26 Ekadashi fasts). Each Ekadashi has a specific name and associated legend: Vaikuntha Ekadashi (Margashirsha Shukla) is said to open the gates of Vaikuntha for devotees; Nirjala Ekadashi (Jyestha Shukla) is the most austere, fasted without even water; Putrada Ekadashi is prayed for children; Mohini Ekadashi (Vaishakha Shukla) recounts Vishnu's Mohini avatar. Lord Vishnu is the presiding deity of all Ekadashis. The fast is traditionally broken the next morning on Dwadashi at an astrologically calculated moment. Ekadashi is highly auspicious for spiritual practice, fasting, and Vishnu worship.",
    favorable: ["Vishnu worship", "spiritual fasting", "austere practice", "reading scriptures"],
    avoid: ["breaking fast early", "gross physical indulgence"],
  },
  {
    slug: "dwadashi",
    number: 12,
    name: "Dwadashi",
    devanagari: "द्वादशी",
    category: "Bhadra",
    categoryMeaning: "Bhadra (welfare) — favorable for travel, healing, sustained work",
    shuklaDeity: "Vishnu",
    krishnaDeity: "Vishnu",
    nature: "Nurturing, celebratory",
    shuklaObservance: "Shukla Dwadashi is the Parana (fast-breaking) day after Ekadashi. Bhadrapada Shukla Dwadashi is Vamana Dwadashi (Vishnu's Vamana avatar). Kartik Shukla Dwadashi is Tulsi Vivah (marriage of Tulsi plant to Vishnu/Shaligram).",
    krishnaObservance: "Govatsa Dwadashi (Vatsa Dwadashi) in Kartik Krishna — cow worship. Govinda Dwadashi in Phalguna Krishna.",
    body: "Dwadashi is the twelfth Tithi, third in the Bhadra category. It is known chiefly as the Parana day — the morning when Ekadashi fasts are ritually broken at an astrologically determined moment. Many Dwadashis have their own observances: Kartik Shukla Dwadashi is Tulsi Vivah, the ritual marriage of the Tulsi plant (personified as Vrinda) to Vishnu (represented by the Shaligram stone), marking the end of the monsoon-season avoidance of auspicious starts and the opening of the wedding season. Bhadrapada Shukla Dwadashi is Vamana Dwadashi, sacred to Vishnu's Vamana (dwarf) avatar. Dwadashi broadly favors Vishnu worship, ceremonial fast-breaking, and auspicious initiations especially related to marriage (post Tulsi Vivah).",
    favorable: ["fast-breaking ceremony", "Vishnu worship", "marriage (after Tulsi Vivah)", "celebratory meals"],
    avoid: ["austere fasting (the Parana day)"],
  },
  {
    slug: "trayodashi",
    number: 13,
    name: "Trayodashi",
    devanagari: "त्रयोदशी",
    category: "Jaya",
    categoryMeaning: "Jaya (victory) — favorable for competition, strategic moves",
    shuklaDeity: "Shiva",
    krishnaDeity: "Shiva",
    nature: "Protective, auspicious",
    shuklaObservance: "Shukla Trayodashi is Pradosha Vrata — Shiva worship at sunset. Kartik Shukla Trayodashi is Dhanteras — beginning of Diwali, dedicated to Dhanvantari (god of Ayurveda and health) and Kubera (god of wealth). Bhishma Trayodashi (Magha Shukla Trayodashi) honors Bhishma.",
    krishnaObservance: "Krishna Trayodashi is also Pradosha — Shiva worship. Some Krishna Trayodashis are Masik Shivaratri observances.",
    body: "Trayodashi is the thirteenth Tithi, third in the Jaya category. Both pakshas feature Pradosha Vrata — evening worship of Shiva, considered highly auspicious for clearing karma and receiving Shiva's grace. Kartik Shukla Trayodashi is Dhanteras (also Dhantrayodashi), the first of the five days of Diwali celebrations, sacred to Dhanvantari (divine physician, god of Ayurveda) and Kubera (god of wealth). Dhanteras is traditionally the day to buy gold, silver, or new utensils for the home — investments believed to grow over the year. Metal purchase on Dhanteras is considered especially auspicious for household prosperity. Trayodashi broadly favors Shiva worship, health-oriented initiations, and wealth-building moves (particularly on Dhanteras).",
    favorable: ["Shiva worship (especially at pradosha)", "buying gold/silver (Dhanteras)", "health practices", "wealth moves"],
    avoid: ["harsh judgments", "acts lacking in charity"],
  },
  {
    slug: "chaturdashi",
    number: 14,
    name: "Chaturdashi",
    devanagari: "चतुर्दशी",
    category: "Rikta",
    categoryMeaning: "Rikta (empty) — classically avoided for new auspicious work",
    shuklaDeity: "Hanuman / Narasimha / Kali",
    krishnaDeity: "Shiva (most important — see Maha Shivaratri)",
    nature: "Intense, transformative, liminal",
    shuklaObservance: "Chaitra Shukla Chaturdashi is Narasimha Jayanti (birth of Vishnu's Narasimha avatar). Kartik Shukla Chaturdashi is Vaikuntha Chaturdashi (bridging Shiva-Vishnu worship).",
    krishnaObservance: "Phalguna Krishna Chaturdashi is Maha Shivaratri — the most sacred night to Shiva. Ashwin Krishna Chaturdashi is Naraka Chaturdashi (Chhoti Diwali), eve of Diwali. Every Krishna Chaturdashi is Masik Shivaratri (monthly Shivaratri).",
    body: "Chaturdashi is the fourteenth Tithi, fourth in the Rikta category. Classically avoided for auspicious new initiations, but paradoxically home to some of the most sacred observances of the year. Phalguna Krishna Chaturdashi is Maha Shivaratri — the single most important night of the year for Shiva devotees, marked by all-night vigil, fasting, and abhisheka (ritual bathing of the Shiva linga). Every Krishna Chaturdashi is similarly observed as Masik Shivaratri (monthly Shivaratri). Ashwin Krishna Chaturdashi is Naraka Chaturdashi (Chhoti Diwali), the day Krishna killed the demon Naraka — the eve of Diwali, marked by early bathing and lamp lighting. Chaitra Shukla Chaturdashi is Narasimha Jayanti. Chaturdashi is intense, liminal energy — excellent for Shiva worship, destruction of inner demons, and transformative spiritual practice, but avoided for routine auspicious starts.",
    favorable: ["Shiva worship (especially Shivaratri)", "intense spiritual practice", "destruction of inner demons", "transformative ritual"],
    avoid: ["marriage", "housewarming", "routine auspicious starts"],
  },
  {
    slug: "purnima",
    number: 15,
    name: "Purnima",
    devanagari: "पूर्णिमा",
    category: "Purna",
    categoryMeaning: "Purna (complete) — favorable for fulfillment, completions, generous giving",
    shuklaDeity: "Chandra (Moon) / specific deity by month",
    krishnaDeity: "N/A (only Shukla Paksha has Purnima; Krishna ends at Amavasya)",
    nature: "Radiant, fulfilling, universally auspicious",
    shuklaObservance: "Every full moon night is observed. Major Purnimas: Guru Purnima (Ashadha Shukla) — honoring spiritual teachers; Buddha Purnima (Vaishakha Shukla) — Buddha's birth; Kartik Purnima — Dev Diwali, Ganga Snan; Sharad Purnima (Ashwin Shukla) — Kaumudi Mahotsava; Holika Dahan eve falls on Phalguna Purnima.",
    krishnaObservance: "Not applicable (Krishna Paksha ends at Amavasya).",
    body: "Purnima is the fifteenth (and final) Tithi of Shukla Paksha — the full moon night. Culminating in the Purna (complete) category, every Purnima carries high auspicious weight, with specific named observances distributing across the 12 months: Chaitra Purnima features Hanuman Jayanti (birth of Hanuman); Vaishakha Purnima is Buddha Purnima — birth, enlightenment, and death of Gautama Buddha all believed to fall on this Tithi; Ashadha Purnima is Guru Purnima — the day disciples honor their spiritual teachers and Ved Vyasa (traditional compiler of the Vedas); Shravan Purnima is Raksha Bandhan (sister-brother sacred thread ceremony) and Upakarma (annual re-investiture of sacred thread for Brahmins); Bhadrapada Purnima marks the start of Pitra Paksha (16 days of ancestor veneration); Ashwin Purnima is Sharad Purnima / Kaumudi Mahotsava (festival of moonlight); Kartik Purnima is Dev Diwali (divine Diwali — lighting of lamps at Ganga and temples, sacred to all deities); Margashirsha Purnima is Dattatreya Jayanti; Paush Purnima starts Magh Mela at Prayag; Magh Purnima is the main bathing day of Magh Kumbh; Phalguna Purnima is Holika Dahan (bonfire night preceding Holi). Purnima broadly favors all activities requiring fullness, universal auspiciousness, completion, and moon-related worship.",
    favorable: ["Moon worship", "Ganga snan (sacred river bathing)", "Guru worship", "completion of vows", "charitable giving"],
    avoid: ["austere or withdrawing practice"],
  },
  {
    slug: "amavasya",
    number: 15,
    name: "Amavasya",
    devanagari: "अमावस्या",
    category: "Rikta",
    categoryMeaning: "Rikta by some classifications (the 15th of Krishna) — spiritually potent for ancestral work though traditionally inauspicious for new undertakings",
    shuklaDeity: "N/A (only Krishna Paksha has Amavasya)",
    krishnaDeity: "Pitras (ancestors) / specific deity by month",
    nature: "Still, deeply inward, ancestral",
    shuklaObservance: "Not applicable (Shukla Paksha ends at Purnima).",
    krishnaObservance: "Every new moon is observed for Pitra Tarpan (ancestral offerings). Major Amavasyas: Mahalaya Amavasya (Bhadrapada Krishna) — culmination of Pitra Paksha, most sacred day for pitra karma; Mauni Amavasya (Magh Krishna) — the silent vow day at Magh Mela; Somvati Amavasya (Amavasya on Monday) — especially auspicious for Shiva worship; Diwali Amavasya (Kartik Krishna) — Lakshmi Puja night, the darkest night of the year illuminated by lamps.",
    body: "Amavasya is the fifteenth (and final) Tithi of Krishna Paksha — the new moon night, when the Moon is invisible. It is the Tithi of darkness, inwardness, ancestral connection, and deep spiritual stillness. Every Amavasya is observed for Pitra Tarpan — ritual offerings to ancestors. Major Amavasyas distribute across the year: Mahalaya Amavasya (Bhadrapada Krishna) is the most sacred ancestral day, culminating the 16-day Pitra Paksha; Mauni Amavasya (Magh Krishna) is observed with silence and ritual bathing at Prayag during the Magh Mela / Kumbh Mela; Somvati Amavasya (Amavasya falling on Monday) is especially auspicious for Shiva worship and marital longevity; Diwali Amavasya (Kartik Krishna) is paradoxically the brightest night of the year — the darkest moon illuminated by countless lamps, sacred to Lakshmi worship for household prosperity. While classically avoided for new auspicious initiations, Amavasya is exceptionally powerful for inner work, ancestor veneration, and moon-lord-specific worship.",
    favorable: ["Pitra Tarpan (ancestral offerings)", "Lakshmi Puja (Diwali)", "Shiva worship (Somvati Amavasya)", "silent retreat", "introspective practice"],
    avoid: ["marriage", "housewarming", "starting new ventures", "travel (traditionally)"],
  },
];

export function getAllTithis(): Tithi[] {
  return TITHIS;
}

export function getTithiBySlug(slug: string): Tithi | undefined {
  return TITHIS.find((t) => t.slug === slug);
}

export function getTithiSlugs(): string[] {
  return TITHIS.map((t) => t.slug);
}

/**
 * Look up a Tithi by its display name as returned by the upstream panchang
 * API (e.g. "Pratipada", "PRATIPADA", "Chaturdashi"). Used by
 * /[city]/todays-tithi/[date] to wire 700-char unique body content per
 * Tithi into otherwise data-only pages.
 */
export function getTithiByName(name: string): Tithi | undefined {
  // API may return paksha-prefixed names like "Shukla Pratipada" — strip any
  // paksha prefix and match on the canonical Tithi name only.
  const stripped = name
    .trim()
    .toLowerCase()
    .replace(/^(shukla|krishna)\s+/i, "");
  const slugified = stripped.replace(/\s+/g, "-");
  return TITHIS.find(
    (t) => t.slug === slugified || t.name.toLowerCase() === stripped
  );
}
