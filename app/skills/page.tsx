import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Skills } from "@/components/sections/Skills";
import styles from "./page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Skills and domains — AI, LLMs & agentic AI, data analytics, business analysis, ERP/Frappe development, machine learning, web & app development.",
};

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">Skills</p>
          <h1 className={styles.heading}>What I bring to the table.</h1>
          <p className={styles.sub}>Nine domains I work across, from research to production.</p>
        </section>

        <Skills eyebrow="Skills" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
