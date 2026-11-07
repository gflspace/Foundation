import "server-only";
import type { MaintenanceRun } from "./content-repo";
import { driveRoot } from "./content-repo";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://forestgreen-owl-883522.hostingersite.com";
const TZ = process.env.SEF_TIMEZONE || "Africa/Douala";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const day = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { timeZone: TZ, weekday: "short", day: "numeric", month: "short" });
const when = (iso?: string | null) => (iso ? new Date(iso).toLocaleString("en-GB", { timeZone: TZ, dateStyle: "full", timeStyle: "short" }) : "—");

const C = { plum: "#2A1238", purple: "#703890", teal: "#00756F", mist: "#F7FAFA", line: "#E7D9F0", ok: "#00756F", bad: "#B42318", warn: "#9A6700" };

/** Overall status shown in the subject and the banner. */
export function runStatus(r: MaintenanceRun) {
  const healthBad = (r.health ?? []).some((h) => !h.ok);
  const monitorBad = (r.monitor?.failed ?? 0) > 0 || (r.monitor?.openIssues.length ?? 0) > 0;
  if (healthBad || r.issues.length) return { label: "Action needed", color: C.bad, emoji: "🔴" };
  if (r.pending.length || monitorBad) return { label: "Review needed", color: C.warn, emoji: "🟡" };
  return { label: "All good", color: C.ok, emoji: "🟢" };
}

const SIGNATURE_TEXT = `\n--\nTech Support Team\nSyndy Emade Foundation\nsupport@syndyemadefoundation.org\n"Together we can."`;

