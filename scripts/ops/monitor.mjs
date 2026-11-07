#!/usr/bin/env node
/**
 * Website monitor for the Syndy Emade Foundation site. Runs on a schedule (GitHub Actions and/or a
 * Hostinger cron job) with no Claude session involved.
 *
 *   node scripts/ops/monitor.mjs            run checks, open/close incidents, alert on changes
 *   node scripts/ops/monitor.mjs --report   also send the weekly summary
 *
 * Config (environment): SITE_URL (required); ALERT_EMAIL + SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS for
 * email alerts; GITHUB_TOKEN + GITHUB_REPOSITORY for GitHub-issue alerts; MONITOR_STATE for a local
 * state file (cron mode). Alerts are de-duplicated: one alert when an incident opens, one when it closes.
 */
import tls from "node:tls";
import { readFile, writeFile, mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

const SITE = (process.env.SITE_URL || "").replace(/\/$/, "");
if (!SITE) { console.error("SITE_URL is required"); process.exit(2); }
const REPORT = process.argv.includes("--report");
const PAGES = ["/", "/stories", "/media", "/get-involved", "/donate", "/fr", "/stories/a-home-for-a-family-2023"];
const SLOW_MS = 4000;

async function timed(url, opts = {}) {
  const t = Date.now();
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000), ...opts });
    const body = opts.method === "HEAD" ? "" : await res.text();
    return { status: res.status, ms: Date.now() - t, body, type: res.headers.get("content-type") || "" };
  } catch (e) {
    return { status: 0, ms: Date.now() - t, body: "", error: String(e?.cause?.code || e?.message || e) };
  }
}

function certDays(host) {
  return new Promise((resolve) => {
    const s = tls.connect({ host, port: 443, servername: host, timeout: 15000 }, () => {
      const c = s.getPeerCertificate(); s.end();
      resolve(c?.valid_to ? Math.floor((Date.parse(c.valid_to) - Date.now()) / 86400000) : null);
    });
    s.on("error", () => resolve(null)); s.on("timeout", () => { s.destroy(); resolve(null); });
  });
}

const checks = [];
const add = (name, ok, extra = {}) => checks.push({ name, ok, ...extra });

