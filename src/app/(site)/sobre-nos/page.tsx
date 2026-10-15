import Image from "next/image";
import type { Metadata } from "next";
import { getSiteSettings, getTeamMembers } from "@/lib/content";
import { SectionHeading } from "@/components/site/SectionHeading";

export const metadata: Metadata = { title: "Sobre Nós" };

export default async function SobreNosPage() {
  const [settings, team] = await Promise.all([getSiteSettings(), getTeamMembers()]);

  return (
    <div>
      <section className="bg-navy py-20 text-paper">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <SectionHeading eyebrow="Quem faz" title="Sobre Nós" align="center" light />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
            {settings.aboutText}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        {team.length === 0 ? (
          <p className="font-label text-sm text-ink/50">
            Nenhum integrante cadastrado ainda. Adicione a equipe no painel administrativo.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.id} className="rounded-2xl border border-ink/10 bg-paper p-6 text-center">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-navy/10">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-3xl text-navy">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl">{member.name}</h3>
                {member.role && <p className="font-label mt-1 text-[11px] text-wine">{member.role}</p>}
                {member.bio && <p className="mt-3 text-sm leading-relaxed text-ink/70">{member.bio}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
