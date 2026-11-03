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
  facebook: "https://www.facebook.com/SyndyEmadeFoundation/",
  instagram: "https://www.instagram.com/syndyemadefoundationcmr/",
  founderFacebook: "https://www.facebook.com/SyndyEmadeofficial",
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
 * Headline figures. Sourced from public coverage of the Foundation's outreaches
 * (see docs/content-brief.md). Update here when the Foundation publishes audited totals.
 */
export const impact = {
  isPlaceholder: false,
};

/** Hero counters, in the same order as `hero.stats` in the dictionaries. `plain` = no thousands separator. */
export const heroStats: { value: number; suffix: string; plain?: boolean }[] = [
  { value: 600, suffix: "+" },
  { value: 300, suffix: "" },
  { value: 2019, suffix: "", plain: true },
];

export type PillarKey = "philanthropist" | "humanitarian" | "icon";
export const pillarKeys: { key: PillarKey; accent: "purple" | "teal" | "plum" }[] = [
  { key: "philanthropist", accent: "teal" },
  { key: "humanitarian", accent: "purple" },
  { key: "icon", accent: "plum" },
];

/**
 * Programmes, built from the Foundation's documented work (docs/content-brief.md).
 * Copy lives in the dictionaries under `projects[slug]` (delivered = documented, planned = from the brief).
 */
export type ProjectSlug = "back-to-school" | "displaced-families" | "christmas-outreach" | "child-protection" | "women";
export const projectMeta: { slug: ProjectSlug; pillar: PillarKey; tone: "teal" | "purple" | "plum"; video?: string }[] = [
  { slug: "back-to-school", pillar: "philanthropist", tone: "teal", video: "-wQM_qRACTA" },
  { slug: "displaced-families", pillar: "humanitarian", tone: "purple", video: "IRtdVqIK9Nc" },
  { slug: "christmas-outreach", pillar: "humanitarian", tone: "teal", video: "8_OXBvKZBKY" },
  { slug: "child-protection", pillar: "philanthropist", tone: "plum", video: "1_51miPEC0I" },
  { slug: "women", pillar: "icon", tone: "purple" },
];
export const projectSlugs = projectMeta.map((p) => p.slug);

/**
 * "Our journey": documented activities, newest first in the UI. Copy in `journey.entries[id]`.
 * `dateConfirmed: false` shows a "date to confirm" note. Every entry cites at least one public source.
 */
