import type { SkillDomain } from "@/types/content";

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    index: "01",
    title: "Artificial Intelligence",
    description: "Machine learning and AI applications that turn models into tools solving real business problems.",
    icon: "share",
  },
  {
    index: "02",
    title: "LLMs & Agentic AI",
    description: "Prompt engineering and LLM-powered assistants that automate knowledge work and decision support.",
    icon: "message",
  },
  {
    index: "03",
    title: "Data Analytics",
    description: "Dashboards, KPI reporting and visualisation in Power BI, Excel and SQL that make numbers actionable.",
    icon: "chart",
  },
  {
    index: "04",
    title: "Business Analysis",
    description: "Requirement gathering, BRD/FRD/SRS, user stories and process mapping that align stakeholders before build.",
    icon: "clipboard",
  },
  {
    index: "05",
    title: "ERP / Frappe Development",
    description: "Custom ERPNext and CRM apps on the Frappe Framework — workflows, forms, reports and print formats.",
    icon: "grid",
    liveLink: { label: "Live at Profezzo", href: "https://profezzo.com" },
  },
  {
    index: "06",
    title: "Business Automation",
    description: "Workflow automation that removes manual steps and connects systems end to end.",
    icon: "refresh",
  },
  {
    index: "07",
    title: "Machine Learning",
    description: "Predictive models and supervised/unsupervised learning pipelines that extract insight and drive decisions from data.",
    icon: "flower",
  },
  {
    index: "08",
    title: "Web & App Development",
    description: "Web Development, App Development (Flutter) and Frappe Framework — custom software and websites built end to end for clients.",
    icon: "monitor",
  },
  {
    index: "09",
    title: "Project Management & Leadership",
    description: "End-to-end project coordination, team leadership and stakeholder management — delivering software and ERP implementations on time.",
    icon: "users",
  },
];

export const CURRENTLY_EXPLORING = [
  "Agentic AI",
  "Advanced Prompt Engineering",
  "Enterprise AI Applications",
  "AI + ERP Integration",
  "AI Product Development",
];
