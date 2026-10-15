import type { Metadata } from "next";
import { getWebstorieSlides } from "@/lib/content";
import { WebstorieViewer } from "@/components/site/WebstorieViewer";
import { SectionHeading } from "@/components/site/SectionHeading";

export const metadata: Metadata = { title: "Webstorie" };

export default async function WebstoriePage() {
  const slides = await getWebstorieSlides();

  return (
    <div>
      <div className="mx-auto max-w-3xl px-5 pt-14 text-center sm:px-8">
        <SectionHeading
          eyebrow="Narrativa interativa"
          title="Webstorie"
          description="Navegue pelos slides como em um story: toque nas laterais ou use as setas do teclado."
          align="center"
        />
        <div className="mx-auto mt-8 max-w-2xl space-y-4 text-left text-ink/75">
          <p>
            Com o avanço da tecnologia e internet, o fandom se consolidou em comunidades digitais
            onde passaram a usar termos para descrever aspectos comuns do coletivo, desenvolvendo
            uma linguagem própria. Palavras como fanfic, fanart, shifting e shippar fazem parte do
            cotidiano de milhares de pessoas que compartilham interesses e experiências na
            internet.
          </p>
          <p>
            Para quem está fora dessas comunidades, algumas expressões podem parecer
            desconhecidas, mas para os fãs, elas ajudam a comunicar sentimentos, estabelecer
            vínculos e fortalecer o sentimento de pertencimento.
          </p>
          <p className="font-label text-sm text-wine">
            Veja abaixo o significado de alguns dos termos mais utilizados:
          </p>
        </div>
      </div>
      <WebstorieViewer slides={slides} />
    </div>
  );
}
