import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
]);

/**
 * Salva um arquivo enviado via <input type="file"> (recebido numa Server
 * Action como FormData) e retorna o caminho/URL pública.
 *
 * Em produção (quando BLOB_READ_WRITE_TOKEN está definido, ex. na Vercel com
 * um Blob Store conectado ao projeto), o arquivo vai para o Vercel Blob.
 * Em desenvolvimento local, cai para disco em /public/uploads — o sistema de
 * arquivos de plataformas serverless é efêmero, então esse caminho não deve
 * ser usado em produção.
 */
export async function saveUploadedFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error(`Tipo de arquivo não suportado: ${file.type || "desconhecido"}`);
  }

  const ext = path.extname(file.name) || guessExtension(file.type);
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/${filename}`;
}

function guessExtension(mimeType: string): string {
  const map: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "audio/mpeg": ".mp3",
    "audio/mp3": ".mp3",
    "audio/wav": ".wav",
    "audio/ogg": ".ogg",
  };
  return map[mimeType] ?? "";
}
