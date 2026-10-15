import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getSiteSettings } from "@/lib/content";
import { AdminNav } from "@/components/admin/AdminNav";
import { Logo } from "@/components/site/Logo";
import { logoutAction } from "@/lib/actions/session-actions";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const settings = await getSiteSettings();
  const siteName = settings.shortName || settings.siteName;

  return (
    <div className="flex min-h-screen bg-sand">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy p-6 text-paper lg:flex">
        <Logo logoUrl={settings.logoUrl} siteName={siteName} variant="light" />
        <div className="mt-8 flex-1">
          <AdminNav />
        </div>
        <div className="border-t border-paper/15 pt-4">
          <p className="text-sm">{session.user.name}</p>
          <p className="font-label text-[10px] text-paper/50">{session.user.email}</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/" className="font-label text-[11px] text-paper/70 hover:text-paper">
              Ver site →
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="font-label text-[11px] text-paper/70 hover:text-paper">
                Sair
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="sticky top-0 z-30 border-b border-ink/10 bg-paper lg:hidden">
          <div className="flex items-center justify-between px-5 py-3">
            <Logo logoUrl={settings.logoUrl} siteName={siteName} />
            <form action={logoutAction}>
              <button type="submit" className="font-label text-[11px] text-wine">
                Sair
              </button>
            </form>
          </div>
          <div className="scrollbar-thin flex gap-2 overflow-x-auto px-5 pb-3">
            {[
              ["/admin", "Painel"],
              ["/admin/configuracoes", "Config."],
              ["/admin/secoes", "Conteúdos"],
              ["/admin/linha-do-tempo", "Linha do Tempo"],
              ["/admin/mapa", "Mapa"],
              ["/admin/webstorie", "Webstorie"],
              ["/admin/equipe", "Equipe"],
              ["/admin/usuarios", "Usuários"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="font-label shrink-0 rounded-full border border-ink/10 px-3 py-1.5 text-[11px] text-ink/70"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">{children}</div>
      </div>
    </div>
  );
}
