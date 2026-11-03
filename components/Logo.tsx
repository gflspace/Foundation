import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Official Syndy Emade Foundation logo (public/brand/logo.png, transparent).
 * Always place it on a light background: the purple "Emade" and black tagline
 * do not read on dark colours, so dark sections wrap it in a white card.
 * A light saturate/contrast filter makes the thin lettering read bolder at small sizes.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo.png"
      alt="Syndy Emade Foundation — Together we can"
      width={659}
      height={603}
      priority={priority}
      className={cn("h-14 w-auto [filter:saturate(1.3)_contrast(1.12)]", className)}
    />
  );
}
