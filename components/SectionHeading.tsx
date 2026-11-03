import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow", tone === "dark" && "text-teal-400")}>{eyebrow}</p>}
      <h2 className={cn("mt-3 text-3xl sm:text-4xl", tone === "dark" ? "text-white" : "text-plum")}>{title}</h2>
      {intro && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-white/70" : "text-plum/70")}>
          {intro}
        </p>
      )}
    </div>
  );
}
