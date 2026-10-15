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
