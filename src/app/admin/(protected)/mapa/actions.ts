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
    name: str(formData, "name"),
    description: str(formData, "description") || null,
    lat: Number(str(formData, "lat")),
    lng: Number(str(formData, "lng")),
    category: str(formData, "category") || null,
    imageUrl,
    order: Number(str(formData, "order") || 0),
    published: formData.get("published") === "on",
  };
}

export async function createMapPointAction(formData: FormData) {
  const data = await buildData(formData);
  await prisma.mapPoint.create({ data });
  revalidatePath("/", "layout");
  revalidatePath("/mapa-interativo");
  revalidatePath("/admin/mapa");
  redirect("/admin/mapa?criado=1");
}

export async function updateMapPointAction(id: string, formData: FormData) {
  const existing = await prisma.mapPoint.findUnique({ where: { id } });
  const data = await buildData(formData, existing?.imageUrl);
  await prisma.mapPoint.update({ where: { id }, data });
  revalidatePath("/", "layout");
  revalidatePath("/mapa-interativo");
  revalidatePath("/admin/mapa");
  redirect("/admin/mapa?salvo=1");
}

export async function deleteMapPointAction(id: string) {
  await prisma.mapPoint.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/mapa-interativo");
  revalidatePath("/admin/mapa");
}
