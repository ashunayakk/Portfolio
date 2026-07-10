import type { NextAuthConfig } from "next-auth";

/** Edge-safe config: no Credentials provider, no Node-only crypto, no
 * Prisma import. This is the half of the NextAuth config that middleware
 * (which runs on the Edge runtime) is allowed to import — the full config
 * with the Credentials provider lives in lib/auth.ts and is only ever
 * imported by the Node.js route handler. */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin") && nextUrl.pathname !== "/admin/login";
      if (isAdminRoute) return isLoggedIn;
      return true;
    },
  },
  providers: [],
};
