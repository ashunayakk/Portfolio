"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS, NAV_CONTACT } from "@/lib/content/nav";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { cx } from "@/lib/utils";
import styles from "./Navbar.module.css";

function resolveHref(href: string, isHome: boolean): string {
  if (href.startsWith("#")) return isHome ? href : `/${href}`;
  return href;
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_LINKS.filter((l) => l.href.startsWith("#"))
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isLinkActive = (href: string) => {
    if (href.startsWith("#")) return isHome && active === href;
    return pathname.startsWith(href);
  };

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
              href={resolveHref(link.href, isHome)}
              className={cx(styles.link, isLinkActive(link.href) && styles.active)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <ThemeSwitcher />
          <a href={resolveHref(NAV_CONTACT.href, isHome)} className="btn btn-dark">
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
              href={resolveHref(link.href, isHome)}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={resolveHref(NAV_CONTACT.href, isHome)} className={styles.link} onClick={() => setOpen(false)}>
            {NAV_CONTACT.label}
          </a>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
