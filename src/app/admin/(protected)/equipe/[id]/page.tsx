import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FieldGroup, TextInput, TextArea, Checkbox } from "@/components/admin/Field";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateTeamMemberAction, deleteTeamMemberAction } from "../actions";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) return notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/admin/equipe" className="font-label text-[11px] text-ink/50 hover:text-ink">
          ← Voltar
        </Link>
        <DeleteButton action={deleteTeamMemberAction.bind(null, id)} />
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold">Editar integrante</h1>

      <form
        action={updateTeamMemberAction.bind(null, id)}
        encType="multipart/form-data"
        className="mt-8 flex max-w-xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <Checkbox name="published" label="Exibir em Sobre Nós" defaultChecked={member.published} />
        <FieldGroup label="Nome">
          <TextInput name="name" defaultValue={member.name} required />
        </FieldGroup>
        <FieldGroup label="Função/cargo">
          <TextInput name="role" defaultValue={member.role ?? ""} />
        </FieldGroup>
        <FieldGroup label="Mini-biografia">
          <TextArea name="bio" defaultValue={member.bio ?? ""} rows={3} />
        </FieldGroup>
        <ImageUploadField name="photoUrl" label="Foto" currentUrl={member.photoUrl} />
        <FieldGroup label="Ordem de exibição">
          <TextInput type="number" name="order" defaultValue={member.order} />
        </FieldGroup>
        <div className="mt-2">
          <SubmitButton>Salvar alterações</SubmitButton>
        </div>
      </form>
    </div>
  );
}
