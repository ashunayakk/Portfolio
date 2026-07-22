import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Experience } from "@/components/sections/Experience";

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
        <Experience eyebrow="Experience" headingAs="h1" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
