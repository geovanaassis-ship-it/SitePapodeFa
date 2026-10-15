"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Painel", exact: true },
  { href: "/admin/configuracoes", label: "Página Inicial" },
  { href: "/admin/secoes", label: "Perfis, Vídeos e Áudios" },
  { href: "/admin/linha-do-tempo", label: "Linha do Tempo" },
  { href: "/admin/mapa", label: "Mapa Interativo" },
  { href: "/admin/webstorie", label: "Webstorie" },
  { href: "/admin/equipe", label: "Equipe / Sobre Nós" },
  { href: "/admin/usuarios", label: "Usuários do painel" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors",
              active ? "bg-orange text-ink font-medium" : "text-paper/75 hover:bg-paper/10 hover:text-paper",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
