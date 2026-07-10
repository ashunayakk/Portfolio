"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { cx } from "@/lib/utils";
import styles from "./Sidebar.module.css";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>AN Admin</div>
        <nav className={styles.nav}>
          {LINKS.map((link) => {
            const isActive = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={cx(styles.link, isActive && styles.active)}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className={styles.footer}>
          {session?.user?.email && <div className={styles.email}>{session.user.email}</div>}
          <button type="button" className={styles.signOut} onClick={() => signOut({ callbackUrl: "/admin/login" })}>
            Sign out
          </button>
        </div>
      </aside>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
