"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const urlError = searchParams.get("error");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);

    // redirect:true (default) lets NextAuth perform a real server redirect
    // once the session cookie is set, instead of a client-side router.push
    // that can race the cookie write and bounce back to /login.
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl,
    });

    setPending(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.logo}>AN</div>
        <h1 className={styles.title}>Admin sign in</h1>
        <p className={styles.sub}>Private dashboard — authorized access only.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" required className={styles.input} autoComplete="username" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={styles.input}
              autoComplete="current-password"
            />
          </div>

          {urlError && <p className={styles.error}>Invalid email or password.</p>}

          <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
