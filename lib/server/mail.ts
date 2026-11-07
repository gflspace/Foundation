import "server-only";
import nodemailer from "nodemailer";
import { appendRecord } from "./store";

/**
 * Outgoing mail through the Foundation mailbox's SMTP (Titan: smtp.titan.email:465).
 * Configured only by environment variables on the server; nothing reaches the browser.
 */
export const mailConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
export const adminEmail = () => process.env.ADMIN_EMAIL || process.env.SMTP_USER || "";

let transport: nodemailer.Transporter | null = null;
function getTransport() {
  if (!transport) {
    const port = Number(process.env.SMTP_PORT || 465);
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transport;
}

export type Mail = { to: string; subject: string; text: string; html?: string; replyTo?: string; kind: string; ref?: string };

/** Send with up to 3 attempts (1 s, 4 s back-off). Every attempt outcome is written to email-log.jsonl. */
export async function sendMail(mail: Mail): Promise<boolean> {
  if (!mailConfigured()) {
    await appendRecord("email-log.jsonl", { at: new Date().toISOString(), kind: mail.kind, ref: mail.ref, to: mail.to, status: "skipped", reason: "SMTP not configured" });
    return false;
  }
  const from = `"Syndy Emade Foundation" <${process.env.SMTP_USER}>`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const info = await getTransport().sendMail({ from, to: mail.to, subject: mail.subject, text: mail.text, html: mail.html, replyTo: mail.replyTo });
      await appendRecord("email-log.jsonl", { at: new Date().toISOString(), kind: mail.kind, ref: mail.ref, to: mail.to, status: "sent", attempt, id: info.messageId });
      return true;
    } catch (e) {
      const reason = e instanceof Error ? e.message.slice(0, 300) : String(e);
      await appendRecord("email-log.jsonl", { at: new Date().toISOString(), kind: mail.kind, ref: mail.ref, to: mail.to, status: attempt === 3 ? "failed" : "retrying", attempt, reason });
      if (attempt < 3) await new Promise((r) => setTimeout(r, attempt === 1 ? 1000 : 4000));
    }
  }
  return false;
}
