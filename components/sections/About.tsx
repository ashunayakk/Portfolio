import { ABOUT } from "@/lib/content/about";
import { Reveal } from "@/components/effects/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.content}>
            <p className="eyebrow">02 / About</p>
            <h2 className={styles.heading}>{ABOUT.heading}</h2>
            <div className={styles.paragraphs}>
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className={styles.facts}>
              {ABOUT.facts.map((fact) => (
                <div key={fact.label}>
                  <div className={styles.factLabel}>{fact.label}</div>
                  <div className={styles.factValue}>{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
