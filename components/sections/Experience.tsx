import Link from "next/link";
import { EXPERIENCE } from "@/lib/content/experience";
import { HERO } from "@/lib/content/hero";
import { Reveal } from "@/components/effects/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";
import styles from "./Experience.module.css";

const cvHref = HERO.ctas.find((c) => c.href.endsWith(".pdf"))?.href ?? "/docs/Ashutosh_Nayak_CV.pdf";

interface ExperienceProps {
  eyebrow?: string;
  limit?: number;
}

export function Experience({ eyebrow = "04 / Experience", limit }: ExperienceProps) {
  const entries = limit ? EXPERIENCE.slice(0, limit) : EXPERIENCE;

  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className={styles.heading}>Where I&apos;ve done the work.</h2>
            </div>
            <TrackedLink
              href={cvHref}
              className="btn btn-dark"
              event="resume_download"
              eventParams={{ source: "experience" }}
            >
              Download CV ↓
            </TrackedLink>
          </div>
        </Reveal>

        <div className={styles.timeline}>
          {entries.map((entry, i) => (
            <Reveal key={entry.title} delay={i * 80}>
              <div className={styles.entry}>
                <div className={styles.roleLabel}>{entry.roleLabel}</div>
                <div className={styles.content}>
                  <div className={styles.title}>{entry.title}</div>
                  <div className={styles.org}>{entry.org}</div>
                  {entry.intro && <p className={styles.intro}>{entry.intro}</p>}
                  <div className={styles.bullets}>
                    {entry.bullets.map((b) => (
                      <div key={b} className={styles.bullet}>
                        <span>—</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.tags}>
                    {entry.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {limit && (
          <Reveal delay={entries.length * 80}>
            <div className={styles.teaserFooter}>
              <Link href="/experience" className="btn btn-outline">
                Full experience →
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
