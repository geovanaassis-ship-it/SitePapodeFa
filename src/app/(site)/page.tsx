import Image from "next/image";
import Link from "next/link";
import { getSiteSettings, getLatestPublications } from "@/lib/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { EditorialCard } from "@/components/site/EditorialCard";
import { simpleMarkdownToHtml } from "@/lib/markdown";

export default async function HomePage() {
  const [settings, latest] = await Promise.all([getSiteSettings(), getLatestPublications(3)]);

  const introHtml = simpleMarkdownToHtml(settings.introText);

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
                href="#ultimas-publicacoes"
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
        <div
          className="prose-apresentacao mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-ink/75"
          dangerouslySetInnerHTML={{ __html: introHtml }}
        />
        <div className="mt-10 flex justify-center">
          <div className="rule w-24" />
        </div>
      </section>

      {/* ÚLTIMAS PUBLICAÇÕES */}
      <section id="ultimas-publicacoes" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
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
