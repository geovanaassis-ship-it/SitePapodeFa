"use client";

import dynamic from "next/dynamic";

type Point = {
  id: string;
  name: string;
  description: string | null;
  lat: number;
  lng: number;
  category: string | null;
  imageUrl: string | null;
};

const MapView = dynamic(() => import("./MapView").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <p className="font-label text-xs text-ink/40">Carregando mapa…</p>
    </div>
  ),
});

export function MapLoader({ points }: { points: Point[] }) {
  return <MapView points={points} />;
}
