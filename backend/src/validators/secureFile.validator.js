import { z } from "zod";
import { FILE_CATEGORIES } from "../constants/file.js";

export const createSecureFileSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(100, "Title cannot exceed 100 characters."),

    category: z.enum(
        Object.values(FILE_CATEGORIES),
        {
            error: "Invalid category.",
        }
    ),
});

export const updateSecureFileSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(100, "Title cannot exceed 100 characters."),

    category: z.enum(
        Object.values(FILE_CATEGORIES),
        {
            error: "Invalid category.",
        }
    ),
});