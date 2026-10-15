"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createUserAction(formData: FormData) {
  const name = str(formData, "name");
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");

  if (!name || !email || password.length < 6) {
    redirect("/admin/usuarios/novo?erro=1");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, passwordHash, role: "ADMIN" },
  });

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios?criado=1");
}

export async function deleteUserAction(id: string) {
  const session = await auth();
  const total = await prisma.user.count();

  if (session?.user?.id === id) {
    throw new Error("Você não pode remover o seu próprio usuário enquanto estiver logado.");
  }
  if (total <= 1) {
    throw new Error("Não é possível remover o único usuário do painel.");
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/usuarios");
}
