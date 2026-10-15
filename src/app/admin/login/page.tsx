import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { Logo } from "@/components/site/Logo";
import { getSiteSettings } from "@/lib/content";

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/admin/login?error=1");
    }
    throw error;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-paper/10 bg-ink p-8 text-paper shadow-2xl">
        <Logo logoUrl={settings.logoUrl} siteName={settings.shortName || settings.siteName} variant="light" />
        <p className="font-label mt-6 text-[11px] text-paper/50">Painel administrativo</p>
        <h1 className="mt-2 font-display text-2xl font-bold">Entrar para publicar</h1>

        <form action={loginAction} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="font-label text-[11px] text-paper/60">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper outline-none focus:border-orange"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-label text-[11px] text-paper/60">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper outline-none focus:border-orange"
            />
          </div>

          {error && (
            <p className="font-label rounded-lg border border-wine/40 bg-wine/10 px-3 py-2 text-[11px] text-pink">
              E-mail ou senha inválidos.
            </p>
          )}

          <button
            type="submit"
            className="font-label mt-2 rounded-full bg-orange px-6 py-3 text-[12px] text-ink transition-transform hover:-translate-y-0.5"
          >
            Entrar
          </button>
        </form>

        <p className="font-label mt-8 text-center text-[10px] text-paper/40">
          <Link href="/">← Voltar para o site</Link>
        </p>
      </div>
    </div>
  );
}
