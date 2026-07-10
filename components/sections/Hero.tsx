import { HERO } from "@/lib/content/hero";
import { WordRotator } from "@/components/effects/WordRotator";
import { HeroCtaButton } from "./HeroCtaButton";
import { OrbitDiagram } from "./OrbitDiagram";
import { SKILL_ICON_PATHS } from "./SkillIcon";
import styles from "./Hero.module.css";

const DECOR_ICONS = [
  { top: "8%", left: "6%", size: 78, rotate: -12, icon: "share" },
  { top: "60%", left: "3%", size: 58, rotate: 8, icon: "chart" },
  { top: "16%", left: "83%", size: 84, rotate: 18, icon: "message" },
  { top: "68%", left: "89%", size: 64, rotate: -20, icon: "grid" },
  { top: "38%", left: "94%", size: 52, rotate: 5, icon: "flower" },
  { top: "88%", left: "42%", size: 56, rotate: -8, icon: "monitor" },
  { top: "4%", left: "44%", size: 48, rotate: 12, icon: "clipboard" },
  { top: "82%", left: "8%", size: 60, rotate: 15, icon: "refresh" },
  { top: "26%", left: "12%", size: 46, rotate: -6, icon: "users" },
];

export function Hero() {
  return (
    <section id="top" className={`${styles.hero} section`}>
      <div className={styles.heroGlow} aria-hidden />
      <div className={styles.decor} aria-hidden>
        {DECOR_ICONS.map((icon, i) => (
          <svg
            key={i}
            className={styles.decorIcon}
            style={{ top: icon.top, left: icon.left, transform: `rotate(${icon.rotate}deg)` }}
            width={icon.size}
            height={icon.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {SKILL_ICON_PATHS[icon.icon]}
          </svg>
        ))}
      </div>

      <div className="container">
        <div className={styles.grid}>
          <div className={styles.copyCol}>
            <div className={`${styles.kicker} eyebrow`}>
              <span className={styles.dot} />
              {HERO.kicker}
            </div>

            <h1 className={styles.heading}>
              {HERO.headingPrefix} <WordRotator words={HERO.rotatorWords} />.
            </h1>

            <p className={styles.subhead}>{HERO.subhead}</p>

            <div className={styles.ctas}>
              {HERO.ctas.map((cta) => (
                <HeroCtaButton key={cta.label} label={cta.label} href={cta.href} variant={cta.variant} />
              ))}
            </div>

            <p className={styles.metaLine}>{HERO.metaLine}</p>
          </div>

          <div className={styles.panel}>
            <OrbitDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
