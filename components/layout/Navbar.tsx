"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS, NAV_CONTACT } from "@/lib/content/nav";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { trackEvent } from "@/lib/analytics";
import { cx } from "@/lib/utils";
import styles from "./Navbar.module.css";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isLinkActive = (href: string) => pathname.startsWith(href);

  return (
    <header className={cx(styles.nav, scrolled && styles.scrolled, open && styles.navOpen)}>
      <div className={cx("container", styles.inner)}>
        <a href={isHome ? "#top" : "/"} className={styles.logo}>
          <span className={styles.logoDot} aria-hidden />
          Ashutosh Nayak
        </a>

        <nav className={styles.links} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cx(styles.link, isLinkActive(link.href) && styles.active)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <ThemeSwitcher />
          <a href="/resume" className="btn btn-outline" onClick={() => trackEvent("resume_view", { source: "navbar" })}>
            Resume
          </a>
          <a href={NAV_CONTACT.href} className="btn btn-dark">
            {NAV_CONTACT.label}
          </a>
          <button
            type="button"
            className={styles.hamburger}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={styles.mobilePanel}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={NAV_CONTACT.href} className={styles.link} onClick={() => setOpen(false)}>
            {NAV_CONTACT.label}
          </a>
          <a
            href="/resume"
            className={styles.link}
            onClick={() => {
              trackEvent("resume_view", { source: "navbar_mobile" });
              setOpen(false);
            }}
          >
            Resume
          </a>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
