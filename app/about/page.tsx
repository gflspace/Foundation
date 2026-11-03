import type { Metadata } from "next";
import { Award, BookOpen, Compass, Eye, GraduationCap, MapPin, ShieldCheck, Target } from "lucide-react";
import { ArtPanel } from "@/components/ArtPanel";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { awards, founder, profiles } from "@/lib/content";

export const metadata: Metadata = {
  title: "About the Founder & Foundation",
  description: "Syndy Emade — banking graduate, award-winning actress, producer and philanthropist — and the mission, vision and governance of her Foundation.",
  alternates: { canonical: "/about" },
};

const governance = [
  { icon: ShieldCheck, title: "Safeguarding first", text: "Child-protection and safeguarding policies govern every programme, volunteer and partner." },
  { icon: BookOpen, title: "Transparent reporting", text: "Programme spending and outcomes are published in an annual impact report." },
  { icon: Compass, title: "Community-led", text: "Local leaders and beneficiaries help shape where and how we work." },
];

/** Gamma impact deck — paste the embed URL (Share › Embed) to show it on this page. */
const GAMMA_EMBED_URL = "";

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="From Kumba to the world — and back home again" intro="The story of our founder, and the promise that drives the Syndy Emade Foundation." />

      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <ArtPanel label="Portrait of Syndy Emade" tone="gold" className="aspect-[4/5] w-full" />
          <dl className="card mt-6 divide-y divide-navy/10 text-sm">
            {[
              { icon: MapPin, k: "Born", v: `${founder.born}, ${founder.birthplace}` },
              { icon: GraduationCap, k: "Education", v: founder.education },
              { icon: Award, k: "Full name", v: founder.legalName },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="flex gap-3 p-4">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <div><dt className="font-semibold">{k}</dt><dd className="text-navy/65">{v}</dd></div>
              </div>
            ))}
          </dl>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">The founder</p>
            <h2 className="mt-3 text-4xl">{founder.name}</h2>
            <p className="mt-6 text-lg leading-relaxed text-navy/75">{founder.summary}</p>
            <p className="mt-4 leading-relaxed text-navy/75">
              A finance graduate turned filmmaker, she brings an entrepreneur’s discipline to philanthropy: clear goals,
              accountable spending and partnerships that last.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-2xl">Honours & recognition</h3>
            <ol className="mt-6 space-y-3">
              {awards.map((a) => (
                <li key={a.title} className="flex items-baseline gap-4 border-b border-navy/10 pb-3">
                  <span className="w-16 shrink-0 font-display text-lg text-gold-600">{a.year}</span>
                  <span>{a.title}{a.note && <span className="text-navy/50"> — {a.note}</span>}</span>
                </li>
              ))}
            </ol>
            <h3 className="mt-12 text-2xl">Ambassadorships & roles</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[...founder.roles, ...founder.ambassadorships].map((r) => (
                <li key={r} className="rounded-full bg-white px-4 py-2 text-sm shadow-card ring-1 ring-navy/5">{r}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-navy/55">
              Reference profiles:{" "}
              <a className="underline hover:text-navy" href={profiles.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia</a> ·{" "}
              <a className="underline hover:text-navy" href={profiles.imdb} target="_blank" rel="noopener noreferrer">IMDb</a> ·{" "}
              <a className="underline hover:text-navy" href={profiles.wikidata} target="_blank" rel="noopener noreferrer">Wikidata</a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading eyebrow="The Foundation" title="Mission, vision & governance" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="card h-full bg-navy p-8 text-white">
                <Target className="h-8 w-8 text-gold-400" aria-hidden />
                <h3 className="mt-4 text-2xl">Our mission</h3>
                <p className="mt-3 leading-relaxed text-white/75">
                  To protect vulnerable young people, deliver dignified relief to families in crisis, open doors to education
                  and empower women and creatives — across Cameroon, Africa and the diaspora.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="card h-full bg-emerald-700 p-8 text-white">
                <Eye className="h-8 w-8 text-gold-400" aria-hidden />
                <h3 className="mt-4 text-2xl">Our vision</h3>
                <p className="mt-3 leading-relaxed text-white/85">
                  An Africa where every child is safe, every family can recover from crisis, and every talent has the chance to shine.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {governance.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className="h-full">
                <div className="card h-full p-6">
                  <Icon className="h-6 w-6 text-emerald" aria-hidden />
                  <h3 className="mt-3 font-sans text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-navy/65">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {GAMMA_EMBED_URL && (
            <div className="mt-12 overflow-hidden rounded-2xl shadow-card ring-1 ring-navy/5">
              <iframe src={GAMMA_EMBED_URL} title="Foundation impact report" className="aspect-video w-full" allow="fullscreen" loading="lazy" />
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
