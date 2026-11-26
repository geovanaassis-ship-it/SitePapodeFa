/**
 * Converte links normais de compartilhamento (YouTube, Spotify, Vimeo) para o
 * formato de incorporação (/embed/), que é o único aceito dentro de um
 * <iframe> — o link de compartilhamento comum é bloqueado pelo próprio
 * YouTube/Spotify quando carregado dentro de outro site, e aparece como
 * "conexão recusada" no navegador.
 *
 * URLs que já estão em formato de embed, ou de outras fontes, passam direto.
 */
export function toEmbedUrl(rawUrl: string): string {
  const url = rawUrl.trim();
  if (!url) return url;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  const host = parsed.hostname.replace(/^www\./, "");

  // YouTube: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID
  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1);
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    if (parsed.pathname === "/watch") {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    // já é /embed/... — mantém como está
  }

  // Spotify: open.spotify.com/episode|track|show|album/ID
  if (host === "open.spotify.com") {
    const match = parsed.pathname.match(/^\/(episode|track|show|album|playlist)\/([^/]+)/);
    if (match) return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
    // já é /embed/... — mantém como está
  }

  // Vimeo: vimeo.com/ID
  if (host === "vimeo.com") {
    const match = parsed.pathname.match(/^\/(\d+)/);
    if (match) return `https://player.vimeo.com/video/${match[1]}`;
  }

  return url;
}
