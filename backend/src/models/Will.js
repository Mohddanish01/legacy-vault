import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
    {
        assetName: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: [
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
            ],
            required: true,
        },

        description: {
            type: String,
            trim: true,
        },

        instruction: {
            type: String,
            required: true,
            trim: true,
        },

        nomineeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nominee",
            required: true,
        },

        priority: {
            type: Number,
            default: 1,
        },

        // encryptedData: {
        //     type: String,
        // },

        // files: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "File",
        //     },
        // ],

        vaultItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "VaultItem",
            default: null,
        },
    },
    {
        _id: true,
    }
);

const willSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Published",
                "Locked",
                "Executed",
            ],
            default: "Draft",
        },

        finalMessage: {
            type: String,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        assets: [assetSchema],
    },
    {
        timestamps: true,
    }
);

const Will = mongoose.model(
    "Will",
    willSchema
);

export default Will;