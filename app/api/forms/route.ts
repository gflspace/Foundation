import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPES = new Set(["newsletter", "volunteer", "partner", "press"]);
const clip = (v: unknown, n = 2000) => (typeof v === "string" ? v.trim().slice(0, n) : undefined);

/**
 * Receives newsletter, volunteer and partnership submissions and forwards them
 * to FORMS_WEBHOOK_URL (Zapier / Make / Slack / CRM). Without a webhook, it logs.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (data.company_website) return NextResponse.json({ ok: true });

  const type = clip(data.type, 20);
  const email = clip(data.email, 200);
  if (!type || !TYPES.has(type) || !email || !EMAIL.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }
  if (type !== "newsletter" && !clip(data.name, 200)) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }

  const payload = {
    type,
    email,
    name: clip(data.name, 200),
    phone: clip(data.phone, 50),
    location: clip(data.location, 200),
    organisation: clip(data.organisation, 200),
    interest: clip(data.interest, 200),
    message: clip(data.message),
    deadline: clip(data.deadline, 20),
    locale: data.locale === "fr" ? "fr" : "en",
    submittedAt: new Date().toISOString(),
  };

  const hook = process.env.FORMS_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => null);
    if (!res?.ok) return NextResponse.json({ error: "Could not submit right now." }, { status: 502 });
  } else {
    console.info("[forms] submission (no FORMS_WEBHOOK_URL set):", payload.type, payload.email);
  }
  return NextResponse.json({ ok: true });
}
