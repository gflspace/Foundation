import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/** Admin access is off unless ADMIN_PASSWORD is set on the server. Sessions are signed cookies (12 h). */
export const COOKIE = "sef_admin";
export const adminEnabled = () => Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 12);

const sign = (payload: string) => createHmac("sha256", process.env.ADMIN_PASSWORD!).update(payload).digest("base64url");

export function makeToken(hours = 12) {
  const exp = Date.now() + hours * 3600_000;
  return `${exp}.${sign(String(exp))}`;
}

export function validToken(token?: string) {
  if (!adminEnabled() || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const a = Buffer.from(sig), b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function passwordOk(input: string) {
  if (!adminEnabled()) return false;
  const a = Buffer.from(createHmac("sha256", "cmp").update(input).digest());
  const b = Buffer.from(createHmac("sha256", "cmp").update(process.env.ADMIN_PASSWORD!).digest());
  return timingSafeEqual(a, b);
}

export const isAdmin = () => validToken(cookies().get(COOKIE)?.value);
