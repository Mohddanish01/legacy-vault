import bcrypt from "bcrypt";

import * as sessionRepository from "../repositories/session.repository.js";

export const createSession = async ({
    userId,
    tokenId,
    refreshToken,
    userAgent,
    ipAddress,
}) => {

    const hashedRefreshToken =
    await bcrypt.hash(refreshToken, 12);

    const expiresAt = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
    );

    return await sessionRepository.createSession({
        userId,
        tokenId,
        refreshToken: hashedRefreshToken,
        userAgent,
        ipAddress,
        expiresAt,
    });
};