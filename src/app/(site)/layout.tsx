import { getSiteSettings, getNavSections } from "@/lib/content";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

// O conteúdo é editado em tempo real pelo painel administrativo, então as
// páginas públicas precisam ser renderizadas a cada requisição (nunca
// pré-geradas em tempo de build), para refletir publicações imediatamente.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, nav] = await Promise.all([getSiteSettings(), getNavSections()]);

  const toNav = (items: { slug: string; label: string }[]) =>
    items.map((i) => ({ slug: i.slug, label: i.label }));

  return (
    <>
      <Header
        siteName={settings.shortName || settings.siteName}
        logoUrl={settings.logoUrl}
        perfis={toNav(nav.perfis)}
        videos={toNav(nav.videos)}
        audios={toNav(nav.audios)}
      />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={settings.shortName || settings.siteName}
        logoUrl={settings.logoUrl}
        footerText={settings.footerText}
        contactEmail={settings.contactEmail}
        instagramUrl={settings.instagramUrl}
        youtubeUrl={settings.youtubeUrl}
        spotifyUrl={settings.spotifyUrl}
        tiktokUrl={settings.tiktokUrl}
        perfis={toNav(nav.perfis)}
        videos={toNav(nav.videos)}
        audios={toNav(nav.audios)}
      />
    </>
  );
}
