"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

async function buildData(formData: FormData, existingPhoto?: string | null) {
  const photoFile = formData.get("photoUrl") as File | null;
  const photoUrl = photoFile && photoFile.size > 0 ? await saveUploadedFile(photoFile) : existingPhoto ?? null;

  return {
    name: str(formData, "name"),
    role: str(formData, "role") || null,
    bio: str(formData, "bio") || null,
    photoUrl,
    order: Number(str(formData, "order") || 0),
    published: formData.get("published") === "on",
  };
}

export async function createTeamMemberAction(formData: FormData) {
  const data = await buildData(formData);
  await prisma.teamMember.create({ data });
  revalidatePath("/", "layout");
  revalidatePath("/sobre-nos");
  revalidatePath("/admin/equipe");
  redirect("/admin/equipe?criado=1");
}

export async function updateTeamMemberAction(id: string, formData: FormData) {
  const existing = await prisma.teamMember.findUnique({ where: { id } });
  const data = await buildData(formData, existing?.photoUrl);
  await prisma.teamMember.update({ where: { id }, data });
  revalidatePath("/", "layout");
  revalidatePath("/sobre-nos");
  revalidatePath("/admin/equipe");
  redirect("/admin/equipe?salvo=1");
}

export async function deleteTeamMemberAction(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/sobre-nos");
  revalidatePath("/admin/equipe");
}
