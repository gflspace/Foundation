"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Clapperboard, Copy, ExternalLink, Facebook, Images, MapPin, MessageCircle, Newspaper, Play, Share2, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { featuredVideos, photoStories, press, profiles, type MediaKind, type PhotoStory } from "@/lib/content";
import { cn } from "@/lib/cn";
import { fill } from "@/lib/i18n/format";
import { useI18n } from "./I18nProvider";
import { Modal, YouTubeEmbed } from "./Modal";

type Item =
  | { kind: "video"; id: string; title: string; youtubeId: string }
  | { kind: "channel"; id: string; title: string }
  | { kind: "photo" | "bts"; id: string; title: string; story: PhotoStory }
  | { kind: "press"; id: string; title: string; source: string; url: string; tag: string; lang: "en" | "fr" };

type Filter = "all" | MediaKind;
const FILTERS: Filter[] = ["all", "video", "photo", "press", "bts"];
const matches = (item: Item, f: Filter) => f === "all" || item.kind === f || (f === "video" && item.kind === "channel");

const tones = {
  violet: "from-violet-700 via-violet-800 to-navy",
  gold: "from-gold-600 via-gold-700 to-navy",
  navy: "from-navy-800 via-navy to-violet-800",
};

/** Filterable media & field-log gallery with lightbox (enhancement spec §6.3). */
export function MediaHub() {
  const { t, locale, href } = useI18n();
  const m = t.media;
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo<Item[]>(() => {
    const videos: Item[] = featuredVideos.length
      ? featuredVideos.map((v) => ({ kind: "video", id: `video-${v.id}`, title: v.title[locale], youtubeId: v.id }))
      : [{ kind: "channel", id: "video-channel", title: m.channelTitle }];
    const stories: Item[] = photoStories.map((s) => ({ kind: s.kind, id: `story-${s.id}`, title: m.stories[s.id as keyof typeof m.stories].title, story: s }));
    const coverage: Item[] = press.map((p, i) => ({ kind: "press", id: `press-${i + 1}`, title: p.title, source: p.source, url: p.url, tag: m.tags[p.tag], lang: p.lang }));
    // Interleave so "All media" opens with a mix rather than one long block per type.
    return [...videos, ...stories.slice(0, 3), ...coverage.slice(0, 3), ...stories.slice(3), ...coverage.slice(3)];
  }, [locale, m]);

  const visible = items.filter((i) => matches(i, filter));
  const open = items.find((i) => i.id === openId) ?? null;

  // Deep links: /media#story-tailoring opens that item (used by the impact map and share links).
  useEffect(() => {
    const sync = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && items.some((i) => i.id === id)) {
        setOpenId(id);
        document.getElementById("media-library")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [items, reduce]);

  const openItem = (id: string) => {
    setOpenId(id);
    history.replaceState(null, "", `#${id}`);
  };
  const close = useCallback(() => {
    setOpenId(null);
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  const count = (f: Filter) => items.filter((i) => matches(i, f)).length;

  return (
    <div id="media-library" className="scroll-mt-24">
      <h2 className="sr-only">{m.libraryTitle}</h2>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={m.filtersLabel} className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                filter === f ? "bg-navy text-white shadow" : "bg-white text-navy/70 ring-1 ring-navy/10 hover:text-navy hover:ring-navy/25",
              )}
            >
              {m.filters[f]} <span className={cn("ml-1 tabular-nums", filter === f ? "text-gold" : "text-navy/65")}>{count(f)}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-navy/65" aria-live="polite">{fill(visible.length === 1 ? m.countOne : m.countMany, { n: visible.length })}</p>
      </div>

      <motion.ul layout={!reduce} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <MediaCard item={item} onOpen={() => openItem(item.id)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Modal open={!!open} onClose={close} labelledBy="media-lightbox-title" closeLabel={m.close} tone={open?.kind === "press" ? "light" : "dark"}>
        {open && <Lightbox item={open} />}
      </Modal>
    </div>
  );

  function MediaCard({ item, onOpen }: { item: Item; onOpen: () => void }) {
    const isPress = item.kind === "press";
    return (
      <button
        type="button"
        onClick={onOpen}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-card ring-1 ring-navy/5 transition duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:-translate-y-2"
      >
        {isPress ? (
          <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden bg-sand-100 p-6">
            <Newspaper aria-hidden className="absolute -bottom-4 -right-4 h-32 w-32 text-gold/20 transition duration-500 group-hover:scale-105" />
            <span className="relative self-start rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-700">{item.tag}</span>
            <p className="relative font-display text-2xl text-navy">{item.source}</p>
          </div>
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Visual item={item} className="h-full w-full transition duration-500 group-hover:scale-105" />
            {(item.kind === "video" || item.kind === "channel") && (
              <span aria-hidden className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 scale-90 place-items-center rounded-full bg-gold text-navy shadow-glow transition duration-300 group-hover:scale-100">
                  <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                </span>
              </span>
            )}
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-700">
            <KindIcon kind={item.kind} />
            {item.kind === "channel" ? m.filters.video : m.filters[item.kind as Filter]}
          </p>
          <h3 className="mt-2 font-display text-lg leading-snug text-navy" lang={item.kind === "press" ? item.lang : undefined}>{item.title}</h3>
          {item.kind === "press" && item.lang !== locale && (
            <p className="mt-1 text-xs text-navy/65">{item.lang === "fr" ? m.inFrench : m.inEnglish}</p>
          )}
          <span className="mt-auto pt-4 text-sm font-semibold text-violet-700">{m.open} →</span>
        </div>
      </button>
    );
  }

  function Visual({ item, className, inLightbox = false }: { item: Item; className?: string; inLightbox?: boolean }) {
    if (item.kind === "video") {
      return (
        <Image src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`} alt="" width={480} height={360} className={cn("object-cover", className)} />
      );
    }
    if (item.kind === "photo" || item.kind === "bts") {
      if (item.story.image) return <Image src={item.story.image} alt={item.title} width={1200} height={750} className={cn("object-cover", className)} />;
      return (
        <div className={cn("relative bg-gradient-to-br", tones[item.story.tone], className)}>
          <div aria-hidden className="grain absolute inset-0 opacity-60" />
          <span aria-hidden className="absolute bottom-3 left-4 font-display text-6xl text-white/15">{String(photoStories.indexOf(item.story) + 1).padStart(2, "0")}</span>
          <span className={cn("glass absolute top-3 rounded-full px-3 py-1 text-xs font-medium text-white", inLightbox ? "left-4" : "right-3")}>{m.photoPending}</span>
        </div>
      );
    }
    return (
      <div className={cn("relative bg-gradient-to-br from-violet-800 via-navy to-navy-900", className)}>
        <div aria-hidden className="grain absolute inset-0 opacity-60" />
        <Youtube aria-hidden className="absolute bottom-4 left-4 h-8 w-8 text-white/30" />
      </div>
    );
  }

  function KindIcon({ kind }: { kind: Item["kind"] }) {
    const Icon = kind === "press" ? Newspaper : kind === "bts" ? Clapperboard : kind === "photo" ? Images : Play;
    return <Icon className="h-3.5 w-3.5" aria-hidden />;
  }

  function Lightbox({ item }: { item: Item }) {
    const story = item.kind === "photo" || item.kind === "bts" ? item.story : null;
    const storyText = story ? m.stories[story.id as keyof typeof m.stories].text : null;
    return (
      <div>
        {item.kind === "video" && <YouTubeEmbed id={item.youtubeId} title={item.title} lang={locale} />}
        {(story || item.kind === "channel") && <Visual item={item} className="aspect-video w-full" inLightbox />}
        <div className="p-6 sm:p-8">
          <p className={cn("flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider", item.kind === "press" ? "text-violet-700" : "text-gold")}>
            <KindIcon kind={item.kind} />
            {item.kind === "channel" ? m.filters.video : m.filters[item.kind as Filter]}
          </p>
          <h2 id="media-lightbox-title" className="mt-2 pr-10 text-2xl sm:text-3xl" lang={item.kind === "press" ? item.lang : undefined}>{item.title}</h2>

          {item.kind === "press" && <p className="mt-2 text-navy/70">{item.source} · {item.tag}{item.lang !== locale && ` · ${item.lang === "fr" ? m.inFrench : m.inEnglish}`}</p>}
          {storyText && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{storyText}</p>}
          {item.kind === "channel" && <p className="mt-4 max-w-2xl text-white/80">{m.channelText}</p>}

          {story && (story.centre || story.programme) && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {story.centre && (
                <div><dt className="text-white/60">{m.location}</dt><dd className="mt-0.5 flex items-center gap-1.5 font-medium"><MapPin className="h-4 w-4 text-gold" aria-hidden />{t.map.centres[story.centre].name}</dd></div>
              )}
              {story.programme && (
                <div><dt className="text-white/60">{m.relatedProgramme}</dt><dd className="mt-0.5"><Link href={href(`/projects/${story.programme}`)} className="font-medium text-gold underline-offset-4 hover:underline">{t.projects[story.programme].title}</Link></dd></div>
              )}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {item.kind === "press" && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-violet">
                {m.readArticle} <ExternalLink className="h-4 w-4" aria-hidden /><span className="sr-only">{t.common.opensNewTab}</span>
              </a>
            )}
            {item.kind === "channel" && (
              <a href={profiles.youtube} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <Youtube className="h-4 w-4" aria-hidden />{m.subscribe}<span className="sr-only">{t.common.opensNewTab}</span>
              </a>
            )}
            <ShareBar id={item.id} title={item.title} dark={item.kind !== "press"} />
          </div>
        </div>
      </div>
    );
  }

  function ShareBar({ id, title, dark }: { id: string; title: string; dark: boolean }) {
    const [copied, setCopied] = useState(false);
    const url = typeof window === "undefined" ? "" : `${window.location.origin}${window.location.pathname}#${id}`;
    const enc = encodeURIComponent;
    const btn = cn("inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition", dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-navy/5 text-navy hover:bg-navy/10");
    const links = [
      { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
      { label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
      { label: "X", icon: Share2, href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
    ];
    return (
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={m.share}>
        <button
          type="button"
          className={btn}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              /* clipboard unavailable */
            }
          }}
        >
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          <span aria-live="polite">{copied ? m.copied : m.copyLink}</span>
        </button>
        {links.map(({ label, icon: Icon, href: h }) => (
          <a key={label} href={h} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`${m.share}: ${label} ${t.common.opensNewTab}`}>
            <Icon className="h-4 w-4" aria-hidden /> <span aria-hidden>{label}</span>
          </a>
        ))}
      </div>
    );
  }
}
