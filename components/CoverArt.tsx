import { Quote } from "lucide-react";
import Image from "next/image";
import { ytThumb, type CoverImage } from "@/lib/content";
import { cn } from "@/lib/cn";

export type CoverTone = "teal" | "purple" | "plum";

const gradients: Record<CoverTone, string> = {
  teal: "from-teal-600 via-teal-700 to-plum",
  purple: "from-purple via-purple-700 to-plum",
  plum: "from-plum-700 via-plum to-plum-900",
};

/**
 * Cover for a media card or lightbox. Shows an approved image (cropped to the frame, YouTube letterbox
 * removed) or, when none is cleared for use, a designed editorial cover built from verified article data.
 */
export function CoverArt({
  image,
  youtubeId,
  tone = "purple",
  kicker,
  source,
  year,
  quote,
  highlight,
  lang,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
  imgClassName,
}: {
  image?: CoverImage;
  youtubeId?: string;
  tone?: CoverTone;
  kicker?: string;
  source?: string;
  year?: string;
  quote?: string;
  highlight?: string;
  lang?: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
}) {
  const approved = image?.status === "approved" ? image : undefined;
  const yt = youtubeId ? ytThumb(youtubeId) : undefined;
  const src = approved?.src ?? yt?.src;
  const letterboxed = approved ? (approved.youtubeId ? ytThumb(approved.youtubeId).letterboxed : false) : yt?.letterboxed;

  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-plum", className)}>
        <Image
          src={src}
          alt={approved?.alt ?? ""}
          fill
          sizes={sizes}
          className={cn("object-cover", letterboxed && "scale-[1.13]", imgClassName)}
          style={approved?.position ? { objectPosition: approved.position } : undefined}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative flex flex-col justify-between overflow-hidden bg-gradient-to-br p-5 text-white sm:p-6", gradients[tone], className)}>
      <span aria-hidden className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[14px] border-white/15" />
      <span aria-hidden className="absolute -bottom-6 right-16 h-16 w-16 rounded-full bg-white/10" />
      <span aria-hidden className="absolute bottom-14 right-8 h-5 w-5 rounded-full bg-teal-300/50" />
      <div className="relative flex items-center gap-2">
        {kicker && <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">{kicker}</span>}
        {year && <span className="text-xs font-semibold text-white/80">{year}</span>}
      </div>
      {(quote || highlight) && (
        <p className="relative my-2 line-clamp-3 max-w-[88%] font-display text-[0.95rem] font-semibold leading-snug sm:text-base" lang={lang}>
          {quote ? (
            <>
              <Quote aria-hidden className="-mt-1 mr-1.5 inline h-4 w-4 fill-current text-teal-300" />
              {quote}
            </>
          ) : (
            highlight
          )}
        </p>
      )}
      {source && <p className="relative font-display text-xl font-semibold leading-tight sm:text-2xl">{source}</p>}
    </div>
  );
}
