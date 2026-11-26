import Image from "next/image";
import type { Metadata } from "next";
import { getSiteSettings, getTeamMembers } from "@/lib/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { simpleMarkdownToHtml } from "@/lib/markdown";

export const metadata: Metadata = { title: "Sobre Nós" };

export default async function SobreNosPage() {
  const [settings, team] = await Promise.all([getSiteSettings(), getTeamMembers()]);
  const aboutHtml = simpleMarkdownToHtml(settings.aboutText);

  return (
    <div>
      <section className="bg-navy py-20 text-paper">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <SectionHeading eyebrow="Quem faz" title="Sobre Nós" align="center" light />
          <div
            className="prose-editorial prose-editorial--light mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: aboutHtml }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        {team.length === 0 ? (
          <p className="font-label text-sm text-ink/50">
            Nenhum integrante cadastrado ainda. Adicione a equipe no painel administrativo.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <div
                key={member.id}
                className="flex gap-5 rounded-2xl border border-ink/10 bg-paper p-5"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-navy/10 sm:h-32 sm:w-32">
                  {member.photoUrl ? (
                    <Image src={member.photoUrl} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-3xl text-navy">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-display text-xl font-bold">{member.name}</h3>
                  {member.role && <p className="font-label mt-1 text-[11px] text-wine">{member.role}</p>}
                  {member.bio && (
                    <p className="mt-2 text-justify text-sm leading-relaxed text-ink/70">{member.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
