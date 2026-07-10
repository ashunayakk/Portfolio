import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  message: z.string().trim().min(10, "Message is too short").max(4000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
