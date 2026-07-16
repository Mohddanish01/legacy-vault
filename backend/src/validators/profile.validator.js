import { z } from "zod";

export const updateProfileSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number")
        .optional(),

    gender: z
        .enum([
            "Male",
            "Female",
            "Other",
        ])
        .optional(),

    dateOfBirth: z
        .string()
        .date()
        .optional(),

    bio: z
        .string()
        .max(300)
        .optional(),

});

export const changePasswordSchema = z.object({

    currentPassword: z
        .string()
        .min(8),

    newPassword: z
        .string()
        .min(8)
        .max(100),

});