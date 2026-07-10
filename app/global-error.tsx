"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en" data-theme="azure">
      <body style={{ fontFamily: "sans-serif", background: "#faf9f5", color: "#0e1b2e" }}>
        <main style={{ padding: "160px 32px", textAlign: "center" }}>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Something went wrong.</h1>
          <p style={{ marginBottom: 24 }}>A critical error occurred. Please try reloading the page.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#2f6bed",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "12px 24px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
