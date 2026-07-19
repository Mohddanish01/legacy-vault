import { z } from "zod";

const categories = [
    "Email",
    "Social Media",
    "Bank",
    "Crypto",
    "Investment",
    "Insurance",
    "Cloud",
    "Website",
    "Domain",
    "Document",
    "Other",
];

export const createVaultSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Title must be at least 2 characters.")
        .max(100, "Title cannot exceed 100 characters."),

    category: z.enum(categories),

    secret: z.object({
        username: z
            .string()
            .trim()
            .optional()
            .default(""),

        password: z
            .string()
            .trim()
            .optional()
            .default(""),

        notes: z
            .string()
            .trim()
            .optional()
            .default(""),

        recoveryCodes: z
            .array(
                z.string().trim()
            )
            .optional()
            .default([]),
    })

});

export const updateVaultSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Title must be at least 2 characters.")
        .max(100, "Title cannot exceed 100 characters.")
        .optional(),

    category: z
        .enum(categories)
        .optional(),

    secret: z.object({
        username: z
            .string()
            .trim()
            .optional(),

        password: z
            .string()
            .trim()
            .optional(),

        notes: z
            .string()
            .trim()
            .optional(),

        recoveryCodes: z
            .array(
                z.string().trim()
            )
            .optional(),
    }).optional(),

    isArchived: z
        .boolean()
        .optional(),
});

