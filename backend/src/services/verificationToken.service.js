import crypto from "crypto";

import {
    createToken,
    getTokenByHash,
    markTokenAsUsed,
    deleteTokensByUserAndPurpose,
} from "../repositories/verificationToken.repository.js";

import {
    VERIFICATION_TOKEN_PURPOSE,
} from "../constants/verificationToken.js";

import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const hashVerificationToken = (token) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};

export const createVerificationToken = async ({
    userId,
    nomineeId,
    email,
    purpose,
    expiresAt,
}) => {

    await deleteTokensByUserAndPurpose(
        userId,
        nomineeId,
        purpose
    );

    const plainToken = crypto
        .randomBytes(32)
        .toString("hex");

    const hashedToken =
        hashVerificationToken(plainToken);

    await createToken({
        userId,
        nomineeId,
        email,
        purpose,
        hashedToken,
        expiresAt,
    });

    return plainToken;
};

export const verifyVerificationToken = async (
    plainToken,
    purpose
) => {

    const hashedToken =
        hashVerificationToken(plainToken);

    const token =
        await getTokenByHash(hashedToken);

    if (!token) {
        throw new AppError(
            "Invalid verification link.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    if (token.purpose !== purpose) {
        throw new AppError(
            "Invalid verification link.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    if (token.usedAt) {
        throw new AppError(
            "Verification link has already been used.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    if (token.expiresAt < new Date()) {
        throw new AppError(
            "Verification link has expired.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    return token;
};

export const markVerificationTokenAsUsed = async (
    tokenId
) => {

    return markTokenAsUsed(tokenId);

};