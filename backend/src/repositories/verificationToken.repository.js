import VerificationToken from "../models/VerificationToken.js";

export const createToken = async (data) => {
    return VerificationToken.create(data);
};

export const getTokenByHash = async (
    hashedToken
) => {
    return VerificationToken.findOne({
        hashedToken,
    });
};

export const markTokenAsUsed = async (
    id
) => {
    return VerificationToken.findByIdAndUpdate(
        id,
        {
            usedAt: new Date(),
        },
        {
            new: true,
        }
    );
};

export const deleteTokensByUserAndPurpose =
    async (
        userId,
        nomineeId,
        purpose
    ) => {

        return VerificationToken.deleteMany({
            userId,
            nomineeId,
            purpose,
            usedAt: null,
        });

    };