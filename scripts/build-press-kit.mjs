// Builds public/press/syndy-emade-foundation-press-kit.zip (fact sheet PDF + logos).
// Usage: node scripts/build-press-kit.mjs   (requires Playwright + `zip`)
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright"); // global install is fine: NODE_PATH=$(npm root -g)
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const out = path.resolve("public/press");
const tmp = path.join(out, ".build");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

const mark = (bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="512" height="512">${bg ? '<rect width="40" height="40" rx="10" fill="#0F172A"/>' : ""}<circle cx="20" cy="20" r="17.5" fill="none" stroke="#D97706" stroke-width="1.2"/><path d="M20 8c-4 6-8 9-8 14a8 8 0 0 0 16 0c0-5-4-8-8-14Z" fill="#059669"/><path d="M20 16c-2 3-4 4.5-4 7a4 4 0 0 0 8 0c0-2.5-2-4-4-7Z" fill="#FBBF24"/></svg>`;
const lockup = (dark) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 64" width="900" height="192"><g transform="translate(4 12) scale(1)"><circle cx="20" cy="20" r="19" fill="none" stroke="#D97706" stroke-width="1.5"/><path d="M20 8c-4 6-8 9-8 14a8 8 0 0 0 16 0c0-5-4-8-8-14Z" fill="#059669"/><path d="M20 16c-2 3-4 4.5-4 7a4 4 0 0 0 8 0c0-2.5-2-4-4-7Z" fill="#FBBF24"/></g><text x="56" y="34" font-family="Playfair Display, Georgia, serif" font-size="24" font-weight="600" fill="${dark ? "#0F172A" : "#FFFFFF"}">Syndy Emade</text><text x="57" y="52" font-family="Helvetica, Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="4" fill="${dark ? "#B45309" : "#FBBF24"}">FOUNDATION</text></svg>`;

writeFileSync(path.join(tmp, "logo-mark.svg"), mark(false));
writeFileSync(path.join(tmp, "logo-mark-navy.svg"), mark(true));
writeFileSync(path.join(tmp, "logo-lockup-on-light.svg"), lockup(true));
writeFileSync(path.join(tmp, "logo-lockup-on-dark.svg"), lockup(false));

const factSheet = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;color:#0F172A;font-size:10.5pt;line-height:1.5}
header{background:#0F172A;color:#fff;padding:36px 48px 30px}h1,h2{font-family:'Playfair Display',Georgia,serif;font-weight:600;margin:0}
h1{font-size:28pt;line-height:1.1}.tag{color:#FBBF24;font-style:italic}.eyebrow{font-size:8pt;letter-spacing:.25em;text-transform:uppercase;color:#FBBF24;font-weight:700}
main{padding:28px 48px;display:grid;grid-template-columns:1.25fr 1fr;gap:28px}h2{font-size:14pt;margin:0 0 8px;color:#0F172A;border-bottom:2px solid #D97706;padding-bottom:4px}
section{margin-bottom:18px}ul{margin:0;padding-left:16px}li{margin:2px 0}dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:4px 12px}dt{font-weight:700}dd{margin:0}
.pill{display:inline-block;background:#ECFDF5;color:#047857;border-radius:99px;padding:2px 10px;margin:2px 4px 2px 0;font-weight:600;font-size:9pt}
footer{position:absolute;bottom:0;left:0;right:0;padding:14px 48px;background:#F8FAFC;border-top:1px solid #e2e8f0;font-size:8.5pt;color:#475569}
</style></head><body>
<header>${lockup(false).replace('width="900" height="192"','width="240" height="51"')}
<p class="eyebrow" style="margin-top:18px">Press fact sheet</p><h1>A Beacon of Hope.<br><span class="tag">An Icon of Action.</span></h1></header>
<main><div>
<section><h2>About the Foundation</h2><p>The Syndy Emade Foundation protects vulnerable youth, delivers mobile crisis relief, funds scholarships and empowers communities across Cameroon, Africa and the diaspora.</p></section>
<section><h2>Three pillars</h2><ul><li><strong>The Philanthropist</strong> — youth protection & care, educational grants, vocational training</li><li><strong>The Humanitarian</strong> — mobile crisis response (“Chantiers Mobiles Crise”), emergency relief, healthcare outreach</li><li><strong>The Cultural Icon</strong> — cinema for social good, youth & arts mentorship, the creative economy</li></ul></section>
<section><h2>Programmes</h2><span class="pill">Youth Protection & Care</span><span class="pill">Mobile Crisis Response</span><span class="pill">Educational Grants</span><span class="pill">Women Empowerment</span></section>
<section><h2>Ways to give</h2><p>Card (one-time or monthly), PayPal, and MTN MoMo / Orange Money in XAF.</p></section>
</div><div>
<section><h2>The founder</h2><dl><dt>Name</dt><dd>Syndy Emade (Elone Synthia Emade)</dd><dt>Born</dt><dd>21 Nov 1993, Kumba, Cameroon</dd><dt>Education</dt><dd>B.Sc. Banking & Finance, University of Buea</dd><dt>Roles</dt><dd>Actress, producer, CEO of Blue Rain Entertainment, philanthropist</dd></dl></section>
<section><h2>Honours</h2><ul><li>Miss Heritage Cameroon 2014</li><li>Miss Heritage Africa 2014</li><li>Scoos Academy Award, Best Cameroonian Actress 2017</li><li>Ranked #2 Most Active Cameroonian Actress, Njoka TV 2017</li></ul></section>
<section><h2>Selected films</h2><p><em>A Man for the Weekend</em> (2017), <em>Broken</em> (2019), <em>4th Generation</em> (2021), <em>Silent Storm</em> (2023), <em>A Kiss That Kills</em> (2024)</p></section>
</div></main>
<footer>Media enquiries: hello@syndyemadefoundation.org · syndyemadefoundation.org · facebook.com/SyndyEmadeofficial · YouTube: Syndy Emade TV</footer>
</body></html>`;
writeFileSync(path.join(tmp, "fact-sheet.html"), factSheet);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("file://" + path.join(tmp, "fact-sheet.html"), { waitUntil: "networkidle" });
await page.pdf({ path: path.join(tmp, "Syndy-Emade-Foundation-Fact-Sheet.pdf"), format: "A4", printBackground: true });
for (const f of ["logo-mark", "logo-mark-navy", "logo-lockup-on-light", "logo-lockup-on-dark"]) {
  await page.goto("file://" + path.join(tmp, f + ".svg"));
  await page.locator("svg").screenshot({ path: path.join(tmp, f + ".png"), omitBackground: true });
}
await browser.close();
rmSync(path.join(tmp, "fact-sheet.html"));
writeFileSync(path.join(tmp, "README.txt"), "Syndy Emade Foundation press kit\n\nfact sheet (PDF), logo mark and lockups (SVG + PNG).\nUse the on-dark lockup on navy or photographic backgrounds; on-light on white.\nPlease do not recolour or distort the logo.\n\nMedia enquiries: hello@syndyemadefoundation.org\n");
const zip = path.join(out, "syndy-emade-foundation-press-kit.zip");
rmSync(zip, { force: true });
execFileSync("zip", ["-qr", zip, "."], { cwd: tmp });
execFileSync("cp", [path.join(tmp, "Syndy-Emade-Foundation-Fact-Sheet.pdf"), path.join(out, "fact-sheet.pdf")]);
rmSync(tmp, { recursive: true, force: true });
console.log("wrote", zip);
