import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { readFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(process.cwd(), "prisma", "assets", "logo-papo-de-fa.jpg");
  const buffer = await readFile(filePath);

  const blob = await put("logo-papo-de-fa.jpg", buffer, {
    access: "public",
    addRandomSuffix: true,
    contentType: "image/jpeg",
  });

  await prisma.siteSettings.update({
    where: { id: "singleton" },
    data: { logoUrl: blob.url },
  });

  console.log(`Logo enviada: ${blob.url}`);
}

main().finally(() => prisma.$disconnect());
