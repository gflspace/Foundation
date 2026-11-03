import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { PillarCards } from "@/components/PillarCards";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects & Impact",
  description: "Youth protection, mobile crisis response, educational grants and women’s empowerment programmes across Cameroon.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Projects & impact" title="Practical help, delivered where it’s needed" intro="Four programmes, three pillars, one commitment: measurable change for the people we serve." />
      <section className="container-page py-24" aria-labelledby="programmes-heading">
        <h2 id="programmes-heading" className="sr-only">Our programmes</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full"><ProjectCard project={p} /></Reveal>
          ))}
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Our framework" title="The three pillars" />
          <div className="mt-12"><PillarCards /></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
