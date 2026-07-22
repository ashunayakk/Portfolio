import { SKILL_DOMAINS, CURRENTLY_EXPLORING } from "@/lib/content/skills";
import { Reveal } from "@/components/effects/Reveal";
import { SkillIcon } from "./SkillIcon";
import styles from "./Skills.module.css";

export function Skills({ eyebrow = "03 / What I do" }: { eyebrow?: string }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className={styles.heading}>Nine domains, one throughline: intelligent, data-driven systems.</h2>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {SKILL_DOMAINS.map((skill, i) => (
            <Reveal key={skill.index} delay={(i % 3) * 80}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.iconBox}>
                    <SkillIcon name={skill.icon} />
                  </span>
                  <span className={styles.index}>{skill.index}</span>
                </div>
                <h3 className={styles.title}>{skill.title}</h3>
                <p className={styles.desc}>{skill.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className={styles.exploring}>
            <span className={styles.exploringLabel}>Currently exploring</span>
            <div className={styles.exploringTags}>
              {CURRENTLY_EXPLORING.map((item) => (
                <span key={item} className={styles.exploringTag}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
