import crypto from "crypto";

export const generateTokenId = () => {
    return crypto.randomUUID();
};