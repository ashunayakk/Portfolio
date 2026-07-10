"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/content/contact";
import { waLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import styles from "./WhatsAppWidget.module.css";

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const link = waLink(CONTACT.whatsappNumber, CONTACT.whatsappMessage);

  return (
    <>
      <button
        type="button"
        className={styles.launcher}
        aria-label="Open WhatsApp chat"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.55 2 12.04 2zm0 18.2h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.83-3-.2-.31a8.2 8.2 0 0 1-1.26-4.4c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.81c0 4.53-3.7 8.22-8.24 8.22zm4.51-6.16c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.28.37-.42.12-.14.16-.25.24-.4.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14 0-.31-.02-.47-.02-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
        </svg>
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-label="WhatsApp chat">
          <div className={styles.header}>
            <div className={styles.avatar}>AN</div>
            <div>
              <div className={styles.name}>Ashutosh Nayak</div>
              <div className={styles.sub}>Typically replies within a day</div>
            </div>
          </div>
          <p className={styles.body}>
            Have a question about my work or an opportunity in mind? Send me a message on WhatsApp and I&apos;ll get
            back to you.
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.start}
            onClick={() => trackEvent("whatsapp_click", { source: "widget" })}
          >
            Start chat
          </a>
        </div>
      )}
    </>
  );
}
