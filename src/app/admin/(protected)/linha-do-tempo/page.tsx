import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTimelineEventAction } from "./actions";

export default async function TimelineListPage({
  searchParams,
}: {
  searchParams: Promise<{ criado?: string; salvo?: string }>;
}) {
  const { criado, salvo } = await searchParams;
  const events = await prisma.timelineEvent.findMany({ orderBy: [{ order: "asc" }, { eventDate: "asc" }] });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-label text-[11px] text-wine">Linha do Tempo</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Eventos</h1>
        </div>
        <Link
          href="/admin/linha-do-tempo/novo"
          className="font-label rounded-full bg-wine px-5 py-2.5 text-[12px] text-paper"
        >
          + Novo evento
        </Link>
      </div>

      {(criado || salvo) && (
        <p className="font-label mt-6 inline-block rounded-full bg-teal/10 px-4 py-2 text-[11px] text-teal">
          {criado ? "Evento criado com sucesso." : "Evento atualizado com sucesso."}
        </p>
      )}

      <div className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-paper">
        {events.length === 0 && (
          <p className="p-6 text-sm text-ink/50">Nenhum evento cadastrado ainda.</p>
        )}
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="font-label text-[10px] text-ink/45">
                {formatDate(event.eventDate)} · ordem {event.order} ·{" "}
                {event.published ? "Publicado" : "Rascunho"}
              </p>
              <p className="mt-1 font-medium">{event.title}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/linha-do-tempo/${event.id}`}
                className="font-label rounded-full border border-ink/15 px-4 py-2 text-[11px]"
              >
                Editar
              </Link>
              <DeleteButton action={deleteTimelineEventAction.bind(null, event.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
