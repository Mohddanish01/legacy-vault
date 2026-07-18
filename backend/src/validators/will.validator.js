import { z } from "zod";

const assetSchema = z.object({
    assetName: z
        .string()
        .trim()
        .min(2, "Asset name must be at least 2 characters")
        .max(100, "Asset name cannot exceed 100 characters"),

    category: z.enum([
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
    ]),

    description: z
        .string()
        .trim()
        .max(500)
        .optional(),

    instruction: z
        .string()
        .trim()
        .min(5, "Instruction is required")
        .max(1000),

    nomineeId: z.string().trim(),

    priority: z
        .number()
        .int()
        .min(1)
        .max(5)
        .optional(),
});

export const createWillSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2)
        .max(100),

    description: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    finalMessage: z
        .string()
        .trim()
        .max(3000)
        .optional(),

    assets: z
        .array(assetSchema)
        .min(1, "At least one asset is required"),
});

export const updateWillSchema =
    createWillSchema.partial();