import crypto from "crypto";
import fs from "fs/promises";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY is missing.");
}

const key = Buffer.from(ENCRYPTION_KEY, "hex");

if (key.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be 32 bytes.");
}

export const encryptFile = async (
    inputPath,
    outputPath
) => {

    const fileBuffer =
        await fs.readFile(inputPath);

    const iv =
        crypto.randomBytes(16);

    const cipher =
        crypto.createCipheriv(
            "aes-256-gcm",
            key,
            iv
        );

    const encryptedBuffer =
        Buffer.concat([
            cipher.update(fileBuffer),
            cipher.final(),
        ]);

    const authTag =
        cipher.getAuthTag();

    await fs.writeFile(
        outputPath,
        encryptedBuffer
    );

    return {
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex"),
    };
};

export const decryptFile = async (
    inputPath,
    ivHex,
    authTagHex
) => {

    const encryptedBuffer =
        await fs.readFile(inputPath);

    const decipher =
        crypto.createDecipheriv(
            "aes-256-gcm",
            key,
            Buffer.from(ivHex, "hex")
        );

    decipher.setAuthTag(
        Buffer.from(authTagHex, "hex")
    );

    const decryptedBuffer =
        Buffer.concat([
            decipher.update(encryptedBuffer),
            decipher.final(),
        ]);

    return decryptedBuffer;
};