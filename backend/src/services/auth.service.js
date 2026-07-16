import * as authRepository from "../repositories/auth.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import bcrypt from "bcrypt";
import * as otpService from "./otp.service.js";
import { OTP_PURPOSE } from "../constants/otpPurpose.js";
import * as emailService from "./email.service.js";
import * as tokenService from "./token.service.js";
import * as otpRepository from "../repositories/otp.repository.js";
import * as sessionService from "./session.service.js";
import { generateTokenId } from "../utils/tokenId.js";
import * as sessionRepository from "../repositories/session.repository.js";
import {UAParser} from "ua-parser-js";

export const register = async (userData) => {

    const existingUser = await authRepository.findUserByEmail(userData.email);

    if (existingUser) {
    throw new AppError("User already exists", HTTP_STATUS.CONFLICT);
    }


    // Hash Password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const user = await authRepository.createUser({
        ...userData,
        password: hashedPassword,
    });

   const { password, ...safeUser } = user.toObject();
   return safeUser;

};

export const login = async (userData) => {

    const user = await authRepository.findUserByEmail(userData.email);

    if (!user) {
        throw new AppError(
            "Invalid email or password",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    const isPasswordCorrect = await bcrypt.compare(
        userData.password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new AppError(
            "Invalid email or password",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    if (user.accountStatus !== "ACTIVE") {
        throw new AppError(
            "Your account has been blocked",
            HTTP_STATUS.FORBIDDEN
        );
    }

    const otp = await otpService.createOtp(
        user._id,
        OTP_PURPOSE.LOGIN
    );

    await emailService.sendOtpEmail(
        user.email,
        otp
    );

    return {
        message:"OTP sent successfully",
    };

}

export const verifyOtp = async (userData) => {
    
    const user = await authRepository.findUserByEmail(userData.email);

    if (!user) {
        throw new AppError(
            "Invalid email or OTP",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    const otpRecord = await otpRepository.findOtpByUserAndPurpose(
        user._id,
        OTP_PURPOSE.LOGIN
    );

    if (!otpRecord) {
        throw new AppError(
            "Invalid or expired OTP",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    if (otpRecord.expiresAt < new Date()) {
    throw new AppError(
            "OTP has expired",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    const isOtpCorrect = await bcrypt.compare(
        userData.otp,
        otpRecord.otp
    );

    if (!isOtpCorrect) {
    throw new AppError(
            "Invalid OTP",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    await otpRepository.deleteOtpByUserAndPurpose(
        user._id,
        OTP_PURPOSE.LOGIN
    );

    const tokenId = generateTokenId();

    const accessToken = tokenService.generateAccessToken(
        user._id,
        tokenId
    );

    const refreshToken = tokenService.generateRefreshToken(
        user._id,
        tokenId
    );

    await sessionService.createSession({
        userId: user._id,
        tokenId,
        refreshToken,
        userAgent: userData.userAgent,
        ipAddress: userData.ipAddress,
    });

    return {
        message: "Login successful",
        accessToken,
        refreshToken,
    };
}

export const getCurrentUser = async (user) => {

    const { password, ...safeUser } = user.toObject();

    return safeUser;

};

export const refreshToken = async (userData) => {

    const decoded = tokenService.verifyRefreshToken(
        userData.refreshToken
    );

    const session = await sessionRepository.findSessionByTokenId(
        decoded.tokenId
    );

    if (!session) {
    throw new AppError(
            "Session not found",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    const isTokenValid = await bcrypt.compare(
        userData.refreshToken,
        session.refreshToken
    );

    if (!isTokenValid) {
    throw new AppError(
            "Invalid refresh token",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    const accessToken =
    tokenService.generateAccessToken(decoded.id, decoded.tokenId);

    await sessionRepository.updateLastActive(
        session._id
    );

    return {
        accessToken,
    };
};

export const getUserSessions = async (
    userId,
    currentTokenId
) => {
    const sessions = await sessionRepository.findSessionsByUser(userId);

    return sessions.map((session) => {

        const parser = new UAParser(session.userAgent);

        const browser = parser.getBrowser();

        const os = parser.getOS();

        const device = parser.getDevice();

        const deviceType = device.type || "Desktop";

        const isCurrent = session.tokenId === currentTokenId;

        return {

            id: session._id.toString(),

            browser: browser.name || "Unknown",

            browserVersion: browser.version || "",

            os: os.name || "Unknown",

            osVersion: os.version || "",

            device: deviceType,

            ipAddress: session.ipAddress,

            lastActive: session.lastActive,

            // current: session.tokenId === currentTokenId,
            current: isCurrent,

        };

    });
};

export const logoutCurrentDevice = async (
    userId,
    sessionId
) => {
    const session = await sessionRepository.findSessionById(sessionId);

    if (!session) {
        throw new AppError(
            "Session not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    if (session.userId.toString() !== userId.toString()) {
        throw new AppError(
            "Unauthorized",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    await sessionRepository.deleteSessionById(sessionId);

    return {
        message: "Logged out successfully",
    };
};

export const logoutAllDevices = async (
    userId
) => {
    
    await sessionRepository.deleteAllSessions(
        userId
    );

    return {
        message: "Logged out from all devices successfully",
    };
};