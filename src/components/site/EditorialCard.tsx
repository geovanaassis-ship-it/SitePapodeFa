import Link from "next/link";
import Image from "next/image";
import { SectionTag } from "./SectionTag";
import { formatDate } from "@/lib/utils";

export function EditorialCard({
  href,
  kind,
  category,
  title,
  excerpt,
  coverImage,
  date,
  size = "md",
}: {
  href: string;
  kind?: string;
  category?: string | null;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  date?: Date | string | null;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-shadow hover:shadow-xl hover:shadow-ink/10"
    >
      <div
        className={`relative overflow-hidden bg-navy ${
          size === "lg" ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy via-wine to-ink">
            <span className="font-display text-2xl text-paper/30">PF</span>
          </div>
        )}
        {category && (
          <div className="absolute left-3 top-3">
            <SectionTag kind={kind}>{category}</SectionTag>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3
          className={`font-display font-bold leading-tight ${
            size === "lg" ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {title}
        </h3>
        {excerpt && <p className="line-clamp-3 text-sm text-ink/70">{excerpt}</p>}
        <div className="mt-auto flex items-center justify-between pt-2">
          {date && (
            <span className="font-label text-[10px] text-ink/45">{formatDate(date)}</span>
          )}
          <span className="font-label text-[11px] text-wine transition-transform group-hover:translate-x-1">
            Ler mais →
          </span>
        </div>
      </div>
    </Link>
  );
}
