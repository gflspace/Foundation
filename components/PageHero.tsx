import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
      <div aria-hidden className="grain absolute inset-0" />
      <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <div className="container-page relative">
        <Reveal>
          <p className="eyebrow text-gold-400">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}
