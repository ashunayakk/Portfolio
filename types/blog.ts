export type PostSource = "mdx" | "db";

export interface PostFrontmatter {
  title: string;
  description: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
}

export interface UnifiedPost {
  source: PostSource;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  content: string;
  readingTime: number;
  wordCount: number;
  viewCount: number;
}

export interface Heading {
  depth: number;
  text: string;
  slug: string;
}
