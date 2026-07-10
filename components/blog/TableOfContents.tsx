"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/types/blog";
import { cx } from "@/lib/utils";
import styles from "./TableOfContents.module.css";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className={styles.wrap} aria-label="Table of contents">
      <div className={styles.label}>On this page</div>
      <div className={styles.list}>
        {headings.map((h) => (
          <div
            key={h.slug}
            className={cx(styles.item, h.depth === 3 && styles.itemDepth3, active === h.slug && styles.active)}
          >
            <a href={`#${h.slug}`} className={styles.link}>
              {h.text}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
}
