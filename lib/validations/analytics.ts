import { z } from "zod";

export const trackViewSchema = z.object({
  path: z.string().trim().min(1).max(500),
  referrer: z.string().trim().max(500).optional(),
});

export type TrackViewRequest = z.infer<typeof trackViewSchema>;
