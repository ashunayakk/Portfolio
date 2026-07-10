import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: 200, paddingBottom: 160, textAlign: "center" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          404
        </p>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "16px 0" }}>Page not found</h1>
        <p style={{ marginBottom: 24 }}>The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
        <Link href="/" className="btn btn-primary">
          ← Back home
        </Link>
      </main>
    </>
  );
}
