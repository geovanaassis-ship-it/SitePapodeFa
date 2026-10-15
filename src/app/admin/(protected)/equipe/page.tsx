import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTeamMemberAction } from "./actions";

export default async function TeamListPage({
  searchParams,
}: {
  searchParams: Promise<{ criado?: string; salvo?: string }>;
}) {
  const { criado, salvo } = await searchParams;
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-label text-[11px] text-wine">Sobre Nós</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Equipe</h1>
        </div>
        <Link href="/admin/equipe/novo" className="font-label rounded-full bg-wine px-5 py-2.5 text-[12px] text-paper">
          + Nova pessoa
        </Link>
      </div>

      {(criado || salvo) && (
        <p className="font-label mt-6 inline-block rounded-full bg-teal/10 px-4 py-2 text-[11px] text-teal">
          {criado ? "Integrante adicionado(a) com sucesso." : "Alterações salvas com sucesso."}
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.length === 0 && <p className="text-sm text-ink/50">Nenhum integrante cadastrado ainda.</p>}
        {team.map((member) => (
          <div key={member.id} className="rounded-2xl border border-ink/10 bg-paper p-5 text-center">
            <div className="mx-auto h-16 w-16 overflow-hidden rounded-full bg-navy/10">
              {member.photoUrl ? (
                <Image src={member.photoUrl} alt={member.name} width={64} height={64} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-display text-xl text-navy">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            <p className="mt-3 font-medium">{member.name}</p>
            {member.role && <p className="font-label text-[10px] text-ink/45">{member.role}</p>}
            <div className="mt-4 flex items-center justify-center gap-2">
              <Link href={`/admin/equipe/${member.id}`} className="font-label rounded-full border border-ink/15 px-4 py-2 text-[11px]">
                Editar
              </Link>
              <DeleteButton action={deleteTeamMemberAction.bind(null, member.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
