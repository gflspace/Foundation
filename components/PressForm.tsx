"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useI18n } from "./I18nProvider";

/** Direct press-inquiry form (enhancement spec §2, Interactive Press & Media Hub). */
export function PressForm() {
  const { t, locale } = useI18n();
  const m = t.media;
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) return form.reportValidity();
    setState("loading");
    const body = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, type: "press", locale }),
    }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }

  if (state === "done")
    return (
      <p role="status" className="flex items-start gap-3 rounded-2xl bg-white/10 p-5 text-white">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-teal" aria-hidden />{m.pressThanks}
      </p>
    );

  const field = "input border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-teal focus:ring-teal/30";
  const label = "mb-1.5 block text-sm font-medium text-white/80";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="p-name" className={label}>{m.pressName}</label><input id="p-name" name="name" required autoComplete="name" className={field} /></div>
        <div><label htmlFor="p-outlet" className={label}>{m.pressOutlet}</label><input id="p-outlet" name="organisation" required autoComplete="organization" className={field} /></div>
        <div><label htmlFor="p-email" className={label}>{m.pressEmail}</label><input id="p-email" name="email" type="email" required autoComplete="email" className={field} /></div>
        <div><label htmlFor="p-deadline" className={label}>{m.pressDeadline}</label><input id="p-deadline" name="deadline" type="date" className={field} /></div>
      </div>
      <div><label htmlFor="p-msg" className={label}>{m.pressMessage}</label><textarea id="p-msg" name="message" rows={4} required className={field} /></div>
      {state === "error" && <p role="alert" className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100">{m.pressError}</p>}
      <button className="btn-teal" disabled={state === "loading"}>
        {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        {m.pressSubmit}
      </button>
    </form>
  );
}
