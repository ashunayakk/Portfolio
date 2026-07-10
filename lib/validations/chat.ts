import { z } from "zod";

export const MAX_MESSAGE_LENGTH = 1000;
export const MAX_HISTORY_TURNS = 8;

const historyEntrySchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(MAX_MESSAGE_LENGTH),
});

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
  history: z.array(historyEntrySchema).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
