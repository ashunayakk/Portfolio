import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { verifyPassword } from "./auth-password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash) {
          console.error("ADMIN_EMAIL or ADMIN_PASSWORD_HASH is not set");
          return null;
        }

        if (email.toLowerCase() !== adminEmail.toLowerCase()) return null;

        const valid = await verifyPassword(password, adminHash);
        if (!valid) return null;

        return { id: "admin", email: adminEmail, name: "Ashutosh Nayak" };
      },
    }),
  ],
});
