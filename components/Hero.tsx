"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/lib/content";
import { DonateButton } from "./DonateProvider";

/**
 * Hero. To use a video banner, drop an optimised MP4 (≤4 MB, muted, 1080p)
 * at /public/media/hero.mp4 and a poster at /public/images/hero-poster.jpg,
 * then set HERO_VIDEO = true.
 */
const HERO_VIDEO = false;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);

  const fade = (delay: number) =>
    reduce ? {} : { "data-reveal": "", initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section ref={ref} className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-navy text-white">
      <motion.div style={{ y }} aria-hidden className="absolute inset-0 -z-10">
        {HERO_VIDEO ? (
          <video className="h-full w-full object-cover opacity-40" autoPlay muted loop playsInline poster="/images/hero-poster.jpg">
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,rgba(5,150,105,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(217,119,6,0.28),transparent_55%)]" />
        )}
        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy" />
      </motion.div>

      <div className="container-page grid items-center gap-12 pb-20 pt-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p {...fade(0.05)} className="eyebrow text-gold-400">
            Cameroon · Africa · The Diaspora
          </motion.p>
          <motion.h1 {...fade(0.15)} className="mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            A Beacon of Hope.
            <span className="mt-1 block bg-gradient-to-r from-gold-400 via-gold to-emerald-400 bg-clip-text italic text-transparent">
              An Icon of Action.
            </span>
          </motion.h1>
          <motion.p {...fade(0.3)} className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
            {site.description}
          </motion.p>
          <motion.div {...fade(0.45)} className="mt-10 flex flex-wrap gap-3">
            <DonateButton className="btn-gold px-8 py-4 text-base">
              Donate now <ArrowRight className="h-4 w-4" aria-hidden />
            </DonateButton>
            <Link href="/projects" className="btn border border-white/25 px-8 py-4 text-base text-white hover:bg-white/10">
              See our work
            </Link>
          </motion.div>
        </div>

        <motion.div {...fade(0.4)} className="hidden lg:col-span-5 lg:block">
          <div className="relative mx-auto aspect-[4/5] max-w-sm">
            <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-gradient-to-br from-gold/60 to-emerald/60" />
            <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-[2rem] bg-navy-800 p-8 ring-1 ring-white/10">
              <div aria-hidden className="grain absolute inset-0" />
              <span aria-hidden className="absolute right-6 top-4 font-display text-[9rem] leading-none text-white/5">SE</span>
              {/* Swap for a real, approved quote from the founder before launch. */}
              <div className="relative">
                <p className="eyebrow text-gold-400">Our promise</p>
                <p className="mt-3 font-display text-2xl italic leading-snug text-white">
                  Turning visibility into practical help — for every child, family and community we reach.
                </p>
              </div>
              <a
                href="https://www.youtube.com/channel/UCDbpFFyAeVdE5t8KR6OIQ6g"
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-8 inline-flex items-center gap-3 text-sm font-semibold text-white/80 hover:text-white"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Play className="h-4 w-4" aria-hidden /></span>
                Watch field missions on Syndy Emade TV
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
