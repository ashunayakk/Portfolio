import Link from "next/link";
import { SKILL_DOMAINS, CURRENTLY_EXPLORING } from "@/lib/content/skills";
import { Reveal } from "@/components/effects/Reveal";
import { SkillIcon } from "./SkillIcon";
import styles from "./Skills.module.css";

interface SkillsProps {
  eyebrow?: string;
  limit?: number;
  headingAs?: "h1" | "h2";
}

export function Skills({ eyebrow = "03 / What I do", limit, headingAs: Heading = "h2" }: SkillsProps) {
  const domains = limit ? SKILL_DOMAINS.slice(0, limit) : SKILL_DOMAINS;

  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <p className="eyebrow">{eyebrow}</p>
            <Heading className={styles.heading}>Nine domains, one throughline: intelligent, data-driven systems.</Heading>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {domains.map((skill, i) => (
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
                {skill.liveLink && (
                  <a
                    href={skill.liveLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveBadge}
                  >
                    <span className={styles.liveDot} aria-hidden />
                    {skill.liveLink.label}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {limit ? (
          <Reveal delay={120}>
            <div className={styles.teaserFooter}>
              <Link href="/skills" className="btn btn-outline">
                See all skills →
              </Link>
            </div>
          </Reveal>
        ) : (
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
        )}
      </div>
    </section>
  );
}
