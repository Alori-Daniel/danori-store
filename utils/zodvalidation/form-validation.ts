import { z } from "zod";

export const emailValidationSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export const addressValidationSchema = z.object({
  region: z.string().trim().min(1, "Region is required"),
  title: z.string().trim().min(1, "Title is required"),
  address: z.string().trim().min(1, "Address is required"),
  state: z.string().trim().min(1, "State is required"),
  city: z.string().trim().min(1, "City is required"),
  phone: z.string().trim().min(7, "Phone is required"),
});
