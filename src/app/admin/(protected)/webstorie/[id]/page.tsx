import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FieldGroup, TextInput, TextArea, Select, Checkbox } from "@/components/admin/Field";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { WebstorieMediaUpload } from "@/components/admin/WebstorieMediaUpload";
import { updateSlideAction, deleteSlideAction } from "../actions";

export default async function EditSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slide = await prisma.webstorieSlide.findUnique({ where: { id } });
  if (!slide) return notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/admin/webstorie" className="font-label text-[11px] text-ink/50 hover:text-ink">
          ← Voltar
        </Link>
        <DeleteButton action={deleteSlideAction.bind(null, id)} />
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold">Editar slide</h1>

      <form
        action={updateSlideAction.bind(null, id)}
        encType="multipart/form-data"
        className="mt-8 flex max-w-xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <Checkbox name="published" label="Publicado" defaultChecked={slide.published} />
        <FieldGroup label="Tipo de mídia">
          <Select name="mediaType" defaultValue={slide.mediaType}>
            <option value="IMAGE">Imagem</option>
            <option value="VIDEO">Vídeo</option>
          </Select>
        </FieldGroup>
        <FieldGroup label="Arquivo" hint="Envie um novo arquivo para substituir o atual.">
          <WebstorieMediaUpload currentUrl={slide.mediaUrl} />
        </FieldGroup>
        <FieldGroup label="Título (opcional)">
          <TextInput name="title" defaultValue={slide.title ?? ""} />
        </FieldGroup>
        <FieldGroup label="Texto (opcional)">
          <TextArea name="text" defaultValue={slide.text ?? ""} rows={3} />
        </FieldGroup>
        <FieldGroup label="Ordem de exibição">
          <TextInput type="number" name="order" defaultValue={slide.order} />
        </FieldGroup>
        <div className="mt-2">
          <SubmitButton>Salvar alterações</SubmitButton>
        </div>
      </form>
    </div>
  );
}
