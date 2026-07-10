import { ABOUT } from "@/lib/content/about";
import { CONTACT } from "@/lib/content/contact";
import { EXPERIENCE } from "@/lib/content/experience";
import { PROJECTS } from "@/lib/content/projects";
import { SKILL_DOMAINS } from "@/lib/content/skills";
import { EDUCATION } from "@/lib/content/education";
import { CERTIFICATES } from "@/lib/content/certificates";

/** Builds the chatbot's resume context directly from the same content data
 * that renders the page, instead of a hand-maintained duplicate string.
 * The old api/chat.js RESUME_CONTEXT drifted stale (missing the 9th
 * project, "Library Management System") because it was a second copy of
 * the same facts — this function has exactly one source of truth. */
export function buildResumeContext(): string {
  const experience = EXPERIENCE.map((e) => {
    const intro = e.intro ? ` ${e.intro}` : "";
    return `- ${e.title}, ${e.org} (${e.roleLabel}):${intro} ${e.bullets.join("; ")}. Stack: ${e.tags.join(", ")}.`;
  }).join("\n");

  const projects = PROJECTS.map(
    (p, i) => `${i + 1}. ${p.title} — ${p.summary} [${p.tags.join(", ")}]`
  ).join("\n");

  const skills = SKILL_DOMAINS.map((s) => `${s.title}: ${s.description}`).join("\n");

  const coreTech = EDUCATION.coreTech.map((row) => `${row.label}: ${row.items.join(", ")}`).join("\n");

  const certificates = CERTIFICATES.map((c) => `- ${c.issuer}: ${c.title} (${c.meta})`).join("\n");

  return `
Name: Ashutosh Nayak
Title: AI & ML Engineer · Business Analyst · Frappe Developer · Data Analyst
Location: ${ABOUT.facts.find((f) => f.label === "Based in")?.value ?? "Raipur, Chhattisgarh, India"}
Contact: ${CONTACT.email}, ${CONTACT.phone}
Status: ${CONTACT.statusLine}

SUMMARY
${ABOUT.paragraphs.join(" ")}

EXPERIENCE
${experience}

FEATURED PROJECTS
${projects}

SKILLS
${skills}

CORE TECH
${coreTech}

EDUCATION
${EDUCATION.degree}, ${EDUCATION.institution}

CERTIFICATES
${certificates}
`.trim();
}
