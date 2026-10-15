import type { Metadata } from "next";
import { getMapPoints } from "@/lib/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MapLoader } from "@/components/site/MapLoader";

export const metadata: Metadata = { title: "Mapa Interativo" };

export default async function MapaPage() {
  const points = await getMapPoints();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Geografia da reportagem"
          title="Mapa Interativo"
          description="Os lugares que atravessam esta história — de encontros de fãs a bastidores de eventos."
        />

        <div className="mt-8 space-y-4 text-ink/75">
          <p>
            Apesar de não ter uma pesquisa global sobre a quantidade total de cada fandom, é
            possível entrar em um consenso a partir de três maneiras muito diferentes de medir, e
            elas produzem rankings diferentes entre si.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-ink/10 bg-paper p-4">
              <p className="font-label text-[11px] text-wine">Declaração</p>
              <p className="mt-2 text-sm">
                Pesquisas de opinião que perguntam &quot;você é fã disso?&quot;. É o método mais
                próximo do conceito de fandom, e o mais raro. Quase sempre cobre um país só, e a
                comparação entre pesquisas de institutos diferentes costuma variar alguns pontos
                percentuais.
              </p>
            </div>
            <div className="rounded-xl border border-ink/10 bg-paper p-4">
              <p className="font-label text-[11px] text-wine">Consumo</p>
              <p className="mt-2 text-sm">
                Bilheteria, cópias vendidas, assinantes, audiência de TV, streams. É o dado mais
                abundante e o mais enganoso. Mede quem pagou ou assistiu, não quem se organiza em
                comunidade. Perry Mason vendeu mais de 300 milhões de livros e não tem fandom
                ativo; Supernatural teve audiência modesta e é o sexto maior fandom de fanfic do
                mundo.
              </p>
            </div>
            <div className="rounded-xl border border-ink/10 bg-paper p-4">
              <p className="font-label text-[11px] text-wine">Produção</p>
              <p className="mt-2 text-sm">
                Quantas fanfics, fanarts e traduções a comunidade gera. É o único indicador que
                mede fandom no sentido estrito &quot;pessoas produzindo&quot;, e é também o mais
                preciso, porque é contagem, não estimativa. Também é o mais enviesado, pois
                privilegia comunidades de escrita, majoritariamente femininas e de língua inglesa.
              </p>
            </div>
          </div>
          <p className="font-label text-sm text-wine">
            A partir desses elementos, conheça os maiores fandoms do mundo:
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 h-[70vh] max-w-6xl overflow-hidden rounded-2xl border border-ink/10 px-0 sm:px-8">
        <MapLoader
          points={points.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            lat: p.lat,
            lng: p.lng,
            category: p.category,
            imageUrl: p.imageUrl,
          }))}
        />
      </div>

      {points.length === 0 && (
        <p className="font-label mx-auto mt-6 max-w-4xl px-5 text-sm text-ink/50 sm:px-8">
          Nenhum ponto publicado ainda. Adicione locais no painel administrativo.
        </p>
      )}
    </div>
  );
}
