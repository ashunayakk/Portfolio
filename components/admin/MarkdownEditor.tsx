"use client";

import { useEffect, useRef, useState } from "react";
import { readingTime, wordCount } from "@/lib/blog/reading-time";
import { cx } from "@/lib/utils";
import proseStyles from "@/components/blog/prose.module.css";
import styles from "./MarkdownEditor.module.css";

type ViewMode = "edit" | "split" | "preview";

interface ToolbarAction {
  label: string;
  icon: string;
  apply: (value: string, start: number, end: number) => { text: string; cursorStart: number; cursorEnd: number };
}

function wrapSelection(prefix: string, suffix: string) {
  return (value: string, start: number, end: number) => {
    const selected = value.slice(start, end) || "text";
    const text = value.slice(0, start) + prefix + selected + suffix + value.slice(end);
    return { text, cursorStart: start + prefix.length, cursorEnd: start + prefix.length + selected.length };
  };
}

function insertLinePrefix(prefix: string) {
  return (value: string, start: number, end: number) => {
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const text = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    return { text, cursorStart: start + prefix.length, cursorEnd: end + prefix.length };
  };
}

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { label: "Bold", icon: "B", apply: wrapSelection("**", "**") },
  { label: "Italic", icon: "I", apply: wrapSelection("_", "_") },
  { label: "Code", icon: "</>", apply: wrapSelection("`", "`") },
  { label: "Link", icon: "🔗", apply: wrapSelection("[", "](https://)") },
  { label: "Quote", icon: "❝", apply: insertLinePrefix("> ") },
  { label: "List", icon: "•", apply: insertLinePrefix("- ") },
  {
    label: "Table",
    icon: "▦",
    apply: (value, start, end) => {
      const table = "\n| Column 1 | Column 2 |\n| --- | --- |\n| value | value |\n";
      const text = value.slice(0, start) + table + value.slice(end);
      return { text, cursorStart: start + table.length, cursorEnd: start + table.length };
    },
  },
  {
    label: "Code block",
    icon: "{ }",
    apply: (value, start, end) => {
      const block = "\n```bash\n" + (value.slice(start, end) || "command") + "\n```\n";
      const text = value.slice(0, start) + block + value.slice(end);
      return { text, cursorStart: start + 9, cursorEnd: start + block.length - 5 };
    },
  },
];

export function MarkdownEditor({ name, initialValue = "" }: { name: string; initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  const [previewHtml, setPreviewHtml] = useState("");
  const [mode, setMode] = useState<ViewMode>("split");
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setTimeout(async () => {
      try {
        const res = await fetch("/api/admin/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ markdown: value }),
        });
        const data = await res.json();
        if (res.ok) setPreviewHtml(data.html);
      } catch {
        // preview is best-effort — ignore failures
      }
    }, 400);
    return () => clearTimeout(id);
  }, [value]);

  const applyAction = (action: ToolbarAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { text, cursorStart, cursorEnd } = action.apply(value, textarea.selectionStart, textarea.selectionEnd);
    setValue(text);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        const textarea = textareaRef.current;
        const pos = textarea?.selectionStart ?? value.length;
        const insertion = `![${file.name}](${data.url})`;
        setValue(value.slice(0, pos) + insertion + value.slice(pos));
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        {TOOLBAR_ACTIONS.map((action) => (
          <button
            key={action.label}
            type="button"
            className={styles.toolBtn}
            title={action.label}
            aria-label={action.label}
            onClick={() => applyAction(action)}
          >
            {action.icon}
          </button>
        ))}
        <button
          type="button"
          className={styles.toolBtn}
          title="Upload image"
          aria-label="Upload image"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "…" : "🖼"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          aria-label="Upload image file"
          className={styles.uploadInput}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
        />

        <div className={styles.spacer} />

        <div className={styles.viewToggle}>
          {(["edit", "split", "preview"] as const).map((m) => (
            <button
              key={m}
              type="button"
              className={cx(styles.viewBtn, mode === m && styles.active)}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cx(
          styles.panes,
          mode === "edit" && styles.editOnly,
          mode === "preview" && styles.previewOnly
        )}
      >
        <div className={styles.editorPane}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            placeholder="Write in Markdown..."
          />
        </div>
        <div className={styles.previewPane}>
          <div className={proseStyles.prose} dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </div>
      </div>

      <div className={styles.footer}>
        <span>{wordCount(value)} words</span>
        <span>{readingTime(value)} min read</span>
      </div>

      <textarea name={name} value={value} readOnly hidden aria-hidden />
    </div>
  );
}