function signatureHtml() {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border-top:1px solid ${C.line};padding-top:16px;font-family:Arial,Helvetica,sans-serif;">
<tr><td style="padding-right:14px;vertical-align:middle;"><img src="${SITE}/brand/logo-sm.png" width="64" alt="Syndy Emade Foundation" style="display:block;border:0;"></td>
<td style="border-left:3px solid ${C.teal};padding-left:14px;vertical-align:middle;">
<div style="font-size:15px;font-weight:bold;color:${C.plum};">Tech Support Team</div>
<div style="font-size:13px;color:${C.teal};">Syndy Emade Foundation</div>
<div style="font-size:12px;color:${C.plum};margin-top:4px;"><a href="mailto:support@syndyemadefoundation.org" style="color:${C.plum};text-decoration:none;">support@syndyemadefoundation.org</a></div>
<div style="font-size:12px;font-style:italic;color:${C.purple};margin-top:2px;">Together we can.</div></td></tr></table>`;
}

const section = (title: string, body: string) =>
  `<h2 style="font-size:16px;color:${C.plum};margin:24px 0 8px;">${title}</h2>${body}`;
const table = (head: string[], rows: string[][]) =>
  `<table cellpadding="6" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:13px;">
<tr>${head.map((h) => `<th align="left" style="background:${C.mist};color:${C.plum};border-bottom:1px solid ${C.line};">${h}</th>`).join("")}</tr>
${rows.map((r) => `<tr>${r.map((c) => `<td style="border-bottom:1px solid ${C.line};vertical-align:top;">${c}</td>`).join("")}</tr>`).join("")}</table>`;
const list = (items: string[]) => `<ul style="margin:0;padding-left:18px;font-size:13px;">${items.map((i) => `<li style="margin:3px 0;">${i}</li>`).join("")}</ul>`;
const none = (t: string) => `<p style="font-size:13px;color:#5B4E63;margin:0;">${t}</p>`;

export function buildRunReport(r: MaintenanceRun) {
  const st = runStatus(r);
  const subject = `${st.emoji} Weekly website report – ${new Date(r.lastRun ?? Date.now()).toLocaleDateString("en-GB", { timeZone: TZ, day: "numeric", month: "short", year: "numeric" })} – ${st.label}`;
  const health = r.health ?? [];
  const drive = r.drive ?? [];
  const newFiles = drive.reduce((n, d) => n + d.new, 0);

  const html = `<!doctype html><html><body style="margin:0;background:${C.mist};">
<div style="max-width:640px;margin:0 auto;background:#fff;font-family:Arial,Helvetica,sans-serif;color:${C.plum};">
<div style="background:${C.purple};background-image:linear-gradient(90deg,${C.purple},#00A8A0);padding:20px 24px;color:#fff;">
<div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:.9;">Syndy Emade Foundation · Website maintenance</div>
<div style="font-size:22px;font-weight:bold;margin-top:4px;">Weekly report</div>
<div style="font-size:13px;margin-top:4px;">Run of ${esc(when(r.lastRun))}</div></div>
<div style="padding:20px 24px;">
<div style="display:inline-block;background:${st.color};color:#fff;border-radius:999px;padding:5px 14px;font-size:13px;font-weight:bold;">${st.emoji} ${st.label}</div>
<p style="font-size:14px;line-height:1.5;">${esc(r.summary)}</p>
${table(["Website checks", "Live updates this week", "New uploads", "Waiting for you"], [[
    `${health.filter((h) => h.ok).length}/${health.length} passed`,
    `${(r.activity?.groups ?? []).reduce((n, g) => n + g.count, 0)}`,
    `${newFiles}`,
    `${r.pending.length}`,
  ]])}
${section("Website activity this week", r.activity ? `<p style="font-size:12px;color:#5B4E63;margin:0 0 6px;">What went live on the website, ${esc(day(r.activity.from))} – ${esc(day(r.activity.to))}, by content type.</p>` + table(["Content type", "New / updated", "Details"], r.activity.groups.map((g) => [
    `<strong>${esc(g.category.replace(/-/g, " "))}</strong>`,
    g.count ? `<strong style="color:${C.teal};">${g.count}</strong>` : `<span style="color:#5B4E63;">0</span>`,
    g.items.length ? g.items.slice(0, 5).map((i) => `<a href="${esc(i.url)}" style="color:${C.teal};">${esc(i.title)}</a>`).join("<br>") + (g.items.length > 5 ? `<br><span style="color:#5B4E63;">…and ${g.items.length - 5} more</span>` : "") : `<span style="color:#5B4E63;">No change</span>`,
  ])) : none("Activity data not available."))}
${section("Website checks", health.length ? table(["Check", "Result"], health.map((h) => [`<a href="${esc(h.url)}" style="color:${C.teal};">${esc(h.name)}</a>`, h.ok ? `<span style="color:${C.ok};">✓ OK${h.status ? ` (${h.status})` : ""}</span>` : `<span style="color:${C.bad};">✗ ${esc(h.detail ?? "failed")}</span>`])) : none("No checks recorded."))}
${section("Monitoring this week (every 15 minutes)", r.monitor ? table(["Period", "Monitor runs", "Failed", "Open alerts"], [[`${esc(day(r.monitor.from))} – ${esc(day(r.monitor.to))}`, `${r.monitor.runs}`, `${r.monitor.failed}`, r.monitor.openIssues.length ? r.monitor.openIssues.map((i) => `<a href="${esc(i.url)}" style="color:${C.bad};">${esc(i.title)}</a>`).join("<br>") : "none"]]) : none("Monitor data not available this week."))}
${section("Content repository (Google Drive)", drive.length ? table(["Folder", "Files", "New since last run"], drive.map((d) => [esc(d.folder), `${d.files}`, `${d.new}`])) : none("No folder data recorded."))}
<p style="font-size:12px;margin:8px 0 0;"><a href="${driveRoot}" style="color:${C.teal};">Open FOUNDATION-CONTENT ↗</a></p>
${section("Waiting for your decision", r.pending.length ? list(r.pending.map((p) => `<strong>${esc(p.file)}</strong>: ${esc(p.question)}`)) + `<p style="font-size:12px;color:#5B4E63;">To approve a file, star ⭐ it in Google Drive; it is published on the next run.</p>` : none("Nothing is waiting for you."))}
${section("Published this run", r.published.length ? list(r.published.map((p) => `<a href="${esc(p.url)}" style="color:${C.teal};">${esc(p.title)}</a>`)) : none("Nothing was published."))}
${r.processed.length ? section("Everything reviewed", table(["File", "Folder", "Outcome"], r.processed.map((p) => [esc(p.file), esc(p.folder), esc(p.outcome)]))) : ""}
${section("Issues", r.issues.length ? list(r.issues.map(esc)) : none("No issues."))}
<p style="font-size:13px;margin-top:20px;"><a href="${SITE}/admin" style="background:${C.plum};color:#fff;text-decoration:none;padding:9px 16px;border-radius:999px;font-weight:bold;">Open the admin dashboard</a></p>
${r.nextRun ? `<p style="font-size:12px;color:#5B4E63;">Next run: ${esc(when(r.nextRun))}.</p>` : ""}
${signatureHtml()}
</div></div></body></html>`;

  const lines = [
    `Weekly website report – ${when(r.lastRun)}`, `Status: ${st.label}`, "", r.summary, "",
    "WEBSITE ACTIVITY THIS WEEK", ...(r.activity ? r.activity.groups.map((g) => `- ${g.category}: ${g.count}${g.items.length ? " (" + g.items.slice(0, 5).map((i) => i.title).join("; ") + (g.items.length > 5 ? `; +${g.items.length - 5} more` : "") + ")" : ""}`) : ["- not available"]), "",
    "WEBSITE CHECKS", ...health.map((h) => `- ${h.name}: ${h.ok ? "OK" : `FAILED (${h.detail ?? ""})`}`), "",
    "MONITORING THIS WEEK", r.monitor ? `- ${r.monitor.runs} runs, ${r.monitor.failed} failed, ${r.monitor.openIssues.length} open alert(s)` : "- not available", "",
    "CONTENT (GOOGLE DRIVE)", ...drive.map((d) => `- ${d.folder}: ${d.files} file(s), ${d.new} new`), "",
    "WAITING FOR YOUR DECISION", ...(r.pending.length ? r.pending.map((p) => `- ${p.file}: ${p.question}`) : ["- nothing"]), "",
    "PUBLISHED", ...(r.published.length ? r.published.map((p) => `- ${p.title} ${p.url}`) : ["- nothing"]), "",
    "ISSUES", ...(r.issues.length ? r.issues.map((i) => `- ${i}`) : ["- none"]), "",
    `Admin dashboard: ${SITE}/admin`,
  ];
  return { subject, html, text: lines.join("\n") + SIGNATURE_TEXT };
}
