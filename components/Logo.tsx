import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Official Syndy Emade Foundation logo (public/brand/logo.png, transparent).
 * Always place it on a light background: the purple "Emade" and black tagline
 * do not read on dark colours, so dark sections wrap it in a white card.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo-sm.png"
      alt="Syndy Emade Foundation — Together we can"
      width={360}
      height={329}
      priority={priority}
      className={cn("h-14 w-auto", className)}
    />
  );
}
