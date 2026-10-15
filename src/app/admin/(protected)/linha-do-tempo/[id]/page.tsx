import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FieldGroup, TextInput, TextArea, Checkbox } from "@/components/admin/Field";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateTimelineEventAction, deleteTimelineEventAction } from "../actions";

export default async function EditTimelineEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.timelineEvent.findUnique({ where: { id } });
  if (!event) return notFound();

  const dateValue = event.eventDate.toISOString().slice(0, 10);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/admin/linha-do-tempo" className="font-label text-[11px] text-ink/50 hover:text-ink">
          ← Voltar
        </Link>
        <DeleteButton action={deleteTimelineEventAction.bind(null, id)} />
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold">Editar evento</h1>

      <form
        action={updateTimelineEventAction.bind(null, id)}
        encType="multipart/form-data"
        className="mt-8 flex max-w-xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <Checkbox name="published" label="Publicado" defaultChecked={event.published} />
        <FieldGroup label="Data">
          <TextInput type="date" name="eventDate" defaultValue={dateValue} required />
        </FieldGroup>
        <FieldGroup label="Título">
          <TextInput name="title" defaultValue={event.title} required />
        </FieldGroup>
        <FieldGroup label="Descrição">
          <TextArea name="description" defaultValue={event.description ?? ""} rows={4} />
        </FieldGroup>
        <ImageUploadField name="imageUrl" label="Imagem" currentUrl={event.imageUrl} />
        <FieldGroup label="Ordem de exibição">
          <TextInput type="number" name="order" defaultValue={event.order} />
        </FieldGroup>
        <div className="mt-2">
          <SubmitButton>Salvar alterações</SubmitButton>
        </div>
      </form>
    </div>
  );
}
