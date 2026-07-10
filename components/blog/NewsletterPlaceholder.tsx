"use client";

import { useState } from "react";
import styles from "./NewsletterPlaceholder.module.css";

export function NewsletterPlaceholder() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>Get new articles in your inbox</h3>
      <p className={styles.desc}>
        Occasional writing on AI, ERP and data analytics — no spam, unsubscribe any time.
      </p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <input type="email" required placeholder="you@example.com" className={styles.input} aria-label="Email address" />
        <button type="submit" className="btn btn-primary">
          {submitted ? "Coming soon" : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
