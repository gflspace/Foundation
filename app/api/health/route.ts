import { NextResponse } from "next/server";
import { mailConfigured } from "@/lib/server/mail";
import { writeJson } from "@/lib/server/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Liveness and readiness for the monitors: is the app up, can it store records, is mail configured. */
export async function GET() {
  let storage = true;
  try { await writeJson("health-probe.json", { at: new Date().toISOString() }); } catch { storage = false; }
  const mail = mailConfigured();
  return NextResponse.json(
    { ok: storage, time: new Date().toISOString(), uptimeSeconds: Math.round(process.uptime()), checks: { storage, mail } },
    { status: storage ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
