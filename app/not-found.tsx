import type { Metadata } from "next";
import Link from "next/link";
import { FileX } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Reveal } from "@/components/effects/Reveal";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={`container ${styles.main}`}>
        <Reveal>
          <div className={styles.iconRing} aria-hidden>
            <FileX size={36} strokeWidth={1.5} />
          </div>

          <p className={styles.digits}>404</p>
          <h1 className={styles.heading}>Oops! Looks like you&apos;ve discovered an unimplemented route.</h1>
          <p className={styles.sub}>
            The page you&apos;re looking for doesn&apos;t exist, has been moved, or the URL is incorrect.
          </p>

          <div className={styles.actions}>
            <Link href="/" className="btn btn-primary">
              ← Back to Portfolio
            </Link>
            <Link href="/work" className="btn btn-outline">
              View Projects
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact Me
            </Link>
          </div>

          <blockquote className={styles.quote}>
            &ldquo;Every great product starts with fixing broken paths.&rdquo;
            <cite className={styles.quoteAttribution}>— Ashutosh Nayak</cite>
          </blockquote>
        </Reveal>
      </main>
    </>
  );
}
