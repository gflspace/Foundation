"use client";

import { useState } from "react";
import { useI18n } from "./I18nProvider";

export function NewsletterForm({ id = "nl-email", light = false }: { id?: string; light?: boolean }) {
  const { t, locale } = useI18n();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("loading");
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "newsletter", email, locale }),
    }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }
  if (state === "done") return <p className={light ? "mt-4 text-sm font-semibold text-teal-700" : "mt-4 text-sm text-purple-400"} role="status">{t.footer.joined}</p>;
  return (
    <form onSubmit={onSubmit} className="mt-4 flex gap-2">
      <label htmlFor={id} className="sr-only">{t.footer.emailLabel}</label>
      <input id={id} name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={light ? "input" : "input border-white/10 bg-white/5 text-white placeholder:text-white/40"} />
      <button className="btn-teal shrink-0 px-5" disabled={state === "loading"}>{t.footer.join}</button>
      {state === "error" && <p role="alert" className="sr-only">{t.footer.joinError}</p>}
    </form>
  );
}
