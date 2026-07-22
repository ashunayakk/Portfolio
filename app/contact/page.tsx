import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import styles from "./page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ashutosh Nayak — email, phone, WhatsApp or social links.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">Contact</p>
          <h1 className={styles.heading}>Get in touch.</h1>
          <p className={styles.sub}>Open to remote, hybrid, onsite and freelance work.</p>
        </section>

        <Contact eyebrow="Contact" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
