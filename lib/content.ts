/**
 * Single source of truth for site content.
 *
 * Everything here is plain typed data so it can later be swapped for a
 * Sanity / Strapi fetch without touching the components: keep the same shapes
 * and replace the exports with async loaders.
 *
 * ⚠️  Items marked `TODO(verify)` were supplied in the brief but should be
 *     confirmed by the foundation before launch.
 */

export const site = {
  name: "Syndy Emade Foundation",
  shortName: "SEF",
  tagline: "A Beacon of Hope. An Icon of Action.",
  description:
    "The Syndy Emade Foundation protects vulnerable youth, delivers mobile crisis relief, funds scholarships and empowers communities across Cameroon, Africa and the diaspora.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.syndyemadefoundation.org",
  email: "hello@syndyemadefoundation.org", // TODO(verify): official inbox
  location: "Buea & Douala, Cameroon", // TODO(verify)
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/creative-legacy", label: "Creative Legacy" },
  { href: "/media", label: "Media" },
];

/** Official profiles — also emitted as schema.org `sameAs` for the knowledge graph. */
export const profiles = {
  facebook: "https://www.facebook.com/SyndyEmadeofficial",
  youtube: "https://www.youtube.com/channel/UCDbpFFyAeVdE5t8KR6OIQ6g",
  imdb: "https://www.imdb.com/name/nm9931175/",
  wikipedia: "https://en.wikipedia.org/wiki/Syndy_Emade",
  wikidata: "https://www.wikidata.org/wiki/Q36409953",
  commons: "https://commons.wikimedia.org/wiki/Category:Syndy_Emade",
  wikiquote: "https://en.wikiquote.org/wiki/Syndy_Emade",
};

export const founder = {
  name: "Syndy Emade",
  legalName: "Elone Synthia Emade",
  born: "21 November 1993",
  birthplace: "Kumba, Southwest Region, Cameroon",
  education: "B.Sc. Banking and Finance, University of Buea",
  roles: [
    "Award-winning actress",
    "Film & TV producer",
    "CEO, Blue Rain Entertainment",
    "Model",
    "Philanthropist",
  ],
  ambassadorships: [
    "Brand Ambassador, Orange InstaVoice Celeb",
    "Netflix Producer", // TODO(verify)
    "CFI Partner", // TODO(verify)
  ],
  summary:
    "Born in Kumba and trained in banking and finance at the University of Buea, Syndy Emade rose from her 2010 screen debut to become one of Cameroon’s most recognised actresses and producers. Through Blue Rain Entertainment she has championed stories made in Cameroon for audiences across Africa and beyond — and through the Foundation she turns that visibility into direct, practical help for the communities that raised her.",
};

/**
 * Founder portrait — Wikimedia Commons, CC BY-SA 4.0 (attribution required).
 * Swap for an official Foundation photo when available (put it in /public/images and
 * update `src`, `credit`, `license`).
 */
export const founderPhoto = {
  src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Emade.jpg",
  width: 720,
  height: 1080,
  alt: "Syndy Emade in a red gown at the Glitz Style Awards, Ghana, 2017",
  credit: "Abanda bride",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Emade.jpg",
};

export const awards = [
  { year: "2014", title: "Miss Heritage Cameroon" },
  { year: "2014", title: "Miss Heritage Africa" },
  { year: "2017", title: "Scoos Academy Award — Best Cameroonian Actress" },
  { year: "2017", title: "Ranked #2 Most Active Cameroonian Actress", note: "Njoka TV" },
  { year: "Career", title: "8 national & international Best Actress awards" },
];

/**
 * Impact counters.
 * ⚠️  PLACEHOLDER values — replace with audited figures and set
 *     `isPlaceholder: false`. While true, the UI labels them as illustrative.
 */
export const impact = {
  isPlaceholder: true,
  stats: [
    { label: "Youth reached", value: 5000, suffix: "+" },
    { label: "Crisis relief missions", value: 40, suffix: "+" },
    { label: "Scholarships awarded", value: 250, suffix: "+" },
    { label: "Women supported", value: 600, suffix: "+" },
  ],
};

