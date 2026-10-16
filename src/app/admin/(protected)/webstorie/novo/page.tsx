import Link from "next/link";
import { FieldGroup, TextInput, TextArea, Select, Checkbox } from "@/components/admin/Field";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { WebstorieMediaUpload } from "@/components/admin/WebstorieMediaUpload";
import { createSlideAction } from "../actions";

export default function NewSlidePage() {
  return (
    <div>
      <Link href="/admin/webstorie" className="font-label text-[11px] text-ink/50 hover:text-ink">
        ← Voltar
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Novo slide</h1>

      <form
        action={createSlideAction}
        encType="multipart/form-data"
        className="mt-8 flex max-w-xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <Checkbox name="published" label="Publicado" defaultChecked />
        <FieldGroup label="Tipo de mídia">
          <Select name="mediaType" defaultValue="IMAGE">
            <option value="IMAGE">Imagem</option>
            <option value="VIDEO">Vídeo</option>
          </Select>
        </FieldGroup>
        <FieldGroup label="Arquivo" hint="Imagens e vídeos são aceitos, incluindo arquivos grandes.">
          <WebstorieMediaUpload />
        </FieldGroup>
        <FieldGroup label="Título (opcional)">
          <TextInput name="title" />
        </FieldGroup>
        <FieldGroup label="Texto (opcional)">
          <TextArea name="text" rows={3} />
        </FieldGroup>
        <FieldGroup label="Ordem de exibição">
          <TextInput type="number" name="order" defaultValue={0} />
        </FieldGroup>
        <div className="mt-2">
          <SubmitButton>Criar slide</SubmitButton>
        </div>
      </form>
    </div>
  );
}
