import { Reveal } from "@/components/effects/Reveal";
import { WorkGrid } from "./WorkGrid";
import styles from "./Work.module.css";

export function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <p className="eyebrow">01 / Featured projects</p>
            <h2 className={styles.heading}>Work across AI, ERP and analytics.</h2>
            <p>A selection spanning applied AI research, enterprise development and business intelligence.</p>
          </div>
        </Reveal>
        <WorkGrid />
      </div>
    </section>
  );
}
