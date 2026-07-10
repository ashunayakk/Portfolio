import { EDUCATION } from "@/lib/content/education";
import { Reveal } from "@/components/effects/Reveal";
import styles from "./Education.module.css";

export function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <p className="eyebrow">05 / Education, core tech & coursework</p>
            <h2 className={styles.degree}>{EDUCATION.degree}</h2>
            <p className={styles.institution}>{EDUCATION.institution}</p>
          </div>
        </Reveal>

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
      </div>
    </section>
  );
}
