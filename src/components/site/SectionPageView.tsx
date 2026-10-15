import Image from "next/image";
import { SectionTag } from "./SectionTag";
import { formatDate } from "@/lib/utils";
import { simpleMarkdownToHtml } from "@/lib/markdown";

type Section = {
  kind: string;
  category: string | null;
  title: string;
  subtitle: string | null;
  coverImage: string | null;
  body: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  published: boolean;
  publishedAt: Date;
};

export function SectionPageView({ section }: { section: Section }) {
  return (
    <article>
      <header className="relative overflow-hidden bg-navy text-paper">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionTag kind={section.kind}>{section.category ?? section.kind}</SectionTag>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-paper/80 sm:text-xl">{section.subtitle}</p>
          )}
          <p className="font-label mt-8 text-[11px] text-paper/50">
            Publicado em {formatDate(section.publishedAt)}
          </p>
        </div>
      </header>

      {!section.published && (
        <div className="mx-auto max-w-4xl px-5 pt-6 sm:px-8">
          <p className="font-label rounded-xl border border-orange/40 bg-orange/10 px-4 py-3 text-[11px] text-orange">
            Esta página ainda não foi publicada — visível aqui apenas como pré-visualização.
          </p>
        </div>
      )}

      {section.coverImage && (
        <div className="relative mx-auto -mt-10 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl px-5 sm:px-8">
          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image src={section.coverImage} alt={section.title} fill className="object-cover" />
          </div>
        </div>
      )}

      <SectionMedia mediaUrl={section.mediaUrl} mediaType={section.mediaType} kind={section.kind} />

      {section.body && (
        <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
          <div
            className="prose-editorial"
            dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(section.body) }}
          />
        </div>
      )}
    </article>
  );
}

function SectionMedia({
  mediaUrl,
  mediaType,
  kind,
}: {
  mediaUrl: string | null;
  mediaType: string | null;
  kind: string;
}) {
  if (!mediaUrl) return null;

  const wrapperClass = "mx-auto max-w-4xl px-5 pt-12 sm:px-8";

  if (mediaType === "EMBED") {
    return (
      <div className={wrapperClass}>
        <div className={kind === "AUDIO" ? "overflow-hidden rounded-2xl" : "aspect-video overflow-hidden rounded-2xl shadow-xl"}>
          <iframe
            src={mediaUrl}
            className={kind === "AUDIO" ? "h-32 w-full" : "h-full w-full"}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Conteúdo incorporado"
          />
        </div>
      </div>
    );
  }

  if (kind === "VIDEO") {
    return (
      <div className={wrapperClass}>
        <video controls className="w-full rounded-2xl shadow-xl" src={mediaUrl} />
      </div>
    );
  }

  if (kind === "AUDIO") {
    return (
      <div className={wrapperClass}>
        <audio controls className="w-full" src={mediaUrl} />
      </div>
    );
  }

  return null;
}
