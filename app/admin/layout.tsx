import type { Metadata } from "next";
import { SessionProvider } from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div data-theme="azure" style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
        {children}
      </div>
    </SessionProvider>
  );
}
