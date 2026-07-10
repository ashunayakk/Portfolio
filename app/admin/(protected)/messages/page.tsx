import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { cx } from "@/lib/utils";
import { toggleMessageRead, deleteMessage } from "@/lib/actions/messages";
import styles from "./messages.module.css";

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className={styles.heading}>Messages</h1>

      {messages.length === 0 ? (
        <div className={styles.empty}>No messages yet.</div>
      ) : (
        <div className={styles.list}>
          {messages.map((m) => (
            <div key={m.id} className={cx(styles.card, !m.read && styles.unread)}>
              <div className={styles.topRow}>
                <div>
                  <span className={styles.name}>{m.name}</span> · <span className={styles.email}>{m.email}</span>
                </div>
                <span className={styles.date}>{formatDate(m.createdAt)}</span>
              </div>
              <p className={styles.message}>{m.message}</p>
              <div className={styles.actions}>
                <form action={toggleMessageRead.bind(null, m.id, !m.read)}>
                  <button type="submit" className={styles.actionBtn}>
                    Mark as {m.read ? "unread" : "read"}
                  </button>
                </form>
                <form action={deleteMessage.bind(null, m.id)}>
                  <button type="submit" className={styles.actionBtn}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
