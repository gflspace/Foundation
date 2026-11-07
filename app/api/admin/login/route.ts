import { seeOther } from "@/lib/server/redirect";
import { NextResponse } from "next/server";
import { COOKIE, adminEnabled, makeToken, passwordOk } from "@/lib/server/admin-auth";
import { appendRecord } from "@/lib/server/store";

export const runtime = "nodejs";
const fails = new Map<string, number[]>();

export async function POST(req: Request) {
  if (!adminEnabled()) return new NextResponse("Not found", { status: 404 });
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (fails.get(ip) ?? []).filter((t) => now - t < 15 * 60_000);
  if (recent.length >= 5) return seeOther("/admin?e=locked");
  const form = await req.formData();
  const ok = passwordOk(String(form.get("password") ?? ""));
  await appendRecord("admin-log.jsonl", { at: new Date().toISOString(), event: ok ? "login" : "login-failed", ip }).catch(() => {});
  if (!ok) {
    fails.set(ip, [...recent, now]);
    return seeOther("/admin?e=1");
  }
  const res = seeOther("/admin");
  res.cookies.set(COOKIE, makeToken(), { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 12 * 3600 });
  return res;
}
