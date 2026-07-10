import type { CSSProperties } from "react";
import { SKILL_DOMAINS } from "@/lib/content/skills";
import { SKILL_ICON_PATHS } from "./SkillIcon";
import { cx } from "@/lib/utils";
import styles from "./OrbitDiagram.module.css";

const SHORT_LABELS: Record<string, string> = {
  share: "AI",
  message: "LLM",
  chart: "Data",
  clipboard: "BA",
  grid: "ERP",
  refresh: "Auto",
  flower: "ML",
  monitor: "Web",
  users: "PM",
};

const RADIUS = 170;
const ANGLE_STEP = 360 / SKILL_DOMAINS.length;

function angleVar(angle: number): CSSProperties {
  return { "--start-angle": `${angle}deg` } as CSSProperties;
}

export function OrbitDiagram() {
  return (
    <div className={styles.wrap}>
      <div className={cx(styles.ring, styles.ringOutermost)} />
      <div className={cx(styles.ring, styles.ringOuter)} />
      <div className={cx(styles.ring, styles.ringInner)} />

      <div className={styles.center}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" />
        </svg>
      </div>

      {SKILL_DOMAINS.map((skill, i) => {
        const angle = -90 + i * ANGLE_STEP;
        const filled = i % 3 === 2;
        return (
          <div key={skill.index} className={styles.orbitSpin} style={angleVar(angle)}>
            <div className={styles.orbitArm} style={{ transform: `translate(${RADIUS}px, 0)` }}>
              <div className={styles.orbitNode} style={angleVar(angle)}>
                <span className={cx(styles.nodeCircle, filled && styles.filled)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {SKILL_ICON_PATHS[skill.icon]}
                  </svg>
                </span>
                <span className={styles.nodeLabel}>{SHORT_LABELS[skill.icon] ?? skill.title}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
