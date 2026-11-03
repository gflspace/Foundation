"use client";

import Link from "next/link";
import { campaigns } from "@/lib/platform";
import { DonateButton } from "./DonateProvider";
import { useI18n } from "./I18nProvider";

/**
 * "One Act of Kindness": shows the open campaign with its target and live progress.
 * Renders nothing until a real campaign is added to `campaigns` in lib/platform.ts
 * (with its copy under `campaignCopy` in the platform dictionaries).
 */
export function CampaignBanner() {
  const { t, locale, href } = useI18n();
  const c = campaigns.find((x) => x.status === "open") ?? campaigns.find((x) => x.status === "completed");
  if (!c) return null;
  const u = t.involveUi;
  const pct = Math.min(100, Math.round((c.raised / c.target) * 100));
  const money = (n: number) => new Intl.NumberFormat(locale, { style: "currency", currency: c.currency, maximumFractionDigits: 0 }).format(n);
  return (
    <section className="container-page py-10" aria-labelledby="campaign-title">
      <div className="card grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow">{u.kindnessEyebrow}</p>
          <h2 id="campaign-title" className="mt-2 text-2xl">{c.id}</h2>
          {c.story && <Link href={href(`/stories/${c.story}`)} className="mt-2 inline-block text-sm font-semibold text-purple-700 hover:underline">{t.storiesUi.read}</Link>}
        </div>
        <div className="lg:col-span-5">
          <div className="h-3 overflow-hidden rounded-full bg-plum/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${money(c.raised)} ${u.campaignRaised} ${money(c.target)}`}>
            <div className="h-full rounded-full bg-teal-600" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-sm text-plum/80"><strong>{money(c.raised)}</strong> {u.campaignRaised} {money(c.target)}</p>
          {c.status === "open" ? (
            <DonateButton className="btn-teal mt-4">{u.campaignGive}</DonateButton>
          ) : (
            c.report && <a href={c.report} className="btn-outline mt-4">{u.campaignReport}</a>
          )}
        </div>
      </div>
    </section>
  );
}
