import { NextResponse } from "next/server";
import { newRef, processSubmission, type FormType, type Submission } from "@/lib/server/submissions";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPES = new Set<FormType>(["newsletter", "volunteer", "partner", "collaboration", "press"]);
const clip = (v: unknown, n = 2000) => (typeof v === "string" && v.trim() ? v.trim().slice(0, n) : undefined);

// Light rate limit per client: 8 submissions per 10 minutes (in memory, per server process).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

/**
 * Receives every website form (newsletter, volunteer, partner, collaboration, press).
 * Validates on the server, stores the submission with a reference ID, emails the administrator,
 * sends the visitor an acknowledgement, and optionally forwards to FORMS_WEBHOOK_URL.
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

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

  const type = clip(data.type, 20) as FormType | undefined;
  const email = clip(data.email, 200);
  if (!type || !TYPES.has(type) || !email || !EMAIL.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }
  const name = clip(data.name, 200);
  if (type !== "newsletter" && !name) return NextResponse.json({ error: "Please provide your name." }, { status: 400 });

  const now = new Date();
  const submission: Submission = {
    ref: newRef(type, now),
    type,
    email,
    name,
    phone: clip(data.phone, 50),
    location: clip(data.location, 200),
    organisation: clip(data.organisation, 200),
    orgType: clip(data.orgType, 40),
    interest: clip(data.interest, 200),
    message: clip(data.message),
    deadline: clip(data.deadline, 20),
    locale: data.locale === "fr" ? "fr" : "en",
    submittedAt: now.toISOString(),
  };

  const outcome = await processSubmission(submission);

  const hook = process.env.FORMS_WEBHOOK_URL;
  if (hook) {
    await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(submission) }).catch(() => null);
  }

  if (!outcome.stored && !outcome.admin) {
    return NextResponse.json({ error: "Could not submit right now. Please try again or email us." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, ref: submission.ref });
}