export type Pillar = {
  key: "philanthropist" | "humanitarian" | "icon";
  title: string;
  kicker: string;
  summary: string;
  points: string[];
  accent: "emerald" | "gold" | "navy";
};

export const pillars: Pillar[] = [
  {
    key: "philanthropist",
    kicker: "Pillar I",
    title: "The Philanthropist",
    summary: "Youth welfare, protection and access to education.",
    points: ["Youth protection & care", "Educational grants", "Vocational training"],
    accent: "emerald",
  },
  {
    key: "humanitarian",
    kicker: "Pillar II",
    title: "The Humanitarian",
    summary: "Rapid, mobile relief for families affected by crisis.",
    points: ["Mobile crisis response", "Emergency relief missions", "Healthcare outreach"],
    accent: "gold",
  },
  {
    key: "icon",
    kicker: "Pillar III",
    title: "The Cultural Icon",
    summary: "Cinema and creativity as engines for social good.",
    points: ["Cultural ambassadorship", "Youth & arts mentorship", "Creative economy"],
    accent: "navy",
  },
];

export type Project = {
  slug: string;
  title: string;
  pillar: Pillar["key"];
  short: string;
  intro: string;
  activities: string[];
  regions: string;
  fundingUse: { label: string; share: number }[];
};

export const projects: Project[] = [
  {
    slug: "youth-welfare",
    title: "Youth Protection & Care",
    pillar: "philanthropist",
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
    fundingUse: [
      { label: "Shelter & nutrition", share: 45 },
      { label: "Health & counselling", share: 30 },
      { label: "Mentorship & events", share: 25 },
    ],
  },
  {
    slug: "mobile-crisis",
    title: "Mobile Crisis Response",
    pillar: "humanitarian",
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
    fundingUse: [
      { label: "Food & water", share: 40 },
      { label: "Health kits & care", share: 35 },
      { label: "Shelter & logistics", share: 25 },
    ],
  },
  {
    slug: "education",
    title: "Educational Grants",
    pillar: "philanthropist",
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
    fundingUse: [
      { label: "Tuition & fees", share: 60 },
      { label: "Supplies & uniforms", share: 25 },
      { label: "Training programmes", share: 15 },
    ],
  },
  {
    slug: "women",
    title: "Women Empowerment",
    pillar: "humanitarian",
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
    fundingUse: [
      { label: "Micro-grants", share: 55 },
      { label: "Vocational training", share: 30 },
      { label: "Mentoring & follow-up", share: 15 },
    ],
  },
];

export type Film = {
  year: number;
  title: string;
  role?: string;
  credit?: "Actress" | "Producer & Actress" | "Lead";
  note?: string;
  imdb?: string;
  highlight?: boolean;
};

export const films: Film[] = [
  { year: 2010, title: "Obsession", note: "Feature debut" },
  { year: 2012, title: "Pink Poison" },
  { year: 2013, title: "Different Kind of Men" },
  { year: 2015, title: "Rose on the Grave", credit: "Producer & Actress", highlight: true },
  { year: 2015, title: "Bad Angel", role: "Verostina", note: "TV series" },
  { year: 2016, title: "Why I Hate Sunshine", note: "Nollywood debut" },
  { year: 2016, title: "Smokescreen" },
  { year: 2016, title: "Chasing Tails" },
  {
    year: 2017,
    title: "A Man for the Weekend",
    role: "Candy",
    credit: "Producer & Actress",
    note: "Featuring Alexx Ekubo",
    highlight: true,
  },
  { year: 2017, title: "The Soldier's Wife" },
  { year: 2017, title: "Before You Say Yes I Do" },
  { year: 2018, title: "Little Cindy" },
  {
    year: 2019,
    title: "Broken",
    role: "Sandrine Mbassy",
    credit: "Producer & Actress",
    note: "Blue Rain Entertainment",
    imdb: "https://www.imdb.com/title/tt15058860/",
    highlight: true,
  },
  { year: 2021, title: "4th Generation", role: "Princess Dibotti" },
  { year: 2022, title: "Half Heaven" },
  { year: 2022, title: "Kuvah" },
  {
    year: 2023,
    title: "Silent Storm",
    credit: "Lead",
    note: "Hero Entertainment",
    imdb: "https://www.imdb.com/title/tt29437850/",
  },
  {
    year: 2024,
    title: "A Kiss That Kills",
    role: "Rita",
    note: "Bakia T. Thomas TV",
    imdb: "https://www.imdb.com/title/tt32395186/",
  },
];

