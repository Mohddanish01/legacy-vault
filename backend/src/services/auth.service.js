import * as authRepository from "../repositories/auth.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import bcrypt from "bcrypt";
import * as otpService from "./otp.service.js";
import { OTP_PURPOSE } from "../constants/otpPurpose.js";
import * as emailService from "./email.service.js";
import * as tokenService from "./token.service.js";
import * as otpRepository from "../repositories/otp.repository.js";

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

    const accessToken = tokenService.generateAccessToken(
        user._id
    );

    const refreshToken = tokenService.generateRefreshToken(
        user._id
    );

    return {
        message: "Login successful",
        accessToken,
        refreshToken,
    };
}