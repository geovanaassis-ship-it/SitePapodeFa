import { cn } from "@/lib/utils";

const COLORS: Record<string, string> = {
  PERFIL: "bg-pink text-ink",
  VIDEO: "bg-orange text-ink",
  AUDIO: "bg-teal text-paper",
  WEBSTORIE: "bg-lilac text-ink",
  TIMELINE: "bg-navy text-paper",
  MAPA: "bg-wine text-paper",
  SOBRE: "bg-ink text-paper",
};

export function SectionTag({
  kind,
  children,
  className,
}: {
  kind?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const color = (kind && COLORS[kind]) || "bg-ink text-paper";
  return (
    <span
      className={cn(
        "font-label inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium",
        color,
        className,
      )}
    >
      {children}
    </span>
  );
}
