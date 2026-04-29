import { z } from "zod";

export const signupSchema = z.object({
  name: z.string()
  .nonempty("name is required")
    .min(3, "name must be at least 3 characters long")
    .max(25, "name must be at most 25 characters long"),
  email: z.string().nonempty("email is required").pipe(z.email("invalid email address")),
  password: z.string().nonempty("password is required")
    .min(8, "password must be at least 8 characters long")
    .regex(/[A-Z]/, "password must contain at least one uppercase letter")
    .regex(/[a-z]/, "password must contain at least one lowercase letter")
    .regex(/[0-9]/, "password must contain at least one number")
    .regex(/[!@#$%^&*?]/, "password must contain at least one special character"),
  rePassword: z.string().nonempty("confirm password is required"),
  mobile: z.string().nonempty("phone is required").regex(/^01[0125][0-9]{8}$/, "only Egyptian phone numbers are allowed"),
  dateOfBirth: z.string().optional(), 
  gender: z.enum(["male", "female"], "Please select your gender"),
  terms: z.boolean().refine((val) => val === true, {
    message: "you must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.rePassword, {
  message: "passwords do not match",
  path: ["rePassword"],
});

export type SignupForValuse = z.infer<typeof signupSchema>;
