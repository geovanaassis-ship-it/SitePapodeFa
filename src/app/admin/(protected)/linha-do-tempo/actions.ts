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
