import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSlideAction } from "./actions";

export default async function WebstorieListPage({
  searchParams,
}: {
  searchParams: Promise<{ criado?: string; salvo?: string }>;
}) {
  const { criado, salvo } = await searchParams;
  const slides = await prisma.webstorieSlide.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-label text-[11px] text-wine">Webstorie</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Slides</h1>
          <p className="mt-2 max-w-md text-sm text-ink/60">
            A ordem dos slides segue o campo &quot;ordem&quot;, do menor para o maior.
          </p>
        </div>
        <Link href="/admin/webstorie/novo" className="font-label rounded-full bg-wine px-5 py-2.5 text-[12px] text-paper">
          + Novo slide
        </Link>
      </div>

      {(criado || salvo) && (
        <p className="font-label mt-6 inline-block rounded-full bg-teal/10 px-4 py-2 text-[11px] text-teal">
          {criado ? "Slide criado com sucesso." : "Slide atualizado com sucesso."}
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slides.length === 0 && <p className="text-sm text-ink/50">Nenhum slide cadastrado ainda.</p>}
        {slides.map((slide) => (
          <div key={slide.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-paper">
            <div className="relative aspect-[9/16] bg-navy">
              {slide.mediaUrl && slide.mediaType === "IMAGE" ? (
                <Image src={slide.mediaUrl} alt={slide.title ?? ""} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center font-label text-[10px] text-paper/40">
                  {slide.mediaType}
                </div>
              )}
              <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 font-label text-[10px] text-paper">
                #{slide.order}
              </span>
            </div>
            <div className="p-4">
              <p className="font-medium">{slide.title || "Sem título"}</p>
              <p className="font-label mt-1 text-[10px] text-ink/45">
                {slide.published ? "Publicado" : "Rascunho"}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Link
                  href={`/admin/webstorie/${slide.id}`}
                  className="font-label rounded-full border border-ink/15 px-4 py-2 text-[11px]"
                >
                  Editar
                </Link>
                <DeleteButton action={deleteSlideAction.bind(null, slide.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
