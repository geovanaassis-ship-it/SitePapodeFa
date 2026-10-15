import type { NextAuthConfig } from "next-auth";

/**
 * Configuração "leve" do NextAuth, sem dependências Node (Prisma/bcrypt),
 * para poder ser usada no middleware (Edge Runtime). A autenticação real
 * (Credentials + Prisma) vive em src/auth.ts.
 */
export const authConfig: NextAuthConfig = {
  // Necessário em ambientes de preview/deploy onde o host pode variar
  // (ex.: domínios de preview da Vercel) e não é conhecido com antecedência.
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = Boolean(auth?.user);
      const isAdminArea = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPage = request.nextUrl.pathname === "/admin/login";

      if (isLoginPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin", request.nextUrl));
        }
        return true;
      }

      if (isAdminArea) {
        return isLoggedIn;
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = (user as { role?: string }).role ?? "ADMIN";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string) ?? "ADMIN";
      }
      return session;
    },
  },
};
