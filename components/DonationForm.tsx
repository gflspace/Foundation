"use client";

import { CreditCard, Heart, Loader2, Lock, Mail, Smartphone, Wallet } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { donationTiers, projectSlugs } from "@/lib/content";
import { cn } from "@/lib/cn";
import { givingEmail, givingMethods, onlineGiving } from "@/lib/giving";
import { intlLocale } from "@/lib/i18n/config";
import { fill } from "@/lib/i18n/format";
import { useDonate } from "./DonateProvider";
import { useI18n } from "./I18nProvider";

type Method = "card" | "momo" | "paypal";
type Currency = "USD" | "XAF";

const PAYPAL_ID = process.env.NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID;
const FLW_LINK = process.env.NEXT_PUBLIC_FLUTTERWAVE_PAYMENT_LINK;

/** Shown instead of the checkout while no online giving method is switched on (see lib/giving.ts). */
function GiveByContact() {
  const { t, href } = useI18n();
  const { close } = useDonate();
  const g = t.giving;
  const mailto = `mailto:${givingEmail}?subject=${encodeURIComponent(g.subject)}&body=${encodeURIComponent(g.body)}`;
  return (
    <div className="space-y-5 text-center sm:text-left">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-purple-50 text-purple sm:mx-0"><Heart className="h-6 w-6" aria-hidden /></span>
      <div>
        <h3 className="text-2xl">{g.title}</h3>
        <p className="mt-2 text-plum/70">{g.text}</p>
      </div>
      <a href={mailto} className="btn-teal w-full sm:w-auto"><Mail className="h-4 w-4" aria-hidden /> {g.cta}</a>
      <p className="text-sm text-plum/60"><a href={`mailto:${givingEmail}`} className="font-medium text-teal-700 underline underline-offset-4">{givingEmail}</a></p>
      <p className="text-sm"><Link href={href("/get-involved")} onClick={close} className="text-plum/70 underline underline-offset-4 hover:text-plum">{g.other}</Link></p>
    </div>
  );
}

export function DonationForm(props: { defaultProgramme?: string }) {
  return onlineGiving ? <OnlineDonationForm {...props} /> : <GiveByContact />;
}

