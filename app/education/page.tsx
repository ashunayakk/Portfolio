import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Education } from "@/components/sections/Education";
import styles from "./page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

export const metadata: Metadata = {
  title: "Education",
  description:
    "Ashutosh Nayak's education — B.Tech (Hons.) Computer Science & Engineering (Artificial Intelligence), core tech and coursework.",
};

export default function EducationPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">Education</p>
          <h1 className={styles.heading}>Academic background.</h1>
          <p className={styles.sub}>Degree, core technical training and coursework.</p>
        </section>

        <Education eyebrow="Education" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
