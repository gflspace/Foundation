"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function InvolveForm() {
  const [type, setType] = useState<"volunteer" | "partner">("volunteer");
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
      body: JSON.stringify({ ...body, type }),
    }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }

  if (state === "done")
    return (
      <div className="card flex flex-col items-center p-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-emerald" aria-hidden />
        <h3 className="mt-4 text-2xl">Thank you!</h3>
        <p className="mt-2 max-w-sm text-navy/65">We’ve received your application and will be in touch within 5 working days.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8" noValidate>
      <div className="inline-flex rounded-full bg-navy/5 p-1" role="tablist" aria-label="Application type">
        {(["volunteer", "partner"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={type === t}
            onClick={() => setType(t)}
            className={cn("rounded-full px-5 py-2 text-sm font-semibold transition", type === t ? "bg-navy text-white" : "text-navy/60")}
          >
            {t === "volunteer" ? "Volunteer" : "Partner"}
          </button>
        ))}
      </div>

      {/* honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="label">Full name</label>
          <input id="f-name" name="name" required autoComplete="name" className="input" />
        </div>
        <div>
          <label htmlFor="f-email" className="label">Email</label>
          <input id="f-email" name="email" type="email" required autoComplete="email" className="input" />
        </div>
        <div>
          <label htmlFor="f-phone" className="label">Phone / WhatsApp <span className="text-navy/40">(optional)</span></label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" className="input" />
        </div>
        <div>
          <label htmlFor="f-loc" className="label">{type === "partner" ? "Organisation" : "City / Country"}</label>
          <input id="f-loc" name={type === "partner" ? "organisation" : "location"} required className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="f-area" className="label">{type === "partner" ? "Partnership type" : "Area of interest"}</label>
        <select id="f-area" name="interest" className="input" required>
          {(type === "partner"
            ? ["Corporate sponsorship", "NGO / implementing partner", "Media partnership", "In-kind donation"]
            : ["Youth mentorship", "Crisis relief missions", "Education & tutoring", "Women’s training", "Media & communications"]
          ).map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-msg" className="label">Tell us a little more</label>
        <textarea id="f-msg" name="message" rows={4} className="input" />
      </div>
      {state === "error" && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Sorry, that didn’t go through. Please try again or email us.</p>}
      <button className="btn-emerald w-full sm:w-auto" disabled={state === "loading"}>
        {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Submit application
      </button>
    </form>
  );
}