function OnlineDonationForm({ defaultProgramme }: { defaultProgramme?: string }) {
  const { t, locale, href } = useI18n();
  const f = t.form;
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  // French visitors are most likely paying in FCFA.
  const [currency, setCurrency] = useState<Currency>(locale === "fr" ? "XAF" : "USD");
  const [tierIndex, setTierIndex] = useState<number | null>(1);
  const [custom, setCustom] = useState("");
  const [programme, setProgramme] = useState(defaultProgramme ?? "greatest-need");
  const [method, setMethod] = useState<Method>((["card", "momo", "paypal"] as const).find((m) => givingMethods[m]) ?? "card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = useMemo(() => {
    if (custom) return Number(custom);
    if (tierIndex === null) return 0;
    const tier = donationTiers[tierIndex];
    return currency === "USD" ? tier.usd : tier.xaf;
  }, [custom, tierIndex, currency]);

  const isCustom = tierIndex === null || custom !== "";
  const sliderPos = isCustom ? donationTiers.length : (tierIndex as number);
  const tierAmount = (i: number) => (currency === "USD" ? donationTiers[i].usd : donationTiers[i].xaf);
  const impactLine = !isCustom ? t.donate.tiers[tierIndex as number] : null;
  const reduce = useReducedMotion();
  const num = (n: number) => n.toLocaleString(intlLocale[locale]);
  const fmtShort = (n: number) => (currency === "USD" ? `$${n}` : n >= 1000 ? `${n / 1000}k` : `${n}`);
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

  const methods = ([
    { key: "card", icon: CreditCard },
    { key: "momo", icon: Smartphone },
    { key: "paypal", icon: Wallet },
  ] as { key: Method; icon: typeof CreditCard }[]).filter((m) => givingMethods[m.key]);

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <fieldset className="inline-flex rounded-full bg-plum/5 p-1">
          <legend className="sr-only">{f.frequency}</legend>
          {(["once", "monthly"] as const).map((fr) => (
            <label
              key={fr}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition",
                frequency === fr ? "bg-plum text-white shadow" : "text-plum/65 hover:text-plum",
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
        <label className="flex items-center gap-2 text-sm text-plum/70">
          <span>{f.currency}</span>
          <select
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value as Currency);
              setCustom("");
            }}
            className="rounded-lg border border-plum/15 bg-white px-2 py-1.5 font-semibold text-plum"
          >
            <option value="USD">USD $</option>
            <option value="XAF">XAF FCFA</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="label">{f.chooseAmount}</legend>
        {/* Micro-donation slider (enhancement spec §6.5): positions 0–3 are tiers, the last is "custom". */}
        <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-plum/5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-4xl text-plum" aria-hidden>{valid ? fmt(amount) : "—"}</p>
            {frequency === "monthly" && <p className="text-sm text-plum/65">{f.perMonth.replace("/", "").trim()}</p>}
          </div>
          <label htmlFor="amount-slider" className="sr-only">{f.sliderLabel}</label>
          <input
            id="amount-slider"
            type="range"
            min={0}
            max={donationTiers.length}
            step={1}
            value={sliderPos}
            aria-valuetext={isCustom ? f.customTier : fmt(tierAmount(sliderPos))}
            aria-describedby="amount-slider-hint"
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v === donationTiers.length) {
                setTierIndex(null);
              } else {
                setTierIndex(v);
                setCustom("");
              }
            }}
            className="range mt-4 w-full"
            style={{ ["--fill" as string]: `${(sliderPos / donationTiers.length) * 100}%` }}
          />
          <div className="mt-2 grid text-center text-xs font-semibold" style={{ gridTemplateColumns: `repeat(${donationTiers.length + 1}, minmax(0, 1fr))` }}>
            {donationTiers.map((tier, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={!isCustom && tierIndex === i}
                onClick={() => {
                  setTierIndex(i);
                  setCustom("");
                }}
                className={cn("rounded-lg py-1.5 transition", !isCustom && tierIndex === i ? "bg-teal/20 text-teal-700" : "text-plum/65 hover:text-plum")}
              >
                {fmtShort(currency === "USD" ? tier.usd : tier.xaf)}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={isCustom}
              onClick={() => {
                setTierIndex(null);
                document.getElementById("custom-amount")?.focus();
              }}
              className={cn("rounded-lg py-1.5 transition", isCustom ? "bg-purple-50 text-purple-700" : "text-plum/65 hover:text-plum")}
            >
              {f.customTier}
            </button>
          </div>
          <p id="amount-slider-hint" className="sr-only">{f.sliderHint}</p>
        </div>
        <div className="relative mt-3">
          <label htmlFor="custom-amount" className="sr-only">{f.customAmountLabel}</label>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-plum/65">
            {currency === "USD" ? "$" : "FCFA"}
          </span>
          <input
            id="custom-amount"
            inputMode="numeric"
            placeholder={f.otherAmount}
            value={custom}
            onChange={(e) => {
              setTierIndex(null);
              setCustom(e.target.value.replace(/[^0-9]/g, ""));
            }}
            className={cn("input", currency === "USD" ? "pl-8" : "pl-16")}
          />
        </div>
        <motion.p
          key={impactLine ?? "custom"}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex min-h-[2.5rem] items-start gap-2 rounded-xl bg-purple-50 px-3 py-2 text-sm text-purple-800"
          aria-live="polite"
        >
          <Heart className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {impactLine ?? f.customImpact}
        </motion.p>
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
                method === key ? "border-purple bg-purple-50 ring-2 ring-purple/25" : "border-plum/15 bg-white hover:border-plum/40",
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
              <span className="text-xs leading-snug text-plum/65">{f.methods[key].hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button type="submit" className="btn-teal w-full py-4 text-base" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Heart className="h-5 w-5" aria-hidden />}
        {valid ? fill(f.give, { amount: fmt(amount) }) + (frequency === "monthly" ? f.perMonth : "") : f.giveNow}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-plum/65">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden /> {f.secure}
      </p>
      <p className="text-center text-xs text-plum/65">
        {f.agreePre}{" "}
        <Link href={href("/donation-policy")} className="underline hover:text-plum">{f.agreeTerms}</Link> {f.agreeAnd}{" "}
        <Link href={href("/privacy")} className="underline hover:text-plum">{f.agreePrivacy}</Link>.
      </p>
    </form>
  );
}
