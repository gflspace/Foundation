/**
 * Language-neutral data (URLs, numbers, film titles, press links).
 * All translatable copy lives in lib/i18n/dictionaries/{en,fr}.ts.
 *
 * ⚠️  Items marked `TODO(verify)` were supplied in the brief but should be
 *     confirmed by the foundation before launch.
 */

export const site = {
  name: "Syndy Emade Foundation",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.syndyemadefoundation.org",
  email: "hello@syndyemadefoundation.org", // TODO(verify): official inbox
};

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

/**
 * Founder portrait — Wikimedia Commons, CC BY-SA 4.0 (attribution required).
 * Swap for an official Foundation photo when available. Alt text is in the dictionaries.
 */
export const founderPhoto = {
  src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Emade.jpg",
  width: 720,
  height: 1080,
  credit: "Abanda bride",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Emade.jpg",
};

/**
 * Impact counters, in the same order as `impact.labels` in the dictionaries.
 * ⚠️  PLACEHOLDER values — replace with audited figures and set `isPlaceholder: false`.
 */
export const impact = {
  isPlaceholder: true,
  values: [
    { value: 5000, suffix: "+" },
    { value: 40, suffix: "+" },
    { value: 250, suffix: "+" },
    { value: 600, suffix: "+" },
  ],
};

/**
 * Hero "live" counters (enhancement spec §6.1), in the same order as `hero.stats` in the dictionaries.
 * ⚠️  PLACEHOLDER values — confirm with the Foundation; shown with an "illustrative" note while
 *     `impact.isPlaceholder` is true.
 */
export const heroStats = [
  { value: 5000, suffix: "+" },
  { value: 12, suffix: "+" },
  { value: 6, suffix: "" },
];

/**
 * Regional centres for the impact map (spec §6.4). Copy for each is in the dictionaries
 * under `map.centres[id]`. TODO(verify): confirm which activities run in each city.
 */
export type CentreId = "buea" | "douala" | "kumba" | "yaounde";
export const impactCentres: { id: CentreId; programmes: ProjectSlug[]; stories: string[] }[] = [
  { id: "buea", programmes: ["education", "youth-welfare"], stories: ["school-supplies", "mentorship"] },
  { id: "douala", programmes: ["mobile-crisis", "women"], stories: ["crisis-unit", "tailoring"] },
  { id: "kumba", programmes: ["education"], stories: ["scholarships"] },
  { id: "yaounde", programmes: ["women", "mobile-crisis"], stories: [] },
];

/**
 * Media library (spec §6.3). Photo stories have no photography yet: each renders a branded
 * placeholder until `image` is set to a real, licensed photo (e.g. "/images/field/school-supplies.webp").
 */
export type MediaKind = "video" | "photo" | "press" | "bts";
export type PhotoStory = { id: string; kind: "photo" | "bts"; tone: "violet" | "gold" | "navy"; programme?: ProjectSlug; centre?: CentreId; image?: string };
export const photoStories: PhotoStory[] = [
  { id: "school-supplies", kind: "photo", tone: "violet", programme: "education", centre: "buea" },
  { id: "crisis-unit", kind: "photo", tone: "gold", programme: "mobile-crisis", centre: "douala" },
  { id: "tailoring", kind: "photo", tone: "navy", programme: "women", centre: "douala" },
  { id: "scholarships", kind: "photo", tone: "gold", programme: "education", centre: "kumba" },
  { id: "mentorship", kind: "photo", tone: "violet", programme: "youth-welfare", centre: "buea" },
  { id: "on-set", kind: "bts", tone: "navy" },
];

export type PillarKey = "philanthropist" | "humanitarian" | "icon";
export const pillarKeys: { key: PillarKey; accent: "violet" | "gold" | "navy" }[] = [
  { key: "philanthropist", accent: "violet" },
  { key: "humanitarian", accent: "gold" },
  { key: "icon", accent: "navy" },
];

export type ProjectSlug = "youth-welfare" | "mobile-crisis" | "education" | "women";
/** Programme structure; titles and copy are in the dictionaries under `projects[slug]`. */
export const projectMeta: { slug: ProjectSlug; pillar: PillarKey; shares: number[] }[] = [
  { slug: "youth-welfare", pillar: "philanthropist", shares: [45, 30, 25] },
  { slug: "mobile-crisis", pillar: "humanitarian", shares: [40, 35, 25] },
  { slug: "education", pillar: "philanthropist", shares: [60, 25, 15] },
  { slug: "women", pillar: "humanitarian", shares: [55, 30, 15] },
];
export const projectSlugs = projectMeta.map((p) => p.slug);

export type FilmCredit = "producer" | "lead";
export type FilmNote = "debut" | "tv" | "nollywood" | "ekubo";
export type Film = {
  year: number;
  title: string;
  role?: string;
  credit?: FilmCredit;
  /** translatable note key */
  note?: FilmNote;
  /** studio / channel (not translated) */
  studio?: string;
  imdb?: string;
  highlight?: boolean;
};

