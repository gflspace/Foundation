"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";

type Kind = "volunteer" | "partner" | "collaboration";
const KINDS: Kind[] = ["volunteer", "partner", "collaboration"];

/** Volunteer registration, partnership enquiry and collaboration proposal in one accessible form. */
export function EngageForm({ defaultKind = "volunteer", lockKind = false }: { defaultKind?: Kind; lockKind?: boolean }) {
  const { t, locale, href } = useI18n();
  const u = t.involveUi;
  const [kind, setKind] = useState<Kind>(defaultKind);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [ref, setRef] = useState("");

  // /get-involved?kind=collaboration#form preselects the pathway.
  useEffect(() => {
    if (lockKind) return;
    const k = new URLSearchParams(window.location.search).get("kind");
    if (k && (KINDS as string[]).includes(k)) setKind(k as Kind);
  }, [lockKind]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) return form.reportValidity();
    setState("loading");
    const body = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/forms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, type: kind, locale }) }).catch(() => null);
    if (res?.ok) setRef(((await res.json().catch(() => ({}))) as { ref?: string }).ref ?? "");
    setState(res?.ok ? "done" : "error");
  }

  if (state === "done")
    return (
      <div className="card flex flex-col items-center p-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-teal-600" aria-hidden />
        <h3 className="mt-4 text-2xl">{u.thanksTitle}</h3>
        <p className="mt-2 max-w-sm text-plum/75">{u.thanksText}</p>
        {ref && <p className="mt-4 rounded-full bg-mist px-4 py-1.5 text-sm text-plum">{u.refLabel}: <strong className="font-semibold">{ref}</strong></p>}
      </div>
    );

  const id = (n: string) => `engage-${kind}-${n}`;
  const Field = ({ name, label, type = "text", required = false, auto }: { name: string; label: string; type?: string; required?: boolean; auto?: string }) => (
    <div>
      <label htmlFor={id(name)} className="label">{label}{required && <span aria-hidden className="text-purple"> *</span>}</label>
      <input id={id(name)} name={name} type={type} required={required} autoComplete={auto} className="input mt-1.5" />
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8" noValidate>
      <h3 className="text-2xl">{u.formTitle}</h3>
      {!lockKind && (
        <fieldset>
          <legend className="label">{u.kindLabel}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)} className={cn("rounded-full px-4 py-2 text-sm font-semibold transition", kind === k ? "bg-teal-600 text-white" : "bg-mist text-plum ring-1 ring-plum/10 hover:ring-teal/40")}>
                {u.kinds[k]}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label={u.name} required auto="name" />
        <Field name="email" label={u.email} type="email" required auto="email" />
        <Field name="phone" label={u.phone} type="tel" auto="tel" />
        <Field name="location" label={u.location} auto="address-level2" />
      </div>
      {kind === "volunteer" && <Field name="interest" label={u.skills} />}
      {kind === "partner" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="organisation" label={u.organisation} required auto="organization" />
          <div>
            <label htmlFor={id("orgType")} className="label">{u.orgType}</label>
            <select id={id("orgType")} name="orgType" className="input mt-1.5">
              {Object.entries(u.orgTypes).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
      )}
      {kind === "collaboration" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="interest" label={u.projectTitle} required />
          <Field name="organisation" label={`${u.organisation} ${t.involve.optional}`} auto="organization" />
        </div>
      )}
      <div>
        <label htmlFor={id("message")} className="label">{kind === "collaboration" ? u.proposal : u.message}{kind === "collaboration" && <span aria-hidden className="text-purple"> *</span>}</label>
        <textarea id={id("message")} name="message" rows={5} required={kind === "collaboration"} className="input mt-1.5" />
      </div>
      <p className="text-xs text-plum/70">{u.privacy.split(".")[0]}. <Link href={href("/privacy")} className="underline">{u.privacy.split(".").slice(1).join(".").trim()}</Link></p>
      {state === "error" && <p role="alert" className="text-sm font-semibold text-red-700">{u.error}</p>}
      <button className="btn-teal w-full sm:w-auto" disabled={state === "loading"}>
        {state === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />{u.sending}</> : u.submit}
      </button>
    </form>
  );
}
