import { cn } from "@/lib/cn";

/**
 * Decorative stand-in for photography. Replace with <Image> once licensed
 * photos are added to /public/images (see README › Media assets).
 */
export function ArtPanel({
  label,
  tone = "purple",
  className,
  monogram = "SE",
}: {
  label: string;
  tone?: "purple" | "teal" | "plum";
  className?: string;
  monogram?: string;
}) {
  const bg = {
    purple: "from-purple-700 via-purple to-plum",
    teal: "from-teal-600 via-teal to-plum-800",
    plum: "from-plum-800 via-plum to-purple-700",
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
