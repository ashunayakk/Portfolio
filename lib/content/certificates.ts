import type { Certificate, DocumentRef } from "@/types/content";

export const CERTIFICATES: Certificate[] = [
  {
    issuer: "Udemy",
    title: "Learn Python Programming — Beginner to Master",
    meta: "Python · Programming",
    file: "/docs/Udemy-Certificate.pdf",
  },
  {
    issuer: "NPTEL · Swayam",
    title: "Management Information System",
    meta: "Jul–Oct 2025",
    file: "/docs/NPTEL-Management-Information-System.pdf",
  },
  {
    issuer: "IIT (BHU), Varanasi",
    title: "Research Internship Certificate",
    meta: "Feb–Jun 2025 · LLM Research",
    file: "/docs/IIT-BHU-Internship-Certificate.pdf",
  },
];

export const DOCUMENTS: DocumentRef[] = [
  { label: "IIT (BHU) — Appreciation Letter", file: "/docs/Appreciation-Letter.pdf" },
  { label: "Internship Project Report", file: "/docs/IIT-BHU-Internship-Report.pdf" },
];
