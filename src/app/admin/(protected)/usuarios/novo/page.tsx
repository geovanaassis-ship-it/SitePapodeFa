import Link from "next/link";
import { FieldGroup, TextInput } from "@/components/admin/Field";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createUserAction } from "../actions";

export default async function NewUserPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return (
    <div>
      <Link href="/admin/usuarios" className="font-label text-[11px] text-ink/50 hover:text-ink">
        ← Voltar
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Novo usuário do painel</h1>

      {erro && (
        <p className="font-label mt-4 inline-block rounded-full bg-wine/10 px-4 py-2 text-[11px] text-wine">
          Preencha nome, e-mail e uma senha com pelo menos 6 caracteres.
        </p>
      )}

      <form
        action={createUserAction}
        className="mt-8 flex max-w-sm flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <FieldGroup label="Nome">
          <TextInput name="name" required />
        </FieldGroup>
        <FieldGroup label="E-mail">
          <TextInput type="email" name="email" required />
        </FieldGroup>
        <FieldGroup label="Senha" hint="No mínimo 6 caracteres.">
          <TextInput type="password" name="password" minLength={6} required />
        </FieldGroup>
        <div className="mt-2">
          <SubmitButton>Criar usuário</SubmitButton>
        </div>
      </form>
    </div>
  );
}
