import * as profileRepository from "../repositories/profile.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import bcrypt from "bcrypt";
import * as sessionRepository from "../repositories/session.repository.js"

export const getProfile = async (userId) => {

    const user = await profileRepository.findUserById(userId);

    if (!user) {
        throw new AppError(
            "User not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    const { password, ...safeUser } = user.toObject();

    return safeUser;

};

export const updateProfile = async (
    userId,
    profileData
) => {

    const updatedUser =
        await profileRepository.updateProfile(
            userId,
            profileData
        );

    if (!updatedUser) {
        throw new AppError(
            "User not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    const { password, ...safeUser } =
        updatedUser.toObject();

    return safeUser;

};

export const changePassword = async (
    userId,
    passwordData
) => {
    const user = await profileRepository.findUserById(userId);

    if (!user) {
        throw new AppError(
            "User not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    console.log("Entered Current Password:", passwordData.currentPassword);
    console.log("Password Hash from DB:", user.password);

    const isPasswordCorrect =
    await bcrypt.compare(
        passwordData.currentPassword,
        user.password
    );

    console.log("Password Match:", isPasswordCorrect);
    console.log("User Email:", user.email);

    if (!isPasswordCorrect) {
        throw new AppError(
            "Current password is incorrect",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    const isSamePassword =
    await bcrypt.compare(
        passwordData.newPassword,
        user.password
    );

    if (isSamePassword) {
        throw new AppError(
            "New password must be different from current password",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    const hashedPassword =
    await bcrypt.hash(
        passwordData.newPassword,
        12
    );

    await profileRepository.updatePassword(
        userId,
        hashedPassword
    );

    await sessionRepository.deleteAllSessions(
        userId
    );

    return {
        message:
            "Password changed successfully. Please login again.",
    };
};