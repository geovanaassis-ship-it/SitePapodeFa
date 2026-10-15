"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

type NavSection = { slug: string; label: string };

export function Header({
  siteName,
  logoUrl,
  perfis,
  videos,
  audios,
}: {
  siteName: string;
  logoUrl?: string | null;
  perfis: NavSection[];
  videos: NavSection[];
  audios: NavSection[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const groups = [
    { label: "Perfis", items: perfis },
    { label: "Vídeos", items: videos },
    { label: "Áudios", items: audios },
  ];

  const singleLinks = [
    { href: "/webstorie", label: "Webstorie" },
    { href: "/linha-do-tempo", label: "Linha do Tempo" },
    { href: "/mapa-interativo", label: "Mapa Interativo" },
    { href: "/sobre-nos", label: "Sobre Nós" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-sand/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Logo logoUrl={logoUrl} siteName={siteName} />

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="font-label rounded-full px-3 py-2 text-[12px] hover:bg-ink/5"
          >
            Início
          </Link>
          {groups.map((group) => (
            <div key={group.label} className="group relative">
              <button className="font-label flex items-center gap-1 rounded-full px-3 py-2 text-[12px] hover:bg-ink/5">
                {group.label}
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden>
                  <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-1 rounded-xl border border-ink/10 bg-paper p-2 opacity-0 shadow-xl shadow-ink/5 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {group.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="block rounded-lg px-3 py-2 font-body text-sm hover:bg-sand"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {singleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label rounded-full px-3 py-2 text-[12px] hover:bg-ink/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-ink/15 lg:hidden"
        >
          <span
            className={`h-[1.5px] w-5 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-[1.5px] w-5 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-ink/10 bg-sand px-5 pb-8 pt-2 lg:hidden">
          <Link href="/" className="block py-3 font-display text-lg">
            Início
          </Link>
          {groups.map((group) => (
            <div key={group.label} className="border-t border-ink/10 py-3">
              <p className="font-label mb-2 text-[11px] text-ink/60">{group.label}</p>
              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <Link key={item.slug} href={`/${item.slug}`} className="font-display text-lg">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-ink/10 py-3">
            <div className="flex flex-col gap-2">
              {singleLinks.map((link) => (
                <Link key={link.href} href={link.href} className="font-display text-lg">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
