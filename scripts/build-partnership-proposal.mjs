// Builds public/press/partnership-proposal.pdf and proposition-de-partenariat.pdf (2 pages, A4).
// Facts mirror lib/platform.ts and docs/content-brief.md: verified figures only.
// Usage: NODE_PATH=$(npm root -g) node scripts/build-partnership-proposal.mjs
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const out = path.resolve("public/press");
const tmp = path.join(out, ".proposal");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
const logo = `data:image/png;base64,${readFileSync(path.resolve("public/brand/logo.png")).toString("base64")}`;

const css = `@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;color:#2A1238;font-size:10.5pt;line-height:1.5}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;padding:22mm 18mm 18mm}
.page:last-child{page-break-after:auto}
h1,h2,h3{font-family:Poppins,Arial,sans-serif;margin:0}h1{font-size:30pt;line-height:1.05;color:#00756F}h1 span{display:block;color:#703890}
h2{font-size:14pt;margin:18px 0 8px;color:#2A1238;border-bottom:2px solid #7FD6D0;padding-bottom:3px}
.eyebrow{font-size:8pt;letter-spacing:.25em;text-transform:uppercase;color:#00756F;font-weight:700}
.circle{position:absolute;border-radius:50%}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:14px 0}.stat{background:#ECF8F7;border-radius:12px;padding:10px}.stat:nth-child(even){background:#F4EEF8}
.stat b{display:block;font-family:Poppins,Arial;font-size:20pt;line-height:1;color:#00756F}.stat:nth-child(even) b{color:#703890}.stat small{font-size:8pt}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}ul{margin:0;padding-left:16px}li{margin:3px 0}
.pill{display:inline-block;border-radius:99px;padding:1px 8px;font-size:7.5pt;font-weight:700;margin-left:6px}
.active{background:#00756F;color:#fff}.emerging{background:#E7D9F0;color:#47225C}.proposed{border:1px dashed #2A1238;color:#2A1238}
.footer{position:absolute;bottom:0;left:0;right:0;padding:10px 18mm;background:#F7FAFA;border-top:1px solid #D3F0EE;font-size:8pt;color:#4E2A63}
.box{background:#2A1238;color:#fff;border-radius:14px;padding:14px 16px}.box h3{font-size:12pt;color:#7FD6D0}`;

const L = {
  en: {
    lang: "en", file: "partnership-proposal.pdf",
    eyebrow: "Partnership proposal", l1: "Together, we can", l2: "change lives.",
    lead: "The Syndy Emade Foundation stands with vulnerable children and families in Cameroon. Since its launch on 11 July 2019, every outreach has been documented with a date, a place and a public source.",
    stats: [["600+", "displaced children equipped for school"], ["300", "children’s school fees paid"], ["200+", "displaced people given food at our first outreach"], ["10", "documented activities since July 2019"]],
    workTitle: "What we have done", work: ["Back to school 2019: supplies for 600+ displaced children and school fees for 300 (Douala)", "COVID-19 safety kits for a school in Limbe, with the Elone Foundation (2020)", "Food and essentials for displaced families at Bonaberi (2019, 2020, 2021)", "Buckets, soap, umbrellas and a meal with children living on the street (2021)", "A year’s rent on a new home for a visually impaired mother and her three sons (2023)"],
    pillarsTitle: "Five strategic pillars", pillars: [["Education & Youth Development", "active"], ["Humanitarian Relief", "active"], ["Women Empowerment", "emerging"], ["Community Development", "proposed"], ["Environmental Sustainability", "proposed"]],
    status: { active: "Active", emerging: "Emerging", proposed: "Proposed" },
    whyTitle: "Why partner with us", why: ["A track record you can check: every outreach is documented on film or in the press", "Transparent reporting: each partnership gets a public project record with objectives, activities, outcomes and evidence", "Reach: a founder who is one of Cameroon’s best-known actresses and producers", "Local knowledge: our team visits homes first, so support reaches those who need it most"],
    waysTitle: "Ways to partner", ways: ["Fund a project in an established programme (e.g. the annual back-to-school campaign)", "Sponsor a “One Act of Kindness” campaign for one specific, verified need", "Help build a proposed pillar: women’s economic opportunity, community development, environment", "In-kind support: school supplies, food, logistics, professional skills"],
    howTitle: "How it works", how: ["Tell us what you would like to support", "We agree a project, its objectives and how results will be reported", "The project is delivered and documented", "Results are published on our Accountability page and shared with you"],
    contactTitle: "Let’s talk", contact: "Write to contact@syndyemadefoundation.org or use the form at syndyemadefoundation.org/partners",
    foot: "Syndy Emade Foundation · Douala, Cameroon · syndyemadefoundation.org · Figures as of November 2026, each documented on the website’s Impact and Accountability pages.",
  },
  fr: {
    lang: "fr", file: "proposition-de-partenariat.pdf",
    eyebrow: "Proposition de partenariat", l1: "Ensemble, nous pouvons", l2: "changer des vies.",
    lead: "La Fondation Syndy Emade accompagne les enfants et les familles vulnérables du Cameroun. Depuis son lancement le 11 juillet 2019, chaque action est documentée avec une date, un lieu et une source publique.",
    stats: [["600+", "enfants déplacés équipés pour l’école"], ["300", "frais de scolarité payés"], ["200+", "personnes déplacées nourries lors de notre première action"], ["10", "activités documentées depuis juillet 2019"]],
    workTitle: "Ce que nous avons fait", work: ["Rentrée 2019 : fournitures pour plus de 600 enfants déplacés et scolarité de 300 enfants (Douala)", "Kits anti-COVID-19 pour une école de Limbe, avec la Elone Foundation (2020)", "Vivres pour des familles déplacées à Bonaberi (2019, 2020, 2021)", "Seaux, savon, parapluies et un repas avec des enfants des rues (2021)", "Un an de loyer pour une mère malvoyante et ses trois fils (2023)"],
    pillarsTitle: "Cinq piliers stratégiques", pillars: [["Éducation et jeunesse", "active"], ["Aide humanitaire", "active"], ["Autonomisation des femmes", "emerging"], ["Développement communautaire", "proposed"], ["Durabilité environnementale", "proposed"]],
    status: { active: "Actif", emerging: "Émergent", proposed: "Proposé" },
    whyTitle: "Pourquoi devenir partenaire", why: ["Un bilan vérifiable : chaque action est documentée en film ou dans la presse", "Des résultats publiés : chaque partenariat a sa fiche publique avec objectifs, activités, résultats et preuves", "Portée : une fondatrice parmi les actrices et productrices les plus connues du Cameroun", "Connaissance du terrain : notre équipe visite d’abord les foyers, pour que l’aide arrive à ceux qui en ont le plus besoin"],
    waysTitle: "Formes de partenariat", ways: ["Financer un projet d’un programme établi (par ex. la campagne de rentrée annuelle)", "Parrainer une campagne « Un geste de bonté » pour un besoin précis et vérifié", "Aider à construire un pilier proposé : opportunités économiques des femmes, développement communautaire, environnement", "Soutien en nature : fournitures scolaires, vivres, logistique, compétences"],
    howTitle: "Déroulement", how: ["Dites-nous ce que vous souhaitez soutenir", "Nous convenons d’un projet, de ses objectifs et du suivi des résultats", "Le projet est réalisé et documenté", "Les résultats sont publiés sur notre page Transparence et partagés avec vous"],
    contactTitle: "Parlons-en", contact: "Écrivez à contact@syndyemadefoundation.org ou utilisez le formulaire sur syndyemadefoundation.org/fr/partenaires",
    foot: "Fondation Syndy Emade · Douala, Cameroun · syndyemadefoundation.org · Chiffres à novembre 2026, chacun documenté sur les pages Impact et Transparence du site.",
  },
};

