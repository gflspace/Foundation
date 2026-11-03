/**
 * English copy. `fr.ts` must match this shape exactly (enforced by the `Dictionary` type).
 * Placeholders in curly braces — {email}, {amount}, {min} — are filled in at render time.
 */
const en = {
  locale: "en",
  meta: {
    siteName: "Syndy Emade Foundation",
    tagline: "A Beacon of Hope. An Icon of Action.",
    description:
      "The Syndy Emade Foundation protects vulnerable youth, delivers mobile crisis relief, funds scholarships and empowers communities across Cameroon, Africa and the diaspora.",
    keywords: ["Syndy Emade", "Syndy Emade Foundation", "Cameroon charity", "youth welfare Cameroon", "crisis relief Cameroon", "scholarships Cameroon", "Blue Rain Entertainment"],
    location: "Buea & Douala, Cameroon", // TODO(verify)
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
    eyebrow: "Cameroon · Africa · The Diaspora",
    line1: "A Beacon of Hope.",
    line2: "An Icon of Action.",
    cta: "Sponsor a child",
    secondary: "Watch field logs",
    promiseLabel: "Our promise",
    promise: "Turning visibility into practical help — for every child, family and community we reach.",
    watch: "Watch field missions on Syndy Emade TV",
    stats: ["Youth impacted", "Major initiatives", "Field projects"],
    statsLabel: "Impact at a glance",
    videoTitle: "Field logs — Syndy Emade TV",
    videoEmpty: "Mission films are published on the Syndy Emade TV YouTube channel.",
    videoOpenChannel: "Open the channel on YouTube",
    close: "Close",
  },

  matrix: {
    eyebrow: "Two stages, one purpose",
    title: "The humanitarian and the film icon",
    intro: "Syndy Emade’s work on screen and in the field feed each other: cinema brings the visibility, the Foundation turns it into help.",
    tabsLabel: "Choose a side of her story",
    tabs: { humanitarian: "The Humanitarian & Philanthropist", icon: "The Film Icon & Producer" },
    humanitarianText:
      "Through the Foundation she leads youth protection, mobile crisis relief, scholarships and women’s tailoring and farming workshops across Cameroon.",
    iconText:
      "As an actress and CEO of Blue Rain Entertainment she has carried Cameroonian stories across borders — from her 2010 debut to co-productions with Nollywood stars.",
    programmesHeading: "Foundation initiatives",
    filmsHeading: "Selected films",
    awardsHeading: "Recognition",
    crossBorder: "Cross-border cinema: Cameroonian productions with Nigerian (Nollywood) talent, including Alexx Ekubo in A Man for the Weekend.",
    seeProgrammes: "All programmes",
    seeFilms: "Full filmography",
  },

  map: {
    eyebrow: "Where we work",
    title: "Our regional centres",
    intro: "Select a city to see the programmes and field stories connected to it.",
    mapLabel: "Map of south-western Cameroon showing the Foundation’s four regional centres",
    programmesLabel: "Programmes",
    storiesLabel: "Field stories",
    noStories: "Field stories from this centre are coming soon.",
    centres: {
      buea: { name: "Buea", region: "Southwest Region", headline: "Back-to-school supply drives & youth mentorship" },
      douala: { name: "Douala", region: "Littoral Region", headline: "Mobile crisis units & women’s tailoring workshops" },
      kumba: { name: "Kumba", region: "Southwest Region · the founder’s hometown", headline: "Scholarships for orphans and under-served children" },
      yaounde: { name: "Yaoundé", region: "Centre Region · capital", headline: "National partnerships and women’s empowerment" },
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
    labels: ["Youth reached", "Crisis relief missions", "Scholarships awarded", "Women supported"],
    placeholderNote: "Illustrative figures — audited impact data coming soon.",
  },

  pillars: {
    philanthropist: {
      kicker: "Pillar I",
      title: "The Philanthropist",
      summary: "Youth welfare, protection and access to education.",
      points: ["Youth protection & care", "Educational grants", "Vocational training"],
    },
    humanitarian: {
      kicker: "Pillar II",
      title: "The Humanitarian",
      summary: "Rapid, mobile relief for families affected by crisis.",
      points: ["Mobile crisis response", "Emergency relief missions", "Healthcare outreach"],
    },
    icon: {
      kicker: "Pillar III",
      title: "The Cultural Icon",
      summary: "Cinema and creativity as engines for social good.",
      points: ["Cultural ambassadorship", "Youth & arts mentorship", "Creative economy"],
    },
  },

  projects: {
    "youth-welfare": {
      title: "Youth Protection & Care",
      short: "Shelter, nutrition, medical check-ups and moral support for vulnerable young people.",
      intro:
        "Our youth intervention programme meets young people where they are — providing safe shelter, regular meals, health check-ups and trusted mentors, alongside rehabilitation programmes, clothing donations and community events that restore dignity.",
      activities: [
        "Emergency shelter placement and safe-house partnerships",
        "Nutrition support and regular health screenings",
        "Mentorship, counselling and moral support",
        "Rehabilitation programmes and clothing drives",
      ],
      regions: "Southwest & Littoral Regions",
      funding: ["Shelter & nutrition", "Health & counselling", "Mentorship & events"],
    },
    "mobile-crisis": {
      title: "Mobile Crisis Response",
      short: "“Chantiers Mobiles Crise” — mobile units delivering food, water, health kits and shelter.",
      intro:
        "Our mobile crisis units — Chantiers Mobiles Crise — travel to conflict-affected and displaced families with food supplies, clean water, healthcare kits and shelter assistance, coordinating with local leaders to reach people quickly and safely.",
      activities: [
        "Food and clean-water distribution",
        "Healthcare kits and emergency medical support",
        "Shelter materials for displaced families",
        "Community health screenings",
      ],
      regions: "Conflict-affected areas of Cameroon",
      funding: ["Food & water", "Health kits & care", "Shelter & logistics"],
    },
    education: {
      title: "Educational Grants",
      short: "School supplies and secondary / university scholarships for orphans and under-served children.",
      intro:
        "Education is the most durable gift we can give. We run school-supply drives each term and award secondary and university scholarships to orphans and under-served children so that talent, not circumstance, decides how far they go.",
      activities: [
        "Back-to-school supply drives",
        "Secondary school fee scholarships",
        "University scholarships and bursaries",
        "Vocational and digital-skills training",
      ],
      regions: "Southwest & Littoral Regions",
      funding: ["Tuition & fees", "Supplies & uniforms", "Training programmes"],
    },
    women: {
      title: "Women Empowerment",
      short: "Micro-grants and vocational training in tailoring and agriculture for widows and displaced women.",
      intro:
        "Women hold communities together, especially in crisis. Our micro-grant programme helps widows and displaced women start or rebuild small businesses, backed by vocational training in tailoring and agriculture.",
      activities: [
        "Small-business micro-grants",
        "Tailoring and sewing training",
        "Agricultural training and inputs",
        "Peer savings groups and mentoring",
      ],
      regions: "Nationwide, prioritising displaced communities",
      funding: ["Micro-grants", "Vocational training", "Mentoring & follow-up"],
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
      "Netflix Producer", // TODO(verify)
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
    pillarsEyebrow: "Three pillars",
    pillarsTitle: "One woman’s platform, three ways to change lives",
    pillarsIntro:
      "From long-term youth welfare to rapid crisis response and creative mentorship, our work is built around the strengths our founder brings to every community.",
    programmesEyebrow: "Programmes",
    programmesTitle: "Where your support goes",
    founderEyebrow: "Meet the founder",
    readStory: "Read her story",
    legacyEyebrow: "Creative legacy",
    legacyTitle: "Cinema for social good",
    legacyIntro:
      "Over 15 years on screen and behind the camera with Blue Rain Entertainment — stories that carry Cameroonian voices across Africa and the world.",
    fullFilmography: "Full filmography",
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
    metaTitle: "Projects & Impact",
    metaDescription: "Youth protection, mobile crisis response, educational grants and women’s empowerment programmes across Cameroon.",
    eyebrow: "Projects & impact",
    title: "Practical help, delivered where it’s needed",
    intro: "Four programmes, three pillars, one commitment: measurable change for the people we serve.",
    listHeading: "Our programmes",
    frameworkEyebrow: "Our framework",
    frameworkTitle: "The three pillars",
  },

  project: {
    eyebrow: "Programme",
    photoLabel: "{title} in the field",
    whatWeDo: "What we do",
    allocation: "How funds are allocated",
    allocationNote: "Target allocation; actuals are published in our annual report.",
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
    metaDescription: "Videos from Syndy Emade TV, photo galleries, press coverage and the Foundation press kit.",
    eyebrow: "Media & press",
    title: "See the work. Share the story.",
    intro: "Field videos, photo galleries and press coverage — plus everything journalists need in one place.",
    videoEyebrow: "Video",
    videoTitle: "Syndy Emade TV",
    videoIntro: "Field logs from humanitarian missions and behind-the-scenes from our productions.",
    subscribe: "Subscribe on YouTube",
    watchChannel: "Watch Syndy Emade TV on YouTube",
    galleryEyebrow: "Gallery",
    galleryTitle: "Moments from the field",
    libraryTitle: "Media library",
    filtersLabel: "Filter media",
    filters: { all: "All media", video: "Field videos", photo: "Photo stories", press: "Press coverage", bts: "Behind the scenes" },
    countOne: "{n} item",
    countMany: "{n} items",
    stories: {
      "school-supplies": { title: "Back-to-school supply drive", text: "Volunteers pack and hand out exercise books, pens and school bags so that children start the school year ready to learn." },
      "crisis-unit": { title: "Mobile crisis unit distribution", text: "A Chantiers Mobiles Crise team brings food, clean water and health kits to displaced families, working with local leaders." },
      tailoring: { title: "Women’s tailoring workshop", text: "Widows and displaced women learn cutting and sewing skills, then receive equipment and a micro-grant to start trading." },
      scholarships: { title: "Scholarship award day", text: "Orphans and under-served students receive secondary and university scholarships, so that talent, not circumstance, decides how far they go." },
      mentorship: { title: "Youth mentorship session", text: "Young people meet trusted mentors for guidance, counselling and moral support, alongside health check-ups." },
      "on-set": { title: "On set with Blue Rain Entertainment", text: "Behind the camera on a Blue Rain Entertainment production: the studio that carries Cameroonian stories to audiences across Africa." },
    },
    photoPending: "Photo coming soon",
    channelTitle: "Syndy Emade TV on YouTube",
    channelText: "Mission field logs and behind-the-scenes films. Featured videos will appear here as they are published.",
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
    },
    kitTitle: "Press kit",
    kitText: "Fact sheet and logo files (SVG and PNG). Approved photography available on request.",
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
    partnerOptions: ["Corporate sponsorship", "NGO / implementing partner", "Media partnership", "In-kind donation"],
    volunteerOptions: ["Youth mentorship", "Crisis relief missions", "Education & tutoring", "Women’s training", "Media & communications"],
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
    footer: "Youth welfare · Crisis relief · Scholarships · Women’s empowerment",
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
