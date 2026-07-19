import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema(
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
        },

        // username: {
        //     type: String,
        //     default: "",
        // },

        encryptedData: {
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

const Vault = mongoose.model("Vault", vaultSchema);

export default Vault;