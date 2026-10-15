import { getSiteSettings } from "@/lib/content";
import { FieldGroup, TextInput, TextArea } from "@/components/admin/Field";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { updateSettingsAction } from "./actions";

export default async function ConfiguracoesPage({
  searchParams,
}: {
  searchParams: Promise<{ salvo?: string }>;
}) {
  const { salvo } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div>
      <p className="font-label text-[11px] text-wine">Página Inicial</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Página Inicial e identidade do site</h1>
      <p className="mt-3 max-w-xl text-ink/65">
        Logo, imagem de destaque e textos da home — além de textos institucionais e redes
        sociais que também aparecem no rodapé de todas as páginas.
      </p>

      {salvo && (
        <p className="font-label mt-6 inline-block rounded-full bg-teal/10 px-4 py-2 text-[11px] text-teal">
          Configurações salvas com sucesso.
        </p>
      )}

      <form
        action={updateSettingsAction}
        encType="multipart/form-data"
        className="mt-8 flex max-w-2xl flex-col gap-6 rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      >
        <h2 className="font-display text-lg font-bold">Identidade</h2>
        <ImageUploadField name="logo" label="Logo do site" currentUrl={settings.logoUrl} />
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldGroup label="Nome completo do projeto">
            <TextInput name="siteName" defaultValue={settings.siteName} required />
          </FieldGroup>
          <FieldGroup label="Nome curto (menu/rodapé)">
            <TextInput name="shortName" defaultValue={settings.shortName} required />
          </FieldGroup>
        </div>
        <FieldGroup label="Frase de apresentação (tagline)">
          <TextInput name="tagline" defaultValue={settings.tagline} />
        </FieldGroup>

        <h2 className="mt-4 font-display text-lg font-bold">Página inicial — destaque (hero)</h2>
        <ImageUploadField
          name="heroImage"
          label="Imagem de destaque"
          currentUrl={settings.heroImage}
          hint="Imagem de impacto exibida na abertura da página inicial. Opcional — sem imagem, usamos uma composição gráfica."
        />
        <FieldGroup label="Título de destaque">
          <TextInput name="heroTitle" defaultValue={settings.heroTitle} required />
        </FieldGroup>
        <FieldGroup label="Frase de apresentação do destaque">
          <TextArea name="heroSubtitle" defaultValue={settings.heroSubtitle} rows={3} />
        </FieldGroup>

        <h2 className="mt-4 font-display text-lg font-bold">Textos institucionais</h2>
        <FieldGroup label="Título da seção 'Sobre o projeto' (home)">
          <TextInput name="introTitle" defaultValue={settings.introTitle} />
        </FieldGroup>
        <FieldGroup label="Texto de apresentação do projeto (home)">
          <TextArea name="introText" defaultValue={settings.introText} rows={4} />
        </FieldGroup>
        <FieldGroup label="Texto da página 'Sobre Nós'">
          <TextArea name="aboutText" defaultValue={settings.aboutText} rows={4} />
        </FieldGroup>
        <FieldGroup label="Texto do rodapé">
          <TextArea name="footerText" defaultValue={settings.footerText} rows={2} />
        </FieldGroup>

        <h2 className="mt-4 font-display text-lg font-bold">Contato e redes sociais</h2>
        <FieldGroup label="E-mail de contato">
          <TextInput type="email" name="contactEmail" defaultValue={settings.contactEmail ?? ""} />
        </FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldGroup label="Instagram (URL)">
            <TextInput name="instagramUrl" defaultValue={settings.instagramUrl ?? ""} />
          </FieldGroup>
          <FieldGroup label="YouTube (URL)">
            <TextInput name="youtubeUrl" defaultValue={settings.youtubeUrl ?? ""} />
          </FieldGroup>
          <FieldGroup label="Spotify (URL)">
            <TextInput name="spotifyUrl" defaultValue={settings.spotifyUrl ?? ""} />
          </FieldGroup>
          <FieldGroup label="TikTok (URL)">
            <TextInput name="tiktokUrl" defaultValue={settings.tiktokUrl ?? ""} />
          </FieldGroup>
        </div>

        <div className="mt-2">
          <SubmitButton>Salvar configurações</SubmitButton>
        </div>
      </form>
    </div>
  );
}
