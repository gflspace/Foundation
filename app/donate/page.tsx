import type { Metadata } from "next";
import { HandCoins, HeartHandshake, ShieldCheck } from "lucide-react";
import { DonationForm } from "@/components/DonationForm";
import { InvolveForm } from "@/components/InvolveForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { donationTiers, faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate & Get Involved",
  description: "Give by card, PayPal or MTN / Orange Mobile Money, or apply to volunteer and partner with the Syndy Emade Foundation.",
  alternates: { canonical: "/donate" },
};

const GAMMA_EMBED_URL = ""; // optional Gamma pitch deck for partners

export default function DonatePage() {
  return (
    <>
      <PageHero eyebrow="Donate & get involved" title="Your generosity, their tomorrow" intro="Choose an amount, choose a programme, choose how you pay. We’ll take care of the rest — transparently." />

      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="What your gift does" title="Real impact at every level" />
          <ul className="mt-8 space-y-4">
            {donationTiers.map((t) => (
              <li key={t.usd} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy/5">
                <span className="grid h-12 w-16 shrink-0 place-items-center rounded-xl bg-gold/10 font-display text-lg text-gold-700">${t.usd}</span>
                <span className="text-sm leading-relaxed text-navy/75">{t.impact}<span className="mt-1 block text-xs text-navy/65">≈ {t.xaf.toLocaleString("fr-FR")} FCFA</span></span>
              </li>
            ))}
          </ul>
          <ul className="mt-10 space-y-4 text-sm text-navy/70">
            <li className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-emerald" aria-hidden />PCI-compliant payments through Stripe, PayPal and Flutterwave.</li>
            <li className="flex gap-3"><HandCoins className="h-5 w-5 shrink-0 text-emerald" aria-hidden />Restricted gifts go only to the programme you select.</li>
            <li className="flex gap-3"><HeartHandshake className="h-5 w-5 shrink-0 text-emerald" aria-hidden />Every donor receives our annual impact report.</li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="card p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl">Make your gift</h2>
            <div className="mt-6"><DonationForm /></div>
          </div>
        </div>
      </section>

      <section id="involve" className="scroll-mt-24 bg-white py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Get involved" title="Volunteer or partner with us" intro="Lend your skills on the ground, or bring your organisation alongside ours. Corporate, NGO and media partners welcome." />
            <h3 className="mt-12 font-sans text-lg font-semibold">Frequently asked</h3>
            <div className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
              {faqs.map((f) => (
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
        {GAMMA_EMBED_URL && (
          <div className="container-page mt-16">
            <iframe src={GAMMA_EMBED_URL} title="Partnership deck" className="aspect-video w-full rounded-2xl shadow-card" allow="fullscreen" loading="lazy" />
          </div>
        )}
      </section>
    </>
  );
}