for (const p of PAGES) {
  const r = await timed(SITE + p);
  add(`page ${p}`, r.status === 200 && r.ms < SLOW_MS * 3, { ms: r.ms, detail: r.status ? `HTTP ${r.status}${r.ms > SLOW_MS ? " (slow)" : ""}` : r.error, slow: r.ms > SLOW_MS });
  if (p === "/media" && r.status === 200) {
    const imgs = [...new Set([...r.body.replace(/%2F/gi, "/").matchAll(/\/gallery\/[a-z0-9-]+\/\d+\.jpg/g)].map((m) => m[0]))].slice(0, 8);
    let broken = 0;
    for (const i of imgs) { const x = await timed(SITE + i, { method: "HEAD" }); if (x.status !== 200) broken++; }
    add("gallery images", broken === 0 && imgs.length > 0, { detail: `${imgs.length - broken}/${imgs.length} load` });
  }
}
const h = await timed(SITE + "/api/health");
let hj = {}; try { hj = JSON.parse(h.body); } catch {}
add("app health", h.status === 200 && hj.ok === true, { ms: h.ms, detail: h.status ? `storage ${hj.checks?.storage ? "ok" : "FAIL"}, mail ${hj.checks?.mail ? "configured" : "not configured"}` : h.error });
add("form endpoint", (await timed(SITE + "/api/forms", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" })).status === 400, { detail: "rejects empty submissions" });
if (SITE.startsWith("https://")) {
  const days = await certDays(new URL(SITE).hostname);
  add("SSL certificate", days !== null && days > 14, { detail: days === null ? "unreadable" : `${days} days left` });
}

const failing = checks.filter((c) => !c.ok);
const now = new Date().toISOString();
console.log(`[${now}] ${checks.length - failing.length}/${checks.length} checks passing on ${SITE}`);
for (const c of checks) console.log(`  ${c.ok ? "PASS" : "FAIL"} ${c.name} ${c.ms ? c.ms + "ms " : ""}${c.detail ?? ""}`);

// ---------- alerting ----------
async function sendEmail(subject, text) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, ALERT_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ALERT_EMAIL) return false;
  const nodemailer = (await import("nodemailer")).default;
  const port = Number(process.env.SMTP_PORT || 465);
  const t = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  const signature = "\n\n--\nTech Support Team\nSyndy Emade Foundation\nsupport@syndyemadefoundation.org\n\"Together we can.\"";
  await t.sendMail({ from: `"Syndy Emade Foundation – Tech Support" <${SMTP_USER}>`, to: ALERT_EMAIL, replyTo: "support@syndyemadefoundation.org", subject, text: text + signature });
  return true;
}
const gh = async (method, url, body) => {
  const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}${url}`, {
    method, headers: { authorization: `Bearer ${process.env.GITHUB_TOKEN}`, accept: "application/vnd.github+json", "content-type": "application/json" }, body: body && JSON.stringify(body),
  });
  return res.ok ? res.json() : null;
};
const useGH = Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPOSITORY);

// Open incidents: from GitHub issues (Actions mode) or a local state file (cron mode).
const statePath = process.env.MONITOR_STATE;
let open = {};
if (useGH) {
  for (const i of (await gh("GET", "/issues?labels=site-monitor&state=open&per_page=50")) || []) open[i.title.replace(/^Website issue: /, "")] = i.number;
} else if (statePath) {
  try { open = JSON.parse(await readFile(statePath, "utf8")).open || {}; } catch {}
}
const failingNames = new Set(failing.map((c) => c.name));
for (const c of failing) {
  if (open[c.name]) continue;
  const text = `Check failed: ${c.name}\nDetail: ${c.detail ?? ""}\nSite: ${SITE}\nTime: ${now}\n\nRecommended next step: open ${SITE}${c.name.startsWith("page ") ? c.name.slice(5) : ""} and check the Hostinger build and runtime logs.`;
  if (useGH) { const i = await gh("POST", "/issues", { title: `Website issue: ${c.name}`, body: text, labels: ["site-monitor"] }); open[c.name] = i?.number ?? true; }
  else open[c.name] = now;
  await sendEmail(`[ALERT] Website issue: ${c.name}`, text).catch((e) => console.error("email failed", e.message));
}
for (const [name, ref] of Object.entries(open)) {
  if (failingNames.has(name)) continue;
  if (useGH && typeof ref === "number") { await gh("POST", `/issues/${ref}/comments`, { body: `Recovered at ${now}.` }); await gh("PATCH", `/issues/${ref}`, { state: "closed" }); }
  await sendEmail(`[RESOLVED] Website issue: ${name}`, `Recovered at ${now} on ${SITE}.`).catch(() => {});
  delete open[name];
}
if (statePath) {
  await mkdir(path.dirname(statePath), { recursive: true });
  await writeFile(statePath, JSON.stringify({ lastRun: now, checks, open, incidents: Object.entries(open).map(([key, since]) => ({ key, since })) }, null, 2));
  await appendFile(path.join(path.dirname(statePath), "monitor-history.jsonl"), JSON.stringify({ at: now, passing: checks.length - failing.length, total: checks.length, failing: [...failingNames] }) + "\n");
}

if (REPORT) {
  const text = [`Weekly website report – ${now.slice(0, 10)}`, "", `Site: ${SITE}`, `Checks passing now: ${checks.length - failing.length}/${checks.length}`, "",
    ...checks.map((c) => `${c.ok ? "OK  " : "FAIL"} ${c.name} ${c.ms ? c.ms + " ms " : ""}${c.detail ?? ""}`), "",
    `Open incidents: ${Object.keys(open).length ? Object.keys(open).join(", ") : "none"}`].join("\n");
  const sent = await sendEmail(`Weekly website report – ${now.slice(0, 10)}`, text).catch(() => false);
  if (!sent && useGH) await gh("POST", "/issues", { title: `Weekly website report – ${now.slice(0, 10)}`, body: "```\n" + text + "\n```", labels: ["weekly-report"] });
  console.log(text);
}
