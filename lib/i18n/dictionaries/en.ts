/**
 * English copy. `fr.ts` must match this shape exactly (enforced by the `Dictionary` type).
 * Placeholders in curly braces — {email}, {amount}, {min} — are filled in at render time.
 */
import { platformEn } from "./en-platform";

const en = {
  ...platformEn,
  locale: "en",
  meta: {
    siteName: "Syndy Emade Foundation",
    tagline: "Together we can.",
    description:
      "The Syndy Emade Foundation stands with vulnerable children and displaced families in Cameroon: school supplies and fees, food and essentials, Christmas outreach and the fight against child exploitation. Together we can.",
    keywords: ["Syndy Emade", "Syndy Emade Foundation", "Cameroon charity", "Douala charity", "displaced families Cameroon", "back to school Cameroon", "Blue Rain Entertainment"],
    location: "Douala, Cameroon",
  },

  nav: {
    about: "About",
    projects: "Projects",
    legacy: "Creative Legacy",
    media: "Media",
    getInvolved: "Get involved",
    donate: "Donate",
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Syndy Emade Foundation — home",
    primary: "Primary",
    logoSub: "Foundation",
    /** label for the link to the *other* language */
    switchShort: "FR",
    switchLong: "Lire en français",
    switchLang: "fr",
  },

  common: {
    learnMore: "Learn more",
    opensNewTab: "(opens in a new tab)",
    donateNow: "Donate now",
    volunteer: "Volunteer",
    allProgrammes: "All programmes",
    backHome: "Back home",
  },

  hero: {
    eyebrow: "Syndy Emade Foundation · Douala, Cameroon",
    line1: "Together",
    line2: "we can.",
    lead:
      "Since 2019, the Syndy Emade Foundation has stood with children and families hit hardest by hardship and conflict in Cameroon, from school supplies for displaced children to food, rent and a little Christmas joy.",
    cta: "Donate now",
    secondary: "Watch our story",
    promiseLabel: "Our promise",
    promise: "Turning visibility into practical help — for every child, family and community we reach.",
    watch: "Watch field missions on Syndy Emade TV",
    stats: ["displaced children equipped for school", "children’s school fees paid", "standing with families since"],
    statsLabel: "Impact at a glance",
    statsNote: "Figures as reported in public coverage of our outreaches.",
    videoTitle: "Our story — Syndy Emade TV",
    storyEyebrow: "Our story",
    storyText: "In one minute, the Foundation’s purpose: improving the capacity and character of young people and underprivileged children, and standing with them through hardship. Since 2019 that has meant school supplies, food, rent and a presence when families need it most.",
    storyCta: "See our programmes",
    videoEmpty: "Mission films are published on the Syndy Emade TV YouTube channel.",
    videoOpenChannel: "Open the channel on YouTube",
    close: "Close",
  },

  matrix: {
    eyebrow: "Two stages, one purpose",
    title: "The humanitarian and the film icon",
    intro: "Syndy Emade’s work on screen and in the field feed each other: cinema brings the visibility, the Foundation turns it into help.",
    tabsLabel: "Choose a side of her story",
    tabs: { humanitarian: "The Humanitarian", icon: "The Film Icon" },
    humanitarianText:
      "Through the Foundation she leads back-to-school support for displaced children, outreaches to families who fled the crisis in the North-West and South-West regions, and Christmas outreaches to vulnerable households in Douala. Her team visits homes first, then she visits in person to decide who needs help most.",
    iconText:
      "As an actress and CEO of Blue Rain Entertainment she has carried Cameroonian stories across borders — from her 2010 debut to co-productions with Nollywood stars.",
    programmesHeading: "Foundation programmes",
    filmsHeading: "Selected films",
    awardsHeading: "Recognition",
    crossBorder: "Cross-border cinema: Cameroonian productions with Nigerian (Nollywood) talent, including Alexx Ekubo in A Man for the Weekend.",
    seeProgrammes: "All programmes",
    seeFilms: "Full filmography",
  },

  map: {
    eyebrow: "Where we work",
    title: "From the crisis regions to Douala",
    intro: "Most of our documented work is in Douala, especially Bonaberi, with families who fled the conflict in the North-West and South-West regions. Select a place to learn more.",
    mapLabel: "Map of south-western Cameroon showing Douala, where the Foundation works, and Bamenda and Buea, the regions displaced families come from",
    programmesLabel: "Programmes",
    storiesLabel: "Moments from our journey",
    noStories: "No documented outreach here yet.",
    legend: { work: "Where we work", origin: "Where displaced families come from", hometown: "Founder’s hometown" },
    centres: {
      douala: { name: "Douala", region: "Littoral Region · Bonaberi", headline: "Outreach to displaced families, back-to-school support and Christmas outreaches." },
      bamenda: { name: "Bamenda", region: "North-West Region", headline: "Many of the displaced families we support in Douala fled the crisis in the North-West." },
      buea: { name: "Buea", region: "South-West Region", headline: "Families from the South-West, also affected by the crisis, are among those we support." },
      kumba: { name: "Kumba", region: "South-West Region", headline: "Syndy Emade’s hometown, where her commitment to children began." },
      limbe: { name: "Limbe", region: "South-West Region", headline: "COVID-19 safety kits for a school in 2020, and a 2015 visit to the children of the Limbe orphanage at Bota." },
    },
  },

  journey: {
    eyebrow: "Our journey",
    title: "What we’ve done so far",
    intro: "Every moment below is documented, with a link to its source. Filter by programme to follow one strand of our work.",
    filterLabel: "Filter by programme",
    all: "All programmes",
    dateToConfirm: "date to confirm",
    source: "Source",
    sources: "Sources",
    watch: "Watch the film",
    readMore: "See the full journey",
    entries: {
      "limbe-orphanage-2015": { when: "October 2015", title: "Before the Foundation: a day at the Limbe orphanage", text: "Years before the Foundation existed, Syndy Emade and her Blue Rain Entertainment crew spend a day with the children of the orphanage at Bota, Limbe, sharing fun moments and listening to their dreams." },
      "idps-2019": { when: "11 July 2019", title: "Launch: food for 200+ displaced people", text: "The Foundation is launched at Mabanda-Bonaberi, Douala. More than 200 people who fled the crisis in the North-West and South-West receive food items and a listening ear. Moved by their stories, Syndy Emade announces a back-to-school campaign for their children." },
      launch: { when: "August 2019", title: "The Foundation presents its cause", text: "A month after its first outreach, the Foundation introduces itself in a short film on Syndy Emade TV. Its cause: protecting vulnerable children, starting with street children at risk of exploitation." },
      "school-materials": { when: "August 2019", title: "School materials for 600+ displaced children", text: "Weeks after its launch, the Foundation’s back-to-school campaign reaches children displaced from the North-West and South-West. Nursery and primary pupils, chosen door to door among the poorest families, receive exercise books, textbooks and school bags: more than 600 children in all." },
      "school-fees": { when: "August 2019", title: "School fees for 300 children", text: "Beyond supplies, parents receive help to pay their children’s school fees, so that 300 children can start the year in class. The Foundation calls it its second action, and announces a health follow-up for displaced families next." },
      "covid-schools-2020": { when: "August 2020", title: "Keeping a Limbe school safe from COVID-19", text: "With the Elone Foundation, Syndy Emade and her family visit a school in Limbe to talk with students about the virus. They bring face masks, hand sanitiser, buckets and thermometers, more than the school’s student count, so classes can stay open safely." },
      "idps-2020": { when: "September 2020", title: "Supplies for displaced families at Bonaberi", text: "The Foundation shares food and supplies with families at Bonaberi who fled the crisis from Bamenda to Douala. “It takes a little to put a smile on somebody’s face,” the team says. A host says it will help feed the children in their care, and one mother plans to share hers with her parents in the village." },
      "christmas-2020": { when: "Christmas 2020", title: "Christmas outreach at Bonaberi", text: "The team brings Christmas to families in Bonaberi, Douala, sharing gifts and essentials. The founder uses the moment to speak out against the exploitation of street children." },
      "idps-2021": { when: "February 2021", title: "Standing with displaced families", text: "The Foundation visits families who fled the crisis to Douala and shares food and essentials. Parents say the gift will feed their children for days, and some plan to share it with neighbours. The founder calls it “the first of many”." },
      "street-children-2021": { when: "December 2020", title: "A day with young people living on the street", text: "The team spends part of the day with young people living on the street. Many already wash cars or open doors for a tip, so the Foundation gives them buckets, soap and umbrellas to earn more safely, then shares food and drinks with them." },
      "womens-day": { when: "8 March 2024", title: "Women’s Day, in partnership", text: "On International Women’s Day, the Foundation and the Wilmbi Foundation bring essentials for newborns to new mothers at Limbe District Hospital." },
      "christmas-2023": { when: "December 2023", title: "A home for a mother and her three sons", text: "On a Christmas outreach, the team meets a visually impaired single mother living in one cramped room with her three sons. The Foundation pays a year’s rent on a larger home, renovates and furnishes it, and stocks it with food and household essentials." },
    },
  },

  proof: {
    eyebrow: "As featured in",
    ambassador: "Brand ambassador, Orange InstaVoice Celeb",
    pause: "Pause scrolling",
    play: "Resume scrolling",
  },

  impact: {
    heading: "Our impact",
    labels: [],
    placeholderNote: "Figures as reported in public coverage of our outreaches.",
  },


  pillars: {
    philanthropist: {
      kicker: "Pillar I",
      title: "Every child in school, every child safe",
      summary: "Education and protection for children at risk.",
      points: ["Back to school", "Child protection", "Fighting child exploitation"],
    },
    humanitarian: {
      kicker: "Pillar II",
      title: "No family left behind",
      summary: "Food, shelter and dignity for families in crisis.",
      points: ["Displaced families", "Christmas outreach", "Emergency support"],
    },
    icon: {
      kicker: "Pillar III",
      title: "A voice that rallies others",
      summary: "Using a public platform to bring partners and attention to the cause.",
      points: ["Women & partnerships", "Media visibility for our causes", "Volunteers and donors"],
    },
  },

  projects: {
    "back-to-school": {
      title: "Back to School",
      short: "School materials and school fees so that displaced and underprivileged children stay in class.",
      intro:
        "Conflict and poverty push children out of school. Our back-to-school campaign gives underprivileged and displaced children the basics they need to learn, and pays school fees when families cannot.",
      delivered: [
        "School materials for more than 600 displaced children in Douala (August 2019)",
        "School fees paid for 300 children (August 2019)",
        "COVID-19 safety kits for a school in Limbe, with the Elone Foundation (2020)",
        "A recurring back-to-school campaign for underprivileged children",
      ],
      planned: ["Secondary and university scholarships", "Vocational and digital-skills training"],
      regions: "Douala, Limbe",
      keyFact: "600+",
      keyFactLabel: "displaced children equipped for school",
    },
    "displaced-families": {
      title: "Displaced Families",
      short: "Food and essentials for families who fled the crisis in the North-West and South-West regions.",
      intro:
        "Thousands of families have fled the crisis in Cameroon’s North-West and South-West regions and rebuilt their lives in Douala with very little. We visit them in Bonaberi and elsewhere with food and essentials, through our mobile crisis relief work, Chantiers Mobiles Crise.",
      delivered: [
        "Food for more than 200 displaced people in Douala: the Foundation’s first action (July 2019)",
        "Supplies shared with displaced families at Bonaberi, Douala (September 2020)",
        "Food and essential supplies shared with displaced families in Bonaberi, Douala (2021)",
        "Gifts that families say feed their children for days, and that they share with neighbours",
        "Outreach the founder described as “the first of many”",
      ],
      planned: ["Health kits and emergency medical support", "Shelter materials for newly displaced families"],
      regions: "Bonaberi, Douala",
      keyFact: "2021",
      keyFactLabel: "outreach to displaced families in Bonaberi",
    },
    "christmas-outreach": {
      title: "Christmas Outreach",
      short: "Each festive season, the team visits vulnerable homes and brings practical help that lasts beyond Christmas.",
      intro:
        "Each Christmas, our team goes door to door, often in remote neighbourhoods, to find the families who need help most. The founder then visits them in person. The help goes beyond a gift, from food to a year’s rent.",
      delivered: [
        "Christmas outreach to families in Bonaberi (2020)",
        "A year’s rent on a larger home for a visually impaired mother and her three sons (2023)",
        "A pledge to renovate the family’s room, plus food and household essentials",
      ],
      planned: ["A yearly Christmas outreach in more neighbourhoods"],
      regions: "Douala",
      keyFact: "1 year",
      keyFactLabel: "of rent paid for a family in need (2023)",
    },
    "child-protection": {
      title: "Child Protection",
      short: "Standing up for street children and against the exploitation of children.",
      intro:
        "The Foundation was created to protect vulnerable children, starting with street children, who are often exploited. We speak out at every outreach, and we are building programmes to offer safety, care and guidance.",
      delivered: ["Buckets, soap, umbrellas and a shared meal for young people living on the street (December 2020)", "The Foundation’s founding cause, stated publicly since 2019", "Advocacy against child exploitation at our outreaches"],
      planned: ["Shelter and nutrition for children at risk", "Health check-ups", "Mentoring by trusted adults"],
      regions: "Douala",
      keyFact: "2019",
      keyFactLabel: "our founding cause",
    },
    women: {
      title: "Women & Partnerships",
      short: "Working with partner organisations to support women and their families.",
      intro:
        "Women hold families together, especially in crisis. We work alongside partner organisations to support them, and we welcome partners who share our goals.",
      delivered: ["International Women’s Day, in partnership with the Wilmbi Foundation"],
      planned: ["Micro-grants for women-led small businesses", "Training in tailoring and agriculture for widows and displaced women"],
      regions: "Cameroon",
      keyFact: "Partners",
      keyFactLabel: "working with other foundations",
    },
  },

  founder: {
    name: "Syndy Emade",
    legalName: "Elone Synthia Emade",
    born: "21 November 1993",
    birthplace: "Kumba, Southwest Region, Cameroon",
    education: "B.Sc. Banking and Finance, University of Buea",
    roles: ["Award-winning actress", "Film & TV producer", "CEO, Blue Rain Entertainment", "Model", "Philanthropist"],
    ambassadorships: [
      "Brand Ambassador, Orange InstaVoice Celeb",
      "Producer of two films on Netflix: Broken and A Man For The Weekend (2021)",
      "CFI Partner", // TODO(verify)
    ],
    summary:
      "Born in Kumba and trained in banking and finance at the University of Buea, Syndy Emade rose from her 2010 screen debut to become one of Cameroon’s most recognised actresses and producers. Through Blue Rain Entertainment she has championed stories made in Cameroon for audiences across Africa and beyond — and through the Foundation she turns that visibility into direct, practical help for the communities that raised her.",
    photoAlt: "Syndy Emade in a red gown at the Glitz Style Awards, Ghana, 2017",
    photoCredit: "Photo:",
    photoVia: "via Wikimedia Commons",
  },

  awards: [
    { year: "2014", title: "Miss Heritage Cameroon" },
    { year: "2014", title: "Miss Heritage Africa" },
    { year: "2017", title: "Scoos Academy Award — Best Cameroonian Actress" },
    { year: "2017", title: "Ranked #2 Most Active Cameroonian Actress", note: "Njoka TV" },
    { year: "Career", title: "8 national & international Best Actress awards" },
  ] as { year: string; title: string; note?: string }[],

  films: {
    filterLabel: "Filter filmography",
    filters: { all: "All work", producer: "As producer", highlight: "Highlights" },
    highlight: "Highlight",
    as: "as",
    actress: "Actress",
    viewImdb: "View on IMDb",
    credit: { producer: "Producer & Actress", lead: "Lead" },
    notes: { debut: "Feature debut", tv: "TV series", nollywood: "Nollywood debut", ekubo: "Featuring Alexx Ekubo" },
    timelineHeading: "Filmography timeline",
  },

  home: {
    pillarsEyebrow: "What drives us",
    pillarsTitle: "Three commitments, one promise: together we can",
    pillarsIntro: "Everything we do comes back to children and families who have been left with the least, and to the people who choose to stand with them.",
    programmesEyebrow: "Our programmes",
    programmesTitle: "Where your support goes",
    founderEyebrow: "Meet the founder",
    readStory: "Read her story",
    legacyEyebrow: "Creative legacy",
    legacyTitle: "Cinema for social good",
    legacyIntro:
      "Over 15 years on screen and behind the camera with Blue Rain Entertainment — stories that carry Cameroonian voices across Africa and the world.",
    fullFilmography: "Full filmography",
    videosEyebrow: "Watch",
    videosTitle: "Our work, in our own films",
    videosIntro: "Short films from our outreaches, published on Syndy Emade TV.",
    seeAllMedia: "All media",
  },


  cta: {
    title: "Every gift becomes a meal, a classroom seat, a safe night’s sleep.",
    text: "Give once or monthly — by card, PayPal or Mobile Money.",
    donate: "Donate now",
    involve: "Volunteer or partner",
  },

  about: {
    metaTitle: "About the Founder & Foundation",
    metaDescription:
      "Syndy Emade — banking graduate, award-winning actress, producer and philanthropist — and the mission, vision and governance of her Foundation.",
    eyebrow: "About",
    title: "From Kumba to the world — and back home again",
    intro: "The story of our founder, and the promise that drives the Syndy Emade Foundation.",
    factBorn: "Born",
    factEducation: "Education",
    factFullName: "Full name",
    founderEyebrow: "The founder",
    founderExtra:
      "A finance graduate turned filmmaker, she brings an entrepreneur’s discipline to philanthropy: clear goals, accountable spending and partnerships that last.",
    honours: "Honours & recognition",
    roles: "Ambassadorships & roles",
    references: "Reference profiles:",
    foundationEyebrow: "The Foundation",
    foundationTitle: "Mission, vision & governance",
    missionTitle: "Our mission",
    mission:
      "To protect vulnerable young people, deliver dignified relief to families in crisis, open doors to education and empower women and creatives — across Cameroon, Africa and the diaspora.",
    visionTitle: "Our vision",
    vision: "An Africa where every child is safe, every family can recover from crisis, and every talent has the chance to shine.",
    governance: [
      { title: "Safeguarding first", text: "Child-protection and safeguarding policies govern every programme, volunteer and partner." },
      { title: "Transparent reporting", text: "Programme spending and outcomes are published in an annual impact report." },
      { title: "Community-led", text: "Local leaders and beneficiaries help shape where and how we work." },
    ],
    deckTitle: "Foundation impact report",
  },

  projectsPage: {
    metaTitle: "Programmes & Impact",
    metaDescription: "Back to school, support for displaced families, Christmas outreach, child protection, and women and partnerships, in Douala and across Cameroon.",
    eyebrow: "Programmes & impact",
    title: "Practical help, where it’s needed most",
    intro: "Five programmes built from what we have actually done in Douala since 2019, and what we are building next.",
    listHeading: "Our programmes",
    frameworkEyebrow: "Our framework",
    frameworkTitle: "What drives us",
  },


  project: {
    eyebrow: "Programme",
    photoLabel: "{title} in the field",
    whatWeDo: "What we’ve done",
    planned: "What we’re building next",
    plannedNote: "Planned work, subject to funding.",
    journeyTitle: "Moments from this programme",
    watchFilm: "Watch the film",
    where: "Where",
    support: "Support this programme",
    others: "Other programmes",
  },


  legacy: {
    metaTitle: "Filmography & Creative Legacy",
    metaDescription:
      "Syndy Emade’s filmography from 2010 to today, Blue Rain Entertainment, and the awards behind a career in Cameroonian and African cinema.",
    eyebrow: "Creative legacy",
    title: "Stories that travel — and give back",
    intro: "{count} screen credits since {year}, as actress and producer, with Blue Rain Entertainment and partner studios.",
    studioEyebrow: "Blue Rain Entertainment",
    studioTitle: "A studio with a purpose",
    studioIntro:
      "As CEO of Blue Rain Entertainment, Syndy Emade produces films that put Cameroonian talent on screen and keep social themes at their heart.",
    awards: "Awards showcase",
    imdb: "Full credits on IMDb",
    advocacyEyebrow: "Creative advocacy",
    advocacyTitle: "The Cultural Icon pillar",
    advocacy: [
      { title: "Cinema for social good", text: "Blue Rain Entertainment productions raise awareness of social issues and African empowerment." },
      { title: "Youth & arts mentorship", text: "Mentoring young African actors, filmmakers and creative entrepreneurs." },
      { title: "Global representation", text: "Promoting Cameroonian arts and culture across Africa and internationally." },
    ],
  },

  media: {
    metaTitle: "Media & Press",
    metaDescription: "Films from our outreaches, every documented moment of our journey, press coverage and the Foundation press kit.",
    eyebrow: "Media & press",
    title: "See the work. Share the story.",
    intro: "Our films, every documented moment of our journey, and what the press has written about us, plus everything journalists need in one place.",
    videoEyebrow: "Video",
    videoTitle: "Syndy Emade TV",
    videoIntro: "Field logs from humanitarian missions and behind-the-scenes from our productions.",
    subscribe: "Subscribe on YouTube",
    watchChannel: "Watch Syndy Emade TV on YouTube",
    galleryEyebrow: "Gallery",
    galleryTitle: "Moments from the field",
    libraryTitle: "Media library",
    filtersLabel: "Filter media",
    filters: { all: "All media", video: "Films", story: "Our journey", press: "Press coverage" },
    countOne: "{n} item",
    countMany: "{n} items",
    photoPending: "Photo coming soon",
    channelTitle: "Syndy Emade TV on YouTube",
    channelText: "More films from our outreaches on the Syndy Emade TV channel.",
    open: "Open",
    readArticle: "Read the article",
    close: "Close",
    share: "Share",
    copyLink: "Copy link",
    copied: "Link copied",
    relatedProgramme: "Related programme",
    location: "Location",
    pressFormTitle: "Press enquiry",
    pressFormText: "Interview requests, photography and fact checks. We reply within two working days.",
    pressName: "Your name",
    pressOutlet: "Publication / outlet",
    pressEmail: "Email",
    pressDeadline: "Deadline (optional)",
    pressMessage: "Your request",
    pressSubmit: "Send enquiry",
    pressThanks: "Thank you — our press team will be in touch shortly.",
    pressError: "Sorry, that didn’t go through. Please email us instead.",
    commons: "Open-licence images on Wikimedia Commons",
    pressEyebrow: "In the press",
    pressTitle: "Coverage & features",
    highlightsEyebrow: "In the press",
    highlightsTitle: "What the press says",
    highlightsAbout: "Recognition",
    highlightsAll: "All press coverage",
    archived: "Archived copy: the original page is no longer online.",
    photo: "Photo",
    inFrench: "In French",
    inEnglish: "In English",
    tags: {
      interview: "Interview",
      ranking: "Ranking",
      feature: "Feature",
      release: "Release",
      award: "Award",
      profile: "Profile",
      ambassador: "Ambassador",
      studio: "Studio",
      community: "Community",
      event: "Event",
      foundation: "Foundation",
    },
    kitTitle: "Press kit",
    kitText: "Fact sheet and the official logo (PNG). Approved photography available on request.",
    kitDownload: "Download press kit (ZIP)",
    kitFactSheet: "View fact sheet (PDF)",
    enquiries: "Media enquiries:",
  },

  donate: {
    metaTitle: "Donate & Get Involved",
    metaDescription:
      "Give by card, PayPal or MTN / Orange Mobile Money, or apply to volunteer and partner with the Syndy Emade Foundation.",
    eyebrow: "Donate & get involved",
    title: "Your generosity, their tomorrow",
    intro: "Choose an amount, choose a programme, choose how you pay. We’ll take care of the rest — transparently.",
    impactEyebrow: "What your gift does",
    impactTitle: "Real impact at every level",
    tiers: [
      "One school-supply package for a child in Buea",
      "A term of exercise books, pens and a school bag for a child",
      "A mobile crisis care package for youth outreach in Douala",
      "A woman’s equipment kit for the tailoring workshop",
    ],
    trust: [
      "PCI-compliant payments through Stripe, PayPal and Flutterwave.",
      "Restricted gifts go only to the programme you select.",
      "Every donor receives our annual impact report.",
    ],
    formTitle: "Make your gift",
    involveEyebrow: "Get involved",
    involveTitle: "Volunteer or partner with us",
    involveIntro:
      "Lend your skills on the ground, or bring your organisation alongside ours. Corporate, NGO and media partners welcome.",
    faqTitle: "Frequently asked",
    faqs: [
      {
        q: "How is my donation used?",
        a: "Funds go to the programme you choose, or where need is greatest if you leave it open. We publish programme spending in our annual impact report.",
      },
      {
        q: "Can I give with Mobile Money?",
        a: "Yes. Choose Mobile Money to pay with MTN MoMo or Orange Money in XAF through our secure Flutterwave checkout.",
      },
      { q: "Can I give monthly?", a: "Yes. Select “Monthly” in the donation form to set up a recurring card gift. You can cancel at any time." },
      {
        q: "Can my organisation partner with the Foundation?",
        a: "We welcome corporate, NGO and media partners. Use the partnership form below and our team will be in touch.",
      },
    ],
    deckTitle: "Partnership deck",
  },

  form: {
    modalEyebrow: "Give hope today",
    modalTitle: "Make a donation",
    close: "Close donation dialog",
    frequency: "Donation frequency",
    once: "One-time",
    monthly: "Monthly",
    currency: "Currency",
    chooseAmount: "Choose an amount",
    sliderLabel: "Gift amount",
    sliderHint: "Slide to choose a gift, or enter your own amount below.",
    customTier: "Custom",
    customImpact: "Every amount helps: your gift goes where it is needed most, or to the programme you choose.",
    otherAmount: "Other amount",
    customAmountLabel: "Custom amount",
    directTo: "Direct my gift to",
    greatestNeed: "Where it’s needed most",
    method: "Payment method",
    methods: {
      card: { label: "Card", hint: "Visa, Mastercard, Apple & Google Pay via Stripe" },
      momo: { label: "Mobile Money", hint: "MTN MoMo & Orange Money (XAF) via Flutterwave" },
      paypal: { label: "PayPal", hint: "Give with your PayPal balance or account" },
    },
    give: "Give {amount}",
    perMonth: " / month",
    giveNow: "Give now",
    secure: "Secure, encrypted checkout. We never store card details.",
    agreePre: "By giving you agree to our",
    agreeTerms: "donation terms",
    agreeAnd: "and",
    agreePrivacy: "privacy policy",
    errMin: "Minimum donation is {min}.",
    errMomo: "Mobile Money checkout is being set up. Please try card or PayPal for now.",
    errPaypal: "PayPal giving is being set up. Please try card for now.",
    errGeneric: "Something went wrong.",
    errCheckout: "Checkout is unavailable right now.",
  },

  involve: {
    type: "Application type",
    volunteer: "Volunteer",
    partner: "Partner",
    name: "Full name",
    email: "Email",
    phone: "Phone / WhatsApp",
    optional: "(optional)",
    location: "City / Country",
    organisation: "Organisation",
    interest: "Area of interest",
    partnershipType: "Partnership type",
    partnerOptions: ["Corporate sponsorship", "NGO / implementing partner", "School, hospital or community partnership", "Foundation or grant funding", "Event sponsorship", "Media partnership", "In-kind donation (food, school supplies, clothing)", "Logistics or transport support", "Other"],
    otherHint: "Please tell us below what you have in mind.",
    volunteerOptions: ["Youth mentorship", "Crisis relief missions", "Support for displaced families", "Food and essentials distribution", "Back-to-school drives", "Education & tutoring", "Christmas and holiday outreach", "Women’s training", "Health outreach", "Fundraising and events", "Photography and video", "Media & communications", "Logistics and transport", "Other"],
    message: "Tell us a little more",
    privacyPre: "We’ll only use these details to respond to your application. See our",
    privacyLink: "privacy policy",
    submit: "Submit application",
    error: "Sorry, that didn’t go through. Please try again or email us.",
    thanksTitle: "Thank you!",
    thanksText: "We’ve received your application and will be in touch within 5 working days.",
  },

  footer: {
    explore: "Explore",
    programmes: "Programmes",
    newsletterTitle: "Field notes, monthly",
    newsletterText: "Stories from our missions and how your support is used.",
    emailLabel: "Email address",
    join: "Join",
    joined: "Thank you — you’re on the list.",
    joinError: "Subscription failed, please retry.",
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Donation terms",
    registered: "Registered non-profit · Cameroon",
    youtube: "YouTube — Syndy Emade TV",
  },

  thankYou: {
    title: "Thank you for your gift",
    text: "A receipt is on its way to your inbox. Your generosity is already becoming meals, school places and safe nights for the people we serve.",
    see: "See the work you support",
    metaTitle: "Thank you",
  },

  notFound: {
    title: "This page has moved on",
    text: "But there’s still plenty of good to do.",
    home: "Return home",
  },

  legal: {
    eyebrow: "Legal",
    updatedLabel: "Last updated:",
    updated: "November 2026",
    privacy: {
      metaTitle: "Privacy Policy",
      metaDescription: "How the Syndy Emade Foundation collects, uses and protects your personal information.",
      title: "Privacy Policy",
      intro:
        "The Syndy Emade Foundation (“we”, “us”) respects your privacy. This policy explains what personal information we collect through this website, why we collect it, and the choices you have.",
      sections: [
        {
          h: "What we collect",
          items: [
            { b: "Donations:", t: "your name, email address, billing details and gift amount. Card, PayPal and Mobile Money payments are processed by Stripe, PayPal and Flutterwave; we never see or store your full card number or wallet PIN." },
            { b: "Volunteer and partnership applications:", t: "the details you enter in the form, such as name, email, phone, location or organisation, area of interest and message." },
            { b: "Newsletter:", t: "your email address." },
            { b: "Technical data:", t: "standard server logs (IP address, browser type, pages requested) kept by our hosting provider for security and troubleshooting." },
          ],
        },
        {
          h: "Cookies",
          p: ["This website does not use advertising or analytics cookies. Our payment providers may set strictly necessary cookies on their own checkout pages to process your payment securely."],
        },
        {
          h: "How we use your information",
          items: [
            { t: "To process donations, issue receipts and, where you choose, manage recurring gifts." },
            { t: "To respond to volunteer and partnership applications." },
            { t: "To send the newsletter you signed up for. Every email has an unsubscribe link." },
            { t: "To meet our legal, accounting and safeguarding obligations." },
          ],
          p: ["We do not sell, rent or trade your personal information."],
        },
        {
          h: "Who we share it with",
          p: ["Only with service providers who help us operate: payment processors (Stripe, PayPal, Flutterwave), our website host, and our email and form-handling tools. Each may use your data only to provide their service to us. We may also disclose information where the law requires it."],
        },
        {
          h: "How long we keep it",
          p: ["Donation records are kept for as long as accounting and tax law requires. Applications and newsletter subscriptions are kept until you ask us to delete them, or until they are no longer needed."],
        },
        {
          h: "Your rights",
          p: ["You can ask to see, correct or delete the personal information we hold about you, or to stop receiving emails, at any time. Write to {email} and we will respond within 30 days."],
        },
        {
          h: "Children",
          p: ["This website is not directed at children under 16, and we do not knowingly collect their personal information online. Information about the young people in our programmes is handled offline under our safeguarding policy."],
        },
        { h: "Changes", p: ["We may update this policy. The date at the top shows when it last changed."] },
        { h: "Contact", p: ["Questions about privacy: {email}."] },
      ] as LegalSection[],
    },
    donation: {
      metaTitle: "Donation Terms & Refund Policy",
      metaDescription: "How donations to the Syndy Emade Foundation are processed, used and refunded.",
      title: "Donation Terms & Refund Policy",
      intro: "Thank you for supporting the Syndy Emade Foundation. These terms apply to every gift made through this website.",
      sections: [
        {
          h: "How your gift is used",
          p: ["If you choose a programme, your gift is restricted to that programme. If you choose “Where it’s needed most”, we direct it to the programme with the greatest need at the time. If a restricted programme is fully funded or cannot go ahead, we will use the gift for the closest similar purpose."],
        },
        {
          h: "Payment processing",
          p: ["Card payments are processed by Stripe, PayPal payments by PayPal, and MTN MoMo and Orange Money payments by Flutterwave. Each provider may charge a small processing fee, which is deducted before the funds reach us."],
        },
        { h: "Receipts", p: ["An emailed receipt is sent for every successful donation. Keep it for your records."] },
        {
          h: "Monthly gifts",
          p: ["Monthly card gifts are charged on the same day each month until you cancel. To change or cancel a monthly gift, email {email} or use the link in your receipt. Cancellation takes effect before the next payment."],
        },
        {
          h: "Refunds",
          p: ["If you made a mistake, for example the wrong amount or a duplicate payment, contact us within 30 days at {email} with your receipt and we will refund it in full. After 30 days, or once funds have been committed to a programme, we may not be able to issue a refund."],
        },
        {
          h: "Tax",
          p: ["Whether your gift is tax-deductible depends on the laws of your country. Please check with a tax adviser. We will provide any documentation we can."],
        },
        {
          h: "Security and fraud",
          p: ["We do not store card details. We may decline or refund gifts that appear fraudulent, or that come from sources we cannot lawfully accept."],
        },
        { h: "Contact", p: ["Questions about a donation: {email}."] },
      ] as LegalSection[],
    },
  },

  og: {
    eyebrow: "Syndy Emade Foundation",
    footer: "Back to school · Displaced families · Christmas outreach · Douala, Cameroon",
  },
};

export type LegalSection = { h: string; p?: string[]; items?: { b?: string; t: string }[] };

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof en>;
export default en as Dictionary;
