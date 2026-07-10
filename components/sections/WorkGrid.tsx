"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/content/projects";
import type { Project } from "@/types/content";
import { Reveal } from "@/components/effects/Reveal";
import { trackEvent } from "@/lib/analytics";
import styles from "./Work.module.css";

function ProjectImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return <span className={styles.placeholder}>{alt.slice(0, 2).toUpperCase()}</span>;
  }
  return (
    <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: "cover" }} onError={() => setErrored(true)} />
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeBtn} aria-label="Close" onClick={onClose}>
          ×
        </button>
        <div className={styles.modalHero}>
          <ProjectImage src={project.image} alt={project.title} sizes="720px" />
        </div>
        <div className={styles.modalBody}>
          <h3 className={styles.modalTitle}>{project.modalTitle ?? project.title}</h3>
          <span className={styles.modalCategory}>{project.modal.category}</span>

          <div className={styles.metaGrid}>
            {project.modal.meta.map((m) => (
              <div key={m.label}>
                <div className={styles.metaLabel}>{m.label}</div>
                <div className={styles.metaValue}>{m.value}</div>
              </div>
            ))}
          </div>

          <p className={styles.overview}>{project.modal.overview}</p>

          {project.modal.sections.map((s) => (
            <div key={s.heading} className={styles.caseSection}>
              <span className={styles.caseSectionHeading}>{s.heading}</span>
              <p>{s.body}</p>
            </div>
          ))}

          <div className={styles.highlights}>
            {project.modal.highlights.map((h) => (
              <div key={h} className={styles.highlightItem}>
                <span>—</span>
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className={styles.stack}>
            {project.modal.stack.map((s) => (
              <span key={s} className={styles.tag}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkGrid() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {PROJECTS.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 80}>
            <button
              type="button"
              className={styles.card}
              onClick={() => {
                setSelected(project);
                trackEvent("project_click", { project: project.slug });
              }}
            >
              <div className={styles.imageWrap}>
                <span className={styles.fileTag}>{project.fileTag}</span>
                <span className={styles.index}>{project.index}</span>
                <ProjectImage src={project.image} alt={project.title} sizes="(max-width: 680px) 100vw, 33vw" />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>
                  <span>{project.title}</span>
                  <span className={styles.arrow} aria-hidden>
                    ↗
                  </span>
                </div>
                <p className={styles.cardSummary}>{project.summary}</p>
                <span className={styles.badge}>{project.badge}</span>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
