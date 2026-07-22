import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Work } from "@/components/sections/Work";
import styles from "./page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Ashutosh Nayak spanning applied AI research, LLMs, ERP/CRM development, and business intelligence.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">Work</p>
          <h1 className={styles.heading}>Projects across AI, ERP and analytics.</h1>
          <p className={styles.sub}>
            A selection spanning applied AI research, enterprise development and business intelligence — click any
            project for the full case study.
          </p>
        </section>

        <Work eyebrow="All projects" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
