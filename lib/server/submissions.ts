import "server-only";
import { randomBytes } from "node:crypto";
import { adminEmail, sendMail } from "./mail";
import { appendRecord } from "./store";

export type FormType = "newsletter" | "volunteer" | "partner" | "collaboration" | "press";
export type Submission = {
  ref: string;
  type: FormType;
  email: string;
  name?: string;
  phone?: string;
  location?: string;
  organisation?: string;
  orgType?: string;
  interest?: string;
  message?: string;
  deadline?: string;
  locale: "en" | "fr";
  submittedAt: string;
};

const CODE: Record<FormType, string> = { newsletter: "NEWS", volunteer: "VOL", partner: "PAR", collaboration: "COL", press: "PRS" };
const LABEL: Record<FormType, string> = {
  newsletter: "Newsletter subscription",
  volunteer: "Volunteer Application",
  partner: "Partnership Application",
  collaboration: "Collaboration Proposal",
  press: "Press Enquiry",
};

/** Human-readable, unique reference, e.g. SEF-VOL-261107-7K3QF. */
export function newRef(type: FormType, now = new Date()) {
  const d = now.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = randomBytes(4).readUInt32BE(0).toString(36).toUpperCase().padStart(6, "0").slice(0, 5);
  return `SEF-${CODE[type]}-${d}-${rand}`;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(s: Submission): [string, string][] {
  const r: [string, string | undefined][] = [
    ["Reference", s.ref],
    ["Type", LABEL[s.type]],
    ["Submitted", `${s.submittedAt} (UTC)`],
    ["Name", s.name],
    ["Email", s.email],
    ["Phone / WhatsApp", s.phone],
    ["City / Country", s.location],
    ["Organisation", s.organisation],
    ["Organisation type", s.orgType],
    [s.type === "partner" ? "Partnership type" : "Area of interest", s.interest],
    ["Deadline", s.deadline],
    ["Language", s.locale === "fr" ? "French" : "English"],
    ["Message", s.message],
  ];
  return r.filter((x): x is [string, string] => Boolean(x[1]));
}

export function adminSubject(s: Submission) {
  const who = s.type === "partner" || s.type === "collaboration" ? s.organisation || s.name : s.name;
  return `New ${LABEL[s.type]}${who ? ` – ${who}` : ` – ${s.email}`} [${s.ref}]`;
}

function adminMail(s: Submission) {
  const r = rows(s);
  return {
    to: adminEmail(),
    replyTo: s.email,
    subject: adminSubject(s),
    text: r.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\nReply to this email to answer the applicant directly.",
    html: `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${r.map(([k, v]) => `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top;color:#3a1f3d">${esc(k)}</th><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`).join("")}</table><p style="font-family:Arial,sans-serif;font-size:13px;color:#666">Reply to this email to answer the applicant directly.</p>`,
    kind: `admin:${s.type}`,
    ref: s.ref,
  };
}

const ACK = {
  en: {
    newsletter: ["You’re subscribed to the Syndy Emade Foundation’s news", "Thank you for subscribing. We’ll write when there is news from our work."],
    volunteer: ["We received your volunteer application", "Thank you for offering your time. Our team reviews every application and will get back to you."],
    partner: ["We received your partnership application", "Thank you for your interest in partnering with us. Our team will get back to you."],
    collaboration: ["We received your collaboration proposal", "Thank you for your proposal. Our team will review it and get back to you."],
    press: ["We received your press enquiry", "Thank you. We aim to reply within two working days."],
    ref: "Your reference", sign: "The Syndy Emade Foundation team · Together we can",
  },
  fr: {
    newsletter: ["Vous êtes inscrit·e aux nouvelles de la Fondation Syndy Emade", "Merci de votre inscription. Nous vous écrirons lorsque nous aurons des nouvelles de notre action."],
    volunteer: ["Nous avons bien reçu votre candidature de bénévole", "Merci d’offrir votre temps. Notre équipe étudie chaque candidature et reviendra vers vous."],
    partner: ["Nous avons bien reçu votre demande de partenariat", "Merci de votre intérêt pour un partenariat. Notre équipe reviendra vers vous."],
    collaboration: ["Nous avons bien reçu votre proposition de collaboration", "Merci pour votre proposition. Notre équipe l’étudiera et reviendra vers vous."],
    press: ["Nous avons bien reçu votre demande presse", "Merci. Nous répondons en principe sous deux jours ouvrés."],
    ref: "Votre référence", sign: "L’équipe de la Fondation Syndy Emade · Ensemble, nous pouvons",
  },
} as const;

function ackMail(s: Submission) {
  const a = ACK[s.locale];
  const [subject, body] = a[s.type];
  const hello = s.name ? (s.locale === "fr" ? `Bonjour ${s.name},` : `Dear ${s.name},`) : s.locale === "fr" ? "Bonjour," : "Hello,";
  const colon = s.locale === "fr" ? " :" : ":";
  const text = `${hello}\n\n${body}\n\n${a.ref}${colon} ${s.ref}\n\n${a.sign}`;
  return {
    to: s.email,
    replyTo: adminEmail() || undefined,
    subject: `${subject} (${s.ref})`,
    text,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#2b1630;line-height:1.5"><p>${esc(hello)}</p><p>${esc(body)}</p><p><strong>${esc(a.ref)}${colon}</strong> ${esc(s.ref)}</p><p style="color:#00a8a0">${esc(a.sign)}</p></div>`,
    kind: `ack:${s.type}`,
    ref: s.ref,
  };
}

export type Outcome = { stored: boolean; admin?: boolean; ack?: boolean };

async function deliver(s: Submission, which: { admin: boolean; ack: boolean } = { admin: true, ack: true }) {
  const admin = which.admin && adminEmail() ? await sendMail(adminMail(s)) : undefined;
  const ack = which.ack ? await sendMail(ackMail(s)) : undefined;
  await appendRecord("submission-status.jsonl", { ref: s.ref, at: new Date().toISOString(), stored: true, admin, ack }).catch(() => {});
  return { admin, ack };
}

/**
 * Store first (so nothing is lost), then notify the administrator and acknowledge the sender in the
 * background, so the visitor never waits for mail retries. Every attempt is logged.
 */
export async function processSubmission(s: Submission, { wait = false } = {}): Promise<Outcome> {
  try {
    await appendRecord("submissions.jsonl", s);
  } catch (e) {
    console.error("[forms] could not store submission", s.ref, e);
    return { stored: false, ...(await deliver(s)) }; // storage down: mail is the only record, so wait for it
  }
  const job = deliver(s).catch((e) => console.error("[forms] delivery error", s.ref, e));
  if (wait) return { stored: true, ...((await job) || {}) };
  return { stored: true };
}

/** Re-send notifications whose last attempt failed (admin dashboard “Retry failed emails”). Idempotent per ref. */
export async function retryFailed(subs: Submission[], status: { ref: string; admin?: boolean; ack?: boolean }[]) {
  const last = new Map<string, { admin?: boolean; ack?: boolean }>();
  for (const x of status) last.set(x.ref, { ...last.get(x.ref), ...Object.fromEntries(Object.entries(x).filter(([, v]) => v !== undefined)) });
  let retried = 0;
  for (const s of subs) {
    const st = last.get(s.ref);
    if (!st) continue;
    const which = { admin: st.admin === false, ack: st.ack === false };
    if (!which.admin && !which.ack) continue;
    await deliver(s, which);
    retried++;
  }
  return retried;
}
