export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  kicker: string;
  rotatorWords: string[];
  headingPrefix: string;
  subhead: string;
  ctas: { label: string; href: string; variant: "primary" | "outline" }[];
  metaLine: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface ProjectMeta {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  index: string;
  fileTag: string;
  title: string;
  modalTitle?: string;
  summary: string;
  tags: string[];
  badge: string;
  image: string;
  modal: {
    category: string;
    meta: ProjectMeta[];
    overview: string;
    sections: ProjectSection[];
    highlights: string[];
    stack: string[];
  };
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  facts: { label: string; value: string }[];
  photo: string;
}

export interface SkillDomain {
  index: string;
  title: string;
  description: string;
  icon: string;
}

export interface ExperienceEntry {
  roleLabel: string;
  title: string;
  org: string;
  intro?: string;
  bullets: string[];
  tags: string[];
}

export interface EducationCoreTechRow {
  label: string;
  items: string[];
}

export interface EducationContent {
  degree: string;
  institution: string;
  coreTech: EducationCoreTechRow[];
  coursework: EducationCoreTechRow[];
}

export interface Certificate {
  issuer: string;
  title: string;
  meta: string;
  file: string;
}

export interface DocumentRef {
  label: string;
  file: string;
}

export interface ContactContent {
  heading: string;
  paragraph: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  statusLine: string;
  socials: { label: string; href: string }[];
  copyright: string;
}
