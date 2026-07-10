"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { trackEvent } from "@/lib/analytics";
import { cx } from "@/lib/utils";
import styles from "./ContactForm.module.css";

const initialState: ContactFormState = { status: "idle" };

async function action(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const result = await submitContactForm(prevState, formData);
  if (result.status === "success") {
    trackEvent("contact_form_submit", { status: "success" });
  }
  return result;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="contact-name">
          Name
        </label>
        <input id="contact-name" name="name" type="text" className={styles.input} required maxLength={120} />
        {state.fieldErrors?.name && <span className={styles.fieldError}>{state.fieldErrors.name}</span>}
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor="contact-email">
          Email
        </label>
        <input id="contact-email" name="email" type="email" className={styles.input} required maxLength={200} />
        {state.fieldErrors?.email && <span className={styles.fieldError}>{state.fieldErrors.email}</span>}
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor="contact-message">
          Message
        </label>
        <textarea id="contact-message" name="message" className={styles.textarea} required maxLength={4000} />
        {state.fieldErrors?.message && <span className={styles.fieldError}>{state.fieldErrors.message}</span>}
      </div>

      {state.status !== "idle" && state.message && (
        <p className={cx(styles.statusMessage, state.status === "success" ? styles.success : styles.error)} role="status">
          {state.message}
        </p>
      )}

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
