import * as nomineeRepository from "../repositories/nominee.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const createNominee = async (
    userId,
    nomineeData
) => {
    // Check duplicate email
    const existingEmail =
        await nomineeRepository.findNomineeByEmail(
            userId,
            nomineeData.email
        );

    if (existingEmail) {
        throw new AppError(
            "A nominee with this email already exists",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    // Check duplicate phone
    const existingPhone =
        await nomineeRepository.findNomineeByPhone(
            userId,
            nomineeData.phone
        );

    if (existingPhone) {
        throw new AppError(
            "A nominee with this phone number already exists",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    // return await nomineeRepository.createNominee({
    //     ...nomineeData,
    //     userId,
    // });
    return await nomineeRepository.createNominee({
        ...nomineeData,
        dateOfBirth: nomineeData.dateOfBirth
            ? new Date(nomineeData.dateOfBirth)
            : undefined,
        userId,
    });
};

export const getNominees = async (userId) => {
    return await nomineeRepository.findNomineesByUser(
        userId
    );
};

export const getNomineeById = async (
    userId,
    nomineeId
) => {
    const nominee =
        await nomineeRepository.findNomineeById(
            nomineeId
        );

    if (!nominee) {
        throw new AppError(
            "Nominee not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    if (
        nominee.userId.toString() !==
        userId.toString()
    ) {
        throw new AppError(
            "Unauthorized",
            HTTP_STATUS.FORBIDDEN
        );
    }

    return nominee;
};

export const updateNominee = async (
    userId,
    nomineeId,
    updateData
) => {
    const nominee =
        await nomineeRepository.findNomineeById(
            nomineeId
        );

    if (!nominee) {
        throw new AppError(
            "Nominee not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    if (
        nominee.userId.toString() !==
        userId.toString()
    ) {
        throw new AppError(
            "Unauthorized",
            HTTP_STATUS.FORBIDDEN
        );
    }

    // Check email if changed
    if (
        updateData.email &&
        updateData.email !== nominee.email
    ) {
        const existing =
            await nomineeRepository.findNomineeByEmail(
                userId,
                updateData.email
            );

        if (existing) {
            throw new AppError(
                "A nominee with this email already exists",
                HTTP_STATUS.BAD_REQUEST
            );
        }
    }

    // Check phone if changed
    if (
        updateData.phone &&
        updateData.phone !== nominee.phone
    ) {
        const existing =
            await nomineeRepository.findNomineeByPhone(
                userId,
                updateData.phone
            );

        if (existing) {
            throw new AppError(
                "A nominee with this phone number already exists",
                HTTP_STATUS.BAD_REQUEST
            );
        }
    }

    // Convert dateOfBirth to Date object
    if (updateData.dateOfBirth) {
        updateData.dateOfBirth = new Date(
            updateData.dateOfBirth
        );
    }

    return await nomineeRepository.updateNominee(
        nomineeId,
        updateData
    );
};

export const deleteNominee = async (
    userId,
    nomineeId
) => {
    const nominee =
        await nomineeRepository.findNomineeById(
            nomineeId
        );

    if (!nominee) {
        throw new AppError(
            "Nominee not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    if (
        nominee.userId.toString() !==
        userId.toString()
    ) {
        throw new AppError(
            "Unauthorized",
            HTTP_STATUS.FORBIDDEN
        );
    }

    await nomineeRepository.deleteNominee(
        nomineeId
    );

    return {
        message: "Nominee deleted successfully",
    };
};