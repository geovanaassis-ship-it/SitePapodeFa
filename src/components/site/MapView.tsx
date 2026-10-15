"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

type Point = {
  id: string;
  name: string;
  description: string | null;
  lat: number;
  lng: number;
  category: string | null;
  imageUrl: string | null;
};

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="width:18px;height:18px;border-radius:50%;background:#940501;border:3px solid #f5e5d6;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export function MapView({ points }: { points: Point[] }) {
  const center: [number, number] =
    points.length > 0 ? [points[0].lat, points[0].lng] : [-14.235, -51.9253];

  return (
    <MapContainer
      center={center}
      zoom={points.length > 0 ? 5 : 4}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <Marker key={point.id} position={[point.lat, point.lng]} icon={markerIcon}>
          <Popup>
            <div className="font-sans">
              <p className="font-semibold">{point.name}</p>
              {point.category && <p className="text-xs text-neutral-500">{point.category}</p>}
              {point.description && <p className="mt-1 text-sm">{point.description}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
