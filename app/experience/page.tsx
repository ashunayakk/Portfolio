import type { Metadata } from "next";
import Link from "next/link";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Experience } from "@/components/sections/Experience";
import styles from "./page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Ashutosh Nayak's work experience — roles and projects across AI & ML engineering, business analysis and Frappe/ERPNext development.",
};

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">Experience</p>
          <h1 className={styles.heading}>Where I&apos;ve done the work.</h1>
          <p className={styles.sub}>Roles, projects and the impact behind them, in order.</p>
          <div className={styles.actions}>
            <Link href="/resume" className="btn btn-outline">
              View full resume
            </Link>
          </div>
        </section>

        <Experience eyebrow="Timeline" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
