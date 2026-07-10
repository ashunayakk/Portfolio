"use server";

import { prisma } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations/contact";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "message") {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", fieldErrors, message: "Please check the form and try again." };
  }

  try {
    await prisma.message.create({ data: parsed.data });
    return { status: "success", message: "Thanks — I'll get back to you within 24 hours." };
  } catch (err) {
    console.error("contact form submission error:", err);
    return { status: "error", message: "Something went wrong. Please try again or email me directly." };
  }
}
