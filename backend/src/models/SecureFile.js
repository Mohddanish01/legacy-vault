import mongoose from "mongoose";

const secureFileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        originalFileName: {
            type: String,
            required: true,
        },

        storedFileName: {
            type: String,
            required: true,
        },

        mimeType: {
            type: String,
            required: true,
        },

        size: {
            type: Number,
            required: true,
        },

        filePath: {
            type: String,
            required: true,
        },

        iv: {
            type: String,
            required: true,
        },

        authTag: {
            type: String,
            required: true,
        },

        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const SecureFile = mongoose.model("SecureFile", secureFileSchema);

export default SecureFile;