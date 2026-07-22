import type { Metadata } from "next";
import Link from "next/link";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Certificates } from "@/components/sections/Certificates";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { HERO } from "@/lib/content/hero";
import styles from "./page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

const cvHref = HERO.ctas.find((c) => c.href.endsWith(".pdf"))?.href ?? "/docs/Ashutosh_Nayak_CV.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Ashutosh Nayak's resume — skills, work experience, education and certifications as an AI & ML Engineer, Business Analyst and Frappe Developer. View online or download as PDF.",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">Resume</p>
          <h1 className={styles.heading}>Ashutosh Nayak — AI &amp; ML Engineer, Business Analyst, Frappe Developer.</h1>
          <p className={styles.sub}>
            The full picture in one place: skills, experience, education and certifications. Read it here, or grab
            the PDF for offline reading and applications.
          </p>
          <div className={styles.actions}>
            <TrackedLink
              href={cvHref}
              download
              className="btn btn-primary"
              event="resume_download"
              eventParams={{ source: "resume_page" }}
            >
              Download PDF ↓
            </TrackedLink>
            <Link href="/" className="btn btn-outline">
              Back to portfolio
            </Link>
          </div>
        </section>

        <Skills eyebrow="What I do" />
        <Experience eyebrow="Experience" />
        <Education eyebrow="Education, core tech & coursework" />
        <Certificates eyebrow="Certificates & credentials" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
