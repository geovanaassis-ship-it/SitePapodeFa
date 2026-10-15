import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { readFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

type SlideDef = {
  file: string;
  order: number;
  mediaType: "IMAGE" | "VIDEO";
  contentType: string;
  title?: string;
  text?: string;
};

const slides: SlideDef[] = [
  {
    file: "01-capa.webp",
    order: 1,
    mediaType: "IMAGE",
    contentType: "image/webp",
    title: "Dicionário de Fãs",
    text: "Do comum ao polêmico — os termos que fazem parte do dia a dia de quem vive a cultura fandom.",
  },
  {
    file: "02-fanfic.webp",
    order: 2,
    mediaType: "IMAGE",
    contentType: "image/webp",
    title: "Fanfic",
    text: "Histórias de ficção escritas por fãs usando cenários, artistas reais e situações diversas. A polêmica trilogia \"After\", da Prime Video, começou como uma fanfic no Wattpad — a mais lida do app.",
  },
  {
    file: "03-fanart.webp",
    order: 3,
    mediaType: "IMAGE",
    contentType: "image/webp",
    title: "Fanart",
    text: "Ilustrações e artes feitas por fãs, inspiradas em personagens, pessoas e universos que amam. O DeviantArt reúne milhares de criações do universo de Harry Potter e de outros fandoms.",
  },
  {
    file: "04-groupie.webp",
    order: 4,
    mediaType: "IMAGE",
    contentType: "image/webp",
    title: "Groupie",
    text: "Fãs que buscam proximidade intensa com artistas, especialmente músicos em turnê: acompanhar shows, ficar no mesmo hotel, criar uma conexão pessoal. Pamela Des Barres, uma das groupies mais famosas do rock, escreveu um livro de memórias que virou best-seller do NYT.",
  },
  {
    file: "05-video.mp4",
    order: 5,
    mediaType: "VIDEO",
    contentType: "video/mp4",
  },
  {
    file: "06-gatekeeping.webp",
    order: 6,
    mediaType: "IMAGE",
    contentType: "image/webp",
    title: "Gatekeeping",
    text: "Quando alguém tenta controlar quem pode ou não fazer parte de um fandom. Fãs mais antigos julgam os novos e cobram que \"provem\" seu conhecimento sobre o artista. Pesquisas apontam que é uma das principais formas de toxicidade em fandoms.",
  },
];

async function main() {
  await prisma.webstorieSlide.deleteMany({});

  for (const slide of slides) {
    const filePath = path.join(process.cwd(), "prisma", "assets", "webstorie", slide.file);
    const buffer = await readFile(filePath);

    const blob = await put(`webstorie/${slide.file}`, buffer, {
      access: "public",
      addRandomSuffix: true,
      contentType: slide.contentType,
    });

    await prisma.webstorieSlide.create({
      data: {
        order: slide.order,
        mediaType: slide.mediaType,
        mediaUrl: blob.url,
        title: slide.title ?? null,
        text: slide.text ?? null,
        published: true,
      },
    });

    console.log(`Slide #${slide.order} (${slide.mediaType}) criado: ${blob.url}`);
  }
}

main().finally(() => prisma.$disconnect());
