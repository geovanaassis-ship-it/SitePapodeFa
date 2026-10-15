import Image from "next/image";
import Link from "next/link";
import {
  getSiteSettings,
  getNavSections,
  getLatestPublications,
  getTimelineEvents,
  getMapPoints,
  getTeamMembers,
  getWebstorieSlides,
} from "@/lib/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { EditorialCard } from "@/components/site/EditorialCard";
import { SectionTag } from "@/components/site/SectionTag";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [settings, nav, latest, timeline, mapPoints, team, slides] = await Promise.all([
    getSiteSettings(),
    getNavSections(),
    getLatestPublications(6),
    getTimelineEvents(),
    getMapPoints(),
    getTeamMembers(),
    getWebstorieSlides(),
  ]);

  const highlights = [...nav.perfis, ...nav.videos, ...nav.audios].filter((s) => s.published);
  const timelinePreview = timeline.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-wine/40 blur-3xl" />
          <div className="absolute -right-10 top-1/3 h-72 w-72 rounded-full bg-teal/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-lilac/30 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
          <div>
            <span className="font-label inline-flex items-center gap-2 rounded-full border border-paper/25 px-3 py-1 text-[11px] text-paper/80">
              Reportagem multimídia · Cultura Fandom
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] sm:text-6xl md:text-7xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80 sm:text-xl">
              {settings.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/webstorie"
                className="font-label rounded-full bg-orange px-6 py-3 text-[12px] text-ink transition-transform hover:-translate-y-0.5"
              >
                Ver Webstorie
              </Link>
              <Link
                href="#destaques"
                className="font-label rounded-full border border-paper/40 px-6 py-3 text-[12px] text-paper transition-colors hover:bg-paper/10"
              >
                Explorar conteúdos
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            {settings.heroImage ? (
              <Image
                src={settings.heroImage}
                alt={settings.heroTitle}
                fill
                className="rounded-3xl object-cover shadow-2xl"
                priority
              />
            ) : (
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-paper/15 bg-gradient-to-br from-wine via-navy to-black shadow-2xl">
                <div className="absolute inset-8 rounded-2xl border border-paper/15" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-label text-[11px] text-paper/60">Edição 01</p>
                  <p className="mt-2 font-display text-3xl leading-tight text-paper">
                    Fãs que fazem história.
                  </p>
                </div>
                <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-pink/70 blur-sm" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* APRESENTAÇÃO */}
      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <SectionHeading eyebrow="Apresentação" title={settings.introTitle} align="center" />
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-ink/75">
          {settings.introText}
        </p>
        <div className="mt-10 flex justify-center">
          <div className="rule w-24" />
        </div>
      </section>

      {/* DESTAQUES */}
      <section id="destaques" className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <SectionHeading
          eyebrow="Conteúdos"
          title="Perfis, vídeos e áudios"
          description="Histórias contadas em diferentes formatos — leia, assista e escute."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <EditorialCard
              key={item.slug}
              href={`/${item.slug}`}
              kind={item.kind}
              category={item.category ?? item.kind}
              title={item.title}
              excerpt={item.excerpt}
              coverImage={item.coverImage}
              date={item.updatedAt}
            />
          ))}
        </div>
      </section>

      {/* WEBSTORIE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-ink text-paper">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionTag kind="WEBSTORIE">Narrativa interativa</SectionTag>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
                Viva a história em formato Webstorie
              </h2>
              <p className="mt-4 max-w-lg text-paper/70">
                Uma narrativa vertical, em slides, pensada para celular — como nos stories que você já conhece.
                {slides.length > 0 && ` ${slides.length} slides publicados.`}
              </p>
              <Link
                href="/webstorie"
                className="font-label mt-7 inline-flex rounded-full bg-lilac px-6 py-3 text-[12px] text-ink"
              >
                Abrir Webstorie →
              </Link>
            </div>
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-44 w-28 shrink-0 rounded-2xl border border-paper/15 bg-gradient-to-b from-pink/30 via-lilac/30 to-orange/30 sm:h-56 sm:w-36"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LINHA DO TEMPO */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Linha do Tempo" title="Como a reportagem aconteceu" />
          <Link href="/linha-do-tempo" className="font-label text-[12px] text-wine">
            Ver linha do tempo completa →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {timelinePreview.map((event) => (
            <div key={event.id} className="rounded-2xl border border-ink/10 bg-paper p-6">
              <p className="font-label text-[11px] text-wine">{formatDate(event.eventDate)}</p>
              <h3 className="mt-3 font-display text-xl">{event.title}</h3>
              {event.description && (
                <p className="mt-2 line-clamp-3 text-sm text-ink/65">{event.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* MAPA */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 rounded-3xl border border-ink/10 bg-paper p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTag kind="MAPA">Geografia da reportagem</SectionTag>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Explore o Mapa Interativo
            </h2>
            <p className="mt-4 max-w-lg text-ink/70">
              {mapPoints.length > 0
                ? `${mapPoints.length} locais mapeados — dos encontros de fãs aos bastidores dos eventos.`
                : "Em breve: os locais mapeados durante a reportagem."}
            </p>
            <Link
              href="/mapa-interativo"
              className="font-label mt-7 inline-flex rounded-full bg-teal px-6 py-3 text-[12px] text-paper"
            >
              Abrir mapa →
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-teal/20 via-sand to-lilac/20">
            <svg viewBox="0 0 200 150" className="h-full w-full opacity-70">
              <path
                d="M10 110 Q 40 40 90 60 T 190 30"
                fill="none"
                stroke="#073147"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {[
                [20, 100],
                [90, 60],
                [150, 40],
                [180, 25],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#940501" />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* SOBRE NÓS */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionTag kind="SOBRE">Quem faz</SectionTag>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">Sobre Nós</h2>
            <p className="mt-4 max-w-lg text-ink/70">{settings.aboutText}</p>
            <Link href="/sobre-nos" className="font-label mt-7 inline-flex text-[12px] text-wine">
              Conhecer o projeto e a equipe →
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {team.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center gap-3 rounded-full border border-ink/10 bg-paper px-4 py-2">
                <div className="h-9 w-9 overflow-hidden rounded-full bg-navy/10">
                  {member.photoUrl ? (
                    <Image src={member.photoUrl} alt={member.name} width={36} height={36} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-sm text-navy">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  {member.role && <p className="font-label text-[10px] text-ink/50">{member.role}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÚLTIMAS PUBLICAÇÕES */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Atualizado pela equipe"
          title="Últimas publicações"
          description="Esta seção é gerada automaticamente a partir do painel administrativo — sempre que novo conteúdo for publicado, ele aparece aqui."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((item) => (
            <EditorialCard
              key={item.id}
              href={item.href}
              kind={item.type}
              category={item.category}
              title={item.title}
              excerpt={item.excerpt}
              coverImage={item.coverImage}
              date={item.updatedAt}
            />
          ))}
        </div>
      </section>
    </>
  );
}
