/**
 * Language-neutral data for the platform features: Stories of Impact, the impact dashboard,
 * the five strategic pillars, partners and campaigns. Copy lives in
 * lib/i18n/dictionaries/{en,fr}-platform.ts. Every figure here is documented in a public
 * source (docs/content-brief.md, docs/press-images.md); nothing is estimated.
 */
import { journey, press, featuredVideos, impactCentres, type CoverImage, type ProjectSlug, type Source } from "./content";
import { albumCoverImage } from "./gallery";

export type PillarKey = "women" | "education" | "relief" | "environment" | "community";
/** active = documented, recurring work · emerging = documented activity, programme in development · proposed = strategic intention, awaiting confirmation by the Foundation */
export type PillarStatus = "active" | "emerging" | "proposed";

export const pillars: { key: PillarKey; status: PillarStatus; tone: "teal" | "purple" | "plum"; programmes: ProjectSlug[] }[] = [
  { key: "education", status: "active", tone: "teal", programmes: ["back-to-school", "child-protection"] },
  { key: "relief", status: "active", tone: "purple", programmes: ["displaced-families", "christmas-outreach"] },
  { key: "women", status: "emerging", tone: "teal", programmes: ["women"] },
  { key: "community", status: "proposed", tone: "plum", programmes: [] },
  { key: "environment", status: "proposed", tone: "purple", programmes: [] },
];

export type StorySlug =
  | "first-outreach-2019"
  | "back-to-school-2019"
  | "covid-school-kits-limbe-2020"
  | "displaced-families-bonaberi-2020"
  | "street-children-2021"
  | "a-home-for-a-family-2023"
  | "clothes-makepe-2020"
  | "year-end-bonaberi-2020"
  | "womens-day-limbe-2024";

export type Story = {
  slug: StorySlug;
  /** Matching moment on the journey timeline. */
  journeyIds: string[];
  /** Programme page this story belongs to; omitted when no existing programme fits. */
  programme?: ProjectSlug;
  pillar: PillarKey;
  date: string;
  location: string;
  locationConfirmed: boolean;
  partners: string[];
  video?: string;
  image?: CoverImage;
  sources: Source[];
};

const yt = (id: string): Source => ({ label: "SYNDY EMADE TV (YouTube)", url: `https://www.youtube.com/watch?v=${id}` });
const mmi2019: Source = { label: "Mimi Mefo Info, 14 Jul 2019", url: "https://mimimefoinfos.com/anglophone-crisis-cameroons-talented-actress-syndy-emade-weeps-as-idps-present-ordeal/" };
const fb = (label: string, fbid: string): Source => ({ label: `Syndy Emade Foundation on Facebook, ${label}`, url: `https://www.facebook.com/photo/?fbid=${fbid}` });
const mmi2023: Source = { label: "Mimi Mefo Info, 27 Dec 2023", url: "https://mimimefoinfos.com/syndy-emade-offers-relief-to-visually-impaired-mother-in-douala/" };

/** Stories of Impact, newest first. Each is a completed, documented intervention. */
const storyList: Story[] = [
  {
    slug: "womens-day-limbe-2024", journeyIds: ["womens-day"], programme: "women", pillar: "women",
    date: "2024-03-08", location: "Limbe District Hospital, Limbe", locationConfirmed: true, partners: ["Wilmbi Foundation"],
    sources: [fb("8 Mar 2024", "746115817620334")],
  },
  {
    slug: "a-home-for-a-family-2023", journeyIds: ["christmas-2023"], programme: "christmas-outreach", pillar: "relief",
    date: "2023-12", location: "Douala", locationConfirmed: true, partners: [],
    sources: [fb("25 Dec 2023", "704772211754695"), mmi2023],
  },
  {
    slug: "year-end-bonaberi-2020", journeyIds: ["christmas-2020"], programme: "christmas-outreach", pillar: "relief",
    date: "2020-12", location: "Gateway Bonaberi, Douala", locationConfirmed: true, partners: ["B&T Logistics"], video: "8_OXBvKZBKY",
    sources: [fb("31 Dec 2020", "1492129210978243"), yt("8_OXBvKZBKY")],
  },
  {
    slug: "street-children-2021", journeyIds: ["street-children-2021"], programme: "child-protection", pillar: "education",
    date: "2020-12", location: "Douala", locationConfirmed: false, partners: [], video: "1_51miPEC0I", sources: [fb("3 Dec 2020", "1472294789628352"), yt("1_51miPEC0I")],
  },
  {
    slug: "displaced-families-bonaberi-2020", journeyIds: ["idps-2020"], programme: "displaced-families", pillar: "relief",
    date: "2020-09", location: "Ancient Route Gateway, Bonaberi, Douala", locationConfirmed: true, partners: [], video: "w4Xt6EOS1lU", sources: [fb("9 Sep 2020", "1401915449999620"), yt("w4Xt6EOS1lU")],
  },
  {
    slug: "covid-school-kits-limbe-2020", journeyIds: ["covid-schools-2020"], programme: "back-to-school", pillar: "education",
    date: "2020-08", location: "Limbe", locationConfirmed: true, partners: ["Elone Foundation"], video: "vqR0Lb9Wguo", sources: [yt("vqR0Lb9Wguo")],
  },
  {
    slug: "clothes-makepe-2020", journeyIds: [], pillar: "community",
    date: "2020-01", location: "Makepe Missoke, Douala", locationConfirmed: true, partners: [],
    sources: [fb("28 Jan 2020", "1229237193934114"), fb("appeal, 25 Jan 2020", "1227132650811235")],
  },
  {
    slug: "back-to-school-2019", journeyIds: ["school-materials", "school-fees"], programme: "back-to-school", pillar: "education",
    date: "2019-08", location: "Douala", locationConfirmed: true, partners: [], video: "-wQM_qRACTA",
    sources: [fb("18 Aug 2019", "1093706604153841"), yt("-wQM_qRACTA"), yt("3Wx_TaG5sFc"), ...(journey.find((j) => j.id === "school-materials")?.sources.slice(1) ?? []), ...(journey.find((j) => j.id === "school-fees")?.sources.slice(1) ?? [])],
  },
  {
    slug: "first-outreach-2019", journeyIds: ["idps-2019"], programme: "displaced-families", pillar: "relief",
    date: "2019-07-11", location: "Mount Zion Bilingual School, Mabanda, Bonaberi (Douala IV)", locationConfirmed: true, partners: [], video: "ldMHL4jSUSM",
    sources: [fb("12 Jul 2019", "1070497749808060"), mmi2019, yt("ldMHL4jSUSM")],
  },
];
/** Stories of Impact, newest first. Each is a completed, documented intervention; its cover is the album's best photo. */
export const stories: Story[] = storyList.map((s) => ({ ...s, image: albumCoverImage(s.slug) ?? s.image }));
export const storySlugs = stories.map((s) => s.slug);
export const storyForJourney = (journeyId: string) => stories.find((s) => s.journeyIds.includes(journeyId));

