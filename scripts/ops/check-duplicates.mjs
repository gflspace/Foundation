#!/usr/bin/env node
// Duplicate guard for website content. Run before every deploy (the maintenance job does).
// Fails (exit 1) when the same record or the same image would appear twice on the site.
//   node scripts/ops/check-duplicates.mjs            -> check the site data
//   node scripts/ops/check-duplicates.mjs <file...>  -> also report which given files already exist on the site
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const read = (p) => readFileSync(path.join(root, p), "utf8");
const errors = [];
const warnings = [];

/** Text of `export const <name>` up to the next top-level export. */
function section(src, name) {
  const start = src.search(new RegExp(`^export const ${name}\\b`, "m"));
  if (start < 0) return "";
  const rest = src.slice(start + 1);
  const end = rest.search(/^export /m);
  return end < 0 ? rest : rest.slice(0, end);
}
const all = (text, re) => [...text.matchAll(re)].map((m) => m[1]);
function dupes(label, values) {
  const seen = new Map();
  for (const v of values) seen.set(v, (seen.get(v) ?? 0) + 1);
  for (const [v, n] of seen) if (n > 1) errors.push(`${label} appears ${n} times: ${v}`);
}
const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

// 1. Records in the data files
const content = read("lib/content.ts");
const platform = read("lib/platform.ts");
const gallery = read("lib/gallery.ts");

const journey = section(content, "journey");
dupes("Journey entry id", all(journey, /\bid:\s*"([^"]+)"/g));
const press = section(content, "press");
dupes("Press item id", all(press, /\bid:\s*"([^"]+)"/g));
dupes("Press article URL", all(press, /\burl:\s*"([^"]+)"/g));
dupes("Press article title", all(press, /\btitle:\s*"([^"]+)"/g).map(norm));
dupes("Film id", all(section(content, "films"), /\bid:\s*"([^"]+)"/g));
dupes("Featured video id", all(section(content, "featuredVideos"), /\bid:\s*"([^"]+)"/g));
dupes("Story slug", all(platform, /\bslug:\s*"([^"]+)"/g));
dupes("Gallery photo", all(gallery, /\bsrc:\s*"([^"]+)"/g));

// Same programme on the same date in the journey timeline = probably the same event twice.
const entries = journey.split("\n").filter((l) => /^\s*\{\s*id:\s*"/.test(l)).map((e) => ({
  id: (e.match(/\bid:\s*"([^"]+)"/) ?? [])[1],
  key: `${(e.match(/date:\s*"([^"]+)"/) ?? [])[1]} · ${(e.match(/programme:\s*"([^"]+)"/) ?? [])[1] ?? "-"}`,
}));
const byKey = new Map();
for (const e of entries) byKey.set(e.key, [...(byKey.get(e.key) ?? []), e.id]);
for (const [k, ids] of byKey) if (ids.length > 1) warnings.push(`Journey entries on the same date and programme (check they are different events): ${k} → ${ids.join(", ")}`);

// 2. Identical image files anywhere under public/ (same bytes = same photo uploaded twice)
const hashOf = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const images = new Map();
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp|gif)$/i.test(name)) {
      const h = hashOf(p);
      images.set(h, [...(images.get(h) ?? []), path.relative(root, p)]);
    }
  }
}
for (const d of ["public/gallery", "public/images", "public/media"]) if (existsSync(path.join(root, d))) walk(path.join(root, d));
for (const files of images.values()) if (files.length > 1) errors.push(`Identical image stored more than once: ${files.join(", ")}`);

// 3. Optional: are these candidate files already on the site?
for (const f of process.argv.slice(2)) {
  const match = images.get(hashOf(f));
  console.log(match ? `ALREADY ON SITE: ${f} = ${match.join(", ")}` : `new: ${f}`);
}

for (const w of warnings) console.log(`warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`DUPLICATE: ${e}`);
  process.exit(1);
}
console.log(`No duplicates (${images.size} images, ${entries.length} journey entries checked).`);