const html = (x) => `<!doctype html><html lang="${x.lang}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet"><style>${css}</style></head><body>
<section class="page">
  <span class="circle" style="right:-60px;top:-60px;width:240px;height:240px;background:#ECF8F7"></span>
  <span class="circle" style="right:150px;top:30px;width:26px;height:26px;background:#703890"></span>
  <img src="${logo}" style="width:120px;position:relative">
  <p class="eyebrow" style="margin-top:18px">${x.eyebrow}</p>
  <h1>${x.l1}<span>${x.l2}</span></h1>
  <p style="font-size:11.5pt;max-width:150mm;margin-top:12px">${x.lead}</p>
  <div class="stats">${x.stats.map(([b, s]) => `<div class="stat"><b>${b}</b><small>${s}</small></div>`).join("")}</div>
  <div class="grid2">
    <div><h2>${x.workTitle}</h2><ul>${x.work.map((w) => `<li>${w}</li>`).join("")}</ul></div>
    <div><h2>${x.pillarsTitle}</h2><ul style="list-style:none;padding:0">${x.pillars.map(([p, s]) => `<li>${p}<span class="pill ${s}">${x.status[s]}</span></li>`).join("")}</ul></div>
  </div>
  <div class="footer">${x.foot}</div>
</section>
<section class="page">
  <div class="grid2">
    <div><h2 style="margin-top:0">${x.whyTitle}</h2><ul>${x.why.map((w) => `<li>${w}</li>`).join("")}</ul></div>
    <div><h2 style="margin-top:0">${x.waysTitle}</h2><ul>${x.ways.map((w) => `<li>${w}</li>`).join("")}</ul></div>
  </div>
  <h2>${x.howTitle}</h2><ol>${x.how.map((w) => `<li>${w}</li>`).join("")}</ol>
  <div class="box" style="margin-top:18px"><h3>${x.contactTitle}</h3><p style="margin:6px 0 0">${x.contact}</p></div>
  <div class="footer">${x.foot}</div>
</section></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
for (const x of Object.values(L)) {
  const f = path.join(tmp, `${x.lang}.html`);
  writeFileSync(f, html(x));
  await page.goto("file://" + f, { waitUntil: "load" });
  await page.waitForTimeout(500);
  await page.pdf({ path: path.join(out, x.file), format: "A4", printBackground: true });
  console.log("wrote", x.file);
}
await browser.close();
rmSync(tmp, { recursive: true, force: true });
