import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { put } from "@vercel/blob";
import { readFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "equipe@papodefa.com.br";

// Gerada aleatoriamente a cada execução — nunca fica gravada no código-fonte
// (este arquivo é público no repositório). Só é usada na criação do primeiro
// usuário; se ele já existir, a senha dele não é alterada por aqui.
const ADMIN_PASSWORD = crypto.randomBytes(12).toString("base64url");

async function main() {
  const existingAdmin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  // Se a variável de ambiente ADMIN_RESET_PASSWORD estiver definida no projeto
  // Vercel, usa o valor dela para (re)definir a senha do usuário admin nesta
  // execução. É um mecanismo manual de reset: a equipe define a variável,
  // roda o deploy, confirma o login, e então remove a variável. O valor
  // nunca é lido pelo Claude nem fica gravado no código-fonte.
  const resetPassword = process.env.ADMIN_RESET_PASSWORD;
  const resetPasswordHash = resetPassword ? await bcrypt.hash(resetPassword, 10) : null;

  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: resetPasswordHash ? { passwordHash: resetPasswordHash } : {},
    create: {
      name: "Equipe Papo de Fã",
      email: ADMIN_EMAIL,
      passwordHash: resetPasswordHash ?? passwordHash,
      role: "ADMIN",
    },
  });

  // Atualização pontual e definitiva da Linha do Tempo (texto + fotos) — remover depois de aplicado.
  {
    const historicalEvents: {
      order: number;
      eventDate: Date;
      title: string;
      description: string;
      photoFile: string;
    }[] = [
      {
        order: 1,
        eventDate: new Date("1844-01-01"),
        title: "Lisztomania",
        description:
          "O pianista Liszt provoca desmaios e disputas por mechas de cabelo nos EUA. Heine cria o termo em 1840, quando \"mania\" ainda era diagnóstico médico.",
        photoFile: "01-lisztomania.png",
      },
      {
        order: 2,
        eventDate: new Date("1885-01-01"),
        title: "Onde a palavra \"fã\" aparece",
        description:
          "No beisebol, a imprensa troca cranks e fiends e começa a chamar por fan, abreviação de fanatic. O registro impresso mais antigo é de 1885, em um jornal de Kansas City.",
        photoFile: "02-palavra-fa.png",
      },
      {
        order: 3,
        eventDate: new Date("1887-01-01"),
        title: "Comunidades literárias",
        description:
          "Leitores de Sherlock Holmes se reúnem para discutir teorias. Quando Doyle matou o detetive em 1893, a pressão dos fãs o obrigou a ressuscitar o personagem em 1903.",
        photoFile: "03-comunidades-literarias.png",
      },
      {
        order: 4,
        eventDate: new Date("1903-06-01"),
        title: "Onde a palavra \"fandom\" aparece",
        description:
          "Surge na imprensa, de novo, no beisebol: \"fan\" + \"dom\" de kingdom, em tradução literal, \"reino dos fãs\". Fã deixou de ser indivíduo e virou coletivo.",
        photoFile: "04-palavra-fandom.png",
      },
      {
        order: 5,
        eventDate: new Date("1920-01-01"),
        title: "Ficção científica e fanzines",
        description:
          "A revista Amazing Stories cria seções de cartas e aproxima os leitores. Em 1930 sai o The Comet, um dos primeiros fanzines registrados na história.",
        photoFile: "05-ficcao-cientifica.png",
      },
      {
        order: 6,
        eventDate: new Date("1960-01-01"),
        title: "Discos, rádio e TV",
        description:
          "A Beatlemania consolida-se como o primeiro grande fenômeno de fãs, populariza shows em estádios e clipes. No Brasil, a Jovem Guarda e o Tropicalismo ligam música a identidade.",
        photoFile: "06-discos-radio-tv.png",
      },
      {
        order: 7,
        eventDate: new Date("1966-01-01"),
        title: "Cultura geek",
        description:
          "Star Trek conquista uma legião de fãs e cerca de 100 mil cartas salvam a série do cancelamento. Fanfics, cosplay e colecionismo marcam o início da cultura geek, e em 1972 surge a primeira convenção.",
        photoFile: "07-cultura-geek.png",
      },
      {
        order: 8,
        eventDate: new Date("1980-01-01"),
        title: "Games, locadoras e rock",
        description:
          "Star Wars, quadrinhos, animes e fliperamas expandem a cultura geek. Em 1981, surge no Brasil a Rock Brigade, fã-clube que virou uma revista especializada no gênero.",
        photoFile: "08-games-locadoras-rock.png",
      },
      {
        order: 9,
        eventDate: new Date("1990-01-01"),
        title: "Os fãs chegam à internet",
        description:
          "Fóruns, listas de e-mail, Yahoo! Groups e o FanFiction.Net viralizam na internet. A MTV chega ao Brasil, os videoclipes bombam e começa a era das boybands.",
        photoFile: "09-fas-internet.png",
      },
      {
        order: 10,
        eventDate: new Date("2000-01-01"),
        title: "Divas pop, emocore e Orkut",
        description:
          "Divas pop entram em alta, sendo Britney Spears o maior nome da época. Anos depois, o emocore domina o estilo dos adolescentes, e os fandoms se reúnem em comunidades no Orkut.",
        photoFile: "10-divas-pop-orkut.png",
      },
      {
        order: 11,
        eventDate: new Date("2010-01-01"),
        title: "Redes sociais e mobilização",
        description:
          "Twitter, Tumblr, Instagram e YouTube ampliam a produção dos fãs. Fandoms como os de One Direction, Harry Potter e Marvel organizam mutirões, hashtags e votações.",
        photoFile: "11-redes-sociais.png",
      },
      {
        order: 12,
        eventDate: new Date("2020-01-01"),
        title: "Pandemia, ativismo e K-pop",
        description:
          "Com shows suspensos, tudo migrou para o TikTok, Discord e Twitter. BTS, BLACKPINK e Stray Kids consolidam fandoms globais que organizam campanhas e ações sociais.",
        photoFile: "12-pandemia-kpop.png",
      },
    ];

    await prisma.timelineEvent.deleteMany({});

    for (const event of historicalEvents) {
      const filePath = path.join(process.cwd(), "prisma", "assets", "linha-do-tempo", event.photoFile);
      const buffer = await readFile(filePath);
      const blob = await put(`linha-do-tempo/${event.photoFile}`, buffer, {
        access: "public",
        addRandomSuffix: true,
        contentType: "image/png",
      });

      await prisma.timelineEvent.create({
        data: {
          order: event.order,
          eventDate: event.eventDate,
          title: event.title,
          description: event.description,
          imageUrl: blob.url,
          published: true,
        },
      });

      console.log(`Evento #${event.order} recriado com foto: ${blob.url}`);
    }
  }

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

  // Atualização pontual de conteúdo (Vídeo 1) — remover este bloco depois de aplicado.
  await prisma.sectionPage.update({
    where: { slug: "video-1" },
    data: {
      title: "Diferença de Tratamento entre Homens e Mulheres sendo Fãs de Futebol",
      subtitle:
        "Torcedoras e profissionais do jornalismo esportivo ainda enfrentam julgamentos que vão além do futebol",
      excerpt:
        "Pintar o rosto, vestir a camisa e gritar nas arquibancadas não bastam: para muitas mulheres, ser torcedora ainda significa provar que pertence a esse universo.",
      body: [
        "Pintar o rosto, vestir a camisa do time, gritar nas arquibancadas e acompanhar cada lance são formas de demonstrar paixão pelo futebol. Mas, para muitas mulheres, ser torcedora ainda significa enfrentar questionamentos sobre seus conhecimentos e sua legitimidade em um universo historicamente masculino. Essa realidade também se manifesta no jornalismo esportivo, onde profissionais precisam lidar com julgamentos que ultrapassam suas competências e atingem seu gênero.",
        "O estudo *Mulheres torcedoras de futebol no Brasil: refazendo gênero no interior da cultura fanática*, publicado em 2022 por Mariana Zuaneti Martins, Gabriela Borel Delarmelina e Kerzia Railane Silva, na revista FuLiA/UFMG, analisa a experiência de 37 torcedoras brasileiras e aborda como elas constroem suas identidades como fãs diante das barreiras de gênero. Em entrevista, Mariana explica que essas mulheres frequentemente precisam demonstrar conhecimento sobre regras, jogadores e história dos clubes para serem reconhecidas como torcedoras legítimas. Até mesmo suas roupas e a maneira como expressam a paixão pelo time podem ser utilizadas para questionar seu pertencimento ao futebol.",
        "Essa desigualdade também aparece nos estádios. Mulheres que demonstram entusiasmo podem ser chamadas de exageradas ou histéricas, enquanto comportamentos semelhantes entre homens são interpretados como manifestações de paixão. A falta de segurança, a sensação de não pertencimento e as dificuldades relacionadas à participação feminina nas torcidas reforçam esses obstáculos. Uma pesquisa realizada em abril de 2024 pela W.Lab, em parceria com Ideia, Locomotiva e Pinion, ouviu 1.053 mulheres. Segundo os dados divulgados, apenas uma em cada três frequentava estádios e, entre as que não frequentavam, 40% apontaram a falta de segurança como um dos motivos.",
        "No jornalismo esportivo, os questionamentos assumem outras formas. Rafaela Carolina, profissional de comunicação e comentarista esportiva com mais de seis anos de experiência na área, relata que mulheres costumam ser mais cobradas do que homens. Segundo ela, enquanto erros masculinos podem ser relativizados, falhas cometidas por mulheres podem comprometer sua credibilidade profissional. Rafaela também conta que, após discordar de sua análise durante uma transmissão, um espectador mandou que ela fosse \"lavar a louça\". O episódio evidencia como o machismo pode transformar uma discussão sobre futebol em um ataque pessoal, ultrapassando os limites da crítica profissional.",
        "A resistência a esse cenário também acontece por meio da organização coletiva e de iniciativas de conscientização. Os coletivos de torcedoras contribuem para criar espaços de acolhimento, compartilhar experiências e fortalecer a presença feminina nos estádios. Outra iniciativa é a campanha #RespeitaAsMinas, lançada pelo Corinthians em 2018 para combater o assédio e a violência contra as mulheres. Com mensagens nos uniformes e ações de conscientização na Arena Corinthians, o clube utilizou sua visibilidade para colocar o respeito às mulheres em pauta. A campanha representa um exemplo de mobilização, embora sua realização, por si só, não comprove uma redução do machismo ou do assédio.",
        "Para Rafaela, ocupar o esporte é também uma forma de resistência. Ela incentiva as mulheres a continuarem acompanhando seus times e buscando espaço no jornalismo, independentemente das roupas, da maquiagem ou da maneira como expressam sua paixão. As experiências relatadas por Rafaela e as reflexões de Mariana mostram que a desigualdade não se limita às arquibancadas ou aos ambientes profissionais: ela envolve padrões sociais que colocam em dúvida a capacidade, o conhecimento e o direito das mulheres de participar desse universo.",
        "Mais do que conquistar espaço, as mulheres reivindicam o direito de torcer, trabalhar e ocupar o futebol sem precisar provar constantemente que pertencem a ele. Seja nas arquibancadas, nos coletivos de torcedoras ou nas transmissões esportivas, a paixão pelo futebol não deveria ser medida pelo gênero, mas reconhecida como uma experiência que pertence a todos.",
      ].join("\n\n"),
    },
  });


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

  // Remove slides de exemplo que porventura tenham sido recriados por
  // execuções anteriores deste seed (bloco antigo removido).
  await prisma.webstorieSlide.deleteMany({
    where: { title: { in: ["Capa", "Capítulo 1", "Capítulo 2"] } },
  });

  // Atualização pontual: novo slide de vídeo no Webstorie — remover depois de aplicado.
  {
    const existingVideo = await prisma.webstorieSlide.findFirst({
      where: { mediaType: "VIDEO", order: 7 },
    });
    if (!existingVideo) {
      const filePath = path.join(process.cwd(), "prisma", "assets", "webstorie", "07-video-novo.mp4");
      const buffer = await readFile(filePath);
      const blob = await put("webstorie/07-video-novo.mp4", buffer, {
        access: "public",
        addRandomSuffix: true,
        contentType: "video/mp4",
      });
      await prisma.webstorieSlide.create({
        data: { order: 7, mediaType: "VIDEO", mediaUrl: blob.url, published: true },
      });
      console.log(`Novo slide de vídeo do Webstorie criado: ${blob.url}`);
    }
  }

  // Atualização pontual: novos termos do Dicionário de Fãs (Webstorie) — remover depois de aplicado.
  {
    const newTerms: { order: number; file: string; title: string; text: string }[] = [
      {
        order: 8,
        file: "08-stan.webp",
        title: "Stan",
        text: "Junção das palavras Stalker e Fan. Antes, descrevia um fã obcecado, extremista e muitas vezes agressivo com quem criticava seu ídolo. Ao longo do tempo, passou a descrever um fã dedicado que acompanha, engaja e defende um grupo ou artista (de forma saudável). O termo surgiu na música \"Stan\", do rapper Eminem, em 2000.",
      },
      {
        order: 9,
        file: "09-shifting.webp",
        title: "Shifting",
        text: "Prática em que o fã tenta \"entrar\" em um sonho super realista, imaginando viver em uma realidade desejada. O termo viralizou na pandemia e já ultrapassou 1,8 bilhão de visualizações no TikTok.",
      },
      {
        order: 10,
        file: "10-parassocialidade.webp",
        title: "Parassocialidade",
        text: "Relação de apenas um dos lados, em que o fã sente uma amizade íntima e recíproca com seu ídolo, que nem sabe da sua existência. O conceito foi criado em 1956 pelos pesquisadores Donald Horton e Richard Wohl, mas explodiu com o avanço das redes sociais. Em 2025, o termo foi eleito \"palavra do ano\" pelo dicionário de Cambridge.",
      },
    ];

    for (const term of newTerms) {
      const existingTerm = await prisma.webstorieSlide.findFirst({ where: { title: term.title } });
      if (!existingTerm) {
        const filePath = path.join(process.cwd(), "prisma", "assets", "webstorie", term.file);
        const buffer = await readFile(filePath);
        const blob = await put(`webstorie/${term.file}`, buffer, {
          access: "public",
          addRandomSuffix: true,
          contentType: "image/webp",
        });
        await prisma.webstorieSlide.create({
          data: {
            order: term.order,
            mediaType: "IMAGE",
            mediaUrl: blob.url,
            title: term.title,
            text: term.text,
            published: true,
          },
        });
        console.log(`Novo termo do Webstorie criado: ${term.title} (${blob.url})`);
      }
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
  if (resetPasswordHash) {
    console.log(
      `Senha do usuário admin (${ADMIN_EMAIL}) definida a partir da variável ADMIN_RESET_PASSWORD.`,
    );
    console.log("Remova essa variável de ambiente do projeto agora que a senha foi aplicada.");
  } else if (existingAdmin) {
    console.log(`Usuário admin já existia (${ADMIN_EMAIL}) — senha não foi alterada.`);
  } else {
    console.log(`Usuário admin criado: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
    console.log("Guarde essa senha agora — ela só aparece aqui, uma vez, e não fica no código-fonte.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
