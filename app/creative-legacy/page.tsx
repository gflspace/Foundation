import type { Metadata } from "next";
import { Award, Clapperboard, Globe2, Users } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { FilmTimeline } from "@/components/FilmTimeline";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { awards, films, profiles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Filmography & Creative Legacy",
  description: "Syndy Emade’s filmography from 2010 to today, Blue Rain Entertainment, and the awards behind a career in Cameroonian and African cinema.",
  alternates: { canonical: "/creative-legacy" },
};

const advocacy = [
  { icon: Clapperboard, title: "Cinema for social good", text: "Blue Rain Entertainment productions raise awareness of social issues and African empowerment." },
  { icon: Users, title: "Youth & arts mentorship", text: "Mentoring young African actors, filmmakers and creative entrepreneurs." },
  { icon: Globe2, title: "Global representation", text: "Promoting Cameroonian arts and culture across Africa and internationally." },
];

export default function CreativeLegacyPage() {
  const first = Math.min(...films.map((f) => f.year));
  return (
    <>
      <PageHero eyebrow="Creative legacy" title="Stories that travel — and give back" intro={`${films.length} screen credits since ${first}, as actress and producer, with Blue Rain Entertainment and partner studios.`} />

      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="Blue Rain Entertainment" title="A studio with a purpose" intro="As CEO of Blue Rain Entertainment, Syndy Emade produces films that put Cameroonian talent on screen and keep social themes at their heart." />
            <div className="card mt-8 p-6">
              <h3 className="flex items-center gap-2 font-sans text-sm font-semibold"><Award className="h-4 w-4 text-gold" aria-hidden />Awards showcase</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {awards.map((a) => (
                  <li key={a.title} className="flex gap-3"><span className="w-14 shrink-0 font-semibold text-gold-600">{a.year}</span>{a.title}</li>
                ))}
              </ul>
            </div>
            <a href={profiles.imdb} target="_blank" rel="noopener noreferrer" className="btn-outline mt-6">Full credits on IMDb</a>
          </div>
        </div>
        <div className="lg:col-span-8">
          <h2 className="sr-only">Filmography timeline</h2>
          <FilmTimeline />
        </div>
      </section>

      <section className="bg-navy py-24 text-white">
        <div className="container-page">
          <SectionHeading tone="dark" eyebrow="Creative advocacy" title="The Cultural Icon pillar" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {advocacy.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
                  <Icon className="h-7 w-7 text-gold-400" aria-hidden />
                  <h3 className="mt-4 text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
