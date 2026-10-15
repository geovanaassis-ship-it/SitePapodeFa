import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteMapPointAction } from "./actions";

export default async function MapPointsListPage({
  searchParams,
}: {
  searchParams: Promise<{ criado?: string; salvo?: string }>;
}) {
  const { criado, salvo } = await searchParams;
  const points = await prisma.mapPoint.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-label text-[11px] text-wine">Mapa Interativo</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Pontos no mapa</h1>
        </div>
        <Link href="/admin/mapa/novo" className="font-label rounded-full bg-wine px-5 py-2.5 text-[12px] text-paper">
          + Novo ponto
        </Link>
      </div>

      {(criado || salvo) && (
        <p className="font-label mt-6 inline-block rounded-full bg-teal/10 px-4 py-2 text-[11px] text-teal">
          {criado ? "Ponto criado com sucesso." : "Ponto atualizado com sucesso."}
        </p>
      )}

      <div className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-paper">
        {points.length === 0 && <p className="p-6 text-sm text-ink/50">Nenhum ponto cadastrado ainda.</p>}
        {points.map((point) => (
          <div key={point.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="font-label text-[10px] text-ink/45">
                {point.lat.toFixed(4)}, {point.lng.toFixed(4)} · {point.published ? "Publicado" : "Rascunho"}
              </p>
              <p className="mt-1 font-medium">{point.name}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/mapa/${point.id}`} className="font-label rounded-full border border-ink/15 px-4 py-2 text-[11px]">
                Editar
              </Link>
              <DeleteButton action={deleteMapPointAction.bind(null, point.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
