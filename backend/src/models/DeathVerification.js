import mongoose from "mongoose";

import { VERIFICATION_STATUS } from "../constants/deathVerification.js";

const deathVerificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        nomineeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nominee",
            required: true,
        },

        attempt: {
            type: Number,
            required: true,
            default: 1,
        },

        certificateNumber: {
            type: String,
            required: true,
            trim: true,
        },

        certificateFileName: {
            type: String,
            required: true,
            trim: true,
        },

        certificateFilePath: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: Object.values(VERIFICATION_STATUS),
            default: VERIFICATION_STATUS.PENDING,
        },

        adminRemarks: {
            type: String,
            trim: true,
            default: "",
        },

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        verifiedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

deathVerificationSchema.index({
    userId: 1,
});
deathVerificationSchema.index({
    nomineeId: 1,
});
deathVerificationSchema.index({
    status: 1,
});

export default mongoose.model(
    "DeathVerification",
    deathVerificationSchema
);