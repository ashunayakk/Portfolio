import { Reveal } from "@/components/effects/Reveal";
import { WorkGrid } from "./WorkGrid";
import styles from "./Work.module.css";

interface WorkProps {
  eyebrow?: string;
  headingAs?: "h1" | "h2";
}

export function Work({ eyebrow = "01 / Featured projects", headingAs: Heading = "h2" }: WorkProps) {
  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <p className="eyebrow">{eyebrow}</p>
            <Heading className={styles.heading}>Work across AI, ERP and analytics.</Heading>
            <p>A selection spanning applied AI research, enterprise development and business intelligence.</p>
          </div>
        </Reveal>
        <WorkGrid />
      </div>
    </section>
  );
}
