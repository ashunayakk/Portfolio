"use client";

import { Navbar } from "@/components/layout/Navbar";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: 200, paddingBottom: 160, textAlign: "center" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          Error
        </p>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "16px 0" }}>Something went wrong.</h1>
        <p style={{ marginBottom: 24 }}>An unexpected error occurred while loading this page.</p>
        <button type="button" className="btn btn-primary" onClick={() => reset()}>
          Try again
        </button>
      </main>
    </>
  );
}
