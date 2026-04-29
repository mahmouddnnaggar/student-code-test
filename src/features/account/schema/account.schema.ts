import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter"),
  rePassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
});

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;