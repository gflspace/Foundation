"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, HeartHandshake, Play } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { featuredVideos, heroStats } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Counter } from "./Counter";
import { DonateButton } from "./DonateProvider";
import { useI18n } from "./I18nProvider";
import { Modal, YouTubeEmbed } from "./Modal";

/** Where each figure's bubble sits in the cluster (percent of the square), echoing the logo's rising circles. */
const bubbles = [
  { pos: "left-0 top-[14%] h-[58%] w-[58%]", bg: "bg-teal-600", num: "text-[13cqw]", float: 0 },
  { pos: "right-[2%] top-0 h-[42%] w-[42%]", bg: "bg-purple", num: "text-[10cqw]", float: 1.2 },
  { pos: "bottom-[2%] right-[10%] h-[40%] w-[40%]", bg: "bg-plum", num: "text-[9.5cqw]", float: 2.4 },
];

/** Light hero in the logo's language: "Together we can.", the call to action, and three documented figures as bubbles. */
export function Hero() {
  const { t, locale, href } = useI18n();
  const h = t.hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [videoOpen, setVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const driftSlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const story = featuredVideos.find((v) => v.id === "G9f7qKhNiwU") ?? featuredVideos[0];

  const fade = (delay: number) =>
    reduce ? {} : { "data-reveal": "", initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-white pt-32 sm:pt-36">
      <motion.span style={{ y: drift }} aria-hidden className="absolute -right-24 -top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-teal-50" />
      <motion.span style={{ y: driftSlow }} aria-hidden className="absolute -left-20 bottom-10 -z-10 h-64 w-64 rounded-full bg-purple-50" />

      <div className="container-page grid items-center gap-14 pb-20 lg:grid-cols-12 lg:pb-28">
        <div className="lg:col-span-7">
          <motion.p {...fade(0.05)} className="eyebrow">{t.home2.heroEyebrow}</motion.p>
          <motion.h1 {...fade(0.15)} className="mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            <span className="text-teal-600">{t.home2.heroLine1}</span>
            <span className="block text-purple">{t.home2.heroLine2}</span>
          </motion.h1>
          <motion.p {...fade(0.25)} className="mt-6 font-display text-xl font-semibold text-plum sm:text-2xl">{t.home2.heroTagline}</motion.p>
          <motion.p {...fade(0.3)} className="mt-4 max-w-xl text-lg leading-relaxed text-plum/80">{t.home2.heroLead}</motion.p>
          <motion.div {...fade(0.45)} className="mt-10 flex flex-wrap gap-3">
            <Link href={href("/impact")} className="btn-teal px-8 py-4 text-base">
              {t.home2.heroCta} <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <DonateButton className="btn-outline px-7 py-4 text-base">
              <HeartHandshake className="h-5 w-5 text-purple" aria-hidden /> {h.cta}
            </DonateButton>
          </motion.div>
          <motion.div {...fade(0.5)} className="mt-5">
            <button type="button" onClick={() => setVideoOpen(true)} className="inline-flex items-center gap-2 rounded-full py-2 text-sm font-semibold text-plum/80 hover:text-plum">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-purple text-white"><Play className="h-3.5 w-3.5 translate-x-px fill-current" aria-hidden /></span>
              {h.secondary}
            </button>
          </motion.div>
        </div>

        <motion.div {...fade(0.35)} className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <h2 className="sr-only">{h.statsLabel}</h2>
          <dl className="relative aspect-square w-full [container-type:inline-size]">
            <span aria-hidden className="absolute bottom-[8%] left-[6%] h-[9%] w-[9%] rounded-full bg-teal/30" />
            <span aria-hidden className="absolute left-[44%] top-[2%] h-[6%] w-[6%] rounded-full border-[0.8cqw] border-teal/50" />
            <span aria-hidden className="absolute bottom-[40%] right-0 h-[5%] w-[5%] rounded-full bg-purple/30" />
            {heroStats.map((s, i) => {
              const b = bubbles[i];
              return (
                <motion.div
                  key={i}
                  className={cn("absolute flex flex-col-reverse items-center justify-center rounded-full p-[6%] text-center text-white shadow-xl", b.pos, b.bg)}
                  animate={reduce ? undefined : { y: [0, -10, 0] }}
                  transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: b.float }}
                >
                  <dt className="mt-[2%] text-[3.3cqw] font-medium leading-snug text-white/90">{h.stats[i]}</dt>
                  <dd className={cn("font-display font-semibold leading-none", b.num)}>
                    <Counter value={s.value} suffix={s.suffix} plain={s.plain} />
                  </dd>
                </motion.div>
              );
            })}
          </dl>
          <p className="mt-4 text-center text-xs text-plum/65">{h.statsNote}</p>
        </motion.div>
      </div>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} labelledBy="hero-video-title" closeLabel={h.close} tone="dark">
        <h2 id="hero-video-title" className="px-6 pb-4 pr-14 pt-6 text-xl sm:text-2xl">{story.title[locale]}</h2>
        <YouTubeEmbed id={story.id} title={story.title[locale]} lang={locale} />
      </Modal>
    </section>
  );
}
