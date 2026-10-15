import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteUserAction } from "./actions";

export default async function UsersListPage({
  searchParams,
}: {
  searchParams: Promise<{ criado?: string }>;
}) {
  const { criado } = await searchParams;
  const [session, users] = await Promise.all([auth(), prisma.user.findMany({ orderBy: { createdAt: "asc" } })]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-label text-[11px] text-wine">Painel administrativo</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Quem pode publicar</h1>
          <p className="mt-2 max-w-md text-sm text-ink/60">
            Cada integrante da equipe pode ter seu próprio login para editar o site.
          </p>
        </div>
        <Link href="/admin/usuarios/novo" className="font-label rounded-full bg-wine px-5 py-2.5 text-[12px] text-paper">
          + Novo usuário
        </Link>
      </div>

      {criado && (
        <p className="font-label mt-6 inline-block rounded-full bg-teal/10 px-4 py-2 text-[11px] text-teal">
          Usuário criado com sucesso.
        </p>
      )}

      <div className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-paper">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="font-medium">
                {user.name} {user.id === session?.user?.id && <span className="font-label text-[10px] text-wine">(você)</span>}
              </p>
              <p className="font-label text-[10px] text-ink/45">{user.email}</p>
            </div>
            {user.id !== session?.user?.id && users.length > 1 && (
              <DeleteButton
                action={deleteUserAction.bind(null, user.id)}
                confirmMessage={`Remover o acesso de ${user.name}?`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
