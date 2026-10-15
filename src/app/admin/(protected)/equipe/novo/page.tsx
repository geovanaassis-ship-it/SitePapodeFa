import Link from "next/link";
import { FieldGroup, TextInput, TextArea, Checkbox } from "@/components/admin/Field";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createTeamMemberAction } from "../actions";

export default function NewTeamMemberPage() {
  return (
    <div>
      <Link href="/admin/equipe" className="font-label text-[11px] text-ink/50 hover:text-ink">
        ← Voltar
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Nova pessoa na equipe</h1>

      <form
        action={createTeamMemberAction}
        encType="multipart/form-data"
        className="mt-8 flex max-w-xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <Checkbox name="published" label="Exibir em Sobre Nós" defaultChecked />
        <FieldGroup label="Nome">
          <TextInput name="name" required />
        </FieldGroup>
        <FieldGroup label="Função/cargo">
          <TextInput name="role" />
        </FieldGroup>
        <FieldGroup label="Mini-biografia">
          <TextArea name="bio" rows={3} />
        </FieldGroup>
        <FieldGroup label="Foto (opcional)">
          <input type="file" name="photoUrl" accept="image/*" className="w-full text-sm" />
        </FieldGroup>
        <FieldGroup label="Ordem de exibição">
          <TextInput type="number" name="order" defaultValue={0} />
        </FieldGroup>
        <div className="mt-2">
          <SubmitButton>Adicionar</SubmitButton>
        </div>
      </form>
    </div>
  );
}
