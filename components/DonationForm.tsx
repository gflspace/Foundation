"use client";

import { CreditCard, Heart, Loader2, Lock, Smartphone, Wallet } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { donationTiers, projectSlugs } from "@/lib/content";
import { cn } from "@/lib/cn";
import { intlLocale } from "@/lib/i18n/config";
import { fill } from "@/lib/i18n/format";
import { useI18n } from "./I18nProvider";

type Method = "card" | "momo" | "paypal";
type Currency = "USD" | "XAF";

const PAYPAL_ID = process.env.NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID;
const FLW_LINK = process.env.NEXT_PUBLIC_FLUTTERWAVE_PAYMENT_LINK;

export function DonationForm({ defaultProgramme }: { defaultProgramme?: string }) {
  const { t, locale, href } = useI18n();
  const f = t.form;
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  // French visitors are most likely paying in FCFA.
  const [currency, setCurrency] = useState<Currency>(locale === "fr" ? "XAF" : "USD");
  const [tierIndex, setTierIndex] = useState<number | null>(1);
  const [custom, setCustom] = useState("");
  const [programme, setProgramme] = useState(defaultProgramme ?? "greatest-need");
  const [method, setMethod] = useState<Method>("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = useMemo(() => {
    if (custom) return Number(custom);
    if (tierIndex === null) return 0;
    const tier = donationTiers[tierIndex];
    return currency === "USD" ? tier.usd : tier.xaf;
  }, [custom, tierIndex, currency]);

  const impactLine = tierIndex !== null && !custom ? t.donate.tiers[tierIndex] : null;
  const num = (n: number) => n.toLocaleString(intlLocale[locale]);
  const fmt = (n: number) =>
    currency === "USD" ? (locale === "fr" ? `${num(n)} $` : `$${num(n)}`) : `${num(n)} FCFA`;

  const minAmount = currency === "USD" ? 5 : 1000;
  const valid = Number.isFinite(amount) && amount >= minAmount;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!valid) return setError(fill(f.errMin, { min: fmt(minAmount) }));

    if (method === "momo") {
      if (!FLW_LINK) return setError(f.errMomo);
      window.location.href = FLW_LINK;
      return;
    }
    if (method === "paypal") {
      if (!PAYPAL_ID) return setError(f.errPaypal);
      const url = new URL("https://www.paypal.com/donate");
      url.searchParams.set("hosted_button_id", PAYPAL_ID);
      url.searchParams.set("locale.x", locale === "fr" ? "fr_FR" : "en_US");
      window.location.href = url.toString();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency, frequency, programme, locale }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? f.errCheckout);
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : f.errGeneric);
      setLoading(false);
    }
  }

  const methods: { key: Method; icon: typeof CreditCard }[] = [
    { key: "card", icon: CreditCard },
    { key: "momo", icon: Smartphone },
    { key: "paypal", icon: Wallet },
  ];

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <fieldset className="inline-flex rounded-full bg-navy/5 p-1">
          <legend className="sr-only">{f.frequency}</legend>
          {(["once", "monthly"] as const).map((fr) => (
            <label
              key={fr}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition",
                frequency === fr ? "bg-navy text-white shadow" : "text-navy/65 hover:text-navy",
                method !== "card" && fr === "monthly" && "pointer-events-none opacity-40",
              )}
            >
              <input
                type="radio"
                name="frequency"
                value={fr}
                checked={frequency === fr}
                onChange={() => setFrequency(fr)}
                className="sr-only"
                disabled={method !== "card" && fr === "monthly"}
              />
              {fr === "once" ? f.once : f.monthly}
            </label>
          ))}
        </fieldset>
        <label className="flex items-center gap-2 text-sm text-navy/70">
          <span>{f.currency}</span>
          <select
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value as Currency);
              setCustom("");
            }}
            className="rounded-lg border border-navy/15 bg-white px-2 py-1.5 font-semibold text-navy"
          >
            <option value="USD">USD $</option>
            <option value="XAF">XAF FCFA</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="label">{f.chooseAmount}</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {donationTiers.map((tier, i) => {
            const val = currency === "USD" ? tier.usd : tier.xaf;
            const active = tierIndex === i && !custom;
            return (
              <button
                key={i}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setTierIndex(i);
                  setCustom("");
                }}
                className={cn(
                  "rounded-xl border px-3 py-3 text-sm font-bold transition",
                  active ? "border-gold bg-gold/10 text-gold-700 ring-2 ring-gold/30" : "border-navy/15 bg-white hover:border-navy/40",
                )}
              >
                {fmt(val)}
              </button>
            );
          })}
        </div>
        <div className="relative mt-3">
          <label htmlFor="custom-amount" className="sr-only">{f.customAmountLabel}</label>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-navy/65">
            {currency === "USD" ? "$" : "FCFA"}
          </span>
          <input
            id="custom-amount"
            inputMode="numeric"
            placeholder={f.otherAmount}
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ""))}
            className={cn("input", currency === "USD" ? "pl-8" : "pl-16")}
          />
        </div>
        <p className="mt-3 min-h-[1.25rem] text-sm text-emerald-700" aria-live="polite">
          {impactLine && (
            <>
              <Heart className="mr-1 inline h-4 w-4 -translate-y-px" aria-hidden />
              {impactLine}
            </>
          )}
        </p>
      </fieldset>

      <div>
        <label htmlFor="programme" className="label">{f.directTo}</label>
        <select id="programme" value={programme} onChange={(e) => setProgramme(e.target.value)} className="input">
          <option value="greatest-need">{f.greatestNeed}</option>
          {projectSlugs.map((slug) => (
            <option key={slug} value={slug}>{t.projects[slug].title}</option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="label">{f.method}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {methods.map(({ key, icon: Icon }) => (
            <label
              key={key}
              className={cn(
                "flex cursor-pointer flex-col gap-1 rounded-xl border p-3 transition",
                method === key ? "border-emerald bg-emerald-50 ring-2 ring-emerald/25" : "border-navy/15 bg-white hover:border-navy/40",
              )}
            >
              <input
                type="radio"
                name="method"
                value={key}
                checked={method === key}
                onChange={() => {
                  setMethod(key);
                  if (key !== "card") setFrequency("once");
                  if (key === "momo") {
                    setCurrency("XAF");
                    setCustom("");
                  }
                }}
                className="sr-only"
              />
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Icon className="h-4 w-4" aria-hidden /> {f.methods[key].label}
              </span>
              <span className="text-xs leading-snug text-navy/65">{f.methods[key].hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button type="submit" className="btn-gold w-full py-4 text-base" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Heart className="h-5 w-5" aria-hidden />}
        {valid ? fill(f.give, { amount: fmt(amount) }) + (frequency === "monthly" ? f.perMonth : "") : f.giveNow}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-navy/65">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden /> {f.secure}
      </p>
      <p className="text-center text-xs text-navy/65">
        {f.agreePre}{" "}
        <Link href={href("/donation-policy")} className="underline hover:text-navy">{f.agreeTerms}</Link> {f.agreeAnd}{" "}
        <Link href={href("/privacy")} className="underline hover:text-navy">{f.agreePrivacy}</Link>.
      </p>
    </form>
  );
}
