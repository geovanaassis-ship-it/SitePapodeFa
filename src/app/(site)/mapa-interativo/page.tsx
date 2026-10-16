import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { simpleMarkdownToHtml } from "@/lib/markdown";

export const metadata: Metadata = { title: "Mapa Interativo" };

const DEFAULT_MAPA_INTRO_HTML = simpleMarkdownToHtml(
  [
    "Apesar de não ter uma pesquisa global sobre a quantidade total de cada fandom, é possível entrar em um consenso a partir de três maneiras muito diferentes de medir, e elas produzem rankings diferentes entre si.",
    "**Declaração** — Pesquisas de opinião que perguntam \"você é fã disso?\". É o método mais próximo do conceito de fandom, e o mais raro. Quase sempre cobre um país só, e a comparação entre pesquisas de institutos diferentes costuma variar alguns pontos percentuais.",
    "**Consumo** — Bilheteria, cópias vendidas, assinantes, audiência de TV, streams. É o dado mais abundante e o mais enganoso. Mede quem pagou ou assistiu, não quem se organiza em comunidade. Perry Mason vendeu mais de 300 milhões de livros e não tem fandom ativo; Supernatural teve audiência modesta e é o sexto maior fandom de fanfic do mundo.",
    "**Produção** — Quantas fanfics, fanarts e traduções a comunidade gera. É o único indicador que mede fandom no sentido estrito \"pessoas produzindo\", e é também o mais preciso, porque é contagem, não estimativa. Também é o mais enviesado, pois privilegia comunidades de escrita, majoritariamente femininas e de língua inglesa.",
    "A partir desses elementos, conheça os maiores fandoms do mundo:",
  ].join("\n\n"),
);

export default async function MapaPage() {
  const settings = await getSiteSettings();
  const introHtml = settings.mapaIntroText
    ? simpleMarkdownToHtml(settings.mapaIntroText)
    : DEFAULT_MAPA_INTRO_HTML;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Geografia da reportagem"
          title="Mapa Interativo"
          description="Os lugares que atravessam esta história — de encontros de fãs a bastidores de eventos."
        />

        <div
          className="prose-editorial mt-8 text-ink/75"
          dangerouslySetInnerHTML={{ __html: introHtml }}
        />
      </div>

      <div className="mx-auto mt-10 h-[70vh] max-w-6xl overflow-hidden rounded-2xl border border-ink/10 px-0 sm:px-8">
        <iframe
          src="https://uploads.knightlab.com/storymapjs/65c98a894216fa0e954fb75e5a2245b7/maiores-fandoms-ao-redor-do-mundo/draft.html"
          title="Maiores fandoms ao redor do mundo"
          className="h-full w-full border-0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
