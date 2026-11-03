"use client";

import { Facebook, Play } from "lucide-react";
import { useState } from "react";
import { facebookPosts, type StorySlug } from "@/lib/platform";
import { useI18n } from "./I18nProvider";

/** Facebook reels and photo posts, loaded only when the visitor clicks (no Facebook tracking before that). */
export function FacebookEmbeds({ story }: { story?: StorySlug }) {
  const { t } = useI18n();
  const u = t.facebookUi;
  const posts = facebookPosts.filter((p) => (story ? p.story === story : true));
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  if (posts.length === 0) return null;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => {
        const src = p.kind === "reel"
          ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(p.url)}&show_text=false&width=340`
          : `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(p.url)}&show_text=true&width=340`;
        const label = `${p.kind === "reel" ? u.reel : u.photo} ${i + 1}`;
        return (
          <li key={p.url} className="card overflow-hidden">
            {loaded[p.url] ? (
              <iframe src={src} title={label} className={p.kind === "reel" ? "aspect-[9/16] w-full" : "h-[560px] w-full"} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen loading="lazy" />
            ) : (
              <button type="button" onClick={() => setLoaded((s) => ({ ...s, [p.url]: true }))} className={`group relative grid w-full place-items-center bg-gradient-to-br from-plum via-purple-800 to-teal-700 text-white ${p.kind === "reel" ? "aspect-[9/16]" : "aspect-[4/5]"}`} aria-label={`${u.load}: ${label}`}>
                <span aria-hidden className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[12px] border-white/15" />
                <span className="flex flex-col items-center gap-3 px-6 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-plum shadow-glow transition group-hover:scale-110">
                    {p.kind === "reel" ? <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden /> : <Facebook className="h-7 w-7" aria-hidden />}
                  </span>
                  <span className="font-display text-lg font-semibold">{label}</span>
                  <span className="text-xs text-white/80">{u.consent}</span>
                </span>
              </button>
            )}
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm font-semibold text-purple-700 hover:underline">{u.open}<span className="sr-only"> {t.common.opensNewTab}</span></a>
          </li>
        );
      })}
    </ul>
  );
}
