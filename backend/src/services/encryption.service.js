import crypto from "crypto";
import {
    ENCRYPTION_ALGORITHM,
    IV_LENGTH,
    KEY_LENGTH,
} from "../constants/encryption.js";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
    throw new Error(
        "ENCRYPTION_KEY is missing in environment variables."
    );
}

const encryptionKeyBuffer = Buffer.from( ENCRYPTION_KEY, "hex" );

if (
    encryptionKeyBuffer.length !==
    KEY_LENGTH
) {
    throw new Error(
        `ENCRYPTION_KEY must decode to exactly ${KEY_LENGTH} bytes.`
    );
} 

export const encrypt = (text) => {
    const iv = crypto.randomBytes( IV_LENGTH );

    const cipher =
        crypto.createCipheriv(
            ENCRYPTION_ALGORITHM,
            encryptionKeyBuffer,
            iv
        );

    let encrypted =
        cipher.update(
            text,
            "utf8",
            "hex"
        );

    encrypted += cipher.final("hex");

    const authTag =
        cipher.getAuthTag();

    return {
        iv: iv.toString("hex"),
        encryptedData: encrypted,
        authTag:
            authTag.toString("hex"),
    };
};

export const decrypt = (
    encryptedData,
    iv,
    authTag
) => {
    const decipher =
        crypto.createDecipheriv(
            ENCRYPTION_ALGORITHM,
            encryptionKeyBuffer,
            Buffer.from(iv, "hex")
        );

    decipher.setAuthTag(
        Buffer.from(authTag, "hex")
    );

    let decrypted =
        decipher.update(
            encryptedData,
            "hex",
            "utf8"
        );

    decrypted += decipher.final(
        "utf8"
    );

    return decrypted;
};