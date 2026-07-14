import bcrypt from "bcrypt";

import * as otpRepository from "../repositories/otp.repository.js";

import { generateOtp } from "../utils/otp.js";

import { OTP_PURPOSE } from "../constants/otpPurpose.js";

export async function createOtp(userId, purpose) {

    // Delete previous login OTP
    await otpRepository.deleteOtpByUserAndPurpose(
        userId,
        purpose
    );

    // Generate OTP
    const otp = generateOtp();

    // Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 12);

    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );

    // Save OTP
    await otpRepository.createOtp({
        userId,
        purpose,
        otp: hashedOtp,
        expiresAt,
    });

    // Return Plain OTP
    return otp;

}