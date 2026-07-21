import { z } from "zod";

export const createDeathVerificationSchema = z.object({
    body: z.object({
        token: z
            .string()
            .trim()
            .min(1, "Verification token is required."),

        certificateNumber: z
            .string()
            .trim()
            .min(1, "Certificate number is required.")
            .max(100, "Certificate number is too long.")
            .regex(
                /^[A-Za-z0-9-]+$/,
                "Invalid certificate number."
            ),
    }),
});

export const approveRequestSchema = z.object({
    body: z.object({
        adminRemarks: z
            .string()
            .trim()
            .max(500, "Remarks cannot exceed 500 characters.")
            .optional(),
    }),
});

export const rejectRequestSchema = z.object({
    body: z.object({
        adminRemarks: z
            .string()
            .trim()
            .min(
                10,
                "Remarks must be at least 10 characters."
            )
            .max(
                500,
                "Remarks cannot exceed 500 characters."
            ),
    }),
});