export const press = [
  {
    title: "On the film industry in Cameroon & challenges as a female filmmaker",
    source: "Pulse Nigeria",
    url: "http://www.pulse.ng/movies/syndy-emade-actress-talks-film-industry-in-cameroon-challenges-as-a-female-filmmaker-getting-into-character-id4908980.html",
    tag: "Interview",
  },
  {
    title: "Top five active Cameroonian actresses",
    source: "Njoka TV",
    url: "https://blog.njokatv.com/2017/04/18/top-five-active-cameroonian-actresses/",
    tag: "Ranking",
  },
  {
    title: "Syndy Emade — Cameroon’s best actress",
    source: "Dcoded TV",
    url: "http://dcodedtv.com/syndy-emade-cameroon-s-best-actress/",
    tag: "Feature",
  },
  {
    title: "Syndy Emade borrows Alexx Ekubo for “A Man for the Weekend”",
    source: "Dcoded TV",
    url: "http://dcodedtv.com/syndy-emade-borrows-alexx-ekubo-for-new-movie-a-man-for-the-weekend/",
    tag: "Release",
  },
  {
    title: "Miss Heritage Cameroon is Syndy Emade",
    source: "Kamer360",
    url: "https://kamer360.com/2014/09/11/miss-heritage-cameroon-is-syndy-emade/",
    tag: "Award",
  },
  {
    title: "Syndy Emade, la belle aux trois casquettes",
    source: "Culturebene",
    url: "http://www.culturebene.com/24576-syndy-emade-la-belle-aux-trois-casquettes.html",
    tag: "Profile",
  },
  {
    title: "Cameroon’s Syndy Emade becomes new face of Orange InstaVoice Celeb",
    source: "Henriette’s Lounge",
    url: "http://www.henrietteslounge.com/2017/04/cameroons-syndy-emade-becomes-new-face.html",
    tag: "Ambassador",
  },
  {
    title: "Alexx Ekubo & Syndy Emade — Orange InstaVoice",
    source: "Cameroonian Beauties",
    url: "http://www.cameroonianbeauties.com/alex-ekubo-syndy-emade/",
    tag: "Feature",
  },
  {
    title: "Blue Rain Entertainment coverage",
    source: "Nexdim Empire",
    url: "http://nexdimempire.com/tag/blue-rain-entertainment/",
    tag: "Studio",
  },
];

/**
 * YouTube video IDs to feature on /media. Add IDs from the SYNDY EMADE TV
 * channel (the part after `watch?v=`). Leave empty to show the channel CTA only.
 */
export const featuredVideos: { id: string; title: string }[] = [];

/** Donation tiers in XAF and USD. */
export const donationTiers = [
  { usd: 25, xaf: 15000, impact: "School supplies for one child for a full term" },
  { usd: 50, xaf: 30000, impact: "A family crisis kit: food, water purification & hygiene" },
  { usd: 100, xaf: 60000, impact: "A month of shelter & meals for a young person" },
  { usd: 250, xaf: 150000, impact: "A micro-grant to start a woman-led small business" },
];

export const faqs = [
  {
    q: "How is my donation used?",
    a: "Funds go to the programme you choose, or where need is greatest if you leave it open. We publish programme spending in our annual impact report.",
  },
  {
    q: "Can I give with Mobile Money?",
    a: "Yes. Choose Mobile Money to pay with MTN MoMo or Orange Money in XAF through our secure Flutterwave checkout.",
  },
  {
    q: "Can I give monthly?",
    a: "Yes. Select “Monthly” in the donation form to set up a recurring card gift. You can cancel at any time.",
  },
  {
    q: "Can my organisation partner with the Foundation?",
    a: "We welcome corporate, NGO and media partners. Use the partnership form below and our team will be in touch.",
  },
];
