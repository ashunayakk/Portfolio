import type { EducationContent } from "@/types/content";

export const EDUCATION: EducationContent = {
  degree: "B.Tech (Hons.) — Computer Science & Engineering (Artificial Intelligence)",
  institution: "Chhattisgarh Swami Vivekanand Technical University",
  coreTech: [
    { label: "AI & ML", items: ["Machine Learning", "LLMs", "Agentic AI", "NLP"] },
    { label: "Programming", items: ["Python", "SQL", "R", "C"] },
    { label: "Enterprise", items: ["Frappe Framework", "ERPNext", "CRM"] },
    { label: "Analytics", items: ["Excel", "Google Sheets", "Dashboard Development"] },
    { label: "Documentation", items: ["BRD", "FRD", "SRS", "Overleaf", "Draw.io"] },
    { label: "Development", items: ["Web Development", "Software Development", "App Development", "Flutter"] },
  ],
  coursework: [
    {
      label: "Programming & SE",
      items: ["Data Structures", "Algorithms", "OOP", "Software Engineering", "Computational Complexity"],
    },
    {
      label: "CS core",
      items: [
        "Operating Systems",
        "Computer Networks",
        "DBMS",
        "Computer Organization & Architecture",
        "Theory of Computation",
        "Cloud Computing",
        "Cryptography & Network Security",
      ],
    },
    { label: "Mathematics", items: ["Engineering Mathematics", "Probability & Statistics", "Discrete Mathematics"] },
    {
      label: "Business & mgmt",
      items: [
        "Management Information Systems",
        "Technology Management",
        "Entrepreneurship",
        "Professional Ethics",
        "Technical Communication",
      ],
    },
  ],
};
