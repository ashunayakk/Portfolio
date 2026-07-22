import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Certificates } from "@/components/sections/Certificates";
import styles from "./page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

export const metadata: Metadata = {
  title: "Certificates",
  description: "Certificates and credentials earned by Ashutosh Nayak, verifiable as original PDF documents.",
};

export default function CertificatesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">Certificates</p>
          <h1 className={styles.heading}>Credentials & documents.</h1>
          <p className={styles.sub}>Verified certificates and supporting documents, open as PDF.</p>
        </section>

        <Certificates eyebrow="Certificates" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
