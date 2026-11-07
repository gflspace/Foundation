import { NextResponse } from "next/server";
import { lastMaintenanceRun } from "@/lib/server/content-repo";
import { adminEmail, mailConfigured, sendMail } from "@/lib/server/mail";
import { buildRunReport } from "@/lib/server/run-report";
import { readJson, writeJson } from "@/lib/server/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Emails the latest maintenance report (ops/maintenance/last-run.json, deployed with the site) to the admin.
 * Idempotent: each run is emailed at most once, so calling this repeatedly cannot spam the inbox.
 * The maintenance job calls it after every deploy.
 */
export async function GET() {
  const run = await lastMaintenanceRun();
  if (!run?.lastRun) return NextResponse.json({ ok: true, status: "no-run" });
  // A corrected report for the same run (revision bumped in last-run.json) is sent once more.
  const key = run.revision ? `${run.lastRun}#${run.revision}` : run.lastRun;
  const sent = await readJson<{ lastRun?: string }>("run-report-sent.json", {});
  if (sent.lastRun === key) return NextResponse.json({ ok: true, status: "already-sent", lastRun: run.lastRun });
  if (!mailConfigured() || !adminEmail()) return NextResponse.json({ ok: false, status: "mail-not-configured" }, { status: 503 });
  const r = buildRunReport(run);
  const ok = await sendMail({ to: adminEmail(), subject: r.subject, text: r.text, html: r.html, replyTo: "support@syndyemadefoundation.org", kind: "maintenance-report", ref: run.lastRun });
  if (ok) await writeJson("run-report-sent.json", { lastRun: key, at: new Date().toISOString() });
  return NextResponse.json({ ok, status: ok ? "sent" : "send-failed", lastRun: run.lastRun }, { status: ok ? 200 : 502 });
}