export type Source = { label: string; url: string };
export type JourneyEntry = { id: string; date: string; dateConfirmed: boolean; programme?: ProjectSlug; video?: string; sources: Source[] };
export const journey: JourneyEntry[] = [
  { id: "launch", date: "2019-08", dateConfirmed: true, programme: "child-protection", video: "G9f7qKhNiwU", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=G9f7qKhNiwU" }] },
  { id: "school-materials", date: "2019-08", dateConfirmed: true, programme: "back-to-school", video: "-wQM_qRACTA", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=-wQM_qRACTA" }, { label: "Positive Vibes CMR (Facebook)", url: "https://www.facebook.com/positivevibescmr/posts/502011753942883/" }, { label: "Ekwat TV (Facebook)", url: "https://www.facebook.com/EkwatTV/posts/3629789580390638/" }] },
  { id: "school-fees", date: "2019-08", dateConfirmed: true, programme: "back-to-school", video: "3Wx_TaG5sFc", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=3Wx_TaG5sFc" }, { label: "Kesa Magazine (Facebook)", url: "https://www.facebook.com/kesamagazine/posts/3856021907788721/" }] },
  { id: "covid-schools-2020", date: "2020-08", dateConfirmed: true, programme: "back-to-school", video: "vqR0Lb9Wguo", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=vqR0Lb9Wguo" }] },
  { id: "idps-2020", date: "2020-09", dateConfirmed: true, programme: "displaced-families", video: "w4Xt6EOS1lU", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=w4Xt6EOS1lU" }] },
  { id: "christmas-2020", date: "2020-12", dateConfirmed: true, programme: "christmas-outreach", video: "8_OXBvKZBKY", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=8_OXBvKZBKY" }] },
  { id: "idps-2021", date: "2021-02", dateConfirmed: true, programme: "displaced-families", video: "IRtdVqIK9Nc", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=IRtdVqIK9Nc" }, { label: "Newsday Cameroon", url: "https://newsdaycameroon.wordpress.com/tag/douala/" }] },
  { id: "street-children-2021", date: "2021-02", dateConfirmed: true, programme: "child-protection", video: "1_51miPEC0I", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=1_51miPEC0I" }] },
  { id: "womens-day", date: "2024-03", dateConfirmed: false, programme: "women", sources: [{ label: "Syndy Emade Foundation (Facebook)", url: "https://www.facebook.com/SyndyEmadeFoundation/" }] },
  { id: "christmas-2023", date: "2023-12", dateConfirmed: true, programme: "christmas-outreach", sources: [{ label: "Mimi Mefo Info", url: "https://mimimefoinfos.com/syndy-emade-offers-relief-to-visually-impaired-mother-in-douala/" }] },
];

/**
 * Map points (south-west/central Cameroon). `work` = documented activity, `origin` = where the
 * displaced families we support come from, `hometown` = the founder's birthplace.
 */
export type CentreId = "douala" | "bamenda" | "buea" | "kumba";
export const impactCentres: { id: CentreId; kind: "work" | "origin" | "hometown"; programmes: ProjectSlug[]; journey: string[] }[] = [
  { id: "douala", kind: "work", programmes: ["displaced-families", "christmas-outreach", "back-to-school"], journey: ["street-children-2021", "idps-2021", "idps-2020", "christmas-2020", "christmas-2023", "school-materials"] },
  { id: "bamenda", kind: "origin", programmes: ["displaced-families"], journey: [] },
  { id: "buea", kind: "origin", programmes: ["displaced-families"], journey: [] },
  { id: "kumba", kind: "hometown", programmes: [], journey: [] },
];

export type MediaKind = "video" | "story" | "press";

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

export type PressTag = "interview" | "ranking" | "feature" | "release" | "award" | "profile" | "ambassador" | "studio" | "foundation";
/** Press coverage — titles are kept in the publication's original language. */
export const press: { title: string; source: string; url: string; tag: PressTag; lang: "en" | "fr" }[] = [
  { title: "Syndy Emade offers relief to visually impaired mother in Douala", source: "Mimi Mefo Info", url: "https://mimimefoinfos.com/syndy-emade-offers-relief-to-visually-impaired-mother-in-douala/", tag: "foundation", lang: "en" },
  { title: "Syndy Emade Foundation outreach to displaced families in Douala", source: "Newsday Cameroon", url: "https://newsdaycameroon.wordpress.com/tag/douala/", tag: "foundation", lang: "en" },
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

/** The Foundation's films on SYNDY EMADE TV — embedded (privacy-enhanced), never re-uploaded. */
/** Films from the Foundation's own channel, SYNDY EMADE TV. `home` = shown in the home page film strip. */
export const featuredVideos: { id: string; date: string; duration: string; programme: ProjectSlug; home?: boolean; title: { en: string; fr: string } }[] = [
  { id: "1_51miPEC0I", date: "2021-02-02", duration: "2:20", programme: "child-protection", home: true, title: { en: "A day with children living on the street", fr: "Une journée avec les enfants des rues" } },
  { id: "IRtdVqIK9Nc", date: "2021-02-02", duration: "4:47", programme: "displaced-families", home: true, title: { en: "Touching moments with displaced families", fr: "Moments forts avec des familles déplacées" } },
  { id: "8_OXBvKZBKY", date: "2021-01-08", duration: "2:37", programme: "christmas-outreach", home: true, title: { en: "Christmas outreach to families at Bonaberi", fr: "Noël solidaire avec des familles de Bonaberi" } },
  { id: "w4Xt6EOS1lU", date: "2020-09-19", duration: "4:47", programme: "displaced-families", title: { en: "Supplies for displaced families at Bonaberi", fr: "Des vivres pour les familles déplacées de Bonaberi" } },
  { id: "vqR0Lb9Wguo", date: "2020-08-05", duration: "3:23", programme: "back-to-school", title: { en: "COVID-19 safety kits for a school in Limbe", fr: "Des kits anti-COVID-19 pour une école de Limbe" } },
  { id: "-wQM_qRACTA", date: "2019-08-23", duration: "1:45", programme: "back-to-school", title: { en: "Back to school 2019: supplies and school fees", fr: "Rentrée 2019 : fournitures et frais de scolarité" } },
  { id: "3Wx_TaG5sFc", date: "2019-08-23", duration: "1:22", programme: "back-to-school", title: { en: "Back-to-school donations", fr: "Dons pour la rentrée scolaire" } },
  { id: "G9f7qKhNiwU", date: "2019-08-18", duration: "1:00", programme: "child-protection", title: { en: "Introducing the Syndy Emade Foundation", fr: "Présentation de la Fondation Syndy Emade" } },
];

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
