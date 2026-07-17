import { z } from "zod";

export const createNomineeSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name cannot exceed 100 characters"),

    relationship: z.enum([
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Spouse",
        "Son",
        "Daughter",
        "Friend",
        "Other",
    ]),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    phone: z
        .string()
        .trim()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits"),

    dateOfBirth: z
        .string()
        .optional(),

    address: z
        .string()
        .trim()
        .max(300, "Address cannot exceed 300 characters")
        .optional(),
});

export const updateNomineeSchema =
    createNomineeSchema.partial();