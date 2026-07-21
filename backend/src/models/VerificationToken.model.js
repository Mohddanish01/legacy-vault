import mongoose from "mongoose";

import {
    VERIFICATION_TOKEN_PURPOSE,
} from "../constants/verificationToken.js";

const verificationTokenSchema =
    new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
                index: true,
            },

            nomineeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Nominee",
                required: true,
                index: true,
            },

            email: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },

            purpose: {
                type: String,
                enum: Object.values(
                    VERIFICATION_TOKEN_PURPOSE
                ),
                required: true,
            },

            token: {
                type: String,
                required: true,
                unique: true,
            },

            expiresAt: {
                type: Date,
                required: true,
                index: true,
            },

            usedAt: {
                type: Date,
                default: null,
            },
        },
        {
            timestamps: true,
        }
    );

    verificationTokenSchema.index(
        {
            expiresAt: 1,
        },
        {
            expireAfterSeconds: 0,
        }
    );

export default mongoose.model(
    "VerificationToken",
    verificationTokenSchema
);