import Otp from "../models/Otp.js";

export function createOtp(otpData) {
    return Otp.create(otpData);
}

export function findOtpByUserAndPurpose(userId, purpose) {
    return Otp.findOne({ userId, purpose });
}

export function deleteOtpByUserAndPurpose(userId, purpose) {
    return Otp.findOneAndDelete({ userId, purpose });
}