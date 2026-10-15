import Link from "next/link";
import { Logo } from "./Logo";

type NavSection = { slug: string; label: string };

export function Footer({
  siteName,
  logoUrl,
  footerText,
  contactEmail,
  instagramUrl,
  youtubeUrl,
  spotifyUrl,
  tiktokUrl,
  perfis,
  videos,
  audios,
}: {
  siteName: string;
  logoUrl?: string | null;
  footerText?: string | null;
  contactEmail?: string | null;
  instagramUrl?: string | null;
  youtubeUrl?: string | null;
  spotifyUrl?: string | null;
  tiktokUrl?: string | null;
  perfis: NavSection[];
  videos: NavSection[];
  audios: NavSection[];
}) {
  const socials = [
    { label: "Instagram", href: instagramUrl },
    { label: "YouTube", href: youtubeUrl },
    { label: "Spotify", href: spotifyUrl },
    { label: "TikTok", href: tiktokUrl },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 border-t border-ink/10 bg-navy text-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo logoUrl={logoUrl} siteName={siteName} variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">{footerText}</p>
          </div>

          <FooterGroup title="Perfis" items={perfis} />
          <FooterGroup title="Vídeos" items={videos} />
          <FooterGroup title="Áudios" items={audios} />
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-paper/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-label text-[11px] text-paper/70">
            <Link href="/webstorie" className="hover:text-paper">Webstorie</Link>
            <Link href="/linha-do-tempo" className="hover:text-paper">Linha do Tempo</Link>
            <Link href="/mapa-interativo" className="hover:text-paper">Mapa Interativo</Link>
            <Link href="/sobre-nos" className="hover:text-paper">Sobre Nós</Link>
            <Link href="/admin" className="hover:text-paper">Painel administrativo</Link>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {contactEmail && (
              <a href={`mailto:${contactEmail}`} className="font-label text-[11px] text-paper/70 hover:text-paper">
                {contactEmail}
              </a>
            )}
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[11px] text-paper/70 hover:text-paper"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 font-label text-[10px] text-paper/40">
          © {new Date().getFullYear()} {siteName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function FooterGroup({ title, items }: { title: string; items: NavSection[] }) {
  return (
    <div>
      <p className="font-label text-[11px] text-paper/50">{title}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={`/${item.slug}`} className="font-mono text-[12px] text-paper/85 hover:text-paper">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
