"use client";

import { CreditCard, Heart, Loader2, Lock, Smartphone, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import { donationTiers, projects } from "@/lib/content";
import { cn } from "@/lib/cn";

type Method = "card" | "momo" | "paypal";
type Currency = "USD" | "XAF";

const PAYPAL_ID = process.env.NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID;
const FLW_LINK = process.env.NEXT_PUBLIC_FLUTTERWAVE_PAYMENT_LINK;

export function DonationForm({ defaultProgramme, compact = false }: { defaultProgramme?: string; compact?: boolean }) {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [tierIndex, setTierIndex] = useState<number | null>(1);
  const [custom, setCustom] = useState("");
  const [programme, setProgramme] = useState(defaultProgramme ?? "greatest-need");
  const [method, setMethod] = useState<Method>("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = useMemo(() => {
    if (custom) return Number(custom);
    if (tierIndex === null) return 0;
    const t = donationTiers[tierIndex];
    return currency === "USD" ? t.usd : t.xaf;
  }, [custom, tierIndex, currency]);

  const impactLine = tierIndex !== null && !custom ? donationTiers[tierIndex].impact : null;
  const fmt = (n: number) =>
    currency === "USD" ? `$${n.toLocaleString("en-US")}` : `${n.toLocaleString("fr-FR")} FCFA`;

  const minAmount = currency === "USD" ? 5 : 1000;
  const valid = Number.isFinite(amount) && amount >= minAmount;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!valid) return setError(`Minimum donation is ${fmt(minAmount)}.`);

    if (method === "momo") {
      if (!FLW_LINK) return setError("Mobile Money checkout is being set up. Please try card or PayPal for now.");
      window.location.href = FLW_LINK;
      return;
    }
    if (method === "paypal") {
      if (!PAYPAL_ID) return setError("PayPal giving is being set up. Please try card for now.");
      const url = new URL("https://www.paypal.com/donate");
      url.searchParams.set("hosted_button_id", PAYPAL_ID);
      window.location.href = url.toString();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency, frequency, programme }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout is unavailable right now.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  const methods: { key: Method; label: string; icon: typeof CreditCard; hint: string }[] = [
    { key: "card", label: "Card", icon: CreditCard, hint: "Visa, Mastercard, Apple & Google Pay via Stripe" },
    { key: "momo", label: "Mobile Money", icon: Smartphone, hint: "MTN MoMo & Orange Money (XAF) via Flutterwave" },
    { key: "paypal", label: "PayPal", icon: Wallet, hint: "Give with your PayPal balance or account" },
  ];

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      {/* Frequency + currency */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <fieldset className="inline-flex rounded-full bg-navy/5 p-1">
          <legend className="sr-only">Donation frequency</legend>
          {(["once", "monthly"] as const).map((f) => (
            <label
              key={f}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition",
                frequency === f ? "bg-navy text-white shadow" : "text-navy/60 hover:text-navy",
                method !== "card" && f === "monthly" && "pointer-events-none opacity-40",
              )}
            >
              <input
                type="radio"
                name="frequency"
                value={f}
                checked={frequency === f}
                onChange={() => setFrequency(f)}
                className="sr-only"
                disabled={method !== "card" && f === "monthly"}
              />
              {f === "once" ? "One-time" : "Monthly"}
            </label>
          ))}
        </fieldset>
        <label className="flex items-center gap-2 text-sm text-navy/70">
          <span>Currency</span>
          <select
            value={currency}
            onChange={(e) => { setCurrency(e.target.value as Currency); setCustom(""); }}
            className="rounded-lg border border-navy/15 bg-white px-2 py-1.5 font-semibold text-navy"
          >
            <option value="USD">USD $</option>
            <option value="XAF">XAF FCFA</option>
          </select>
        </label>
      </div>

      {/* Tiers */}
      <fieldset>
        <legend className="label">Choose an amount</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {donationTiers.map((t, i) => {
            const val = currency === "USD" ? t.usd : t.xaf;
            const active = tierIndex === i && !custom;
            return (
              <button
                key={i}
                type="button"
                aria-pressed={active}
                onClick={() => { setTierIndex(i); setCustom(""); }}
                className={cn(
                  "rounded-xl border px-3 py-3 text-sm font-bold transition",
                  active ? "border-gold bg-gold/10 text-gold-600 ring-2 ring-gold/30" : "border-navy/15 bg-white hover:border-navy/40",
                )}
              >
                {fmt(val)}
              </button>
            );
          })}
        </div>
        <div className="relative mt-3">
          <label htmlFor="custom-amount" className="sr-only">Custom amount</label>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-navy/50">
            {currency === "USD" ? "$" : "FCFA"}
          </span>
          <input
            id="custom-amount"
            inputMode="numeric"
            placeholder="Other amount"
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
        <label htmlFor="programme" className="label">Direct my gift to</label>
        <select id="programme" value={programme} onChange={(e) => setProgramme(e.target.value)} className="input">
          <option value="greatest-need">Where it’s needed most</option>
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>{p.title}</option>
          ))}
        </select>
      </div>

      {/* Method */}
      <fieldset>
        <legend className="label">Payment method</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {methods.map(({ key, label, icon: Icon, hint }) => (
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
                  if (key === "momo") { setCurrency("XAF"); setCustom(""); }
                }}
                className="sr-only"
              />
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Icon className="h-4 w-4" aria-hidden /> {label}
              </span>
              <span className="text-xs leading-snug text-navy/55">{hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button type="submit" className="btn-gold w-full py-4 text-base" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Heart className="h-5 w-5" aria-hidden />}
        {valid ? `Give ${fmt(amount)}${frequency === "monthly" ? " / month" : ""}` : "Give now"}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-navy/50">
        <Lock className="h-3.5 w-3.5" aria-hidden /> Secure, encrypted checkout. We never store card details.
      </p>
    </form>
  );
}
