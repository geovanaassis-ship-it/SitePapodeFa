import { notFound } from "next/navigation";
import Link from "next/link";
import { getSectionBySlug, SECTION_DEFS } from "@/lib/content";
import { FieldGroup, TextInput, TextArea, Select, Checkbox } from "@/components/admin/Field";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { updateSectionAction } from "./actions";

export default async function EditSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ salvo?: string }>;
}) {
  const { slug } = await params;
  const { salvo } = await searchParams;

  const def = SECTION_DEFS.find((d) => d.slug === slug);
  if (!def) return notFound();

  const section = await getSectionBySlug(slug);
  if (!section) return notFound();

  const isMedia = def.kind === "VIDEO" || def.kind === "AUDIO";
  const accept = def.kind === "VIDEO" ? "video/*" : "audio/*";

  return (
    <div>
      <Link href="/admin/secoes" className="font-label text-[11px] text-ink/50 hover:text-ink">
        ← Voltar para conteúdos
      </Link>
      <p className="font-label mt-4 text-[11px] text-wine">{def.group}</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Editar {section.label}</h1>
      <p className="mt-2 text-sm text-ink/50">
        URL pública: <code className="rounded bg-ink/5 px-1.5 py-0.5">/{slug}</code>
      </p>

      {salvo && (
        <p className="font-label mt-6 inline-block rounded-full bg-teal/10 px-4 py-2 text-[11px] text-teal">
          Alterações salvas com sucesso.
        </p>
      )}

      <form
        action={updateSectionAction.bind(null, slug)}
        encType="multipart/form-data"
        className="mt-8 flex max-w-2xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <Checkbox name="published" label="Publicado (visível no site)" defaultChecked={section.published} />

        <FieldGroup
          label="Nome exibido no menu"
          hint='Ex.: substitua "Perfil 1" pelo nome real da pessoa entrevistada.'
        >
          <TextInput name="label" defaultValue={section.label} required />
        </FieldGroup>

        <FieldGroup label="Categoria (etiqueta editorial)">
          <TextInput name="category" defaultValue={section.category ?? def.group} />
        </FieldGroup>

        <FieldGroup label="Título da matéria">
          <TextInput name="title" defaultValue={section.title} required />
        </FieldGroup>

        <FieldGroup label="Subtítulo">
          <TextInput name="subtitle" defaultValue={section.subtitle ?? ""} />
        </FieldGroup>

        <FieldGroup label="Resumo (aparece nos cards da home)">
          <TextArea name="excerpt" defaultValue={section.excerpt ?? ""} rows={2} />
        </FieldGroup>

        <ImageUploadField name="coverImage" label="Imagem de capa" currentUrl={section.coverImage} />

        {isMedia && (
          <>
            <FieldGroup
              label={def.kind === "VIDEO" ? "Fonte do vídeo" : "Fonte do áudio"}
              hint="Link incorporado (YouTube/Spotify/Vimeo) ou envio de um arquivo próprio."
            >
              <Select name="mediaType" defaultValue={section.mediaType ?? "EMBED"}>
                <option value="EMBED">Link incorporado (embed)</option>
                <option value="UPLOAD">Enviar arquivo</option>
              </Select>
            </FieldGroup>
            <FieldGroup
              label="URL de incorporação (embed)"
              hint="Ex.: https://www.youtube.com/embed/ID ou https://open.spotify.com/embed/episode/ID"
            >
              <TextInput
                name="mediaUrlEmbed"
                defaultValue={section.mediaType === "EMBED" ? section.mediaUrl ?? "" : ""}
              />
            </FieldGroup>
            <FieldGroup label="Ou envie um arquivo" hint="Usado apenas se 'Enviar arquivo' estiver selecionado acima.">
              <input
                type="file"
                name="mediaFile"
                accept={accept}
                className="w-full rounded-lg border border-dashed border-ink/20 bg-paper px-3.5 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink/5 file:px-3 file:py-1.5 file:text-xs"
              />
            </FieldGroup>
          </>
        )}

        <FieldGroup
          label="Texto da matéria"
          hint="Formatação simples: linha em branco separa parágrafos · **negrito** · *itálico* · ## subtítulo · - item de lista · > citação"
        >
          <TextArea name="body" defaultValue={section.body ?? ""} rows={14} className="font-mono text-[13px]" />
        </FieldGroup>

        <div className="mt-2">
          <SubmitButton>Salvar</SubmitButton>
        </div>
      </form>
    </div>
  );
}
