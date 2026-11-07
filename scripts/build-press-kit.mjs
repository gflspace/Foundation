// Builds public/press/syndy-emade-foundation-press-kit{,-fr}.zip and fact-sheet{,-fr}.pdf
// (fact sheet + official logo files). Facts come from docs/content-brief.md.
// Usage: node scripts/build-press-kit.mjs   (requires Playwright + `zip`)
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright"); // global install is fine: NODE_PATH=$(npm root -g)
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const out = path.resolve("public/press");
const brand = path.resolve("public/brand");
const tmp = path.join(out, ".build");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

const logo = `data:image/png;base64,${readFileSync(path.join(brand, "logo.png")).toString("base64")}`;
const TEAL = "#00756F", PURPLE = "#703890", PLUM = "#2A1238";

const factSheet = (L) => `<!doctype html><html lang="${L.lang}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;color:${PLUM};font-size:10.5pt;line-height:1.5;position:relative;min-height:297mm}
header{position:relative;overflow:hidden;padding:32px 48px 26px;display:flex;align-items:center;gap:32px;border-bottom:4px solid #00A8A0}
header::before{content:"";position:absolute;right:-90px;top:-90px;width:280px;height:280px;border-radius:50%;background:#ECF8F7;z-index:-1}
header img{width:150px;height:auto}h1,h2{font-family:'Poppins',Arial,sans-serif;font-weight:700;margin:0}
h1{font-size:30pt;line-height:1.05;color:${TEAL}}h1 span{color:${PURPLE};display:block}.eyebrow{font-size:8pt;letter-spacing:.25em;text-transform:uppercase;color:${TEAL};font-weight:700;margin:0 0 6px}
main{padding:26px 48px 80px;display:grid;grid-template-columns:1.25fr 1fr;gap:28px}h2{font-size:13pt;margin:0 0 8px;border-bottom:2px solid #7FD6D0;padding-bottom:4px}
section{margin-bottom:16px}ul{margin:0;padding-left:16px}li{margin:2px 0}dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:4px 12px}dt{font-weight:700}dd{margin:0}
.stats{display:flex;gap:10px;margin-bottom:16px}.stat{flex:1;border-radius:12px;background:#ECF8F7;padding:10px 12px}.stat b{display:block;font-family:Poppins,Arial;font-size:20pt;color:${TEAL};line-height:1}.stat:nth-child(2) b{color:${PURPLE}}.stat:nth-child(2){background:#F4EEF8}
.stat small{font-size:8pt}
footer{position:absolute;bottom:0;left:0;right:0;padding:14px 48px;background:#F7FAFA;border-top:1px solid #D3F0EE;font-size:8.5pt;color:#4E2A63}
</style></head><body>
<header><img src="${logo}" alt="Syndy Emade Foundation"><div><p class="eyebrow">${L.eyebrow}</p><h1>${L.l1}<span>${L.l2}</span></h1></div></header>
${L.main}
${L.footer}
</body></html>`;

