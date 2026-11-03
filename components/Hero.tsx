"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, HeartHandshake, Play } from "lucide-react";
import { useRef, useState } from "react";
import { featuredVideos, heroStats, impact, profiles } from "@/lib/content";
import { Counter } from "./Counter";
import { DonateButton } from "./DonateProvider";
import { useI18n } from "./I18nProvider";
import { Modal, YouTubeEmbed } from "./Modal";

/**
 * Dynamic hero stage (enhancement spec §6.1).
 * Background video: drop the Canva-enhanced loop at /public/media/hero.webm (+ hero.mp4 fallback,
 * muted, ≤4 MB) and a poster at /public/images/hero-poster.jpg, then set HERO_VIDEO = true.
 */
const HERO_VIDEO = false;

export function Hero() {
  const { t, locale } = useI18n();
  const h = t.hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [videoOpen, setVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const video = featuredVideos[0];

  const fade = (delay: number) =>
    reduce ? {} : { "data-reveal": "", initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
      <motion.div style={{ y }} aria-hidden className="absolute inset-0 -z-10">
        {HERO_VIDEO && !reduce ? (
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster="/images/hero-poster.jpg">
            <source src="/media/hero.webm" type="video/webm" />
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,rgba(109,40,217,0.45),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.30),transparent_55%)]" />
        )}
        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy/60 to-transparent" />
      </motion.div>

      <div className="container-page w-full pb-14 pt-32 sm:pb-20">
        <div className="max-w-3xl">
          <motion.p {...fade(0.05)} className="eyebrow text-gold">{h.eyebrow}</motion.p>
          <motion.h1 {...fade(0.15)} className="mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            {h.line1}
            <span className="mt-1 block bg-gradient-to-r from-gold-300 via-gold to-violet-400 bg-clip-text italic text-transparent">{h.line2}</span>
          </motion.h1>
          <motion.p {...fade(0.3)} className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">{t.meta.description}</motion.p>
          <motion.div {...fade(0.45)} className="mt-10 flex flex-wrap gap-3">
            <DonateButton programme="youth-welfare" className="btn-gold px-8 py-4 text-base">
              <HeartHandshake className="h-5 w-5" aria-hidden /> {h.cta}
            </DonateButton>
            <button type="button" onClick={() => setVideoOpen(true)} className="btn glass px-7 py-4 text-base text-white hover:bg-white/20">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-navy"><Play className="h-3.5 w-3.5 translate-x-px fill-current" aria-hidden /></span>
              {h.secondary}
            </button>
          </motion.div>
        </div>

        <motion.div {...fade(0.6)} className="mt-14">
          <h2 className="sr-only">{h.statsLabel}</h2>
          <dl className="glass grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl">
            {heroStats.map((s, i) => (
              <div key={i} className="flex flex-col-reverse px-3 py-5 text-center sm:px-6 sm:py-6">
                <dt className="mt-1 text-xs font-medium text-white/75 sm:text-sm">{h.stats[i]}</dt>
                <dd className="font-display text-3xl text-gold sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
          {impact.isPlaceholder && <p className="mt-2 text-xs text-white/60">{t.impact.placeholderNote}</p>}
        </motion.div>
      </div>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} labelledBy="hero-video-title" closeLabel={h.close} tone="dark">
        <h2 id="hero-video-title" className="px-6 pb-4 pr-14 pt-6 text-xl sm:text-2xl">{h.videoTitle}</h2>
        {video ? (
          <YouTubeEmbed id={video.id} title={video.title[locale]} lang={locale} />
        ) : (
          <div className="px-6 pb-8">
            <div className="grid aspect-video place-items-center rounded-2xl bg-gradient-to-br from-violet-800 via-navy to-navy-900 p-6 text-center">
              <div>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-navy shadow-glow"><Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden /></span>
                <p className="mx-auto mt-5 max-w-md text-white/80">{h.videoEmpty}</p>
                <a href={profiles.youtube} target="_blank" rel="noopener noreferrer" className="btn-gold mt-6" data-autofocus>
                  {h.videoOpenChannel} <ExternalLink className="h-4 w-4" aria-hidden />
                  <span className="sr-only">{t.common.opensNewTab}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
