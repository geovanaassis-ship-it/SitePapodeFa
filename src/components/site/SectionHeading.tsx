import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p className={cn("font-label mb-3 text-[12px]", light ? "text-paper/60" : "text-wine")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-[1.05] sm:text-4xl md:text-5xl",
          light ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" ? "mx-auto" : "",
            light ? "text-paper/75" : "text-ink/70",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
