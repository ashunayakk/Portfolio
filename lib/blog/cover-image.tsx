import { ImageResponse } from "next/og";

/** Same line-icon shapes as components/sections/SkillIcon.tsx, duplicated
 * here because next/og's Satori renderer runs outside normal React and
 * can't share that client component — these are plain SVG primitives, not
 * component logic, so a second copy is simpler than trying to share one. */
function iconSvg(iconKey: string) {
  switch (iconKey) {
    case "share":
      return (
        <g>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="12" r="2.5" />
          <path d="M8.2 7.2 15.8 10.8M8.2 16.8 15.8 13.2" />
        </g>
      );
    case "message":
      return <path d="M4 5h16v10H9l-4 4v-4H4z" />;
    case "chart":
      return <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />;
    case "clipboard":
      return (
        <g>
          <rect x="6" y="4" width="12" height="17" rx="1.5" />
          <rect x="9" y="2.5" width="6" height="3" rx="1" />
          <path d="M9 10h6M9 14h6" />
        </g>
      );
    case "grid":
      return (
        <g>
          <rect x="4" y="4" width="7" height="7" rx="1" />
          <rect x="13" y="4" width="7" height="7" rx="1" />
          <rect x="4" y="13" width="7" height="7" rx="1" />
          <rect x="13" y="13" width="7" height="7" rx="1" />
        </g>
      );
    case "refresh":
      return <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 4v4h-4M6 20v-4h4" />;
    case "monitor":
      return (
        <g>
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M8 20h8M12 16v4" />
        </g>
      );
    case "users":
      return (
        <g>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M21 20c0-2.6-1.7-4.8-4-5.6" />
        </g>
      );
    default:
      return <circle cx="12" cy="12" r="6" />;
  }
}

const CATEGORY_ICON: Record<string, string> = {
  "artificial-intelligence": "share",
  "machine-learning": "refresh",
  "business-analysis": "clipboard",
  erpnext: "grid",
  "frappe-framework": "grid",
  python: "monitor",
  sql: "chart",
  "data-analytics": "chart",
  devops: "refresh",
  "cloud-computing": "monitor",
  career: "users",
  research: "clipboard",
  productivity: "refresh",
  tutorials: "monitor",
  "case-studies": "message",
};

export async function generateCoverImageBuffer(category: string): Promise<Buffer> {
  const iconKey = CATEGORY_ICON[category] ?? "share";

  const image = new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f6ecd9 0%, #e6dac6 55%, #d9c19d 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(189, 95, 56, 0.12)",
            border: "3px solid #bd5f38",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="#bd5f38" strokeWidth="1.2">
            {iconSvg(iconKey)}
          </svg>
        </div>
      </div>
    ),
    { width: 1200, height: 900 }
  );

  const arrayBuffer = await image.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
