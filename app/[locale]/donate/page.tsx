import type { Metadata } from "next";
import { HandCoins, HeartHandshake, ShieldCheck } from "lucide-react";
import { DonationForm } from "@/components/DonationForm";
import { InvolveForm } from "@/components/InvolveForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { donationTiers, gamma } from "@/lib/content";
import { formatNumber } from "@/lib/i18n/config";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const d = getDictionary(locale).donate;
  return pageMetadata(locale, "/donate", d.metaTitle, d.metaDescription);
}

const trustIcons = [ShieldCheck, HandCoins, HeartHandshake];

export default function DonatePage(props: LocaleParams) {
  const locale = pageLocale(props);
  const d = getDictionary(locale).donate;
  // French visitors see FCFA first; English visitors see USD first.
  const primary = (tier: (typeof donationTiers)[number]) =>
    locale === "fr" ? `${formatNumber(locale, tier.xaf)} FCFA` : `$${tier.usd}`;
  const secondary = (tier: (typeof donationTiers)[number]) =>
    locale === "fr" ? `≈ ${tier.usd} $` : `≈ ${formatNumber("fr", tier.xaf)} FCFA`;
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} />

      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={d.impactEyebrow} title={d.impactTitle} />
          <ul className="mt-8 space-y-4">
            {donationTiers.map((tier, i) => (
              <li key={tier.usd} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy/5">
                <span className="grid h-12 min-w-[4rem] shrink-0 place-items-center rounded-xl bg-gold/10 px-2 font-display text-lg text-gold-700">{primary(tier)}</span>
                <span className="text-sm leading-relaxed text-navy/75">
                  {d.tiers[i]}
                  <span className="mt-1 block text-xs text-navy/65">{secondary(tier)}</span>
                </span>
              </li>
            ))}
          </ul>
          <ul className="mt-10 space-y-4 text-sm text-navy/70">
            {d.trust.map((line, i) => {
              const Icon = trustIcons[i];
              return <li key={line} className="flex gap-3"><Icon className="h-5 w-5 shrink-0 text-violet" aria-hidden />{line}</li>;
            })}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="card p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl">{d.formTitle}</h2>
            <div className="mt-6"><DonationForm /></div>
          </div>
        </div>
      </section>

      <section id="involve" className="scroll-mt-24 bg-white py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={d.involveEyebrow} title={d.involveTitle} intro={d.involveIntro} />
            <h3 className="mt-12 font-sans text-lg font-semibold">{d.faqTitle}</h3>
            <div className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
              {d.faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {f.q}
                    <span aria-hidden className="text-xl text-gold transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-navy/65">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7"><InvolveForm /></div>
        </div>
        {gamma.partnerDeck && (
          <div className="container-page mt-16">
            <iframe src={gamma.partnerDeck} title={d.deckTitle} className="aspect-video w-full rounded-2xl shadow-card" allow="fullscreen" loading="lazy" />
          </div>
        )}
      </section>
    </>
  );
}
