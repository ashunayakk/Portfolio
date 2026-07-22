"use client";

import { CONTACT } from "@/lib/content/contact";
import { waLink, cx } from "@/lib/utils";
import { Reveal } from "@/components/effects/Reveal";
import { trackEvent } from "@/lib/analytics";
import styles from "./Contact.module.css";

export function Contact({ eyebrow = "07 / Contact" }: { eyebrow?: string }) {
  const wa = waLink(CONTACT.whatsappNumber, CONTACT.whatsappMessage);

  return (
    <section id="contact" className={cx("section", styles.section)}>
      <div className="container">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className={styles.heading}>{CONTACT.heading}</h2>
          <p className={styles.paragraph}>{CONTACT.paragraph}</p>

          <div className={styles.ctaRow}>
            <a
              href={`mailto:${CONTACT.email}`}
              className={cx("btn", styles.emailBtn)}
              onClick={() => trackEvent("email_click", { source: "contact" })}
            >
              {CONTACT.email} →
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
              className={cx("btn", "btn-outline", styles.phoneBtn)}
            >
              {CONTACT.phone}
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={cx("btn", "btn-outline", styles.waBtn)}
              onClick={() => trackEvent("whatsapp_click", { source: "contact" })}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.55 2 12.04 2z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <p className={styles.statusLine}>{CONTACT.statusLine}</p>

          <div className={styles.footer}>
            <div className={styles.socials}>
              {CONTACT.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  onClick={() => {
                    if (social.label === "GitHub") trackEvent("github_click", { source: "contact" });
                    if (social.label === "LinkedIn") trackEvent("linkedin_click", { source: "contact" });
                  }}
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
            <span className={styles.copyright}>{CONTACT.copyright}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
