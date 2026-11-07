"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";

export function InvolveForm() {
  const { t, locale, href } = useI18n();
  const v = t.involve;
  const [type, setType] = useState<"volunteer" | "partner">("volunteer");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [ref, setRef] = useState("");
  const [area, setArea] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) return form.reportValidity();
    setState("loading");
    const body = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, type, locale }),
    }).catch(() => null);
    if (res?.ok) setRef(((await res.json().catch(() => ({}))) as { ref?: string }).ref ?? "");
    setState(res?.ok ? "done" : "error");
  }

  if (state === "done")
    return (
      <div className="card flex flex-col items-center p-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-purple" aria-hidden />
        <h3 className="mt-4 text-2xl">{v.thanksTitle}</h3>
        <p className="mt-2 max-w-sm text-plum/65">{v.thanksText}</p>
        {ref && <p className="mt-4 rounded-full bg-mist px-4 py-1.5 text-sm text-plum">{v.refLabel}: <strong className="font-semibold">{ref}</strong></p>}
      </div>
    );

  const partner = type === "partner";
  const options = partner ? v.partnerOptions : v.volunteerOptions;
  const selected = options.includes(area) ? area : options[0];
  /** "Other" is always the last option: it asks the applicant to describe their interest. */
  const isOther = selected === options[options.length - 1];
  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8" noValidate>
      <div className="inline-flex rounded-full bg-plum/5 p-1" role="tablist" aria-label={v.type}>
        {(["volunteer", "partner"] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={type === k}
            onClick={() => setType(k)}
            className={cn("rounded-full px-5 py-2 text-sm font-semibold transition", type === k ? "bg-plum text-white" : "text-plum/65")}
          >
            {k === "volunteer" ? v.volunteer : v.partner}
          </button>
        ))}
      </div>

      {/* honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="label">{v.name}</label>
          <input id="f-name" name="name" required autoComplete="name" className="input" />
        </div>
        <div>
          <label htmlFor="f-email" className="label">{v.email}</label>
          <input id="f-email" name="email" type="email" required autoComplete="email" className="input" />
        </div>
        <div>
          <label htmlFor="f-phone" className="label">{v.phone} <span className="text-plum/65">{v.optional}</span></label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" className="input" />
        </div>
        <div>
          <label htmlFor="f-loc" className="label">{partner ? v.organisation : v.location}</label>
          <input id="f-loc" name={partner ? "organisation" : "location"} required className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="f-area" className="label">{partner ? v.partnershipType : v.interest}</label>
        <select id="f-area" name="interest" className="input" required value={selected} onChange={(e) => setArea(e.target.value)}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-msg" className="label">{v.message}</label>
        {isOther && <p id="f-msg-hint" className="mb-2 text-sm text-purple-700">{v.otherHint}</p>}
        <textarea id="f-msg" name="message" rows={4} className="input" required={isOther} aria-describedby={isOther ? "f-msg-hint" : undefined} />
      </div>
      {state === "error" && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{v.error}</p>}
      <p className="text-xs text-plum/65">
        {v.privacyPre} <Link href={href("/privacy")} className="underline">{v.privacyLink}</Link>.
      </p>
      <button className="btn-purple w-full sm:w-auto" disabled={state === "loading"}>
        {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {v.submit}
      </button>
    </form>
  );
}
