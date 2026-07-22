import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Work } from "@/components/sections/Work";

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
        <Work eyebrow="Work" headingAs="h1" />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
