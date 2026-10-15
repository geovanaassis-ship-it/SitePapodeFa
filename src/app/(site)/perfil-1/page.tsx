import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSectionBySlug } from "@/lib/content";
import { SectionPageView } from "@/components/site/SectionPageView";

const SLUG = "perfil-1";

export async function generateMetadata(): Promise<Metadata> {
  const section = await getSectionBySlug(SLUG);
  return { title: section?.title ?? "Perfil" };
}

export default async function Page() {
  const section = await getSectionBySlug(SLUG);
  if (!section) return notFound();
  return <SectionPageView section={section} />;
}
