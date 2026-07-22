import Link from "next/link";
import { CERTIFICATES, DOCUMENTS } from "@/lib/content/certificates";
import { Reveal } from "@/components/effects/Reveal";
import styles from "./Certificates.module.css";

interface CertificatesProps {
  eyebrow?: string;
  teaser?: boolean;
  headingAs?: "h1" | "h2";
}

export function Certificates({
  eyebrow = "06 / Certificates & credentials",
  teaser = false,
  headingAs: Heading = "h2",
}: CertificatesProps) {
  return (
    <section id="certificates" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <p className="eyebrow">{eyebrow}</p>
            <Heading className={styles.heading}>Verified, and ready to review.</Heading>
            <p>Click any item to open the original certificate or document as a PDF.</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 80}>
              <a href={cert.file} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <div className={styles.issuer}>{cert.issuer}</div>
                <div className={styles.title}>{cert.title}</div>
                <div className={styles.meta}>{cert.meta}</div>
              </a>
            </Reveal>
          ))}
        </div>

        {teaser ? (
          <Reveal delay={160}>
            <div className={styles.teaserFooter}>
              <Link href="/certificates" className="btn btn-outline">
                View credentials →
              </Link>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={160}>
            <div className={styles.docs}>
              {DOCUMENTS.map((doc) => (
                <a
                  key={doc.label}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.docRow}
                >
                  <span>{doc.label}</span>
                  <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
