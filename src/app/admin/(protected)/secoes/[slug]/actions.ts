"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";
import { SECTION_DEFS } from "@/lib/content";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function updateSectionAction(slug: string, formData: FormData) {
  const def = SECTION_DEFS.find((d) => d.slug === slug);
  if (!def) throw new Error("Seção inválida");

  const existing = await prisma.sectionPage.findUnique({ where: { slug } });

  const coverFile = formData.get("coverImage") as File | null;
  const coverImage =
    coverFile && coverFile.size > 0 ? await saveUploadedFile(coverFile) : existing?.coverImage ?? null;

  const mediaType = str(formData, "mediaType");
  let mediaUrl = existing?.mediaUrl ?? null;

  if (mediaType === "EMBED") {
    mediaUrl = str(formData, "mediaUrlEmbed") || null;
  } else if (mediaType === "UPLOAD") {
    const mediaFile = formData.get("mediaFile") as File | null;
    mediaUrl = mediaFile && mediaFile.size > 0 ? await saveUploadedFile(mediaFile) : existing?.mediaUrl ?? null;
  } else {
    mediaUrl = null;
  }

  const data = {
    kind: def.kind,
    label: str(formData, "label") || def.slug,
    category: str(formData, "category") || def.group,
    title: str(formData, "title"),
    subtitle: str(formData, "subtitle") || null,
    excerpt: str(formData, "excerpt") || null,
    coverImage,
    body: str(formData, "body") || null,
    mediaType: mediaType || null,
    mediaUrl,
    published: formData.get("published") === "on",
  };

  await prisma.sectionPage.upsert({
    where: { slug },
    update: data,
    create: { slug, ...data },
  });

  revalidatePath("/", "layout");
  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/secoes/${slug}`);
  redirect(`/admin/secoes/${slug}?salvo=1`);
}
