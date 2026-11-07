import { albumCoverImage } from "./gallery";

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
  /** General enquiries — the default address everywhere one email is shown. */
  email: "contact@syndyemadefoundation.org",
  emails: {
    contact: "contact@syndyemadefoundation.org", // general enquiries
    info: "info@syndyemadefoundation.org", // information, media and press
    support: "support@syndyemadefoundation.org", // donors, volunteers, accountability questions
  },
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
export type JourneyEntry = { id: string; date: string; dateConfirmed: boolean; programme?: ProjectSlug; video?: string; image?: CoverImage; sources: Source[] };
export const journey: JourneyEntry[] = [
  { id: "limbe-orphanage-2015", date: "2015-10", dateConfirmed: true, programme: "child-protection", sources: [{ label: "Nexdim Empire (archived)", url: "https://web.archive.org/web/20180922214036/http://nexdimempire.com/blue-rain-crew-and-their-boss-syndy-emade-at-the-limbe-orphanage-at-bota.html/" }] },
  { id: "idps-2019", date: "2019-07", dateConfirmed: true, programme: "displaced-families", sources: [{ label: "Mimi Mefo Info", url: "https://mimimefoinfos.com/anglophone-crisis-cameroons-talented-actress-syndy-emade-weeps-as-idps-present-ordeal/" }] },
  { id: "launch", date: "2019-08", dateConfirmed: true, programme: "child-protection", video: "G9f7qKhNiwU", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=G9f7qKhNiwU" }] },
  { id: "school-materials", date: "2019-08", dateConfirmed: true, programme: "back-to-school", video: "-wQM_qRACTA", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=-wQM_qRACTA" }, { label: "Positive Vibes CMR (Facebook)", url: "https://www.facebook.com/positivevibescmr/posts/502011753942883/" }, { label: "Ekwat TV (Facebook)", url: "https://www.facebook.com/EkwatTV/posts/3629789580390638/" }] },
  { id: "school-fees", date: "2019-08", dateConfirmed: true, programme: "back-to-school", video: "3Wx_TaG5sFc", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=3Wx_TaG5sFc" }, { label: "Kesa Magazine (Facebook)", url: "https://www.facebook.com/kesamagazine/posts/3856021907788721/" }] },
  { id: "covid-schools-2020", date: "2020-08", dateConfirmed: true, programme: "back-to-school", video: "vqR0Lb9Wguo", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=vqR0Lb9Wguo" }] },
  { id: "idps-2020", date: "2020-09", dateConfirmed: true, programme: "displaced-families", video: "w4Xt6EOS1lU", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=w4Xt6EOS1lU" }] },
  { id: "christmas-2020", date: "2020-12", dateConfirmed: true, programme: "christmas-outreach", video: "8_OXBvKZBKY", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=8_OXBvKZBKY" }] },
  { id: "idps-2021", date: "2021-02", dateConfirmed: true, programme: "displaced-families", video: "IRtdVqIK9Nc", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=IRtdVqIK9Nc" }, { label: "Newsday Cameroon", url: "https://newsdaycameroon.wordpress.com/tag/douala/" }] },
  { id: "street-children-2021", date: "2020-12", dateConfirmed: true, programme: "child-protection", video: "1_51miPEC0I", sources: [{ label: "SYNDY EMADE TV (YouTube)", url: "https://www.youtube.com/watch?v=1_51miPEC0I" }] },
  { id: "womens-day", date: "2024-03-08", dateConfirmed: true, programme: "women", image: albumCoverImage("womens-day-limbe-2024"), sources: [{ label: "Syndy Emade Foundation on Facebook, 8 Mar 2024", url: "https://www.facebook.com/photo/?fbid=746115817620334" }] },
  { id: "christmas-2023", date: "2023-12", dateConfirmed: true, programme: "christmas-outreach", image: albumCoverImage("a-home-for-a-family-2023"), sources: [{ label: "Mimi Mefo Info", url: "https://mimimefoinfos.com/syndy-emade-offers-relief-to-visually-impaired-mother-in-douala/" }] },
];

/**
 * Map points (south-west/central Cameroon). `work` = documented activity, `origin` = where the
 * displaced families we support come from, `hometown` = the founder's birthplace.
 */
export type CentreId = "douala" | "limbe" | "bamenda" | "buea" | "kumba";
export const impactCentres: { id: CentreId; kind: "work" | "origin" | "hometown"; programmes: ProjectSlug[]; journey: string[] }[] = [
  { id: "douala", kind: "work", programmes: ["displaced-families", "christmas-outreach", "back-to-school"], journey: ["street-children-2021", "idps-2021", "idps-2020", "christmas-2020", "christmas-2023", "school-materials", "idps-2019"] },
  { id: "limbe", kind: "work", programmes: ["back-to-school", "child-protection"], journey: ["covid-schools-2020", "limbe-orphanage-2015"] },
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

export type PressTag = "interview" | "ranking" | "feature" | "release" | "award" | "profile" | "ambassador" | "studio" | "foundation" | "community" | "event";

/**
 * Cover images. Only `approved` images are shown; `pending` ones (publisher-owned photos) stay hidden
 * behind the designed editorial cover until the Foundation has written permission. Full log with
 * sources and permissions: docs/press-images.md.
 */
export type CoverImage = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  license: string;
  licenseUrl?: string;
  status: "approved" | "pending";
  /** CSS object-position for the 16:10 crop (default center). */
  position?: string;
  /** Set when the image is a thumbnail of one of the founder's own YouTube films. */
  youtubeId?: string;
};

/** YouTube cover from the Foundation's own channel. hq720 is 16:9; hqdefault is 4:3 letterboxed and gets cropped. */
const HQ720 = new Set(["IRtdVqIK9Nc", "1_51miPEC0I", "8_OXBvKZBKY", "ldMHL4jSUSM", "UIFLEhaU4UU", "1px6GujwUt8", "n39Oj4GOQ1w", "aQe-1CbmlYg", "AuIXJ2uQVCE"]);
export const ytThumb = (id: string) => ({
  src: `https://i.ytimg.com/vi/${id}/${HQ720.has(id) ? "hq720" : "hqdefault"}.jpg`,
  /** Extra scale that crops the black letterbox bands of 4:3 thumbnails inside a 16:10 or 16:9 frame. */
  letterboxed: !HQ720.has(id),
});
const ownFilm = (id: string, alt: string): CoverImage => ({
  src: ytThumb(id).src,
  alt,
  credit: "SYNDY EMADE TV",
  sourceUrl: `https://www.youtube.com/watch?v=${id}`,
  license: "Founder’s own channel",
  status: "approved",
  youtubeId: id,
});

export type PressItem = {
  id: string;
  title: string;
  source: string;
  /** Link shown to visitors: the original if it still works, otherwise an archived copy. */
  url: string;
  /** Original address, kept for the record when `url` is an archive. */
  originalUrl?: string;
  date: string;
  dateConfirmed: boolean;
  tag: PressTag;
  lang: "en" | "fr";
  /** Short verbatim line from the article, used on the editorial cover. */
  quote?: string;
  /** Factual one-liner for the editorial cover when there is no verified quote (article language). */
  highlight?: string;
  image?: CoverImage;
};

/** Press coverage, verified November 2026 (docs/press-images.md). Titles are the publication's own, in its language. */
export const press: PressItem[] = [
  {
    id: "cemac-2026-big-business", title: "How Syndy Emade Turned Cameroonian Cinema Into Big Business", source: "CEMAC ECO FINANCE",
    url: "https://cemac-eco.finance/how-syndy-emade-turned-cameroonian-cinema-into-big-business/", date: "2026-03-13", dateConfirmed: true, tag: "feature", lang: "en",
    highlight: "Blue Rain Entertainment, streaming deals and the Foundation",
    image: { src: "https://cemac-eco.finance/wp-content/uploads/2026/03/syndy-emade-2.jpg", alt: "Portrait of Syndy Emade, CEMAC ECO FINANCE feature", credit: "CEMAC ECO FINANCE", sourceUrl: "https://cemac-eco.finance/how-syndy-emade-turned-cameroonian-cinema-into-big-business/", license: "© CEMAC ECO FINANCE — permission needed", status: "pending" },
  },
  {
    id: "cameroonceo-2022-profile", title: "Syndy Emade, The Consistency of An Ambitious Entrepreneur", source: "Cameroon CEO",
    url: "https://cameroonceo.com/2022/06/24/syndy-emade-the-consistency-of-an-ambitious-entrepreneur/", date: "2022-06-24", dateConfirmed: true, tag: "profile", lang: "en",
    highlight: "CEO of Blue Rain Entertainment, founder of the Syndy Emade Foundation",
    image: { src: "https://cameroonceo.com/wp-content/uploads/2022/06/Syndy-Emade-www.cameroonceo.com_.png", alt: "Syndy Emade, Cameroon CEO profile", credit: "Cameroon CEO", sourceUrl: "https://cameroonceo.com/2022/06/24/syndy-emade-the-consistency-of-an-ambitious-entrepreneur/", license: "© Cameroon CEO — permission needed", status: "pending" },
  },
  {
    id: "yafrica-2021-netflix", title: "Netflix acquires two films by Cameroon actress, Syndy Emade", source: "Y! For Africa",
    url: "https://yafri.ca/netflix-acquires-two-films-by-cameroon-actress-syndy-emade/", date: "2021-06-10", dateConfirmed: true, tag: "release", lang: "en",
    quote: "It can only be God.",
    image: ownFilm("aQe-1CbmlYg", "“Broken” official trailer, one of the two films acquired by Netflix"),
  },
  {
    id: "people237-2020-beach-party", title: "Syndy Emade organise une « Beach party » à Limbé ce 19 décembre", source: "People237",
    url: "https://www.people237.com/syndy-emade-organise-une-beach-party-a-limbe-ce-19-decembre", date: "2020-12", dateConfirmed: true, tag: "event", lang: "fr",
    image: ownFilm("AuIXJ2uQVCE", "Syndy Emade’s all-white beach party"),
  },
  {
    id: "cemac-2020-heart-to-heart", title: "Heart to heart with Syndy Emade", source: "CEMAC ECO FINANCE",
    url: "https://cemac-eco.finance/heart-to-heart-with-syndy-emade-2/", date: "2020-03-25", dateConfirmed: true, tag: "interview", lang: "en",
    highlight: "On creativity, her fans, her business and the Foundation",
    image: { src: "https://cemac-eco.finance/wp-content/uploads/2020/03/syndy-emade-5.jpeg", alt: "Syndy Emade, CEMAC ECO FINANCE interview", credit: "CEMAC ECO FINANCE", sourceUrl: "https://cemac-eco.finance/heart-to-heart-with-syndy-emade-2/", license: "© CEMAC ECO FINANCE — permission needed", status: "pending" },
  },
  {
    id: "mmi-2023-visually-impaired-mother", title: "Syndy Emade offers relief to visually impaired mother in Douala", source: "Mimi Mefo Info",
    url: "https://mimimefoinfos.com/syndy-emade-offers-relief-to-visually-impaired-mother-in-douala/", date: "2023-12-27", dateConfirmed: true, tag: "foundation", lang: "en",
    highlight: "A year’s rent and a fresh start for a mother and her three sons",
    image: { src: "https://mimimefoinfos.com/wp-content/uploads/2023/12/IMG_20231227_132835_932.jpg", alt: "Syndy Emade with the family during the Christmas 2023 outreach in Douala", credit: "Mimi Mefo Info", sourceUrl: "https://mimimefoinfos.com/syndy-emade-offers-relief-to-visually-impaired-mother-in-douala/", license: "© Mimi Mefo Info — permission needed", status: "pending" },
  },
  {
    id: "mmi-2019-idps", title: "Anglophone Crisis: Cameroon’s talented actress, Syndy Emade weeps as IDPs present ordeal", source: "Mimi Mefo Info",
    url: "https://mimimefoinfos.com/anglophone-crisis-cameroons-talented-actress-syndy-emade-weeps-as-idps-present-ordeal/", date: "2019-07-14", dateConfirmed: true, tag: "foundation", lang: "en",
    image: ownFilm("ldMHL4jSUSM", "Syndy Emade Foundation film, July 2019"),
  },
  {
    id: "newsday-idps-douala", title: "Syndy Emade Foundation outreach to displaced families in Douala", source: "Newsday Cameroon",
    url: "https://newsdaycameroon.wordpress.com/tag/douala/", date: "", dateConfirmed: false, tag: "foundation", lang: "en",
    quote: "Bringing hope to those in hopeless situations.",
  },
  {
    id: "pulse-2016-interview", title: "Syndy Emade: Actress talks film industry in Cameroon, challenges as a female filmmaker, getting into character", source: "Pulse Nigeria",
    url: "https://web.archive.org/web/20170814063936/http://www.pulse.ng/movies/syndy-emade-actress-talks-film-industry-in-cameroon-challenges-as-a-female-filmmaker-getting-into-character-id4908980.html",
    originalUrl: "http://www.pulse.ng/movies/syndy-emade-actress-talks-film-industry-in-cameroon-challenges-as-a-female-filmmaker-getting-into-character-id4908980.html",
    date: "2016-04-12", dateConfirmed: true, tag: "interview", lang: "en",
    quote: "You have to solicit for sponsors and investors for the film.",
    image: { src: "https://web.archive.org/web/20170814063936im_/https://static.pulse.ng/img/incoming/crop4104563/7504671947-chorizontal-w1200-h630/syndy-emade-2.jpg", alt: "Portrait of Syndy Emade from the Pulse Nigeria interview", credit: "Pulse Nigeria", sourceUrl: "https://web.archive.org/web/20170814063936/http://www.pulse.ng/movies/syndy-emade-actress-talks-film-industry-in-cameroon-challenges-as-a-female-filmmaker-getting-into-character-id4908980.html", license: "© Pulse Nigeria — permission needed", status: "pending" },
  },
  {
    id: "njoka-2017-ranking", title: "Top five most active Cameroonian actresses", source: "Njoka TV",
    url: "https://web.archive.org/web/20170615160548/http://blog.njokatv.com/2017/04/18/top-five-active-cameroonian-actresses/",
    originalUrl: "https://blog.njokatv.com/2017/04/18/top-five-active-cameroonian-actresses/",
    date: "2017-04-18", dateConfirmed: true, tag: "ranking", lang: "en",
    highlight: "No. 2 most active actress in Cameroon",
  },
  {
    id: "dcoded-2017-best-actress", title: "Is Syndy Emade Cameroon’s best actress?", source: "Dcoded TV",
    url: "https://web.archive.org/web/20190227062249/https://dcodedtv.com/syndy-emade-cameroon-s-best-actress/",
    originalUrl: "http://dcodedtv.com/syndy-emade-cameroon-s-best-actress/",
    date: "2017-06-11", dateConfirmed: true, tag: "feature", lang: "en",
    image: { src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Emade.jpg", alt: "Syndy Emade at the Glitz Style Awards, Ghana, 2017", credit: "Abanda bride", sourceUrl: "https://commons.wikimedia.org/wiki/File:Emade.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", status: "approved", position: "50% 22%" },
  },
  {
    id: "dcoded-2017-a-man-for-the-weekend", title: "Syndy Emade borrows Alexx Ekubo for new movie “A Man For The Weekend”", source: "Dcoded TV",
    url: "https://web.archive.org/web/2019/https://dcodedtv.com/2017/04/12/syndy-emade-borrows-alexx-ekubo-for-new-movie-a-man-for-the-weekend/",
    originalUrl: "http://dcodedtv.com/syndy-emade-borrows-alexx-ekubo-for-new-movie-a-man-for-the-weekend/",
    date: "2017-04-12", dateConfirmed: true, tag: "release", lang: "en",
    image: ownFilm("UIFLEhaU4UU", "“A Man For The Weekend” official trailer"),
  },
  {
    id: "kamer360-2014-miss-heritage", title: "Miss Heritage Cameroon 2014 is Syndy Emade", source: "Kamer360",
    url: "https://web.archive.org/web/20160409174646/http://kamer360.com/2014/09/11/miss-heritage-cameroon-is-syndy-emade/",
    originalUrl: "https://kamer360.com/2014/09/11/miss-heritage-cameroon-is-syndy-emade/",
    date: "2014-09-11", dateConfirmed: true, tag: "award", lang: "en",
    quote: "I think the purpose of Miss Heritage is to tour the country and show our culture.",
    image: { src: "https://web.archive.org/web/20160409174646im_/https://kamer360.files.wordpress.com/2014/09/11325_732868690118734_5448433975523537178_n.jpg", alt: "Syndy Emade crowned Miss Heritage Cameroon 2014", credit: "Kamer360", sourceUrl: "https://web.archive.org/web/20160409174646/http://kamer360.com/2014/09/11/miss-heritage-cameroon-is-syndy-emade/", license: "© Kamer360 / photographer unknown — permission needed", status: "pending" },
  },
  {
    id: "culturebene-2016-profile", title: "Syndy Emade, la belle aux trois casquettes", source: "Culturebene",
    url: "https://www.culturebene.com/24576-syndy-emade-la-belle-aux-trois-casquettes.html", date: "2016-09-25", dateConfirmed: true, tag: "profile", lang: "fr",
    image: ownFilm("45EkiHoQiN8", "“Rose on a Grave” official trailer, one of the films the profile cites"),
  },
  {
    id: "henriette-2017-instavoice", title: "Cameroon’s Syndy Emade becomes the new face for InstaVoice Celeb by Orange", source: "Henriette’s Lounge",
    url: "https://web.archive.org/web/20180214173540/http://www.henrietteslounge.com/2017/04/cameroons-syndy-emade-becomes-new-face.html",
    originalUrl: "http://www.henrietteslounge.com/2017/04/cameroons-syndy-emade-becomes-new-face.html",
    date: "2017-04", dateConfirmed: true, tag: "ambassador", lang: "en",
    quote: "Getting to the summit of her own world.",
    image: { src: "https://web.archive.org/web/20180214173540im_/http://www.kamerlink.com/wp-content/uploads/2017/04/syndy.jpg", alt: "Syndy Emade, InstaVoice Celeb announcement", credit: "Kamerlink (via Henriette’s Lounge)", sourceUrl: "https://web.archive.org/web/20180214173540/http://www.henrietteslounge.com/2017/04/cameroons-syndy-emade-becomes-new-face.html", license: "© Kamerlink — permission needed", status: "pending" },
  },
  {
    id: "nexdim-2015-limbe-orphanage", title: "Blue Rain crew and boss Syndy Emade at the Limbe orphanage at Bota", source: "Nexdim Empire",
    url: "https://web.archive.org/web/20180922214036/http://nexdimempire.com/blue-rain-crew-and-their-boss-syndy-emade-at-the-limbe-orphanage-at-bota.html/",
    originalUrl: "http://nexdimempire.com/tag/blue-rain-entertainment/",
    date: "2015-10-21", dateConfirmed: true, tag: "community", lang: "en",
    highlight: "A day with the children of the Bota orphanage, Limbe",
    image: { src: "https://web.archive.org/web/20180922214036im_/http://nexdimempire.com/wp-content/uploads/C360_2015-10-20-16-11-10-202.jpg", alt: "The Blue Rain crew with children at the Limbe orphanage, Bota", credit: "Nexdim Empire", sourceUrl: "https://web.archive.org/web/20180922214036/http://nexdimempire.com/blue-rain-crew-and-their-boss-syndy-emade-at-the-limbe-orphanage-at-bota.html/", license: "© Nexdim Empire — permission needed; shows children, needs guardian consent", status: "pending" },
  },
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
