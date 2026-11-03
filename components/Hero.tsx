"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeartHandshake, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { featuredVideos, heroStats } from "@/lib/content";
import { Counter } from "./Counter";
import { DonateButton } from "./DonateProvider";
import { useI18n } from "./I18nProvider";
import { Modal, YouTubeEmbed } from "./Modal";

/** Light hero in the logo's language: teal and purple circles, "Together we can.", the story film and three documented figures. */
export function Hero() {
  const { t, locale } = useI18n();
  const h = t.hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [videoOpen, setVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const driftSlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const story = featuredVideos.find((v) => v.id === "G9f7qKhNiwU") ?? featuredVideos[0];
  const field = featuredVideos.find((v) => v.programme === "displaced-families") ?? featuredVideos[0];

  const fade = (delay: number) =>
    reduce ? {} : { "data-reveal": "", initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-white pt-28 sm:pt-32">
      {/* The logo's four circles, scaled up as a backdrop */}
      <motion.span style={{ y: drift }} aria-hidden className="absolute -right-24 -top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-teal-50" />
      <motion.span style={{ y: driftSlow }} aria-hidden className="absolute -left-20 bottom-10 -z-10 h-64 w-64 rounded-full bg-purple-50" />
      <span aria-hidden className="absolute left-[46%] top-32 -z-10 hidden h-10 w-10 rounded-full bg-teal/25 lg:block" />
      <span aria-hidden className="absolute bottom-40 right-[8%] -z-10 hidden h-6 w-6 rounded-full bg-purple/30 lg:block" />

      <div className="container-page grid items-center gap-14 pb-16 lg:grid-cols-12 lg:pb-24">
        <div className="lg:col-span-6">
          <motion.p {...fade(0.05)} className="eyebrow">{h.eyebrow}</motion.p>
          <motion.h1 {...fade(0.15)} className="mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            <span className="text-teal-600">{h.line1}</span>
            <span className="block text-purple">{h.line2}</span>
          </motion.h1>
          <motion.p {...fade(0.3)} className="mt-7 max-w-xl text-lg leading-relaxed text-plum/80">{h.lead}</motion.p>
          <motion.div {...fade(0.45)} className="mt-10 flex flex-wrap gap-3">
            <DonateButton className="btn-teal px-8 py-4 text-base">
              <HeartHandshake className="h-5 w-5" aria-hidden /> {h.cta}
            </DonateButton>
            <button type="button" onClick={() => setVideoOpen(true)} className="btn-outline px-7 py-4 text-base">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-purple text-white"><Play className="h-3.5 w-3.5 translate-x-px fill-current" aria-hidden /></span>
              {h.secondary}
            </button>
          </motion.div>
        </div>

        <motion.div {...fade(0.3)} className="relative lg:col-span-6">
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-plum shadow-xl ring-8 ring-white"
            aria-label={`${h.secondary}: ${story.title[locale]}`}
          >
            <Image src={`https://i.ytimg.com/vi/${field.id}/hqdefault.jpg`} alt="" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/20 to-transparent" />
            <span aria-hidden className="absolute inset-0 grid place-items-center">
              <span className="relative grid h-20 w-20 place-items-center rounded-full bg-white text-teal-600 shadow-glow transition duration-300 group-hover:scale-110">
                {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />}
                <Play className="relative h-8 w-8 translate-x-0.5 fill-current" />
              </span>
            </span>
            <span className="absolute bottom-5 left-6 right-6 text-left text-white">
              <span className="block text-xs font-semibold uppercase tracking-wider text-teal-300">{h.videoTitle}</span>
              <span className="mt-1 block font-display text-xl font-semibold">{story.title[locale]}</span>
            </span>
          </button>
          <span aria-hidden className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-teal" />
          <span aria-hidden className="absolute -right-4 -top-4 -z-10 h-16 w-16 rounded-full bg-purple" />
        </motion.div>
      </div>

      <motion.div {...fade(0.6)} className="container-page pb-16">
        <h2 className="sr-only">{h.statsLabel}</h2>
        <dl className="grid grid-cols-3 divide-x divide-plum/10 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-plum/5">
          {heroStats.map((s, i) => (
            <div key={i} className="flex flex-col-reverse px-3 py-6 text-center sm:px-6 sm:py-8">
              <dt className="mt-1 text-xs font-medium text-plum/75 sm:text-sm">{h.stats[i]}</dt>
              <dd className={`font-display text-3xl font-semibold sm:text-5xl ${i === 1 ? "text-purple" : "text-teal-600"}`}>
                <Counter value={s.value} suffix={s.suffix} plain={s.plain} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-center text-xs text-plum/65">{h.statsNote}</p>
      </motion.div>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} labelledBy="hero-video-title" closeLabel={h.close} tone="dark">
        <h2 id="hero-video-title" className="px-6 pb-4 pr-14 pt-6 text-xl sm:text-2xl">{story.title[locale]}</h2>
        <YouTubeEmbed id={story.id} title={story.title[locale]} lang={locale} />
      </Modal>
    </section>
  );
}
