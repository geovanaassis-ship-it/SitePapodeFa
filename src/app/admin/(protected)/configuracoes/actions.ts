"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function updateSettingsAction(formData: FormData) {
  const current = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });

  const logoFile = formData.get("logo") as File | null;
  const heroFile = formData.get("heroImage") as File | null;

  const logoUrl = logoFile && logoFile.size > 0 ? await saveUploadedFile(logoFile) : current?.logoUrl ?? null;
  const heroImage = heroFile && heroFile.size > 0 ? await saveUploadedFile(heroFile) : current?.heroImage ?? null;

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      siteName: str(formData, "siteName"),
      shortName: str(formData, "shortName"),
      tagline: str(formData, "tagline"),
      heroTitle: str(formData, "heroTitle"),
      heroSubtitle: str(formData, "heroSubtitle"),
      heroImage,
      logoUrl,
      introTitle: str(formData, "introTitle"),
      introText: str(formData, "introText"),
      aboutText: str(formData, "aboutText"),
      footerText: str(formData, "footerText"),
      contactEmail: str(formData, "contactEmail") || null,
      instagramUrl: str(formData, "instagramUrl") || null,
      youtubeUrl: str(formData, "youtubeUrl") || null,
      spotifyUrl: str(formData, "spotifyUrl") || null,
      tiktokUrl: str(formData, "tiktokUrl") || null,
    },
    create: {
      id: "singleton",
      siteName: str(formData, "siteName") || "Papo de Fã",
      shortName: str(formData, "shortName") || "Papo de Fã",
      tagline: str(formData, "tagline"),
      heroTitle: str(formData, "heroTitle") || "Papo de Fã",
      heroSubtitle: str(formData, "heroSubtitle"),
      heroImage,
      logoUrl,
      introTitle: str(formData, "introTitle") || "Sobre o projeto",
      introText: str(formData, "introText"),
      aboutText: str(formData, "aboutText"),
      footerText: str(formData, "footerText"),
      contactEmail: str(formData, "contactEmail") || null,
      instagramUrl: str(formData, "instagramUrl") || null,
      youtubeUrl: str(formData, "youtubeUrl") || null,
      spotifyUrl: str(formData, "spotifyUrl") || null,
      tiktokUrl: str(formData, "tiktokUrl") || null,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/configuracoes");
  redirect("/admin/configuracoes?salvo=1");
}
