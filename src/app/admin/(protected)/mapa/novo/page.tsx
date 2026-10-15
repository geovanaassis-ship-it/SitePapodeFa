import Link from "next/link";
import { FieldGroup, TextInput, TextArea, Checkbox } from "@/components/admin/Field";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createMapPointAction } from "../actions";

export default function NewMapPointPage() {
  return (
    <div>
      <Link href="/admin/mapa" className="font-label text-[11px] text-ink/50 hover:text-ink">
        ← Voltar
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Novo ponto no mapa</h1>

      <form
        action={createMapPointAction}
        encType="multipart/form-data"
        className="mt-8 flex max-w-xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <Checkbox name="published" label="Publicado" defaultChecked />
        <FieldGroup label="Nome do local">
          <TextInput name="name" required />
        </FieldGroup>
        <FieldGroup label="Descrição">
          <TextArea name="description" rows={3} />
        </FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldGroup label="Latitude" hint="Ex.: -23.5505">
            <TextInput type="number" step="any" name="lat" required />
          </FieldGroup>
          <FieldGroup label="Longitude" hint="Ex.: -46.6333">
            <TextInput type="number" step="any" name="lng" required />
          </FieldGroup>
        </div>
        <FieldGroup label="Categoria" hint="Ex.: Evento, Comunidade, Entrevista…">
          <TextInput name="category" />
        </FieldGroup>
        <FieldGroup label="Imagem (opcional)">
          <input type="file" name="imageUrl" accept="image/*" className="w-full text-sm" />
        </FieldGroup>
        <FieldGroup label="Ordem de exibição">
          <TextInput type="number" name="order" defaultValue={0} />
        </FieldGroup>
        <div className="mt-2">
          <SubmitButton>Criar ponto</SubmitButton>
        </div>
      </form>
    </div>
  );
}
