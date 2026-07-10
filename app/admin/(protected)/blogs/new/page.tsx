import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "@/lib/actions/posts";
import styles from "../../admin-page.module.css";

export default function NewPostPage() {
  return (
    <div>
      <h1 className={styles.heading}>New post</h1>
      <PostForm action={createPost} submitLabel="Create post" />
    </div>
  );
}
