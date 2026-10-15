import Image from "next/image";
import type { Metadata } from "next";
import { getTimelineEvents } from "@/lib/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Linha do Tempo" };

export default async function TimelinePage() {
  const events = await getTimelineEvents();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Linha do Tempo"
        title="Como a reportagem aconteceu"
        description="Os principais marcos da pesquisa, das entrevistas e da produção deste projeto."
      />

      {events.length === 0 ? (
        <p className="font-label mt-10 text-sm text-ink/50">
          Nenhum evento publicado ainda. Adicione eventos no painel administrativo.
        </p>
      ) : (
        <ol className="relative mt-14 border-l border-ink/15 pl-8">
          {events.map((event) => (
            <li key={event.id} className="relative mb-14 last:mb-0">
              <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-sand bg-wine" />
              <p className="font-label text-[12px] text-wine">{formatDate(event.eventDate)}</p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{event.title}</h2>
              {event.description && (
                <p className="mt-3 max-w-2xl text-ink/70 leading-relaxed">{event.description}</p>
              )}
              {event.imageUrl && (
                <div className="relative mt-5 aspect-[16/9] w-full max-w-xl overflow-hidden rounded-xl">
                  <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
