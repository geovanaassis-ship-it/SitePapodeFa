import { prisma } from "@/lib/prisma";

const DEFAULT_SETTINGS = {
  id: "singleton",
  siteName: "Papo de Fã",
  shortName: "Papo de Fã",
  tagline: "Histórias de quem vive a cultura fandom.",
  heroTitle: "Papo de Fã",
  heroSubtitle: "Um projeto editorial sobre afeto, identidade e comunidade.",
  heroImage: null,
  logoUrl: null,
  introTitle: "Sobre o projeto",
  introText: "Edite esta apresentação no painel administrativo.",
  aboutText: "Edite o texto da equipe no painel administrativo.",
  footerText: "Um projeto editorial universitário sobre cultura fandom.",
  contactEmail: null,
  instagramUrl: null,
  youtubeUrl: null,
  spotifyUrl: null,
  tiktokUrl: null,
  updatedAt: new Date(),
};

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    if (settings) return settings;
    return await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: DEFAULT_SETTINGS,
    });
  } catch {
    // Banco indisponível (ex.: build sem acesso ao banco de produção) — usa
    // valores padrão para não derrubar a geração de metadados/páginas.
    return DEFAULT_SETTINGS;
  }
}

export const SECTION_DEFS = [
  { slug: "perfil-1", kind: "PERFIL", group: "Perfis" },
  { slug: "perfil-2", kind: "PERFIL", group: "Perfis" },
  { slug: "video-1", kind: "VIDEO", group: "Vídeos" },
  { slug: "video-2", kind: "VIDEO", group: "Vídeos" },
  { slug: "audio-1", kind: "AUDIO", group: "Áudios" },
  { slug: "audio-2", kind: "AUDIO", group: "Áudios" },
] as const;

export async function getAllSections() {
  const sections = await prisma.sectionPage.findMany({
    orderBy: { slug: "asc" },
  });
  // Garante que as 6 seções sempre existam, mesmo que o seed não tenha rodado.
  const bySlug = new Map(sections.map((s) => [s.slug, s]));
  return SECTION_DEFS.map((def) => {
    const existing = bySlug.get(def.slug);
    if (existing) return existing;
    return {
      id: def.slug,
      slug: def.slug,
      kind: def.kind,
      label: def.slug.replace("-", " "),
      category: def.group,
      title: "Conteúdo a publicar",
      subtitle: null,
      excerpt: "Esta seção ainda não foi publicada. Edite-a no painel administrativo.",
      coverImage: null,
      body: null,
      mediaUrl: null,
      mediaType: null,
      published: false,
      publishedAt: new Date(),
      updatedAt: new Date(),
    };
  });
}

export async function getSectionBySlug(slug: string) {
  const sections = await getAllSections();
  return sections.find((s) => s.slug === slug) ?? null;
}

export async function getNavSections() {
  const sections = await getAllSections();
  return {
    perfis: sections.filter((s) => s.kind === "PERFIL"),
    videos: sections.filter((s) => s.kind === "VIDEO"),
    audios: sections.filter((s) => s.kind === "AUDIO"),
  };
}

export async function getTimelineEvents(onlyPublished = true) {
  return prisma.timelineEvent.findMany({
    where: onlyPublished ? { published: true } : {},
    orderBy: [{ order: "asc" }, { eventDate: "asc" }],
  });
}

export async function getMapPoints(onlyPublished = true) {
  return prisma.mapPoint.findMany({
    where: onlyPublished ? { published: true } : {},
    orderBy: [{ order: "asc" }],
  });
}

export async function getWebstorieSlides(onlyPublished = true) {
  return prisma.webstorieSlide.findMany({
    where: onlyPublished ? { published: true } : {},
    orderBy: { order: "asc" },
  });
}

export async function getTeamMembers(onlyPublished = true) {
  return prisma.teamMember.findMany({
    where: onlyPublished ? { published: true } : {},
    orderBy: { order: "asc" },
  });
}

export type LatestItem = {
  id: string;
  type: "PERFIL" | "VIDEO" | "AUDIO";
  href: string;
  label: string;
  category: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  updatedAt: Date;
};

/** Conteúdos mais recentes, usados na home ("Últimas publicações"). Atualiza
 *  automaticamente conforme a equipe publica/edita no painel administrativo. */
export async function getLatestPublications(limit = 6): Promise<LatestItem[]> {
  const sections = await prisma.sectionPage.findMany({
    where: { published: true },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });

  return sections.map((s) => ({
    id: s.id,
    type: s.kind as LatestItem["type"],
    href: `/${s.slug}`,
    label: s.label,
    category: s.category ?? s.kind,
    title: s.title,
    excerpt: s.excerpt,
    coverImage: s.coverImage,
    updatedAt: s.updatedAt,
  }));
}
