import { cn } from "@/lib/cn";

/**
 * Decorative stand-in for photography. Replace with <Image> once licensed
 * photos are added to /public/images (see README › Media assets).
 */
export function ArtPanel({
  label,
  tone = "emerald",
  className,
  monogram = "SE",
}: {
  label: string;
  tone?: "emerald" | "gold" | "navy";
  className?: string;
  monogram?: string;
}) {
  const bg = {
    emerald: "from-emerald-700 via-emerald to-navy",
    gold: "from-gold-600 via-gold to-navy-800",
    navy: "from-navy-800 via-navy to-emerald-700",
  }[tone];
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn("relative isolate overflow-hidden rounded-2xl bg-gradient-to-br", bg, className)}
    >
      <div aria-hidden className="grain absolute inset-0 opacity-60" />
      <svg aria-hidden viewBox="0 0 200 200" className="absolute -right-10 -top-10 h-3/4 w-3/4 text-white/10">
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="64" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span aria-hidden className="absolute bottom-4 left-5 font-display text-6xl text-white/15 sm:text-7xl">
        {monogram}
      </span>
    </div>
  );
}
