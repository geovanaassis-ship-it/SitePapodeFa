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
      </div>
      <WebstorieViewer slides={slides} />
    </div>
  );
}
