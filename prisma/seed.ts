import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "equipe@papodefa.com.br";

// Gerada aleatoriamente a cada execução — nunca fica gravada no código-fonte
// (este arquivo é público no repositório).
const ADMIN_PASSWORD = crypto.randomBytes(12).toString("base64url");

async function main() {
  const existingAdmin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { passwordHash },
    create: {
      name: "Equipe Papo de Fã",
      email: ADMIN_EMAIL,
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteName: "Papo de Fã",
      shortName: "Papo de Fã",
      tagline: "Histórias de quem vive a cultura fandom.",
      heroTitle: "Papo de Fã",
      heroSubtitle:
        "Uma reportagem multimídia sobre afeto, identidade e comunidade dentro do universo dos fandoms — contada por quem vive isso todos os dias.",
      introTitle: "Sobre o projeto",
      introText:
        "O Papo de Fã investiga como fãs transformam aquilo que amam em redes de pertencimento, criatividade e resistência. Ao longo desta série, cruzamos perfis, vídeos, áudios, linha do tempo e mapa para contar essa história por múltiplos caminhos.",
      aboutText:
        "Somos um grupo de estudantes de jornalismo interessados em entender, na prática, como a cultura fandom organiza afetos e comunidades. Este site é o resultado de meses de reportagem, entrevistas e produção multimídia.",
      footerText: "Um projeto editorial universitário sobre cultura fandom.",
      contactEmail: ADMIN_EMAIL,
      instagramUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
      spotifyUrl: "https://spotify.com",
    },
  });

  const sections: Array<{
    slug: string;
    kind: string;
    label: string;
    category: string;
    title: string;
    subtitle: string;
    excerpt: string;
    body: string;
    mediaType?: string;
    mediaUrl?: string;
  }> = [
    {
      slug: "perfil-1",
      kind: "PERFIL",
      label: "Perfil 1",
      category: "Perfil",
      title: "Entre fanzines e madrugadas: a trajetória de uma fã-criadora",
      subtitle: "Como a escrita de fanfics virou ofício e comunidade",
      excerpt:
        "Ela começou publicando capítulos em fóruns às escondidas. Hoje, coordena um coletivo de escritoras de fanfic com milhares de leitores.",
      body: "Edite este texto no painel administrativo em **Conteúdo → Perfil 1**. Você pode escrever a reportagem completa aqui, com parágrafos, **destaques** e *itálicos*.\n\nSubstitua este conteúdo de exemplo pelo perfil real da pessoa entrevistada.",
    },
    {
      slug: "perfil-2",
      kind: "PERFIL",
      label: "Perfil 2",
      category: "Perfil",
      title: "O fã-clube que virou família",
      subtitle: "Encontros presenciais, viagens e amizades que atravessam o país",
      excerpt:
        "O que começou em um grupo de WhatsApp se transformou em uma rede de apoio que vai muito além do fandom.",
      body: "Edite este texto no painel administrativo em **Conteúdo → Perfil 2**.",
    },
    {
      slug: "video-1",
      kind: "VIDEO",
      label: "Vídeo 1",
      category: "Vídeo",
      title: "Bastidores de uma convenção de fãs",
      subtitle: "Um dia inteiro registrado por dentro do evento",
      excerpt: "Acompanhe os preparativos, os encontros e a emoção de quem viaja horas para estar ali.",
      body: "Adicione a legenda e o contexto deste vídeo no painel administrativo.",
      mediaType: "EMBED",
      mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      slug: "video-2",
      kind: "VIDEO",
      label: "Vídeo 2",
      category: "Vídeo",
      title: "Cosplay: horas de trabalho em segundos de cena",
      subtitle: "O processo criativo por trás dos figurinos",
      excerpt: "De molde de EVA a maquiagem de efeito: entenda o que leva à cena final.",
      body: "Adicione a legenda e o contexto deste vídeo no painel administrativo.",
      mediaType: "EMBED",
      mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      slug: "audio-1",
      kind: "AUDIO",
      label: "Áudio 1",
      category: "Áudio",
      title: "Podcast: o que é ser fã hoje?",
      subtitle: "Uma conversa sobre identidade e pertencimento",
      excerpt: "Reunimos três gerações de fãs para falar sobre como o fandom mudou — e o que permanece igual.",
      body: "Adicione a transcrição ou as notas deste episódio no painel administrativo.",
      mediaType: "EMBED",
      mediaUrl: "https://open.spotify.com/embed/episode/placeholder",
    },
    {
      slug: "audio-2",
      kind: "AUDIO",
      label: "Áudio 2",
      category: "Áudio",
      title: "Relatos sonoros: a primeira vez em um show",
      subtitle: "Memórias registradas em áudio por fãs de todo o Brasil",
      excerpt: "Pequenos relatos, grandes emoções: ouça histórias enviadas pela nossa comunidade.",
      body: "Adicione a transcrição ou as notas deste episódio no painel administrativo.",
      mediaType: "EMBED",
      mediaUrl: "https://open.spotify.com/embed/episode/placeholder",
    },
  ];

  for (const section of sections) {
    await prisma.sectionPage.upsert({
      where: { slug: section.slug },
      update: {},
      create: section,
    });
  }

  const timelineEvents = [
    {
      eventDate: new Date("2023-03-01"),
      title: "Início da pesquisa",
      description: "Primeiros contatos com comunidades de fãs e levantamento bibliográfico sobre cultura fandom.",
      order: 1,
    },
    {
      eventDate: new Date("2023-08-15"),
      title: "Primeiras entrevistas",
      description: "Rodada inicial de entrevistas com fãs-criadores, colecionadores e organizadores de eventos.",
      order: 2,
    },
    {
      eventDate: new Date("2024-01-20"),
      title: "Cobertura de convenção",
      description: "Registro em campo de uma convenção de fãs, com captação de vídeo, áudio e fotografia.",
      order: 3,
    },
    {
      eventDate: new Date("2024-06-10"),
      title: "Publicação do projeto",
      description: "Lançamento deste site reunindo perfis, vídeos, áudios, linha do tempo e mapa interativo.",
      order: 4,
    },
  ];

  for (const event of timelineEvents) {
    const existing = await prisma.timelineEvent.findFirst({ where: { title: event.title } });
    if (!existing) {
      await prisma.timelineEvent.create({ data: event });
    }
  }

  const mapPoints = [
    {
      name: "Centro de Convenções",
      description: "Local do principal evento de fãs coberto pela reportagem.",
      lat: -23.5505,
      lng: -46.6333,
      category: "Evento",
      order: 1,
    },
    {
      name: "Sede do fã-clube",
      description: "Ponto de encontro semanal de um dos grupos entrevistados.",
      lat: -22.9068,
      lng: -43.1729,
      category: "Comunidade",
      order: 2,
    },
  ];

  for (const point of mapPoints) {
    const existing = await prisma.mapPoint.findFirst({ where: { name: point.name } });
    if (!existing) {
      await prisma.mapPoint.create({ data: point });
    }
  }

  const slides = [
    { order: 1, mediaType: "IMAGE", mediaUrl: "", title: "Capa", text: "Edite os slides do Webstorie no painel administrativo." },
    { order: 2, mediaType: "IMAGE", mediaUrl: "", title: "Capítulo 1", text: "Cada slide pode ter uma imagem e um texto curto." },
    { order: 3, mediaType: "IMAGE", mediaUrl: "", title: "Capítulo 2", text: "Adicione quantos slides quiser." },
  ];

  for (const slide of slides) {
    const existing = await prisma.webstorieSlide.findFirst({ where: { title: slide.title } });
    if (!existing) {
      await prisma.webstorieSlide.create({ data: slide });
    }
  }

  const team = [
    { name: "Nome da Integrante", role: "Reportagem e edição", order: 1 },
    { name: "Nome do Integrante", role: "Produção audiovisual", order: 2 },
    { name: "Nome da Integrante", role: "Design e identidade visual", order: 3 },
  ];

  for (const member of team) {
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name, role: member.role } });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }

  console.log("Seed concluído.");
  console.log(
    existingAdmin
      ? `Senha do usuário admin redefinida: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`
      : `Usuário admin criado: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`,
  );
  console.log("Guarde essa senha agora — ela só aparece aqui, uma vez, e não fica no código-fonte.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
