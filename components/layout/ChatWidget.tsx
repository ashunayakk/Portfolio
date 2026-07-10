"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/utils";
import styles from "./ChatWidget.module.css";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING = "Hi! Ask me anything about Ashutosh's experience, skills, or projects.";
const MAX_LENGTH = 1000;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleOpen = () => {
    setOpen((v) => !v);
    if (!greeted) {
      setMessages([{ role: "assistant", content: GREETING }]);
      setGreeted(true);
    }
  };

  const submit = async () => {
    const trimmed = input.trim();
    if (!trimmed || pending) return;
    setError(null);
    const history = messages.slice(-16);
    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setPending(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.launcher}
        aria-label="Open AI chat assistant"
        aria-expanded={open}
        onClick={handleOpen}
      >
        💬
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-label="AI chat assistant">
          <div className={styles.header}>Ask about Ashutosh</div>
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={cx(styles.bubble, m.role === "user" ? styles.user : styles.bot)}>
                {m.content}
              </div>
            ))}
            {pending && <div className={cx(styles.bubble, styles.bot, styles.pending)}>Thinking...</div>}
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <form
            ref={formRef}
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <textarea
              className={styles.textarea}
              value={input}
              maxLength={MAX_LENGTH}
              placeholder="Ask a question..."
              aria-label="Ask a question about Ashutosh"
              rows={1}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className={styles.send} disabled={pending || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
