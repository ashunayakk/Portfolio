import type { Metadata } from "next";
import Image from "next/image";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import styles from "./page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ashutosh Nayak — AI & ML Engineer, Business Analyst and Frappe Developer based in Raipur, Chhattisgarh, India.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">About</p>
          <h1 className={styles.heading}>The person behind the projects.</h1>
          <p className={styles.sub}>Background, focus areas and how I work.</p>

          <div className={styles.brandPlate}>
            <Image
              src="/images/brand/logo-plate.jpg"
              alt="Ashutosh Nayak brand mark"
              fill
              sizes="(max-width: 480px) 90vw, 420px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        <About eyebrow="About" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
