"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

async function buildData(formData: FormData, existingImage?: string | null) {
  const imageFile = formData.get("imageUrl") as File | null;
  const imageUrl = imageFile && imageFile.size > 0 ? await saveUploadedFile(imageFile) : existingImage ?? null;

  return {
    eventDate: new Date(str(formData, "eventDate")),
    title: str(formData, "title"),
    description: str(formData, "description") || null,
    imageUrl,
    order: Number(str(formData, "order") || 0),
    published: formData.get("published") === "on",
  };
}

export async function createTimelineEventAction(formData: FormData) {
  const data = await buildData(formData);
  await prisma.timelineEvent.create({ data });
  revalidatePath("/", "layout");
  revalidatePath("/linha-do-tempo");
  revalidatePath("/admin/linha-do-tempo");
  redirect("/admin/linha-do-tempo?criado=1");
}

export async function updateTimelineEventAction(id: string, formData: FormData) {
  const existing = await prisma.timelineEvent.findUnique({ where: { id } });
  const data = await buildData(formData, existing?.imageUrl);
  await prisma.timelineEvent.update({ where: { id }, data });
  revalidatePath("/", "layout");
  revalidatePath("/linha-do-tempo");
  revalidatePath("/admin/linha-do-tempo");
  redirect("/admin/linha-do-tempo?salvo=1");
}

export async function deleteTimelineEventAction(id: string) {
  await prisma.timelineEvent.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/linha-do-tempo");
  revalidatePath("/admin/linha-do-tempo");
}

const HISTORICAL_TIMELINE_EVENTS = [
  {
    eventDate: new Date("1844-01-01"),
    title: "Lisztomania",
    description:
      "O pianista Liszt provoca desmaios e disputas por mechas de cabelo nos EUA. Heine cria o termo em 1840, quando \"mania\" ainda era diagnóstico médico.",
    order: 1,
  },
  {
    eventDate: new Date("1885-01-01"),
    title: "Onde a palavra \"fã\" aparece",
    description:
      "No beisebol, a imprensa troca cranks e fiends e começa a chamar por fan, abreviação de fanatic. O registro impresso mais antigo é de 1885, em um jornal de Kansas City.",
    order: 2,
  },
  {
    eventDate: new Date("1887-01-01"),
    title: "Comunidades literárias",
    description:
      "Leitores de Sherlock Holmes se reúnem para discutir teorias. Quando Doyle matou o detetive em 1893, a pressão dos fãs o obrigou a ressuscitar o personagem em 1903.",
    order: 3,
  },
  {
    eventDate: new Date("1903-06-01"),
    title: "Onde a palavra \"fandom\" aparece",
    description:
      "Surge na imprensa, de novo, no beisebol: \"fan\" + \"dom\" de kingdom, em tradução literal, \"reino dos fãs\". Fã deixou de ser indivíduo e virou coletivo.",
    order: 4,
  },
  {
    eventDate: new Date("1920-01-01"),
    title: "Ficção científica e fanzines",
    description:
      "A revista Amazing Stories cria seções de cartas e aproxima os leitores. Em 1930 sai o The Comet, um dos primeiros fanzines registrados na história.",
    order: 5,
  },
  {
    eventDate: new Date("1960-01-01"),
    title: "Discos, rádio e TV",
    description:
      "A Beatlemania consolida-se como o primeiro grande fenômeno de fãs, populariza shows em estádios e clipes. No Brasil, a Jovem Guarda e o Tropicalismo ligam música a identidade.",
    order: 6,
  },
  {
    eventDate: new Date("1966-01-01"),
    title: "Cultura geek",
    description:
      "Star Trek conquista uma legião de fãs e cerca de 100 mil cartas salvam a série do cancelamento. Fanfics, cosplay e colecionismo marcam o início da cultura geek, e em 1972 surge a primeira convenção.",
    order: 7,
  },
  {
    eventDate: new Date("1980-01-01"),
    title: "Games, locadoras e rock",
    description:
      "Star Wars, quadrinhos, animes e fliperamas expandem a cultura geek. Em 1981, surge no Brasil a Rock Brigade, fã-clube que virou uma revista especializada no gênero.",
    order: 8,
  },
  {
    eventDate: new Date("1990-01-01"),
    title: "Os fãs chegam à internet",
    description:
      "Fóruns, listas de e-mail, Yahoo! Groups e o FanFiction.Net viralizam na internet. A MTV chega ao Brasil, os videoclipes bombam e começa a era das boybands.",
    order: 9,
  },
  {
    eventDate: new Date("2000-01-01"),
    title: "Divas pop, emocore e Orkut",
    description:
      "Divas pop entram em alta, sendo Britney Spears o maior nome da época. Anos depois, o emocore domina o estilo dos adolescentes, e os fandoms se reúnem em comunidades no Orkut.",
    order: 10,
  },
  {
    eventDate: new Date("2010-01-01"),
    title: "Redes sociais e mobilização",
    description:
      "Twitter, Tumblr, Instagram e YouTube ampliam a produção dos fãs. Fandoms como os de One Direction, Harry Potter e Marvel organizam mutirões, hashtags e votações.",
    order: 11,
  },
  {
    eventDate: new Date("2020-01-01"),
    title: "Pandemia, ativismo e K-pop",
    description:
      "Com shows suspensos, tudo migrou para o TikTok, Discord e Twitter. BTS, BLACKPINK e Stray Kids consolidam fandoms globais que organizam campanhas e ações sociais.",
    order: 12,
  },
];

export async function importHistoricalTimelineAction() {
  await prisma.timelineEvent.deleteMany({});
  for (const event of HISTORICAL_TIMELINE_EVENTS) {
    await prisma.timelineEvent.create({ data: { ...event, published: true } });
  }
  revalidatePath("/", "layout");
  revalidatePath("/linha-do-tempo");
  revalidatePath("/admin/linha-do-tempo");
  redirect("/admin/linha-do-tempo?importado=1");
}
