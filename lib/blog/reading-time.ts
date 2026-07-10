const WORDS_PER_MINUTE = 200;

export function wordCount(content: string): number {
  const stripped = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_~-]/g, " ");
  const words = stripped.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

export function readingTime(content: string): number {
  return Math.max(1, Math.ceil(wordCount(content) / WORDS_PER_MINUTE));
}
