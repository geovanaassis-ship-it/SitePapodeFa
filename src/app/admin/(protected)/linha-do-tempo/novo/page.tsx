import Link from "next/link";
import { FieldGroup, TextInput, TextArea, Checkbox } from "@/components/admin/Field";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createTimelineEventAction } from "../actions";

export default function NewTimelineEventPage() {
  return (
    <div>
      <Link href="/admin/linha-do-tempo" className="font-label text-[11px] text-ink/50 hover:text-ink">
        ← Voltar
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Novo evento</h1>

      <form
        action={createTimelineEventAction}
        encType="multipart/form-data"
        className="mt-8 flex max-w-xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <Checkbox name="published" label="Publicado" defaultChecked />
        <FieldGroup label="Data">
          <TextInput type="date" name="eventDate" required />
        </FieldGroup>
        <FieldGroup label="Título">
          <TextInput name="title" required />
        </FieldGroup>
        <FieldGroup label="Descrição">
          <TextArea name="description" rows={4} />
        </FieldGroup>
        <FieldGroup label="Imagem (opcional)">
          <input type="file" name="imageUrl" accept="image/*" className="w-full text-sm" />
        </FieldGroup>
        <FieldGroup label="Ordem de exibição" hint="Números menores aparecem primeiro.">
          <TextInput type="number" name="order" defaultValue={0} />
        </FieldGroup>
        <div className="mt-2">
          <SubmitButton>Criar evento</SubmitButton>
        </div>
      </form>
    </div>
  );
}