export const films: Film[] = [
  { year: 2010, title: "Obsession", note: "debut" },
  { year: 2012, title: "Pink Poison" },
  { year: 2013, title: "Different Kind of Men" },
  { year: 2015, title: "Rose on the Grave", credit: "producer", highlight: true },
  { year: 2015, title: "Bad Angel", role: "Verostina", note: "tv" },
  { year: 2016, title: "Why I Hate Sunshine", note: "nollywood" },
  { year: 2016, title: "Smokescreen" },
  { year: 2016, title: "Chasing Tails" },
  { year: 2017, title: "A Man for the Weekend", role: "Candy", credit: "producer", note: "ekubo", highlight: true },
  { year: 2017, title: "The Soldier's Wife" },
  { year: 2017, title: "Before You Say Yes I Do" },
  { year: 2018, title: "Little Cindy" },
  { year: 2019, title: "Broken", role: "Sandrine Mbassy", credit: "producer", studio: "Blue Rain Entertainment", imdb: "https://www.imdb.com/title/tt15058860/", highlight: true },
  { year: 2021, title: "4th Generation", role: "Princess Dibotti" },
  { year: 2022, title: "Half Heaven" },
  { year: 2022, title: "Kuvah" },
  { year: 2023, title: "Silent Storm", credit: "lead", studio: "Hero Entertainment", imdb: "https://www.imdb.com/title/tt29437850/" },
  { year: 2024, title: "A Kiss That Kills", role: "Rita", studio: "Bakia T. Thomas TV", imdb: "https://www.imdb.com/title/tt32395186/" },
];

export type PressTag = "interview" | "ranking" | "feature" | "release" | "award" | "profile" | "ambassador" | "studio";
/** Press coverage — titles are kept in the publication's original language. */
export const press: { title: string; source: string; url: string; tag: PressTag; lang: "en" | "fr" }[] = [
  { title: "On the film industry in Cameroon & challenges as a female filmmaker", source: "Pulse Nigeria", url: "http://www.pulse.ng/movies/syndy-emade-actress-talks-film-industry-in-cameroon-challenges-as-a-female-filmmaker-getting-into-character-id4908980.html", tag: "interview", lang: "en" },
  { title: "Top five active Cameroonian actresses", source: "Njoka TV", url: "https://blog.njokatv.com/2017/04/18/top-five-active-cameroonian-actresses/", tag: "ranking", lang: "en" },
  { title: "Syndy Emade — Cameroon’s best actress", source: "Dcoded TV", url: "http://dcodedtv.com/syndy-emade-cameroon-s-best-actress/", tag: "feature", lang: "en" },
  { title: "Syndy Emade borrows Alexx Ekubo for “A Man for the Weekend”", source: "Dcoded TV", url: "http://dcodedtv.com/syndy-emade-borrows-alexx-ekubo-for-new-movie-a-man-for-the-weekend/", tag: "release", lang: "en" },
  { title: "Miss Heritage Cameroon is Syndy Emade", source: "Kamer360", url: "https://kamer360.com/2014/09/11/miss-heritage-cameroon-is-syndy-emade/", tag: "award", lang: "en" },
  { title: "Syndy Emade, la belle aux trois casquettes", source: "Culturebene", url: "http://www.culturebene.com/24576-syndy-emade-la-belle-aux-trois-casquettes.html", tag: "profile", lang: "fr" },
  { title: "Cameroon’s Syndy Emade becomes new face of Orange InstaVoice Celeb", source: "Henriette’s Lounge", url: "http://www.henrietteslounge.com/2017/04/cameroons-syndy-emade-becomes-new-face.html", tag: "ambassador", lang: "en" },
  { title: "Alexx Ekubo & Syndy Emade — Orange InstaVoice", source: "Cameroonian Beauties", url: "http://www.cameroonianbeauties.com/alex-ekubo-syndy-emade/", tag: "feature", lang: "en" },
  { title: "Blue Rain Entertainment coverage", source: "Nexdim Empire", url: "http://nexdimempire.com/tag/blue-rain-entertainment/", tag: "studio", lang: "en" },
];

/**
 * YouTube video IDs to feature on /media (the part after `watch?v=`).
 * Leave empty to show the channel call-to-action only. Titles per locale.
 */
export const featuredVideos: { id: string; title: { en: string; fr: string } }[] = [];

/** Donation tiers; the impact sentence for each is in the dictionaries (`donate.tiers`). */
/**
 * Micro-donation tiers (spec §6.5); impact sentences are in the dictionaries (`donate.tiers`).
 * XAF amounts are rounded equivalents. TODO(verify): confirm what each amount funds.
 */
export const donationTiers = [
  { usd: 10, xaf: 6000 },
  { usd: 25, xaf: 15000 },
  { usd: 50, xaf: 30000 },
  { usd: 100, xaf: 60000 },
];

/** Gamma decks — paste embed URLs (Share › Embed) to show them on /about and /donate. */
export const gamma = { aboutDeck: "", partnerDeck: "" };
