import Link from "next/link";
import { getAllSections } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default async function SecoesListPage() {
  const sections = await getAllSections();

  const groups = [
    { title: "Perfis", items: sections.filter((s) => s.kind === "PERFIL") },
    { title: "Vídeos", items: sections.filter((s) => s.kind === "VIDEO") },
    { title: "Áudios", items: sections.filter((s) => s.kind === "AUDIO") },
  ];

  return (
    <div>
      <p className="font-label text-[11px] text-wine">Conteúdos</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Perfis, Vídeos e Áudios</h1>
      <p className="mt-3 max-w-xl text-ink/65">
        Estas são as seis seções fixas do menu. Você pode editar o título, o texto e também o nome que
        aparece no menu (ex.: trocar &quot;Perfil 1&quot; pelo nome real da pessoa entrevistada).
      </p>

      {groups.map((group) => (
        <div key={group.title} className="mt-10">
          <h2 className="font-display text-lg font-bold">{group.title}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {group.items.map((item) => (
              <Link
                key={item.slug}
                href={`/admin/secoes/${item.slug}`}
                className="rounded-2xl border border-ink/10 bg-paper p-5 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label text-[10px] text-ink/45">{item.label}</span>
                  <span
                    className={`font-label rounded-full px-2.5 py-0.5 text-[9px] ${
                      item.published ? "bg-teal/15 text-teal" : "bg-orange/15 text-orange"
                    }`}
                  >
                    {item.published ? "Publicado" : "Rascunho"}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl leading-tight">{item.title}</h3>
                <p className="font-label mt-2 text-[10px] text-ink/40">
                  Atualizado em {formatDate(item.updatedAt)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
