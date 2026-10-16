"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function buildData(formData: FormData, existingMedia?: string | null) {
  const mediaUrl = str(formData, "mediaUrl") || existingMedia || "";

  return {
    order: Number(str(formData, "order") || 0),
    mediaType: str(formData, "mediaType") || "IMAGE",
    mediaUrl,
    title: str(formData, "title") || null,
    text: str(formData, "text") || null,
    published: formData.get("published") === "on",
  };
}

export async function createSlideAction(formData: FormData) {
  const data = buildData(formData);
  await prisma.webstorieSlide.create({ data });
  revalidatePath("/", "layout");
  revalidatePath("/webstorie");
  revalidatePath("/admin/webstorie");
  redirect("/admin/webstorie?criado=1");
}

export async function updateSlideAction(id: string, formData: FormData) {
  const existing = await prisma.webstorieSlide.findUnique({ where: { id } });
  const data = buildData(formData, existing?.mediaUrl);
  await prisma.webstorieSlide.update({ where: { id }, data });
  revalidatePath("/", "layout");
  revalidatePath("/webstorie");
  revalidatePath("/admin/webstorie");
  redirect("/admin/webstorie?salvo=1");
}

export async function deleteSlideAction(id: string) {
  await prisma.webstorieSlide.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/webstorie");
  revalidatePath("/admin/webstorie");
}
