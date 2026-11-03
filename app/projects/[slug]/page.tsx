import type { Metadata } from "next";
import { CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtPanel } from "@/components/ArtPanel";
import { DonateButton } from "@/components/DonateProvider";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/content";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: p.title, description: p.short, alternates: { canonical: `/projects/${p.slug}` } };
}

const barColor = ["bg-emerald", "bg-gold", "bg-navy"];

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Programme" title={project.title} intro={project.short} />
      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <ArtPanel label={`${project.title} in the field`} tone={project.pillar === "humanitarian" ? "gold" : "emerald"} className="aspect-[16/9] w-full" monogram={project.title.slice(0, 1)} />
            <p className="mt-8 flex items-center gap-2 text-sm font-medium text-navy/60"><MapPin className="h-4 w-4 text-gold" aria-hidden />{project.regions}</p>
            <p className="mt-4 text-lg leading-relaxed text-navy/75">{project.intro}</p>
            <h2 className="mt-12 text-2xl">What we do</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.activities.map((a) => (
                <li key={a} className="flex gap-3 rounded-xl bg-white p-4 text-sm shadow-card ring-1 ring-navy/5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald" aria-hidden />{a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <aside className="lg:col-span-5">
          <div className="card sticky top-28 p-8">
            <h2 className="font-sans text-lg font-semibold">How funds are allocated</h2>
            <div className="mt-5 flex h-3 overflow-hidden rounded-full" role="img" aria-label={project.fundingUse.map((f) => `${f.label} ${f.share}%`).join(", ")}>
              {project.fundingUse.map((f, i) => <span key={f.label} className={barColor[i % 3]} style={{ width: `${f.share}%` }} />)}
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {project.fundingUse.map((f, i) => (
                <li key={f.label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2"><span aria-hidden className={`h-2.5 w-2.5 rounded-full ${barColor[i % 3]}`} />{f.label}</span>
                  <span className="font-semibold tabular-nums">{f.share}%</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-navy/45">Target allocation; actuals are published in our annual report.</p>
            <DonateButton programme={project.slug} className="btn-gold mt-8 w-full">Support this programme</DonateButton>
            <Link href="/donate#involve" className="btn-outline mt-3 w-full">Volunteer</Link>
          </div>
        </aside>
      </section>
      <section className="bg-white py-20">
        <div className="container-page">
          <h2 className="text-2xl">Other programmes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
