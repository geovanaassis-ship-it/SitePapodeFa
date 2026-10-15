import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FieldGroup, TextInput, TextArea, Checkbox } from "@/components/admin/Field";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateMapPointAction, deleteMapPointAction } from "../actions";

export default async function EditMapPointPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const point = await prisma.mapPoint.findUnique({ where: { id } });
  if (!point) return notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/admin/mapa" className="font-label text-[11px] text-ink/50 hover:text-ink">
          ← Voltar
        </Link>
        <DeleteButton action={deleteMapPointAction.bind(null, id)} />
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold">Editar ponto</h1>

      <form
        action={updateMapPointAction.bind(null, id)}
        encType="multipart/form-data"
        className="mt-8 flex max-w-xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <Checkbox name="published" label="Publicado" defaultChecked={point.published} />
        <FieldGroup label="Nome do local">
          <TextInput name="name" defaultValue={point.name} required />
        </FieldGroup>
        <FieldGroup label="Descrição">
          <TextArea name="description" defaultValue={point.description ?? ""} rows={3} />
        </FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldGroup label="Latitude">
            <TextInput type="number" step="any" name="lat" defaultValue={point.lat} required />
          </FieldGroup>
          <FieldGroup label="Longitude">
            <TextInput type="number" step="any" name="lng" defaultValue={point.lng} required />
          </FieldGroup>
        </div>
        <FieldGroup label="Categoria">
          <TextInput name="category" defaultValue={point.category ?? ""} />
        </FieldGroup>
        <ImageUploadField name="imageUrl" label="Imagem" currentUrl={point.imageUrl} />
        <FieldGroup label="Ordem de exibição">
          <TextInput type="number" name="order" defaultValue={point.order} />
        </FieldGroup>
        <div className="mt-2">
          <SubmitButton>Salvar alterações</SubmitButton>
        </div>
      </form>
    </div>
  );
}
