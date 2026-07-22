import Link from "next/link";
import { ABOUT } from "@/lib/content/about";
import { Reveal } from "@/components/effects/Reveal";
import styles from "./About.module.css";

interface AboutProps {
  eyebrow?: string;
  teaser?: boolean;
  headingAs?: "h1" | "h2";
}

export function About({ eyebrow = "02 / About", teaser = false, headingAs: Heading = "h2" }: AboutProps) {
  const paragraphs = teaser ? ABOUT.paragraphs.slice(0, 1) : ABOUT.paragraphs;

  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.content}>
            <p className="eyebrow">{eyebrow}</p>
            <Heading className={styles.heading}>{ABOUT.heading}</Heading>
            <div className={styles.paragraphs}>
              {paragraphs.map((p, i) => (
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
            {teaser && (
              <div className={styles.teaserFooter}>
                <Link href="/about" className="btn btn-outline">
                  More about me →
                </Link>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
