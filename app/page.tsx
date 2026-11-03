import { ArrowRight, Award } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FilmTimeline } from "@/components/FilmTimeline";
import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { Portrait } from "@/components/Portrait";
import { PillarCards } from "@/components/PillarCards";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { awards, founder, projects } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStrip />

      <section className="container-page py-24">
        <SectionHeading
          eyebrow="Three pillars"
          title="One woman’s platform, three ways to change lives"
          intro="From long-term youth welfare to rapid crisis response and creative mentorship, our work is built around the strengths our founder brings to every community."
        />
        <div className="mt-12"><PillarCards /></div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Programmes" title="Where your support goes" />
            <Link href="/projects" className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline">
              All programmes <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} className="h-full"><ProjectCard project={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid items-center gap-12 py-24 lg:grid-cols-2">
        <Reveal>
          <Portrait className="mx-auto max-w-md" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Meet the founder</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">{founder.name}</h2>
          <p className="mt-2 text-sm text-navy/65">{founder.roles.join(" · ")}</p>
          <p className="mt-6 text-lg leading-relaxed text-navy/75">{founder.summary}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {awards.slice(0, 4).map((a) => (
              <li key={a.title} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card ring-1 ring-navy/5">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <span className="text-sm"><span className="font-semibold">{a.year}</span> — {a.title}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="btn-outline mt-8">Read her story</Link>
        </Reveal>
      </section>

      <section className="bg-navy py-24 text-white">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              tone="dark"
              eyebrow="Creative legacy"
              title="Cinema for social good"
              intro="Over 15 years on screen and behind the camera with Blue Rain Entertainment — stories that carry Cameroonian voices across Africa and the world."
            />
            <Link href="/creative-legacy" className="btn-gold mt-8">Full filmography</Link>
          </div>
          <div className="rounded-3xl bg-ivory p-6 text-navy sm:p-10 lg:col-span-8">
            <FilmTimeline limit={6} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
