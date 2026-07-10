import type { Project } from "@/types/content";

export const PROJECTS: Project[] = [
  {
    slug: "llm-doctor-recommendation",
    index: "01",
    fileTag: "DOCTOR_REC.llm",
    title: "LLM Doctor Recommendation System",
    summary:
      "Fine-tuned LLMs for healthcare recommendations, with dataset preprocessing and evaluation — researched on the Practo dataset at IIT (BHU).",
    tags: ["Python", "LLM", "NLP"],
    badge: "IIT (BHU) research",
    image: "/images/projects/doctor.png",
    modal: {
      category: "AI / NLP Research — IIT (BHU)",
      meta: [
        { label: "Context", value: "Research Internship" },
        { label: "Organisation", value: "IIT (BHU) Varanasi" },
        { label: "Type", value: "Applied AI research" },
        { label: "Dataset", value: "Practo healthcare" },
      ],
      overview:
        "An applied AI research project developing an LLM-based Doctor Recommendation System on the Practo healthcare dataset, built during a research internship at IIT (BHU), Varanasi.",
      sections: [
        {
          heading: "The challenge",
          body: "Matching patients to the right doctor from an unstructured, noisy healthcare dataset requires understanding symptoms, specialities and patient history in natural language rather than rigid filters.",
        },
        {
          heading: "My approach",
          body: "Fine-tuned LLMs on the Practo dataset, ran systematic data preprocessing and evaluation, and collaborated closely with the faculty supervisor while coordinating and mentoring a team of 10-15 research interns.",
        },
        {
          heading: "Outcome",
          body: "A working recommendation pipeline that also fed into a DRDO project proposal, with estimation, documentation and presentation support delivered alongside the core research.",
        },
      ],
      highlights: [
        "Fine-tuned LLMs for domain-specific healthcare recommendations",
        "Preprocessed and evaluated the Practo dataset end to end",
        "Coordinated and mentored a 10-15 person research intern team",
        "Contributed to a DRDO project proposal",
      ],
      stack: ["Python", "LLMs", "NLP", "Fine-tuning", "Pandas", "Overleaf"],
    },
  },
  {
    slug: "erp-crm-solutions",
    index: "02",
    fileTag: "ERPNEXT_BUILD.py",
    title: "ERP & CRM Solutions",
    modalTitle: "Software, Web & ERP Solutions",
    summary:
      "ERPNext customization, business workflow automation, CRM implementation and report & dashboard development on the Frappe Framework.",
    tags: ["ERPNext", "Frappe"],
    badge: "End-to-end delivery",
    image: "/images/projects/erp.png",
    modal: {
      category: "Enterprise Software — Profezzo",
      meta: [
        { label: "Context", value: "Client delivery at Profezzo" },
        { label: "Framework", value: "Frappe / ERPNext" },
        { label: "Type", value: "End-to-end enterprise software" },
        { label: "Stack", value: "ERPNext · Flutter · Python" },
      ],
      overview:
        "End-to-end delivery of ERPNext customization, CRM implementation and business workflow automation for clients — from requirement gathering to deployment.",
      sections: [
        {
          heading: "The challenge",
          body: "Clients need ERP and CRM systems that match their specific workflows, not generic out-of-the-box processes, while staying maintainable long-term.",
        },
        {
          heading: "My approach",
          body: "Gathered requirements, designed ERP & CRM workflows, developed custom ERPNext modules, and customised forms, reports and print formats — plus custom software, websites and Flutter apps end to end.",
        },
        {
          heading: "Outcome",
          body: "Delivered enterprise software and dashboards that automate previously manual business processes for clients across multiple engagements.",
        },
      ],
      highlights: [
        "Custom ERPNext modules and workflow automation",
        "CRM implementation aligned to client sales processes",
        "Report and print format customization",
        "Full-stack delivery including Flutter mobile apps",
      ],
      stack: ["ERPNext", "Frappe", "Flutter", "Python", "JavaScript", "MariaDB", "SQL"],
    },
  },
  {
    slug: "ai-chatbot-assistant",
    index: "03",
    fileTag: "AI_CHATBOT.py",
    title: "AI Chatbot Assistant",
    summary:
      "A conversational assistant built on LLMs and NLP — context-aware responses, intent handling and task automation through natural language.",
    tags: ["LLM", "NLP"],
    badge: "Conversational AI",
    image: "/images/projects/chatbot.png",
    modal: {
      category: "Conversational AI — Personal Project",
      meta: [
        { label: "Context", value: "Personal project" },
        { label: "Type", value: "Conversational AI assistant" },
        { label: "Stack", value: "LLMs · NLP · Python" },
      ],
      overview:
        "A conversational assistant built on LLMs and NLP that handles context-aware responses, intent recognition and task automation through natural language.",
      sections: [
        {
          heading: "The challenge",
          body: "Generic chat interfaces fail to hold context across a conversation or reliably map user intent to actions.",
        },
        {
          heading: "My approach",
          body: "Designed prompt strategies and conversation flows for intent handling, using LLMs to keep responses context-aware across multi-turn conversations.",
        },
        {
          heading: "Outcome",
          body: "A reusable conversational AI pattern later applied to the resume chatbot embedded on this portfolio.",
        },
      ],
      highlights: [
        "Context-aware, multi-turn conversation handling",
        "Intent recognition mapped to concrete actions",
        "Prompt engineering for reliable, on-topic responses",
      ],
      stack: ["LLMs", "NLP", "Python", "Prompt Engineering"],
    },
  },
  {
    slug: "ai-reading-assistant",
    index: "04",
    fileTag: "READING_ASSISTANT.ai",
    title: "AI Reading Assistant",
    summary:
      "An NLP tool that summarises, explains and answers questions over documents to speed up reading and comprehension.",
    tags: ["LLM", "Python"],
    badge: "NLP application",
    image: "/images/projects/reading.png",
    modal: {
      category: "NLP Application — Personal Project",
      meta: [
        { label: "Context", value: "Personal project" },
        { label: "Type", value: "NLP reading tool" },
        { label: "Stack", value: "LLMs · Python · NLP" },
      ],
      overview:
        "An NLP-powered reading assistant that summarises documents, explains complex passages and answers direct questions over the source text.",
      sections: [
        {
          heading: "The challenge",
          body: "Dense documents take time to read and re-read for comprehension, especially technical or research material.",
        },
        {
          heading: "My approach",
          body: "Built an LLM-backed pipeline that summarises and explains document content on demand and answers follow-up questions grounded in the source text.",
        },
        {
          heading: "Outcome",
          body: "A tool that meaningfully speeds up reading and comprehension of long-form documents.",
        },
      ],
      highlights: [
        "Automatic summarisation of long documents",
        "Plain-language explanations of complex passages",
        "Question answering grounded in source text",
      ],
      stack: ["LLMs", "Python", "NLP"],
    },
  },
  {
    slug: "metro-crowd-indicator",
    index: "05",
    fileTag: "METRO_CROWD.ml",
    title: "Metro Crowd Indicator",
    summary:
      "A predictive model that estimates metro crowd density so commuters can plan less-crowded, better-timed journeys.",
    tags: ["Machine Learning", "Python"],
    badge: "Predictive analytics",
    image: "/images/projects/metro.png",
    modal: {
      category: "Predictive Analytics — Personal Project",
      meta: [
        { label: "Context", value: "Personal project" },
        { label: "Type", value: "Predictive model" },
        { label: "Stack", value: "Machine Learning · Python" },
      ],
      overview:
        "A predictive model estimating metro crowd density to help commuters plan less-crowded, better-timed journeys.",
      sections: [
        {
          heading: "The challenge",
          body: "Commuters have no reliable way to anticipate how crowded a metro service will be before they travel.",
        },
        {
          heading: "My approach",
          body: "Built a predictive model over historical ridership patterns using Python and pandas to estimate crowd density by time and route.",
        },
        {
          heading: "Outcome",
          body: "A working predictive indicator that supports better-timed, less-crowded journey planning.",
        },
      ],
      highlights: [
        "Predictive modelling over historical ridership data",
        "Time- and route-based crowd density estimation",
      ],
      stack: ["Machine Learning", "Python", "Pandas"],
    },
  },
  {
    slug: "attendance-management-system",
    index: "06",
    fileTag: "ATTENDANCE_SYS.app",
    title: "Attendance Management System",
    summary:
      "A full application to record, track and report attendance — with role-based access, search and automated summaries.",
    tags: ["Python", "SQL"],
    badge: "Full-stack build",
    image: "/images/projects/attendance.png",
    modal: {
      category: "Full-Stack Application — Personal Project",
      meta: [
        { label: "Context", value: "Personal project" },
        { label: "Type", value: "Full-stack application" },
        { label: "Stack", value: "Python · SQL" },
      ],
      overview:
        "A full application to record, track and report attendance, with role-based access, search and automated summary reporting.",
      sections: [
        {
          heading: "The challenge",
          body: "Manual attendance tracking is error-prone and produces no easy way to search history or generate summaries.",
        },
        {
          heading: "My approach",
          body: "Built a full application with role-based access control, search and automated summary reports on top of a SQL-backed data model.",
        },
        {
          heading: "Outcome",
          body: "A reliable, searchable attendance system with automated reporting in place of manual tracking.",
        },
      ],
      highlights: [
        "Role-based access control",
        "Searchable attendance history",
        "Automated summary reports",
      ],
      stack: ["Python", "SQL", "OOP"],
    },
  },
  {
    slug: "business-analytics-dashboard",
    index: "07",
    fileTag: "ANALYTICS_DASH.pbix",
    title: "Business Analytics Dashboard",
    summary:
      "KPI dashboards, sales and customer analytics, and operational reporting that supports day-to-day business decisions.",
    tags: ["Power BI", "SQL"],
    badge: "Customer & sales insights",
    image: "/images/projects/analytics.png",
    modal: {
      category: "Business Intelligence — Amrevx Pvt. Ltd.",
      meta: [
        { label: "Context", value: "Data Analyst role at Amrevx" },
        { label: "Type", value: "KPI dashboards & reporting" },
        { label: "Stack", value: "Power BI · SQL · Excel" },
      ],
      overview:
        "KPI dashboards, sales and customer analytics, and operational reporting built to support day-to-day business decisions.",
      sections: [
        {
          heading: "The challenge",
          body: "Leadership needed a consistent, up-to-date view of sales, customer and operational data instead of scattered spreadsheets.",
        },
        {
          heading: "My approach",
          body: "Built Power BI dashboards backed by SQL queries, tracked KPIs and coordinated with the CEO and team leader on visualization and reporting needs.",
        },
        {
          heading: "Outcome",
          body: "Centralised, actionable dashboards that improved visibility into sales and customer performance.",
        },
      ],
      highlights: [
        "KPI dashboards in Power BI",
        "Customer and sales data analysis",
        "Operational reporting for day-to-day decisions",
      ],
      stack: ["Power BI", "SQL", "Excel", "Google Sheets"],
    },
  },
  {
    slug: "drdo-research-proposal",
    index: "08",
    fileTag: "DRDO_PROPOSAL.tex",
    title: "DRDO Research Proposal",
    summary:
      "Supported a DRDO project proposal at IIT (BHU) — project estimation, technical documentation and presentation development.",
    tags: ["Proposal", "Overleaf"],
    badge: "IIT (BHU) · DRDO",
    image: "/images/projects/drdo.png",
    modal: {
      category: "Research Proposal — IIT (BHU)",
      meta: [
        { label: "Context", value: "Research Internship" },
        { label: "Organisation", value: "IIT (BHU) Varanasi" },
        { label: "Type", value: "Proposal support" },
      ],
      overview:
        "Supported a DRDO project proposal at IIT (BHU) — covering project estimation, technical documentation and presentation development alongside the faculty supervisor.",
      sections: [
        {
          heading: "The challenge",
          body: "Research proposals for defence-scale projects require rigorous estimation and technical documentation that clearly communicates scope and feasibility.",
        },
        {
          heading: "My approach",
          body: "Worked with the professor on project estimation, prepared technical documentation and diagrams via Overleaf and Draw.io, and supported presentation development.",
        },
        {
          heading: "Outcome",
          body: "A well-documented proposal contribution supporting the wider DRDO project submission.",
        },
      ],
      highlights: [
        "Project estimation support",
        "Technical documentation in Overleaf",
        "Diagrams and flowcharts via Draw.io",
      ],
      stack: ["Overleaf", "Draw.io", "Documentation"],
    },
  },
  {
    slug: "library-management-system",
    index: "09",
    fileTag: "LIBRARY_MGMT.py",
    title: "Library Management System",
    summary:
      "A complete library management solution on the Frappe Framework — automated workflows, role-based access and a member self-service portal.",
    tags: ["Frappe", "Python"],
    badge: "Full-stack ERP build",
    image: "/images/projects/library.png",
    modal: {
      category: "Enterprise Software — Personal Project",
      meta: [
        { label: "Context", value: "Personal project" },
        { label: "Framework", value: "Frappe" },
        { label: "Type", value: "Full-stack ERP application" },
        { label: "Stack", value: "Python · Frappe · MariaDB" },
      ],
      overview:
        "A complete library management solution built on the Frappe Framework, combining business automation, role-based workflows and a member self-service portal to simplify day-to-day library operations.",
      sections: [
        {
          heading: "The challenge",
          body: "Library operations involve a lot of repetitive manual work — tracking issues and returns, calculating overdue fines, managing reservation queues and membership renewals — that doesn't scale well without automation.",
        },
        {
          heading: "My approach",
          body: "I designed custom DocTypes and workflows on the Frappe Framework covering the full book lifecycle, built a member-facing self-service portal, and added scheduled background jobs for fine calculation, email notifications and membership expiry.",
        },
        {
          heading: "Outcome",
          body: "A working ERP-style system with real-time dashboards, custom reports and role-based access control, that I'm continuing to extend with new features.",
        },
      ],
      highlights: [
        "Automated overdue fine calculation via scheduled jobs",
        "Member-facing self-service portal",
        "Scheduled email notifications and membership expiry handling",
        "Real-time dashboards and custom SQL reports",
        "Role-based access control across staff and members",
        "Reservation queue management",
      ],
      stack: ["Python", "Frappe Framework", "MariaDB", "JavaScript", "Jinja2", "SQL Reports"],
    },
  },
];
