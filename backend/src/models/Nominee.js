import mongoose from "mongoose";

const nomineeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        relationship: {
            type: String,
            enum: [
                "Father",
                "Mother",
                "Brother",
                "Sister",
                "Spouse",
                "Son",
                "Daughter",
                "Friend",
                "Other",
            ],
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        dateOfBirth: {
            type: Date,
        },

        address: {
            type: String,
            trim: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Nominee = mongoose.model(
    "Nominee",
    nomineeSchema
);

nomineeSchema.index(
    { userId: 1, email: 1 },
    { unique: true }
);

nomineeSchema.index(
    { userId: 1, phone: 1 },
    { unique: true }
);

export default Nominee;