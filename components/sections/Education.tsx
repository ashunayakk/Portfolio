import Link from "next/link";
import { EDUCATION } from "@/lib/content/education";
import { Reveal } from "@/components/effects/Reveal";
import styles from "./Education.module.css";

interface EducationProps {
  eyebrow?: string;
  teaser?: boolean;
  headingAs?: "h1" | "h2";
}

export function Education({
  eyebrow = "05 / Education, core tech & coursework",
  teaser = false,
  headingAs: Heading = "h2",
}: EducationProps) {
  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <p className="eyebrow">{eyebrow}</p>
            <Heading className={styles.degree}>{EDUCATION.degree}</Heading>
            <p className={styles.institution}>{EDUCATION.institution}</p>
          </div>
        </Reveal>

        {teaser ? (
          <Reveal delay={80}>
            <div className={styles.teaserFooter}>
              <Link href="/education" className="btn btn-outline">
                Details →
              </Link>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal delay={80}>
              <div className={styles.groupTitle}>Core tech</div>
              <div className={styles.rows}>
                {EDUCATION.coreTech.map((row) => (
                  <div key={row.label} className={styles.row}>
                    <div className={styles.rowLabel}>{row.label}</div>
                    <div className={styles.rowItems}>{row.items.join(" · ")}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className={styles.groupTitle}>Coursework</div>
              <div className={styles.rows}>
                {EDUCATION.coursework.map((row) => (
                  <div key={row.label} className={styles.row}>
                    <div className={styles.rowLabel}>{row.label}</div>
                    <div className={styles.rowItems}>{row.items.join(" · ")}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
