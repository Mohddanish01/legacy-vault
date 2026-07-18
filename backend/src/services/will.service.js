import * as willRepository from "../repositories/will.repository.js";
import * as nomineeRepository from "../repositories/nominee.repository.js";
import AppError from "../utils/AppError.js";

export const createWill = async (
    userId,
    willData
) => {
    const existingWill =
        await willRepository.findWillByTitle(
            userId,
            willData.title
        );

    if (existingWill) {
        throw new AppError(
            "A will with this title already exists.",
            400
        );
    }

    // Har asset ke nominee ko verify karna hai.
    for (const asset of willData.assets) {
        const nominee =
            await nomineeRepository.findNomineeByIdAndUser(
                asset.nomineeId,
                userId
            );

        if (!nominee) {
            throw new AppError(
                "Invalid nominee selected.",
                404
            );
        }
    }

    return await willRepository.createWill({
        ...willData,
        userId,
    });
};

export const getWills = async (userId) => {
    return await willRepository.findWillsByUser(
        userId
    );
};

export const getWillById = async (
    userId,
    willId
) => {
    const will =
        await willRepository.findWillByIdAndUser(
            willId,
            userId
        );

    if (!will) {
        throw new AppError(
            "Will not found.",
            404
        );
    }

    return will;
};

export const updateWill = async (
    userId,
    willId,
    updateData
) => {
    const will =
        await willRepository.findWillByIdAndUser(
            willId,
            userId
        );

    if (!will) {
        throw new AppError(
            "Will not found.",
            404
        );
    }

    if (
        updateData.title &&
        updateData.title !== will.title
    ) {
        const existingWill =
            await willRepository.findWillByTitle(
                userId,
                updateData.title
            );

        if (existingWill) {
            throw new AppError(
                "A will with this title already exists.",
                400
            );
        }
    }

    if (updateData.assets) {
        for (const asset of updateData.assets) {
            const nominee =
                await nomineeRepository.findNomineeByIdAndUser(
                    asset.nomineeId,
                    userId
                );

            if (!nominee) {
                throw new AppError(
                    "Invalid nominee selected.",
                    404
                );
            }
        }
    }

    return await willRepository.updateWill(
        willId,
        updateData
    );
};

export const deleteWill = async (
    userId,
    willId
) => {
    const will =
        await willRepository.findWillByIdAndUser(
            willId,
            userId
        );

    if (!will) {
        throw new AppError(
            "Will not found.",
            404
        );
    }

    await willRepository.deleteWill(
        willId
    );

    return {
        message:
            "Will deleted successfully.",
    };
};