const LANGS = {
  en: { lang: "en", eyebrow: "Press fact sheet", l1: "Together", l2: "we can.", suffix: "", pdf: "Syndy-Emade-Foundation-Fact-Sheet.pdf",
    readme: "Syndy Emade Foundation press kit\n\nFact sheet (PDF) and the official logo (PNG).\n- logo.png: transparent background, for white or light backgrounds\n- logo-original.png: as supplied, on white\nThe purple lettering is not legible on dark backgrounds: place the logo on white.\nPlease do not recolour or distort the logo.\n\nMedia enquiries: info@syndyemadefoundation.org\n",
    main: `<main><div>
<section><h2>About the Foundation</h2><p>Founded in 2019 by actress and producer Syndy Emade, the Foundation stands with children and families hit hardest by hardship and by the crisis in Cameroon’s North-West and South-West regions, many of whom now live in Douala.</p></section>
<div class="stats"><div class="stat"><b>600+</b><small>displaced children given school materials</small></div><div class="stat"><b>300</b><small>children’s school fees paid</small></div><div class="stat"><b>2019</b><small>founded</small></div></div>
<section><h2>Programmes</h2><ul><li><strong>Back to school</strong>: school materials and fees for displaced and underprivileged children</li><li><strong>Displaced families</strong>: food and essentials for families who fled the crisis, through the “Chantiers Mobiles Crise” outreach (Bonaberi, Douala)</li><li><strong>Christmas outreach</strong>: door-to-door support at the festive season, including a year’s rent for a visually impaired mother and her three sons (2023)</li><li><strong>Child protection</strong>: speaking up for street children and against child exploitation</li><li><strong>Women and partnerships</strong>: work with partner organisations, including International Women’s Day with the Wilmbi Foundation</li></ul></section>
</div><div>
<section><h2>The founder</h2><dl><dt>Name</dt><dd>Syndy Emade (Elone Synthia Emade)</dd><dt>Born</dt><dd>21 Nov 1993, Kumba, Cameroon</dd><dt>Education</dt><dd>B.Sc. Banking &amp; Finance, University of Buea</dd><dt>Roles</dt><dd>Actress, producer, CEO of Blue Rain Entertainment, philanthropist</dd></dl></section>
<section><h2>In the press</h2><ul><li>Mimi Mefo Info, Dec 2023: Christmas support for a visually impaired mother</li><li>Newsday Cameroon, 2021: outreach to displaced families in Bonaberi</li></ul></section>
<section><h2>Watch</h2><p>Films of our outreaches on the Syndy Emade TV YouTube channel.</p></section>
</div></main>`, footer: `<footer>Media enquiries: info@syndyemadefoundation.org · syndyemadefoundation.org · facebook.com/SyndyEmadeFoundation · instagram.com/syndyemadefoundationcmr · YouTube: Syndy Emade TV</footer>` },
  fr: { lang: "fr", eyebrow: "Fiche d’information presse", l1: "Ensemble,", l2: "nous pouvons.", suffix: "-fr", pdf: "Fondation-Syndy-Emade-Fiche-information.pdf",
    readme: "Dossier de presse de la Fondation Syndy Emade\n\nFiche d’information (PDF) et logo officiel (PNG).\n- logo.png : fond transparent, pour fonds blancs ou clairs\n- logo-original.png : version fournie, sur fond blanc\nLe lettrage violet n’est pas lisible sur fond sombre : placez le logo sur fond blanc.\nMerci de ne pas modifier les couleurs ni les proportions du logo.\n\nContact presse : info@syndyemadefoundation.org\n",
    main: `<main><div>
<section><h2>La Fondation</h2><p>Créée en 2019 par l’actrice et productrice Syndy Emade, la Fondation se tient aux côtés des enfants et des familles les plus touchés par la précarité et par la crise des régions du Nord-Ouest et du Sud-Ouest du Cameroun, dont beaucoup vivent aujourd’hui à Douala.</p></section>
<div class="stats"><div class="stat"><b>600+</b><small>enfants déplacés équipés pour l’école</small></div><div class="stat"><b>300</b><small>frais de scolarité payés</small></div><div class="stat"><b>2019</b><small>création</small></div></div>
<section><h2>Programmes</h2><ul><li><strong>Rentrée scolaire</strong> : fournitures et frais de scolarité pour les enfants déplacés et défavorisés</li><li><strong>Familles déplacées</strong> : vivres et produits essentiels pour les familles qui ont fui la crise, avec les «&nbsp;Chantiers Mobiles Crise&nbsp;» (Bonaberi, Douala)</li><li><strong>Noël solidaire</strong> : une aide en porte-à-porte pendant les fêtes, dont un an de loyer pour une mère malvoyante et ses trois fils (2023)</li><li><strong>Protection de l’enfance</strong> : aux côtés des enfants des rues, contre l’exploitation des enfants</li><li><strong>Femmes et partenariats</strong> : des actions avec des organisations partenaires, dont la Journée internationale des femmes avec la Wilmbi Foundation</li></ul></section>
</div><div>
<section><h2>La fondatrice</h2><dl><dt>Nom</dt><dd>Syndy Emade (Elone Synthia Emade)</dd><dt>Naissance</dt><dd>21 nov. 1993, Kumba, Cameroun</dd><dt>Formation</dt><dd>Licence en banque et finance, Université de Buea</dd><dt>Fonctions</dt><dd>Actrice, productrice, PDG de Blue Rain Entertainment, philanthrope</dd></dl></section>
<section><h2>Dans la presse</h2><ul><li>Mimi Mefo Info, déc. 2023 : soutien de Noël à une mère malvoyante</li><li>Newsday Cameroon, 2021 : action auprès des familles déplacées à Bonaberi</li></ul></section>
<section><h2>Regarder</h2><p>Les films de nos actions sur la chaîne YouTube Syndy Emade TV.</p></section>
</div></main>`, footer: `<footer>Contact presse&nbsp;: info@syndyemadefoundation.org · syndyemadefoundation.org/fr · facebook.com/SyndyEmadeFoundation · instagram.com/syndyemadefoundationcmr · YouTube&nbsp;: Syndy Emade TV</footer>` },
};

const browser = await chromium.launch();
const page = await browser.newPage();
for (const L of Object.values(LANGS)) {
  const dir = path.join(tmp, L.lang);
  mkdirSync(dir, { recursive: true });
  for (const f of ["logo.png", "logo-original.png"]) copyFileSync(path.join(brand, f), path.join(dir, f));
  const html = path.join(dir, "fact-sheet.html");
  writeFileSync(html, factSheet(L));
  await page.goto("file://" + html, { waitUntil: "networkidle" });
  await page.pdf({ path: path.join(dir, L.pdf), format: "A4", printBackground: true });
  rmSync(html);
  writeFileSync(path.join(dir, "README.txt"), L.readme);
  const zip = path.join(out, `syndy-emade-foundation-press-kit${L.suffix}.zip`);
  rmSync(zip, { force: true });
  execFileSync("zip", ["-qr", zip, "."], { cwd: dir });
  copyFileSync(path.join(dir, L.pdf), path.join(out, `fact-sheet${L.suffix}.pdf`));
  console.log("wrote", zip);
}
await browser.close();
rmSync(tmp, { recursive: true, force: true });
