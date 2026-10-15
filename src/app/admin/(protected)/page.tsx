import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  const [sections, timelineCount, mapCount, slideCount, teamCount, recentSections] = await Promise.all([
    prisma.sectionPage.findMany({ orderBy: { updatedAt: "desc" } }),
    prisma.timelineEvent.count(),
    prisma.mapPoint.count(),
    prisma.webstorieSlide.count(),
    prisma.teamMember.count(),
    prisma.sectionPage.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);

  const publishedCount = sections.filter((s) => s.published).length;

  const cards = [
    { label: "Conteúdos publicados", value: `${publishedCount} / ${sections.length}`, href: "/admin/secoes" },
    { label: "Eventos na linha do tempo", value: timelineCount, href: "/admin/linha-do-tempo" },
    { label: "Pontos no mapa", value: mapCount, href: "/admin/mapa" },
    { label: "Slides do webstorie", value: slideCount, href: "/admin/webstorie" },
    { label: "Integrantes da equipe", value: teamCount, href: "/admin/equipe" },
  ];

  return (
    <div>
      <p className="font-label text-[11px] text-wine">Painel administrativo</p>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Bem-vinda(o) de volta</h1>
      <p className="mt-3 max-w-xl text-ink/65">
        Gerencie todo o conteúdo do site por aqui — nenhuma alteração exige acesso ao código.
        As páginas públicas são atualizadas automaticamente a cada publicação.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-ink/10 bg-paper p-6 transition-shadow hover:shadow-lg"
          >
            <p className="font-display text-3xl font-bold text-wine">{card.value}</p>
            <p className="font-label mt-2 text-[11px] text-ink/60">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-bold">Últimas edições</h2>
        <div className="mt-4 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-paper">
          {recentSections.map((s) => (
            <Link
              key={s.id}
              href={`/admin/secoes/${s.slug}`}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-sand/50"
            >
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="font-label text-[10px] text-ink/45">
                  {s.label} · {s.published ? "Publicado" : "Rascunho"}
                </p>
              </div>
              <p className="font-label shrink-0 text-[10px] text-ink/40">{formatDate(s.updatedAt)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
