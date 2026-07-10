import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ashutosh Nayak — AI & ML Engineer",
    short_name: "Ashutosh Nayak",
    description:
      "AI & ML Engineer, Business Analyst and Frappe Developer building intelligent enterprise solutions across AI, ERP and data analytics.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f5",
    theme_color: "#2f6bed",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
