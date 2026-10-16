"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";

export function WebstorieMediaUpload({ currentUrl }: { currentUrl?: string | null }) {
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/webstorie-upload",
        onUploadProgress: (p) => setProgress(Math.round(p.percentage)),
      });
      setUrl(blob.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no envio do arquivo.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {currentUrl && !url && (
        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label truncate text-[11px] text-ink/50 underline"
        >
          Ver arquivo atual
        </a>
      )}
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full text-sm"
      />
      {uploading && <p className="font-label text-[11px] text-ink/50">Enviando… {progress}%</p>}
      {error && <p className="font-label text-[11px] text-wine">{error}</p>}
      {url && !uploading && !error && (
        <p className="font-label truncate text-[11px] text-teal">Novo arquivo pronto.</p>
      )}
      <input type="hidden" name="mediaUrl" value={url} />
    </div>
  );
}
