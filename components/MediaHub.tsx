"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, ExternalLink, Facebook, MessageCircle, Newspaper, Play, Share2, Sparkles, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { featuredVideos, journey, press, profiles, projectMeta, type JourneyEntry, type MediaKind, type ProjectSlug } from "@/lib/content";
import { cn } from "@/lib/cn";
import { fill } from "@/lib/i18n/format";
import { useI18n } from "./I18nProvider";
import { Modal, YouTubeEmbed } from "./Modal";

type Item =
  | { kind: "video"; id: string; title: string; youtubeId: string; programme: ProjectSlug; date: string; duration: string }
  | { kind: "story"; id: string; title: string; entry: JourneyEntry }
  | { kind: "press"; id: string; title: string; source: string; url: string; tag: string; lang: "en" | "fr" };

type Filter = "all" | MediaKind;
const FILTERS: Filter[] = ["all", "video", "story", "press"];
const matches = (item: Item, f: Filter) => f === "all" || item.kind === f;

const tones = { teal: "from-teal via-teal-600 to-plum", purple: "from-purple via-purple-700 to-plum", plum: "from-plum-800 via-plum to-purple-800" } as const;

/** Filterable media library: our films, documented journey moments and press, with a shareable lightbox. */
export function MediaHub() {
  const { t, locale, href } = useI18n();
  const m = t.media;
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo<Item[]>(() => {
    const videos: Item[] = featuredVideos.map((v) => ({ kind: "video", id: `video-${v.id}`, title: v.title[locale], youtubeId: v.id, programme: v.programme, date: v.date, duration: v.duration }));
    const stories: Item[] = [...journey]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((e) => ({ kind: "story", id: `story-${e.id}`, title: t.journey.entries[e.id as keyof typeof t.journey.entries].title, entry: e }));
    const coverage: Item[] = press.map((p, i) => ({ kind: "press", id: `press-${i + 1}`, title: p.title, source: p.source, url: p.url, tag: m.tags[p.tag], lang: p.lang }));
    return [...videos, ...stories, ...coverage];
  }, [locale, m, t]);

  const visible = items.filter((i) => matches(i, filter));
  const open = items.find((i) => i.id === openId) ?? null;

  // Deep links: /media#story-idps-2021 opens that item (used by the map, journey and share links).
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

  const youtubeFor = (item: Item) => (item.kind === "video" ? item.youtubeId : item.kind === "story" ? item.entry.video : undefined);

  function KindIcon({ kind }: { kind: Item["kind"] }) {
    const Icon = kind === "press" ? Newspaper : kind === "story" ? Sparkles : Play;
    return <Icon className="h-3.5 w-3.5" aria-hidden />;
  }

  function Visual({ item, className }: { item: Item; className?: string }) {
    const yt = youtubeFor(item);
    if (yt) return <Image src={`https://i.ytimg.com/vi/${yt}/hqdefault.jpg`} alt="" width={480} height={360} className={cn("object-cover", className)} />;
    const prog = item.kind === "story" ? projectMeta.find((p) => p.slug === item.entry.programme) : undefined;
    return (
      <div className={cn("relative overflow-hidden bg-gradient-to-br", tones[prog?.tone ?? "teal"], className)}>
        <span aria-hidden className="absolute -right-6 -top-6 h-28 w-28 rounded-full border-[10px] border-white/25" />
        <span aria-hidden className="absolute bottom-6 left-8 h-12 w-12 rounded-full bg-white/20" />
        <span aria-hidden className="absolute bottom-16 left-24 h-5 w-5 rounded-full bg-white/25" />
      </div>
    );
  }

  function MediaCard({ item, onOpen }: { item: Item; onOpen: () => void }) {
    const isPress = item.kind === "press";
    const yt = youtubeFor(item);
    const when = item.kind === "story" ? t.journey.entries[item.entry.id as keyof typeof t.journey.entries].when : item.kind === "video" ? item.date.slice(0, 4) : null;
    return (
      <button
        type="button"
        onClick={onOpen}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-card ring-1 ring-plum/5 transition duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:-translate-y-2"
      >
        {isPress ? (
          <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden bg-purple-50 p-6">
            <Newspaper aria-hidden className="absolute -bottom-4 -right-4 h-32 w-32 text-purple/15 transition duration-500 group-hover:scale-105" />
            <span className="relative self-start rounded-full bg-purple/10 px-3 py-1 text-xs font-semibold text-purple-700">{item.tag}</span>
            <p className="relative font-display text-2xl text-plum">{item.source}</p>
          </div>
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Visual item={item} className="h-full w-full transition duration-500 group-hover:scale-105" />
            {yt && (
              <span aria-hidden className="absolute inset-0 grid place-items-center bg-plum/15">
                <span className="grid h-14 w-14 scale-90 place-items-center rounded-full bg-white text-teal-600 shadow-glow transition duration-300 group-hover:scale-100">
                  <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                </span>
              </span>
            )}
            {item.kind === "video" && <span className="absolute bottom-3 right-3 rounded-md bg-plum/80 px-2 py-0.5 text-xs font-semibold text-white">{item.duration}</span>}
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-600">
            <KindIcon kind={item.kind} />
            {m.filters[item.kind]}
            {when && <span className="font-normal normal-case tracking-normal text-plum/65">· {when}</span>}
          </p>
          <h3 className="mt-2 font-display text-lg leading-snug text-plum" lang={item.kind === "press" ? item.lang : undefined}>{item.title}</h3>
          {item.kind === "press" && item.lang !== locale && <p className="mt-1 text-xs text-plum/65">{item.lang === "fr" ? m.inFrench : m.inEnglish}</p>}
          <span className="mt-auto pt-4 text-sm font-semibold text-purple-700">{m.open} →</span>
        </div>
      </button>
    );
  }

  function ShareBar({ id, title, dark }: { id: string; title: string; dark: boolean }) {
    const [copied, setCopied] = useState(false);
    const url = typeof window === "undefined" ? "" : `${window.location.origin}${window.location.pathname}#${id}`;
    const enc = encodeURIComponent;
    const btn = cn("inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition", dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-plum/5 text-plum hover:bg-plum/10");
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

  function Lightbox({ item }: { item: Item }) {
    const yt = youtubeFor(item);
    const entry = item.kind === "story" ? item.entry : null;
    const copy = entry ? t.journey.entries[entry.id as keyof typeof t.journey.entries] : null;
    const programme = item.kind === "video" ? item.programme : entry?.programme;
    const dark = item.kind !== "press";
    return (
      <div>
        {yt && <YouTubeEmbed id={yt} title={item.title} lang={locale} />}
        {!yt && item.kind === "story" && <Visual item={item} className="aspect-[21/9] w-full" />}
        <div className="p-6 sm:p-8">
          <p className={cn("flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider", dark ? "text-teal" : "text-teal-600")}>
            <KindIcon kind={item.kind} />
            {m.filters[item.kind]}
            {copy && <span className="font-normal normal-case tracking-normal text-white/70">· {copy.when}</span>}
          </p>
          <h2 id="media-lightbox-title" className="mt-2 pr-10 text-2xl sm:text-3xl" lang={item.kind === "press" ? item.lang : undefined}>{item.title}</h2>

          {item.kind === "press" && <p className="mt-2 text-plum/75">{item.source} · {item.tag}{item.lang !== locale && ` · ${item.lang === "fr" ? m.inFrench : m.inEnglish}`}</p>}
          {copy && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{copy.text}</p>}

          {(programme || entry) && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {programme && (
                <div><dt className="text-white/65">{m.relatedProgramme}</dt><dd className="mt-0.5"><Link href={href(`/projects/${programme}`)} className="font-medium text-teal underline-offset-4 hover:underline">{t.projects[programme].title}</Link></dd></div>
              )}
              {entry && (
                <div>
                  <dt className="text-white/65">{entry.sources.length > 1 ? t.journey.sources : t.journey.source}</dt>
                  <dd className="mt-0.5 flex flex-wrap gap-x-3">
                    {entry.sources.map((s) => (
                      <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-white underline-offset-4 hover:underline">
                        {s.label} <ExternalLink className="h-3 w-3" aria-hidden /><span className="sr-only">{t.common.opensNewTab}</span>
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {item.kind === "press" && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-purple">
                {m.readArticle} <ExternalLink className="h-4 w-4" aria-hidden /><span className="sr-only">{t.common.opensNewTab}</span>
              </a>
            )}
            {item.kind === "video" && (
              <a href={profiles.youtube} target="_blank" rel="noopener noreferrer" className="btn-teal">
                <Youtube className="h-4 w-4" aria-hidden />{m.subscribe}<span className="sr-only">{t.common.opensNewTab}</span>
              </a>
            )}
            <ShareBar id={item.id} title={item.title} dark={dark} />
          </div>
        </div>
      </div>
    );
  }

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
                filter === f ? "bg-teal-600 text-white shadow" : "bg-white text-plum/80 ring-1 ring-plum/10 hover:text-plum hover:ring-teal/40",
              )}
            >
              {m.filters[f]} <span className={cn("ml-1 tabular-nums", filter === f ? "text-white" : "text-plum/65")}>{count(f)}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-plum/70" aria-live="polite">{fill(visible.length === 1 ? m.countOne : m.countMany, { n: visible.length })}</p>
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
}
