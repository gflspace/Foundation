#!/usr/bin/env node
// What changed on the website in the last N days (default 7), grouped like the Drive folders.
// Compares the site data at the last commit before the period with HEAD, so it reports only what went live.
//   node scripts/ops/weekly-activity.mjs [days]   -> JSON on stdout
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const days = Number(process.argv[2] || 7);
const git = (...a) => execFileSync("git", ["-C", root, ...a], { encoding: "utf8", maxBuffer: 64 << 20 }).trim();
const since = new Date(Date.now() - days * 86400_000).toISOString();
const base = git("rev-list", "-1", `--before=${since}`, "HEAD") || null;
const show = (rev, file) => { try { return rev ? git("show", `${rev}:${file}`) : ""; } catch { return ""; } };
const now = (file) => show("HEAD", file);

function section(src, name) {
  const start = src.search(new RegExp(`^export const ${name}\\b`, "m"));
  if (start < 0) return "";
  const rest = src.slice(start + 1);
  const end = rest.search(/^export /m);
  return end < 0 ? rest : rest.slice(0, end);
}
const ids = (text) => [...text.matchAll(/^\s*\{\s*id:\s*"([^"]+)"/gm)].map((m) => m[1]);
const added = (before, after) => after.filter((x) => !before.includes(x));
/** Pull a field from the one-line record with this id. */
function field(text, id, key) {
  const line = text.split("\n").find((l) => l.includes(`id: "${id}"`)) ?? "";
  return (line.match(new RegExp(`${key}:\\s*"([^"]+)"`)) ?? [])[1];
}

const cB = show(base, "lib/content.ts"), cA = now("lib/content.ts");
const pB = show(base, "lib/platform.ts"), pA = now("lib/platform.ts");
const enB = show(base, "lib/i18n/dictionaries/en-platform.ts"), enA = now("lib/i18n/dictionaries/en-platform.ts");
const SITE = process.env.SITE_URL || "https://www.syndyemadefoundation.org";

// Photos: new gallery image files, grouped by album
const newFiles = (base ? git("diff", "--name-only", "--diff-filter=A", base, "HEAD", "--", "public") : git("ls-files", "public")).split("\n").filter(Boolean);
const photos = newFiles.filter((f) => /^public\/gallery\/[^/]+\/[^/]+\.(jpe?g|png|webp)$/i.test(f));
const albums = {};
for (const f of photos) { const a = f.split("/")[2]; albums[a] = (albums[a] ?? 0) + 1; }

// Blog posts: new stories
const slugs = (t) => [...t.matchAll(/\bslug:\s*"([^"]+)"/g)].map((m) => m[1]);
const newStories = added(slugs(pB), slugs(pA));
const storyTitle = (slug) => {
  const i = enA.indexOf(`"${slug}"`); if (i < 0) return slug;
  return (enA.slice(i, i + 2000).match(/title:\s*"([^"]+)"/) ?? [])[1] ?? slug;
};

// News: new journey moments; Press: new press items; Videos: new films / featured videos
const newJourney = added(ids(section(cB, "journey")), ids(section(cA, "journey")));
const newPress = added(ids(section(cB, "press")), ids(section(cA, "press")));
const newVideos = added([...ids(section(cB, "featuredVideos")), ...ids(section(cB, "films"))], [...ids(section(cA, "featuredVideos")), ...ids(section(cA, "films"))]);

// Documents: new or updated downloadable files
const docs = (base ? git("diff", "--name-only", "--diff-filter=AM", base, "HEAD", "--", "public/press") : git("ls-files", "public/press")).split("\n").filter(Boolean);

const out = [
  { category: "Photos", count: photos.length, items: Object.entries(albums).map(([a, n]) => ({ title: `${n} photo(s) · ${a.replace(/-/g, " ")}`, url: `${SITE}/stories/${a}#in-pictures` })) },
  { category: "Videos", count: newVideos.length, items: newVideos.map((id) => ({ title: field(section(cA, "featuredVideos"), id, "en") ?? id, url: `https://www.youtube.com/watch?v=${id}` })) },
  { category: "Blog-Posts", count: newStories.length, items: newStories.map((s) => ({ title: storyTitle(s), url: `${SITE}/stories/${s}` })) },
  { category: "News", count: newJourney.length, items: newJourney.map((id) => ({ title: `${id} (${field(section(cA, "journey"), id, "date") ?? "date ?"})`, url: `${SITE}/media#story-${id}` })) },
  { category: "Announcements", count: 0, items: [] },
  { category: "Press-Releases", count: newPress.length, items: newPress.map((id) => ({ title: field(section(cA, "press"), id, "title") ?? id, url: `${SITE}/media#press-${id}` })) },
  { category: "Documents", count: docs.length, items: docs.map((f) => ({ title: path.basename(f), url: `${SITE}/${f.replace(/^public\//, "")}` })) },
];
console.log(JSON.stringify({ from: since, to: new Date().toISOString(), baseCommit: base, activity: out }, null, 2));
