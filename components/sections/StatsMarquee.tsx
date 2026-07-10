import { INTERNS_MENTORED, SKILLS_MARQUEE } from "@/lib/content/stats";
import { PROJECTS } from "@/lib/content/projects";
import { EXPERIENCE } from "@/lib/content/experience";
import { SKILL_DOMAINS } from "@/lib/content/skills";
import { CountUp } from "@/components/effects/CountUp";
import styles from "./StatsMarquee.module.css";

export function StatsMarquee() {
  const stats = [
    { value: INTERNS_MENTORED, suffix: "+", label: "Interns mentored" },
    { value: PROJECTS.length, suffix: "", label: "Featured projects" },
    { value: EXPERIENCE.length, suffix: "", label: "Professional roles" },
    { value: SKILL_DOMAINS.length, suffix: "", label: "Skill domains" },
  ];

  const marqueeItems = [...SKILLS_MARQUEE, ...SKILLS_MARQUEE];

  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <div className={styles.value}>
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.marqueeMask} aria-hidden>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot}>&middot;</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