/** Verified indicators for the impact dashboard. `story` links the figure to its evidence. */
export type IndicatorKey = "children-school" | "school-fees" | "first-outreach" | "family-housed" | "school-equipped" | "activities" | "places" | "partners" | "films" | "press";
/** Field activities since the launch (the August 2019 introduction film is not an activity). */
const documentedActivities = journey.filter((j) => j.date >= "2019-07" && j.id !== "launch");
export const indicators: { key: IndicatorKey; value: number; suffix?: string; story?: StorySlug; href?: string }[] = [
  { key: "children-school", value: 600, suffix: "+", story: "back-to-school-2019" },
  { key: "school-fees", value: 300, story: "back-to-school-2019" },
  { key: "first-outreach", value: 200, suffix: "+", story: "first-outreach-2019" },
  { key: "family-housed", value: 1, story: "a-home-for-a-family-2023" },
  { key: "school-equipped", value: 1, story: "covid-school-kits-limbe-2020" },
  { key: "activities", value: documentedActivities.length, href: "/projects#journey" },
  { key: "places", value: impactCentres.filter((c) => c.kind === "work").length, href: "/#map-title" },
  { key: "partners", value: 2, href: "/partners#partners-list" },
  { key: "films", value: featuredVideos.length, href: "/media#media-library" },
  { key: "press", value: press.length, href: "/media#media-library" },
];
/** Activities by year, for the dashboard's year filter. */
export const activityYears = Array.from(new Set(documentedActivities.map((j) => j.date.slice(0, 4)))).sort();
export const activitiesIn = (year: string | "all") => documentedActivities.filter((j) => year === "all" || j.date.startsWith(year)).sort((a, b) => b.date.localeCompare(a.date));

/** Partner organisations named in public sources. */
export const documentedPartners: { name: string; what: "womensDay" | "covidKits"; journeyId: string }[] = [
  { name: "Elone Foundation", what: "covidKits", journeyId: "covid-schools-2020" },
  { name: "Wilmbi Foundation", what: "womensDay", journeyId: "womens-day" },
];

/**
 * "One Act of Kindness": recurring campaigns for one specific, verified need. Add a campaign here
 * (with its copy in the platform dictionaries) and it appears on the home and Get Involved pages.
 * Keep `raised` updated from real receipts only; set `report` once the need is met.
 */
export type Campaign = { id: string; target: number; raised: number; currency: "XAF" | "USD"; story?: StorySlug; status: "open" | "completed"; report?: string };
export const campaigns: Campaign[] = [];

/** WhatsApp contact (international format, digits only). Leave empty until the Foundation confirms its number. */
export const whatsappNumber = "";

/**
 * Founder statement. The proposed wording below is NOT a verified quotation: it stays hidden
 * until Syndy Emade approves it (set `approved: true`, or replace the text with her own words).
 */
export const founderStatement = {
  approved: false,
  en: "True impact is not measured by what we have, but by the lives we touch, the hope we restore and the opportunities we create for others.",
  fr: "Le véritable impact ne se mesure pas à ce que nous possédons, mais aux vies que nous touchons, à l’espoir que nous rendons et aux opportunités que nous créons pour les autres.",
};

/** Verified words from the founder, for the founder page (each from a published article). */
export const founderQuotes: { id: "education" | "tears" | "christmas"; source: Source }[] = [
  { id: "education", source: mmi2019 },
  { id: "tears", source: mmi2019 },
  { id: "christmas", source: mmi2023 },
];
