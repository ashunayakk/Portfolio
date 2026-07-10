import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StatsMarquee } from "@/components/sections/StatsMarquee";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { CONTACT } from "@/lib/content/contact";
import { SITE_URL } from "@/lib/seo";

// Code-split the floating widgets and cursor-follow effect out of the main
// bundle — none of them are needed for first paint or SEO-visible content.
const WhatsAppWidget = dynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = dynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));
const MouseGlow = dynamic(() => import("@/components/effects/MouseGlow").then((m) => m.MouseGlow));

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashutosh Nayak",
  url: SITE_URL,
  jobTitle: "AI & ML Engineer · Business Analyst · Frappe Developer",
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Raipur",
    addressRegion: "Chhattisgarh",
    addressCountry: "IN",
  },
  sameAs: CONTACT.socials.map((s) => s.href),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <StatsMarquee />
        <Work />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
