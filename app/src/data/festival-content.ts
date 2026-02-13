/**
 * Rich editorial content for festival detail pages.
 * Keyed by base slug (without year suffix).
 * This content is static and shared across years.
 */

export interface FestivalContent {
  /** 3-5 sentence mythological / historical backstory */
  story: string;
  /** 3-4 interesting facts */
  facts: string[];
  /** Regional names / celebration styles */
  regionalNames?: { region: string; name: string; note?: string }[];
  /** Festival greeting */
  greeting?: { english: string; hindi: string };
  /** Celebration guide — actionable steps for the day */
  celebrationGuide?: { step: string; detail: string }[];
  /** Spiritual / health benefits of observing */
  benefits?: string[];
}

export const FESTIVAL_CONTENT: Record<string, FestivalContent> = {
  "makar-sankranti": {
    story:
      "According to Hindu mythology, on this day the Sun God begins his northward journey (Uttarayan), visiting his son Shani (Saturn), who rules Capricorn. Despite their strained relationship, Surya visits Shani, teaching us that family bonds transcend all disagreements. The Mahabharata records that Bhishma Pitamah, lying on a bed of arrows, waited for Uttarayan to leave his mortal body, as dying during this auspicious period is believed to grant Moksha.",
    facts: [
      "Makar Sankranti is one of the few Hindu festivals based on the solar calendar, making its date nearly fixed every year.",
      "In Gujarat, the International Kite Festival during Uttarayan attracts participants from over 40 countries.",
      "The Ganga Sagar Mela at the confluence of the Ganges and Bay of Bengal draws over 3 million pilgrims on this day.",
      "Scientifically, this marks the day when days begin getting longer in the Northern Hemisphere.",
    ],
    regionalNames: [
      { region: "Tamil Nadu", name: "Pongal", note: "4-day harvest celebration" },
      { region: "Punjab", name: "Lohri", note: "Bonfire festival the night before" },
      { region: "Gujarat", name: "Uttarayan", note: "Famous kite flying festival" },
      { region: "Assam", name: "Magh Bihu", note: "Community feasting and bonfires" },
      { region: "Karnataka", name: "Suggi Habba", note: "Harvest thanksgiving" },
    ],
    greeting: {
      english: "May the Sun's journey bring warmth, prosperity, and sweet beginnings to your life!",
      hindi: "तिल गुड़ घ्या, गोड गोड बोला — मकर संक्रांति की हार्दिक शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Take a holy dip", detail: "Bathe in a sacred river or at home before sunrise for spiritual purification." },
      { step: "Prepare til-gul", detail: "Make sesame-jaggery laddoos and share with neighbors, saying 'Til gul ghya, god god bola'." },
      { step: "Fly kites", detail: "Celebrate Uttarayan by flying colorful kites from your rooftop." },
      { step: "Donate to the needy", detail: "Give khichdi, blankets, or sesame items to the poor — charity on this day is especially meritorious." },
    ],
    benefits: [
      "Sesame seeds consumed on this day are rich in calcium and keep the body warm in winter.",
      "Kite flying promotes Vitamin D absorption from winter sun exposure.",
      "The festival encourages community bonding through shared meals and celebrations.",
    ],
  },

  "vasant-panchami": {
    story:
      "After creating the world, Lord Brahma felt something was missing — there was no sound, no speech, no music. He sprinkled water from his Kamandalu, and from the drops arose Goddess Saraswati, dressed in white, holding a Veena. She gave the gift of speech (Vak) to all beings, and knowledge and wisdom to the world. This is why Vasant Panchami is dedicated to Saraswati — the day knowledge itself was born. The yellow color worn on this day represents the mustard fields in full bloom, signaling spring's arrival.",
    facts: [
      "Vasant Panchami marks the official beginning of spring preparation in the Hindu calendar, 40 days before Holi.",
      "In many parts of India, children are taught to write their first words on this day in a ceremony called 'Vidya Arambh'.",
      "The famous Nalanda University reportedly held its convocation on Vasant Panchami.",
      "Yellow is mandatory on this day — even the food offerings (kheer with saffron, yellow rice) are yellow.",
    ],
    regionalNames: [
      { region: "West Bengal", name: "Saraswati Puja", note: "Elaborate pandal worship" },
      { region: "Bihar", name: "Saraswati Puja", note: "Students worship books and instruments" },
      { region: "Punjab", name: "Basant", note: "Kite flying and yellow attire" },
    ],
    greeting: {
      english: "May Goddess Saraswati bless you with knowledge, wisdom, and creativity!",
      hindi: "या कुन्देन्दुतुषारहारधवला — वसंत पंचमी की शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Wear yellow", detail: "Dress in yellow clothes to honor the vibrancy of spring and Goddess Saraswati." },
      { step: "Perform Saraswati Puja", detail: "Place books, instruments, and writing tools near the deity and offer yellow flowers." },
      { step: "Begin new learning", detail: "Start a new course, skill, or creative pursuit — this day is ideal for Vidya Arambh." },
      { step: "Prepare yellow sweets", detail: "Make saffron kheer or boondi to offer as prasad." },
    ],
    benefits: [
      "The festival encourages lifelong learning and respect for education.",
      "Spring foods consumed on this day boost immunity during the seasonal transition.",
    ],
  },

  "maha-shivaratri": {
    story:
      "On this darkest night of the year, Lord Shiva performed the Tandava — the cosmic dance of creation, preservation, and destruction. Another legend tells of a hunter who, lost in the forest, climbed a Bilva tree to escape a tiger. As he plucked leaves to stay awake, they fell on a Shiva Lingam below. His unknowing all-night vigil and Bilva leaf offering pleased Lord Shiva so deeply that the hunter was granted Moksha. It is also believed that on this night, Shiva and Parvati were married, making it the most auspicious night for devotion.",
    facts: [
      "Maha Shivaratri literally means 'the Great Night of Shiva' and falls on the 14th night of the dark fortnight in Phalguna.",
      "There are 12 Shivaratris in a year (one per month), but the one in Phalguna is 'Maha' — the greatest.",
      "The Lingodbhava — Shiva appearing as an infinite pillar of light — is believed to have occurred on this night.",
      "Devotees stay awake all night (Jagran) as it is believed Shiva is closest to Earth during these hours.",
    ],
    greeting: {
      english: "Om Namah Shivaya! May Lord Shiva destroy all negativity and bless you with peace.",
      hindi: "ॐ नमः शिवाय — महाशिवरात्रि की हार्दिक शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Observe a fast", detail: "Fast throughout the day, consuming only water or fruit if needed." },
      { step: "Perform Abhishekam", detail: "Pour milk, water, honey, and curd over the Shiva Lingam during each of the four Prahars of the night." },
      { step: "Offer Bilva leaves", detail: "Offer trifoliate Bilva (Bael) leaves — Shiva's most beloved offering." },
      { step: "Stay awake all night", detail: "Observe Jagran with chanting of Om Namah Shivaya and Rudram." },
      { step: "Visit a Shiva temple", detail: "If possible, visit one of the 12 Jyotirlingas or your nearest Shiva temple." },
    ],
    benefits: [
      "Fasting on this night is believed to cleanse karmic debts from past lives.",
      "The all-night vigil promotes mental discipline and spiritual awakening.",
      "Bilva leaves are rich in medicinal properties and purify the atmosphere.",
    ],
  },

  holi: {
    story:
      "The demon king Hiranyakashipu was granted a boon that made him nearly immortal. His own son, Prahlada, was an ardent devotee of Lord Vishnu, which enraged Hiranyakashipu. He ordered his sister Holika — who had a boon of fire immunity — to sit in a blazing fire with Prahlada on her lap. But Prahlada's unwavering devotion protected him, while Holika was consumed by the flames. This triumph of devotion over evil is celebrated as Holika Dahan. The next day, people play with colors, celebrating the arrival of spring and the victory of love over hatred.",
    facts: [
      "Holi is mentioned in ancient texts dating back to the 4th century CE, and appears in Jaimini's Purvamimamsa-Sutras.",
      "The town of Barsana near Mathura celebrates 'Lathmar Holi' where women playfully beat men with sticks.",
      "In Bengal, Holi is known as 'Dol Jatra' and is celebrated with processions of Radha-Krishna idols.",
      "Natural colors for Holi are made from flowers: Palash (orange), Marigold (yellow), and Indigo (blue).",
    ],
    regionalNames: [
      { region: "Mathura-Vrindavan", name: "Lathmar Holi", note: "Week-long celebration in Krishna's birthplace" },
      { region: "West Bengal", name: "Dol Jatra", note: "Swinging of Radha-Krishna idols" },
      { region: "Punjab", name: "Hola Mohalla", note: "Sikh martial arts demonstrations" },
      { region: "Maharashtra", name: "Shimga", note: "Burning of Holika with rangoli" },
    ],
    greeting: {
      english: "May the colors of Holi fill your life with happiness, love, and laughter!",
      hindi: "बुरा न मानो होली है! होली की हार्दिक शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Light the Holika bonfire", detail: "On the eve of Holi, gather around a bonfire symbolizing the burning of evil." },
      { step: "Play with colors", detail: "Use natural, organic colors (gulal) to celebrate with family and friends." },
      { step: "Prepare Thandai", detail: "Make the traditional Holi drink with almonds, fennel seeds, rose petals, and saffron." },
      { step: "Share sweets", detail: "Distribute Gujiya, Puran Poli, and other festive sweets to neighbors." },
    ],
    benefits: [
      "Playing in the sun during Holi provides a much-needed Vitamin D boost after winter.",
      "The festival promotes forgiveness — enemies become friends over colors and sweets.",
      "Traditional Holi foods like Thandai contain cooling herbs that prepare the body for summer.",
    ],
  },

  "chaitra-navratri": {
    story:
      "When the demon Mahishasura terrorized the three worlds, even the gods could not defeat him. Brahma, Vishnu, and Shiva combined their divine energies, and from this cosmic union emerged Goddess Durga — radiant and invincible. Armed with weapons from each deity, she battled Mahishasura for nine nights and days, finally slaying him on the tenth day (Dashami). Chaitra Navratri celebrates this nine-night battle, with each day dedicated to one of Durga's nine forms (Navadurga), from Shailaputri on Day 1 to Siddhidatri on Day 9.",
    facts: [
      "Chaitra Navratri marks the beginning of the Hindu New Year (Vikram Samvat) in many North Indian traditions.",
      "Each of the 9 days is associated with a specific color, food offering, and form of Goddess Durga.",
      "The first day is celebrated as Gudi Padwa in Maharashtra and Ugadi in Karnataka — both regional New Year celebrations.",
      "Kanya Pujan on the 8th or 9th day involves worshipping nine young girls as embodiments of the Navadurga.",
    ],
    greeting: {
      english: "May the nine forms of Goddess Durga bless you with strength, wisdom, and prosperity!",
      hindi: "जय माता दी! चैत्र नवरात्रि की हार्दिक शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Begin with Ghatasthapana", detail: "Install a Kalash (sacred pot) with mango leaves and coconut, symbolizing Durga's presence." },
      { step: "Observe 9-day fast", detail: "Follow Navratri fasting rules — consume saatvik food, no grains or non-veg." },
      { step: "Worship daily Navadurga", detail: "Each day, offer prayers to the specific Durga form with the designated color and flower." },
      { step: "Perform Kanya Pujan", detail: "On Ashtami/Navami, wash the feet of 9 young girls and offer them food, clothes, and gifts." },
    ],
    benefits: [
      "The 9-day fasting detoxifies the body during the seasonal change from winter to summer.",
      "Daily structured worship builds mental discipline and spiritual focus.",
      "Saatvik diet during Navratri promotes digestive health and lightness.",
    ],
  },

  "ram-navami": {
    story:
      "In the ancient city of Ayodhya, King Dasharatha performed the Putrakameshti Yajna to be blessed with sons. From the sacred fire emerged a divine offering (payasam), which his three queens consumed. On the ninth day of Chaitra Shukla Paksha, at noon, Queen Kausalya gave birth to Lord Rama — the seventh avatar of Lord Vishnu. The divine child was born to restore Dharma on Earth and eventually defeated the demon king Ravana. His life, chronicled in the Ramayana, remains the ultimate guide to righteous living.",
    facts: [
      "Ram Navami always falls on the ninth day of Chaitra Navratri, making it the culmination of the spring festival.",
      "Ayodhya, Lord Rama's birthplace, holds the largest celebrations with lakhs of diyas lit along the Saryu River.",
      "The epic Ramayana, composed by Sage Valmiki, contains 24,000 verses and is the oldest epic poem in Sanskrit.",
      "Ram Navami is celebrated in both Shaiva and Vaishnava traditions, showing Rama's universal reverence.",
    ],
    greeting: {
      english: "May Lord Rama's ideals of truth and righteousness guide your path!",
      hindi: "श्री राम जय राम जय जय राम — राम नवमी की शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Observe fast and prayers", detail: "Fast until noon (Rama's birth time) and perform puja with flowers and tulsi." },
      { step: "Read the Ramayana", detail: "Recite portions of the Sundara Kanda or Ramacharitmanas." },
      { step: "Visit a Rama temple", detail: "Participate in special noon-time celebrations marking Rama's birth moment." },
      { step: "Distribute Panakam", detail: "Prepare the traditional jaggery-pepper-cardamom drink and distribute as prasad." },
    ],
  },

  "akshaya-tritiya": {
    story:
      "On this day, Sage Vyasa and Lord Ganesha began writing the Mahabharata. It is also the day when the Treta Yuga began, Lord Parashurama (Vishnu's sixth avatar) was born, and Goddess Annapurna was born to end a great famine. The Pandavas received the Akshaya Patra — a vessel that provided unlimited food — from the Sun God on this day. 'Akshaya' means imperishable, and anything begun or invested on this day is believed to grow and multiply forever.",
    facts: [
      "Akshaya Tritiya is considered so auspicious that it needs no muhurta — the entire day is an auspicious muhurta.",
      "India's gold sales peak on this day, with jewelers reporting their highest revenue of the year.",
      "In Jainism, Lord Adinath (Rishabhadeva) broke his 13-month fast with sugarcane juice on this day.",
      "The doors of Badrinath Temple in the Himalayas are traditionally opened on Akshaya Tritiya.",
    ],
    greeting: {
      english: "May your investments and new beginnings multiply infinitely on this Akshaya Tritiya!",
      hindi: "अक्षय तृतीया की हार्दिक शुभकामनाएं — सुख, समृद्धि, और शुभ हो!",
    },
    celebrationGuide: [
      { step: "Buy gold or invest", detail: "Purchase gold, start a new investment, or open a savings account — prosperity multiplies today." },
      { step: "Start new ventures", detail: "Begin new businesses, sign contracts, or start construction projects." },
      { step: "Perform Vishnu-Lakshmi Puja", detail: "Worship Lord Vishnu and Goddess Lakshmi for prosperity and abundance." },
      { step: "Donate generously", detail: "Charity done today yields infinite merit — donate food, clothes, or money." },
    ],
  },

  "guru-purnima": {
    story:
      "On this day, Lord Shiva — in his form as Adi Yogi — turned south to face his seven disciples and became Adi Guru (the first Guru), transmitting the science of Yoga to the Saptarishis. This was the birth of the Guru-Shishya tradition. The day is also dedicated to Sage Vyasa, who classified the four Vedas, composed the Mahabharata, and wrote the 18 Puranas. Without Vyasa, humanity's spiritual knowledge would have been lost. Every teacher, mentor, and guide is honored on this sacred full moon day.",
    facts: [
      "Guru Purnima is also known as 'Vyasa Purnima' in honor of Sage Ved Vyasa.",
      "The word 'Guru' comes from 'Gu' (darkness) and 'Ru' (remover) — the one who removes darkness.",
      "In Buddhism, this day marks Buddha's first sermon at Sarnath after enlightenment.",
      "The Guru-Shishya tradition (teacher-student lineage) is one of India's most enduring cultural institutions.",
    ],
    greeting: {
      english: "Guru Brahma, Guru Vishnu, Guru Devo Maheshwara — Happy Guru Purnima!",
      hindi: "गुरुर्ब्रह्मा गुरुर्विष्णुः — गुरु पूर्णिमा की हार्दिक शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Honor your Guru", detail: "Visit your teacher, mentor, or guide and express gratitude with flowers and offerings." },
      { step: "Perform Vyasa Puja", detail: "Worship Sage Vyasa and offer prayers for wisdom and spiritual growth." },
      { step: "Study scriptures", detail: "Dedicate time to reading spiritual texts or learning from your Guru's teachings." },
      { step: "Offer Guru Dakshina", detail: "Give a heartfelt offering to your teacher — it can be material, service, or a commitment to learning." },
    ],
  },

  "raksha-bandhan": {
    story:
      "When Lord Indra was losing a battle against the demon Vritra, his wife Sachi tied a sacred thread blessed by Lord Vishnu on his wrist. Empowered by this Raksha (protection), Indra won the battle. In another legend, when Alexander the Great invaded India, his wife Roxana sent a sacred thread to King Porus, asking him to spare Alexander in battle. Porus honored the Rakhi and spared Alexander's life. The Rakhi thread is not merely decorative — it carries the prayer of protection and the bond of duty.",
    facts: [
      "Raksha Bandhan falls on the same day as Shravana Purnima, a day sacred to Lord Shiva.",
      "Historically, Rakhi was not limited to siblings — queens sent Rakhis to neighboring kings seeking alliance and protection.",
      "In some traditions, priests tie Rakhis to their patrons, and daughters tie Rakhis to their fathers.",
      "India Post offers special Rakhi envelopes every year, delivering millions of Rakhis across the country.",
    ],
    greeting: {
      english: "May the sacred thread of Rakhi strengthen the bond of love and protection between you!",
      hindi: "रक्षा बंधन की हार्दिक शुभकामनाएं — भाई-बहन का प्यार अमर रहे!",
    },
    celebrationGuide: [
      { step: "Prepare the Rakhi Thali", detail: "Arrange a plate with Rakhi, roli (kumkum), rice grains, diya, and sweets." },
      { step: "Tie the Rakhi", detail: "Sister applies tilak, ties Rakhi on brother's wrist, and prays for his well-being." },
      { step: "Exchange gifts", detail: "Brother gives gifts and promises to protect his sister." },
      { step: "Share a family meal", detail: "Celebrate with a festive lunch featuring the family's favorite dishes." },
    ],
  },

  "krishna-janmashtami": {
    story:
      "Devaki and Vasudeva were imprisoned by the tyrant King Kamsa, who had been prophesied to be slain by their eighth child. On the eighth night of the dark fortnight of Bhadrapada, at the stroke of midnight, Lord Krishna was born in the prison cell. Miraculously, the prison doors opened, the guards fell asleep, and Vasudeva carried the newborn across the flooding Yamuna river — which parted to make way — to Gokul, where he was raised by Yashoda and Nanda. This divine child would grow up to deliver the Bhagavad Gita and restore Dharma on Earth.",
    facts: [
      "Janmashtami celebrations include 'Dahi Handi' in Maharashtra, where teams form human pyramids to break a pot of curd hung high above the ground.",
      "Mathura and Vrindavan celebrate Janmashtami for over a week with elaborate reenactments of Krishna's childhood.",
      "The Bhagavad Gita, spoken by Lord Krishna on the battlefield of Kurukshetra, has been translated into over 100 languages.",
      "ISKCON temples worldwide host some of the largest Janmashtami celebrations outside India.",
    ],
    regionalNames: [
      { region: "Maharashtra", name: "Dahi Handi", note: "Human pyramid pot-breaking competition" },
      { region: "Mathura-Vrindavan", name: "Krishna Leela", note: "Week-long dramatic reenactments" },
      { region: "Tamil Nadu", name: "Gokulashtami", note: "Kolam and butter pot celebrations" },
      { region: "Gujarat", name: "Janmashtami", note: "Midnight temple celebrations" },
    ],
    greeting: {
      english: "Hare Krishna! May Lord Krishna's flute fill your life with divine melody and joy!",
      hindi: "नंद घर आनंद भयो, जय कन्हैया लाल की — जन्माष्टमी की शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Fast until midnight", detail: "Observe a fast throughout the day, breaking it only after midnight at Krishna's birth time." },
      { step: "Decorate the temple", detail: "Set up a jhula (swing) for baby Krishna and decorate with flowers and lights." },
      { step: "Midnight celebration", detail: "At 12 AM, perform the birth ceremony — bathe the idol, offer bhog, and sing bhajans." },
      { step: "Prepare Krishna's favorites", detail: "Offer makhan (butter), mishri, panjiri, and 56 items of bhog (Chhappan Bhog)." },
    ],
  },

  "ganesh-chaturthi": {
    story:
      "Goddess Parvati created Ganesha from turmeric paste and breathed life into him while Lord Shiva was away. She stationed him as a guard while she bathed. When Shiva returned, Ganesha refused him entry. Enraged, Shiva severed the boy's head. Seeing Parvati's grief, Shiva sent his ganas to find the first living being sleeping with its head pointing north. They returned with an elephant's head, which Shiva placed on Ganesha's body and restored him to life. He declared Ganesha the leader of his ganas and blessed him to be worshipped first before all gods.",
    facts: [
      "The Lalbaugcha Raja in Mumbai is India's most famous public Ganesh idol, attracting over 1.5 million visitors daily during the festival.",
      "Ganesh Chaturthi was popularized as a public festival by Lokmanya Tilak in 1893 to unite people against British rule.",
      "Lord Ganesha is known by 108 names, including Vinayaka, Gajanana, Vighnaharta, and Lambodara.",
      "Eco-friendly Ganesh idols made from clay, papier-mache, and natural colors are increasingly popular to protect water bodies.",
    ],
    regionalNames: [
      { region: "Maharashtra", name: "Ganeshotsav", note: "10-day grand public pandal celebrations" },
      { region: "Karnataka", name: "Ganesha Habba", note: "Traditional celebrations with local sweets" },
      { region: "Andhra Pradesh", name: "Vinayaka Chavithi", note: "Home and community celebrations" },
      { region: "Tamil Nadu", name: "Vinayagar Chaturthi", note: "Temple-centric celebrations" },
    ],
    greeting: {
      english: "Ganpati Bappa Morya! May Lord Ganesha remove all obstacles from your path!",
      hindi: "गणपति बप्पा मोरया! गणेश चतुर्थी की हार्दिक शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Install Ganesh idol", detail: "Bring home a Ganesh murti (preferably eco-friendly) and perform Prana Pratishtha." },
      { step: "Offer Modak and Durva", detail: "Offer Lord Ganesha's favorites — modak (sweet dumplings) and 21 blades of Durva grass." },
      { step: "Perform daily Aarti", detail: "Sing 'Jai Ganesh Deva' aarti morning and evening for the duration of the festival." },
      { step: "Immersion (Visarjan)", detail: "On the chosen day (1.5, 5, 7, or 10 days), immerse the idol with the chant 'Ganpati Bappa Morya, Purchya Varshi Laukarya'." },
    ],
  },

  "sharad-navratri": {
    story:
      "The buffalo demon Mahishasura, granted invincibility against all gods and men, conquered the three worlds. The Devas, desperate, pooled their divine energies — and from this blazing confluence emerged Goddess Durga. Brahma gave her his Kamandalu, Vishnu his Sudarshana Chakra, Shiva his Trishul, Indra his Vajra. Mounted on a lion, she battled Mahishasura and his armies for nine nights. On the tenth day (Vijayadashami), she slew the demon. Each of the nine nights celebrates one of her nine forms — from the gentle Shailaputri to the wish-fulfilling Siddhidatri.",
    facts: [
      "Sharad Navratri is the most important of the four Navratris (Sharad, Vasant, Magha, Ashadha).",
      "Gujarat's Garba and Dandiya Raas during Navratri attract millions of participants nightly.",
      "In West Bengal, Durga Puja is a UNESCO-recognized cultural heritage event and the state's biggest festival.",
      "Each day of Navratri has an assigned color: Day 1 (Orange), Day 2 (White), Day 3 (Red), and so on.",
    ],
    greeting: {
      english: "May Maa Durga's nine forms bless you with power, wisdom, and divine grace!",
      hindi: "जय माता दी! शारदीय नवरात्रि की हार्दिक शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Perform Ghatasthapana", detail: "Set up the sacred Kalash on Day 1 and sow barley seeds in a clay pot." },
      { step: "Daily Navadurga Puja", detail: "Worship the designated form of Durga each day with the assigned color and offering." },
      { step: "Observe Navratri fast", detail: "Follow the saatvik Navratri diet — kuttu, singhara, sabudana, fruits, and dairy." },
      { step: "Celebrate Garba nights", detail: "Participate in community Garba and Dandiya events dressed in traditional attire." },
      { step: "Kanya Pujan on Ashtami", detail: "Worship nine young girls, wash their feet, and offer halwa-puri and gifts." },
    ],
  },

  dussehra: {
    story:
      "After 14 years of exile, Lord Rama waged war against the ten-headed demon king Ravana who had abducted Sita. The battle at Lanka lasted 10 days. On this tenth day — Vijayadashami — Rama fired the divine arrow blessed by Lord Brahma, piercing Ravana's navel where his immortality was stored. Ravana fell, and righteousness was restored. In another tradition, this is the day Goddess Durga slew Mahishasura after nine nights of battle. Both stories celebrate the same truth: good always triumphs over evil, no matter how powerful the adversary.",
    facts: [
      "The Ramlila performances in Delhi's Ramlila Maidan have been held for over 200 years and are a UNESCO cultural heritage.",
      "The Kullu Dussehra in Himachal Pradesh is unique — it starts on Vijayadashami and lasts for 7 days.",
      "In Mysore, Dussehra is a 10-day state festival featuring a grand procession of a gold-plated howdah on an elephant.",
      "The symbolic burning of Ravana effigies uses thousands of firecrackers and can reach heights of 100+ feet.",
    ],
    regionalNames: [
      { region: "North India", name: "Dussehra", note: "Ravana effigy burning" },
      { region: "West Bengal", name: "Bijoya Dashami", note: "Durga idol immersion" },
      { region: "Mysore", name: "Dasara", note: "Royal palace celebrations" },
      { region: "Kullu", name: "Kullu Dussehra", note: "7-day festival starting on Vijayadashami" },
    ],
    greeting: {
      english: "May the victory of good over evil inspire courage and righteousness in your life!",
      hindi: "बुराई पर अच्छाई की जीत — विजयादशमी की हार्दिक शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Watch Ramlila", detail: "Attend Ramlila performances that dramatize Lord Rama's victory over Ravana." },
      { step: "Witness Ravana Dahan", detail: "Join the community event where giant effigies of Ravana, Kumbhakaran, and Meghnad are set ablaze." },
      { step: "Worship Shami tree", detail: "Offer prayers to the Shami tree and exchange its leaves as gold symbols." },
      { step: "Begin new endeavors", detail: "Vijayadashami is one of the most auspicious days to start new projects or learning." },
    ],
  },

  "karwa-chauth": {
    story:
      "Queen Veervati was the only sister of seven brothers. On her first Karwa Chauth after marriage, she observed a strict fast. As the moon delayed, her brothers, unable to see her suffer, tricked her by reflecting light through a tree to mimic the moonrise. She broke her fast — and her husband instantly fell gravely ill. Distraught, she prayed for 12 months with unwavering devotion. Moved by her penance, Lord Shiva restored her husband's life. Since then, married women fast from sunrise to moonrise, sighting the moon through a sieve before breaking the fast by looking at their husband's face.",
    facts: [
      "Karwa Chauth is a Nirjala (waterless) fast — one of the strictest fasts in Hindu tradition.",
      "The word 'Karwa' means an earthen pot, and 'Chauth' means the fourth day of the lunar month.",
      "Women apply elaborate mehendi (henna) on their hands — it is believed that darker the mehendi, deeper the husband's love.",
      "Bollywood has significantly popularized Karwa Chauth, making it trendy even among younger couples.",
    ],
    greeting: {
      english: "May the bond of love and devotion grow stronger with every Karwa Chauth!",
      hindi: "करवा चौथ की शुभकामनाएं — आपका सुहाग सदा सलामत रहे!",
    },
    celebrationGuide: [
      { step: "Wake up before dawn", detail: "Eat sargi (pre-dawn meal from mother-in-law) before sunrise." },
      { step: "Observe strict fast", detail: "No food or water from sunrise to moonrise. Spend the day in prayers and mehendi." },
      { step: "Listen to the Katha", detail: "In the evening, gather with other women and listen to the Karwa Chauth story." },
      { step: "Break fast at moonrise", detail: "Sight the moon through a sieve, look at your husband's face, and accept water from him." },
    ],
  },

  diwali: {
    story:
      "After 14 years of exile and defeating the demon king Ravana, Lord Rama returned to Ayodhya with Sita and Lakshmana. The citizens of Ayodhya lit thousands of diyas (oil lamps) to illuminate his path home and celebrate his return. This is why Diwali is the festival of lights — each diya represents the victory of light over darkness, knowledge over ignorance, and good over evil. On Diwali night, Goddess Lakshmi is worshipped for wealth and prosperity, and Lord Ganesha for wisdom and auspicious beginnings. It is the most widely celebrated festival across all Hindu traditions.",
    facts: [
      "Diwali is a 5-day festival: Dhanteras (Day 1), Naraka Chaturdashi (Day 2), Diwali (Day 3), Govardhan Puja (Day 4), Bhai Dooj (Day 5).",
      "NASA satellite images of India during Diwali show the country glowing brighter than any other night of the year.",
      "The Jain community celebrates Diwali as the day Lord Mahavira attained Nirvana (Moksha).",
      "In Sikh tradition, Diwali marks the day Guru Hargobind Ji was released from imprisonment in Gwalior Fort.",
    ],
    regionalNames: [
      { region: "South India", name: "Deepavali", note: "Celebrates Krishna's victory over Narakasura" },
      { region: "West Bengal", name: "Kali Puja", note: "Worship of Goddess Kali" },
      { region: "Gujarat", name: "New Year (Bestu Varas)", note: "Business new year celebrations" },
      { region: "Jain tradition", name: "Diwali", note: "Mahavira's Nirvana day" },
    ],
    greeting: {
      english: "May the festival of lights illuminate your life with joy, prosperity, and peace!",
      hindi: "दीपावली की हार्दिक शुभकामनाएं — सुख, समृद्धि, और आरोग्य की कामना!",
    },
    celebrationGuide: [
      { step: "Clean and decorate", detail: "Deep clean the house, make Rangoli at the entrance, and hang torans." },
      { step: "Light diyas and candles", detail: "Illuminate every corner of the home with diyas, candles, and fairy lights." },
      { step: "Perform Lakshmi Puja", detail: "At the auspicious time, worship Goddess Lakshmi and Lord Ganesha with flowers, sweets, and silver coins." },
      { step: "Exchange gifts and sweets", detail: "Visit neighbors, relatives, and friends with boxes of mithai and gifts." },
      { step: "Burst eco-friendly crackers", detail: "Celebrate with green crackers or sparklers while being mindful of noise and air pollution." },
    ],
    benefits: [
      "Deep cleaning before Diwali promotes hygiene and removes stagnant energy from the home.",
      "Lighting diyas with mustard oil purifies the air and repels insects during the post-monsoon season.",
      "The festival strengthens community bonds through visits, gift exchanges, and shared celebrations.",
    ],
  },

  dhanteras: {
    story:
      "The 16-year-old son of King Hima was destined to die by snakebite on the fourth day of his marriage. On that fateful night, his bride laid out all her gold ornaments and silver coins at the doorstep and lit countless lamps. When Yama, the god of death, arrived in the form of a serpent, he was blinded by the dazzling gold and lamps. He sat on the pile of coins listening to the bride's songs all night and left at dawn — thus the prince was saved. This is why gold, silver, and lamps are bought on Dhanteras — to ward off untimely death and invite prosperity.",
    facts: [
      "Dhanteras marks the beginning of the 5-day Diwali festival and is India's biggest gold-buying day.",
      "It is also celebrated as National Ayurveda Day — Lord Dhanvantari, the god of Ayurveda, appeared on this day.",
      "'Dhan' means wealth and 'Teras' means the 13th day of the lunar fortnight.",
      "People buy utensils, gold, silver, or at minimum a small item of metal on this day for good luck.",
    ],
    greeting: {
      english: "May Dhanteras bring you wealth, health, and the blessings of Lord Dhanvantari!",
      hindi: "धनतेरस की शुभकामनाएं — धन-धान्य और आरोग्य की कामना!",
    },
    celebrationGuide: [
      { step: "Buy gold or silver", detail: "Purchase gold jewelry, silver coins, or new utensils to invite Lakshmi's blessings." },
      { step: "Light 13 diyas", detail: "Light thirteen diyas (for Trayodashi) with mustard oil in the evening." },
      { step: "Worship Lord Dhanvantari", detail: "Offer prayers to the god of Ayurveda for family health and well-being." },
      { step: "Clean and decorate", detail: "Begin Diwali preparations — clean the house and create Rangoli at the entrance." },
    ],
  },

  "govardhan-puja": {
    story:
      "The people of Vrindavan routinely worshipped Indra, the king of gods, for rain. Young Krishna questioned this blind ritual and asked them to instead worship Govardhan Hill, which directly nourished their cattle and crops. Enraged by the snub, Indra unleashed devastating rains to drown Vrindavan. Krishna calmly lifted the entire Govardhan Hill on his little finger, sheltering all the villagers and their cattle for seven days. Humbled, Indra bowed to Krishna and acknowledged his supremacy. This teaches us to honor nature that sustains us directly.",
    facts: [
      "Govardhan Puja is also called 'Annakut' — meaning 'mountain of food' — with temples offering 56 items (Chhappan Bhog).",
      "The Govardhan Hill in Mathura is the actual hill believed to have been lifted by Krishna — pilgrims circumambulate it (21 km parikrama).",
      "In some regions, cow dung is shaped into Govardhan Hill and worshipped, honoring the agrarian roots of the festival.",
      "The festival falls the day after Diwali and is part of the 5-day Diwali celebration.",
    ],
    greeting: {
      english: "May Lord Krishna's protection and nature's abundance always bless your family!",
      hindi: "गोवर्धन पूजा की हार्दिक शुभकामनाएं — गो माता की जय!",
    },
    celebrationGuide: [
      { step: "Create Annakut", detail: "Prepare a variety of vegetarian dishes (ideally 56 items) and arrange them as a mountain offering." },
      { step: "Make Govardhan from cow dung", detail: "Shape cow dung into a small hill, decorate with flowers, and perform puja." },
      { step: "Worship cows", detail: "Bathe, decorate, and feed cows as they are central to Krishna's Govardhan story." },
      { step: "Community feast", detail: "Share the Annakut prasad with family and community members." },
    ],
  },

  "bhai-dooj": {
    story:
      "Yama, the god of death, visited his sister Yamuna on this day after a long separation. Yamuna was overjoyed and welcomed him with an aarti, tilak, and a lavish meal. Touched by her love, Yama granted her a boon: any brother who receives tilak from his sister on this day will be blessed with long life and protection. Since then, sisters perform tilak on their brothers' foreheads, feed them sweets, and pray for their longevity — mirroring Yamuna's love for Yama.",
    facts: [
      "Bhai Dooj is also known as 'Yama Dwitiya' because of the Yama-Yamuna legend.",
      "In Nepal, a similar festival called 'Bhai Tika' is celebrated with even more elaborate rituals lasting multiple days.",
      "In Bengal, the festival is called 'Bhai Phonta' where sisters draw a sandalwood tilak on their brothers' foreheads.",
      "Bhai Dooj is the 5th and final day of the Diwali festival.",
    ],
    greeting: {
      english: "May the bond between siblings grow stronger with each passing year!",
      hindi: "भाई दूज की हार्दिक शुभकामनाएं — भाई-बहन का प्रेम अमर रहे!",
    },
    celebrationGuide: [
      { step: "Apply tilak", detail: "Sister applies a kumkum tilak on her brother's forehead while performing aarti." },
      { step: "Pray for longevity", detail: "Offer prayers for your brother's long life, health, and prosperity." },
      { step: "Prepare special meal", detail: "Cook your brother's favorite dishes and sweets for the celebration." },
      { step: "Exchange gifts", detail: "Brother gives gifts to his sister as a token of love and protection." },
    ],
  },

  "chhath-puja": {
    story:
      "Chhath Puja has its roots in the Vedic period, where Rishis worshipped the Sun through rigorous austerity. In the Mahabharata, Draupadi observed the Chhath Vrat on the advice of Sage Dhaumya to solve the Pandavas' problems. Another legend tells of King Priyavrat and his wife who, childless and desperate, performed severe penance to the Sun God. Pleased by their devotion, the Sun blessed them with a son. The festival's austere discipline — standing in cold water at dawn and dusk — represents the most demanding form of devotion in Hindu practice.",
    facts: [
      "Chhath Puja is one of the only festivals where the setting sun is worshipped, not just the rising sun.",
      "The fast is one of the most rigorous — devotees go without food and water for 36 hours.",
      "The festival is unique for having no priest or pandit — devotees perform all rituals themselves.",
      "Bihar's Chhath Puja celebrations attract millions to river ghats, making it one of the largest religious gatherings.",
    ],
    greeting: {
      english: "May Chhathi Maiya and Surya Dev bless you with health, prosperity, and happiness!",
      hindi: "छठ महापर्व की हार्दिक शुभकामनाएं — छठी मइया और सूर्य देव की जय!",
    },
    celebrationGuide: [
      { step: "Nahay Khay (Day 1)", detail: "Take a holy dip in a river and prepare the first prasad (lauki sabzi and chana dal)." },
      { step: "Kharna (Day 2)", detail: "Fast all day, break it in the evening with kheer and roti, then begin 36-hour fast." },
      { step: "Sandhya Arghya (Day 3)", detail: "Stand in water at the river ghat and offer arghya (water offering) to the setting sun." },
      { step: "Usha Arghya (Day 4)", detail: "Before dawn, return to the ghat and offer arghya to the rising sun, then break the fast." },
    ],
  },

  "nag-panchami": {
    story:
      "When Krishna was a child in Vrindavan, the serpent Kaliya had poisoned the waters of the Yamuna, killing cattle and villagers. Young Krishna jumped into the river and danced on Kaliya's multiple hoods, subduing the great serpent. Rather than killing Kaliya, Krishna showed compassion and banished him to the ocean. Nag Panchami honors the Nagas (serpent deities) who are believed to guard underground treasures and control the rains. Snakes are offered milk and prayers on this day as a gesture of reverence and coexistence with nature.",
    facts: [
      "Nag Panchami falls on the 5th day of Shravana Shukla Paksha, during the peak of the monsoon season.",
      "In many villages, live snakes (especially cobras) are brought to homes and temples for worship.",
      "The festival is deeply tied to agriculture — snakes control rodent populations that would otherwise destroy crops.",
      "Ancient temples across India feature intricate Naga sculptures, reflecting the deep reverence for serpent deities.",
    ],
    greeting: {
      english: "May the Naga Devatas bless you with protection and prosperity!",
      hindi: "नाग पंचमी की शुभकामनाएं — नाग देवता आपकी रक्षा करें!",
    },
    celebrationGuide: [
      { step: "Offer milk to Naga", detail: "Pour milk over a snake idol or anthill as an offering to the Naga Devatas." },
      { step: "Visit Naga temples", detail: "Pray at temples dedicated to serpent deities for protection and well-being." },
      { step: "Do not dig earth", detail: "Avoid digging, ploughing, or cutting trees on this day as it may harm snakes underground." },
      { step: "Draw snake rangoli", detail: "Create snake patterns with turmeric or rangoli at the entrance of your home." },
    ],
  },

  "holika-dahan": {
    story:
      "The demon king Hiranyakashipu's son Prahlada was an unwavering devotee of Lord Vishnu. Enraged that his own son worshipped his greatest enemy, Hiranyakashipu tried to kill Prahlada many times but failed. Finally, he ordered his sister Holika — who possessed a divine cloak granting fire immunity — to sit in a blazing pyre with Prahlada on her lap. But Lord Vishnu intervened: the cloak flew from Holika onto Prahlada, and she was consumed by the flames she had intended for her nephew. The Holika Dahan bonfire recreates this moment, burning away evil and negativity.",
    facts: [
      "Holika Dahan always takes place on the night before Holi, at the specific auspicious muhurta after sunset.",
      "The bonfire is traditionally made from wood and cow dung cakes collected by children from the neighborhood.",
      "People circumambulate the Holika fire and offer roasted grains, popcorn, and coconut to the flames.",
      "The ashes of Holika Dahan are considered sacred and are applied on the forehead the next morning.",
    ],
    greeting: {
      english: "May the fire of Holika burn away all negativity from your life!",
      hindi: "होलिका दहन की शुभकामनाएं — बुराई का अंत, अच्छाई की जीत!",
    },
    celebrationGuide: [
      { step: "Collect wood and dung cakes", detail: "Contribute to the community bonfire pile in the days leading up to Holika Dahan." },
      { step: "Perform puja before lighting", detail: "Offer coconut, grain, and turmeric to the pyre before it is lit at the auspicious muhurta." },
      { step: "Circumambulate the fire", detail: "Walk around the Holika fire 3-7 times, praying for the burning away of negativity." },
      { step: "Roast offerings", detail: "Throw popcorn, groundnuts, and new harvest grains into the fire as offerings." },
    ],
  },

  "hanuman-jayanti": {
    story:
      "Anjana, a celestial apsara cursed to live as a vanara (monkey), performed intense penance to Lord Shiva for 12 years. Pleased by her devotion, Shiva blessed her with a son who would be an incarnation of his own energy. The wind god Vayu carried the divine blessing to Anjana, and thus Hanuman was born — an embodiment of strength, devotion, and selfless service. As a child, he tried to eat the sun thinking it was a fruit, and was struck by Indra's vajra on his chin (hanu), earning his name. He grew to become Lord Rama's greatest devotee and the central hero of the Ramayana.",
    facts: [
      "Hanuman is considered a Chiranjeevi — one of the seven immortals who are believed to still live on Earth.",
      "The Hanuman Chalisa, composed by Tulsidas, is the most recited Hindu prayer, chanted over 100 million times daily worldwide.",
      "Hanuman is worshipped not just in Hinduism but also in Jainism and Buddhism across Southeast Asia.",
      "Tuesday and Saturday are considered auspicious for Hanuman worship, and sindoor (vermillion) is offered in his temples.",
    ],
    greeting: {
      english: "Jai Hanuman! May Bajrangbali grant you strength, courage, and unwavering devotion!",
      hindi: "जय बजरंग बली! हनुमान जयंती की हार्दिक शुभकामनाएं!",
    },
    celebrationGuide: [
      { step: "Recite Hanuman Chalisa", detail: "Recite the Hanuman Chalisa 7 or 11 times for divine blessings and protection." },
      { step: "Visit a Hanuman temple", detail: "Offer sindoor, jasmine oil, and laddu to Hanuman at your nearest temple." },
      { step: "Read Sundara Kanda", detail: "Read the Sundara Kanda of Ramayana, which details Hanuman's heroic journey to Lanka." },
      { step: "Observe a fast", detail: "Fast and offer prayers for strength, courage, and removal of fears." },
    ],
  },

  "buddha-purnima": {
    story:
      "In the garden of Lumbini (modern-day Nepal), Queen Mahamaya gave birth to Prince Siddhartha Gautama under a Sal tree on the full moon day of Vaishakha. The prince, who had been shielded from all suffering, eventually ventured outside the palace and witnessed old age, sickness, and death. This led him to renounce his royal life and seek enlightenment. After years of austerity and meditation under the Bodhi Tree in Bodh Gaya, he attained supreme enlightenment on this very full moon day — becoming the Buddha, the Awakened One. He also attained Mahaparinirvana on the same day.",
    facts: [
      "Buddha Purnima is also called Vesak and is celebrated as a public holiday in many countries across Asia.",
      "Three major events of Buddha's life — birth, enlightenment, and death — all occurred on the same lunar day.",
      "The Bodhi Tree in Bodh Gaya, under which Buddha attained enlightenment, is a descendant of the original tree and is over 2,500 years old.",
      "UNESCO has recognized Lumbini (birthplace) and Bodh Gaya (enlightenment site) as World Heritage Sites.",
    ],
    greeting: {
      english: "May the light of Buddha's wisdom guide you to peace, compassion, and enlightenment!",
      hindi: "बुद्ध पूर्णिमा की शुभकामनाएं — बुद्धं शरणं गच्छामि!",
    },
    celebrationGuide: [
      { step: "Meditate", detail: "Spend time in silent meditation, reflecting on the Four Noble Truths." },
      { step: "Visit a monastery", detail: "Pay respects at a Buddhist temple or monastery and offer incense and flowers." },
      { step: "Practice compassion", detail: "Perform acts of kindness — donate food, help the needy, or free caged birds." },
      { step: "Read the Dhammapada", detail: "Study verses from the Dhammapada or other Buddhist scriptures." },
    ],
  },

  onam: {
    story:
      "King Mahabali was a just and generous Asura king who ruled Kerala with such righteousness that his kingdom was a paradise on Earth. The Devas, jealous of his popularity, requested Lord Vishnu to intervene. Vishnu took the form of Vamana, a dwarf Brahmin, and asked Mahabali for three paces of land. When Mahabali agreed, Vamana grew to cosmic proportions — covering the Earth in one step and the heavens in the second. With no space for the third step, Mahabali offered his own head. Vishnu, moved by his devotion, granted him the boon of visiting his beloved people once a year. Onam celebrates that annual homecoming.",
    facts: [
      "Onam is Kerala's state festival and the only Hindu festival that transcends religious boundaries — celebrated by all communities.",
      "The Onasadya feast consists of a minimum of 13 dishes and can go up to 26, all served on a banana leaf.",
      "Vallam Kali (snake boat race) at Aranmula attracts thousands of spectators and participants annually.",
      "Pookalam (flower carpet) competitions feature intricate designs that can span over 50 feet in diameter.",
    ],
    greeting: {
      english: "Happy Onam! May the spirit of King Mahabali bring abundance and equality!",
      hindi: "ओणम की हार्दिक शुभकामनाएं — पूक्कलं, ओणसद्या, और खुशियां!",
    },
    celebrationGuide: [
      { step: "Create Pookalam", detail: "Design beautiful flower carpets at your entrance with fresh flowers each day of the 10-day festival." },
      { step: "Prepare Onasadya", detail: "Cook the elaborate banana-leaf feast with payasam, avial, olan, and other traditional dishes." },
      { step: "Watch Vallam Kali", detail: "Attend or watch the famous snake boat races held on Kerala's backwaters." },
      { step: "Enjoy Pulikali", detail: "Participate in or watch the colorful tiger dance performed during Onam celebrations." },
    ],
  },

  // Vrat-specific content
  "pausha-putrada-ekadashi": {
    story:
      "A righteous king and queen who had no heir observed this Ekadashi with deep devotion on the advice of sages. Lord Vishnu, pleased by their fasting and prayers, blessed them with a noble son. The word 'Putrada' literally means 'bestower of sons'. In the broader Ekadashi tradition, Lord Vishnu declared that fasting on the 11th day of each lunar fortnight purifies the mind and body, and the merit equals thousands of years of penance.",
    facts: [
      "There are 24 Ekadashis in a year, each with a unique name and significance.",
      "Ekadashi fasting has been validated by modern science — intermittent fasting twice monthly aids digestion and cellular repair.",
      "The Padma Purana describes the glory of each Ekadashi in dedicated chapters.",
    ],
    greeting: {
      english: "May Lord Vishnu bless your family with health and the fulfillment of all wishes!",
      hindi: "एकादशी व्रत की शुभकामनाएं — हरि ॐ तत्सत!",
    },
    celebrationGuide: [
      { step: "Begin fast after sunrise", detail: "Abstain from grains, beans, and certain vegetables. Consume fruits and milk." },
      { step: "Worship Lord Vishnu", detail: "Offer tulsi leaves, flowers, and incense to Lord Vishnu's idol or image." },
      { step: "Recite Vishnu Sahasranama", detail: "Chant the 1000 names of Lord Vishnu for spiritual merit." },
      { step: "Break fast next morning", detail: "End the fast the next morning during the Parana time window." },
    ],
  },

  "saphala-ekadashi": {
    story:
      "Once, a prince named Lumpaka wasted his life in sinful activities. Banished from his kingdom, he lived in a forest and unknowingly observed a fast on Saphala Ekadashi, staying awake all night under a tree near a Vishnu temple. This accidental observance pleased Lord Vishnu so much that Lumpaka was freed from all sins and transformed into a righteous being who regained his kingdom. The story teaches that even unknowing observance of Ekadashi carries immense spiritual power.",
    facts: [
      "Saphala means 'fruitful' — this Ekadashi is believed to grant success in all undertakings.",
      "Offering fruits, especially coconut and pomegranate, is considered especially meritorious on this day.",
      "This Ekadashi falls in the Krishna Paksha of Pausha/Magha month, during the peak of winter.",
    ],
    greeting: {
      english: "May Saphala Ekadashi bring you success and spiritual growth!",
      hindi: "सफला एकादशी की शुभकामनाएं — जय श्री विष्णु!",
    },
    celebrationGuide: [
      { step: "Fast from grains", detail: "Observe Ekadashi by avoiding rice, wheat, and pulses throughout the day." },
      { step: "Offer fruits to Vishnu", detail: "Place fresh fruits near Lord Vishnu's image and light a ghee diya." },
      { step: "Night vigil", detail: "Stay awake through the night reciting Vishnu mantras or reading the Bhagavad Gita." },
      { step: "Donate food", detail: "The next morning, donate food to the poor before breaking your fast." },
    ],
  },

  "magh-purnima": {
    story:
      "According to the Padma Purana, bathing at the Triveni Sangam (confluence of Ganga, Yamuna, and Saraswati) on Magh Purnima washes away sins accumulated over countless lifetimes. Lord Brahma himself performed a yajna on this day at the Sangam, establishing its eternal sacredness. The month-long Magh Snan (bathing ritual during the entire month of Magha) concludes on this Purnima, making it the holiest bathing day of the Hindu calendar after Kartik Purnima.",
    facts: [
      "The annual Magh Mela at Prayagraj (Allahabad) is a mini Kumbh Mela, attracting millions on Magh Purnima.",
      "Bathing in any sacred river on this day is considered equivalent to bathing in the Ganges.",
      "Charity given on Magh Purnima is believed to multiply manifold — especially donations of blankets in the cold winter.",
    ],
    greeting: {
      english: "May the sacred waters of Magha purify your body, mind, and soul!",
      hindi: "माघ पूर्णिमा की शुभकामनाएं — गंगा स्नान का पुण्य मिले!",
    },
    celebrationGuide: [
      { step: "Take a holy dip", detail: "Bathe in the Ganges, at a Sangam, or in any sacred river before sunrise." },
      { step: "Perform Satyanarayan Puja", detail: "Organize a Satyanarayan Katha at home with family and offer prasad." },
      { step: "Donate blankets and food", detail: "Give warm clothes and food to the needy — this is the peak of winter." },
      { step: "Light lamps at the river", detail: "Set afloat leaf-plate lamps (diyas) on the river as offerings." },
    ],
  },

  "pradosh-vrat": {
    story:
      "During the Samudra Manthan (churning of the cosmic ocean), a deadly poison called Halahala emerged that threatened to destroy all creation. Neither the Devas nor the Asuras could handle it. Lord Shiva consumed the poison to save the universe, and Goddess Parvati pressed his throat to stop it from entering his body, turning his throat blue (Neelkanth). This act of cosmic sacrifice occurred during the Pradosh Kaal (twilight). Worshipping Shiva during this twilight period is believed to be the most auspicious time, as it recreates the moment of his greatest act of compassion.",
    facts: [
      "Pradosh Kaal is the 1.5-hour period before and after sunset — considered Shiva's most powerful time.",
      "There are two Pradosh Vrats every month — on the Trayodashi of both Shukla and Krishna Paksha.",
      "When Pradosh Vrat falls on a Saturday, it is called 'Shani Pradosh' and is especially powerful for removing Saturn-related obstacles.",
    ],
    greeting: {
      english: "Har Har Mahadev! May Lord Shiva's blessings illuminate your twilight prayers!",
      hindi: "प्रदोष व्रत की शुभकामनाएं — हर हर महादेव!",
    },
    celebrationGuide: [
      { step: "Fast until sunset", detail: "Observe a fast throughout the day, consuming only fruits and milk." },
      { step: "Shiva Puja during Pradosh Kaal", detail: "Perform Shiva Abhishekam during the twilight period (approximately 1.5 hours before and after sunset)." },
      { step: "Offer Bilva leaves", detail: "Place trifoliate Bilva leaves on the Shiva Lingam along with milk and water." },
      { step: "Chant Maha Mrityunjaya Mantra", detail: "Recite the Maha Mrityunjaya Mantra 108 times for health and protection." },
    ],
  },
};

/**
 * Get rich content for a festival by its slug (with or without year suffix).
 */
export function getFestivalContent(slug: string): FestivalContent | null {
  const baseName = slug.replace(/-\d{4}$/, "");
  // Handle special case: pradosh-vrat-feb, pradosh-vrat-mar, etc.
  const normalizedBase = baseName.replace(/-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/, "");
  return FESTIVAL_CONTENT[normalizedBase] || FESTIVAL_CONTENT[baseName] || null;
}
