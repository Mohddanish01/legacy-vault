import Nominee from "../models/Nominee.js";

export const createNominee = async (nomineeData) => {
    return await Nominee.create(nomineeData);
};

export const findNomineesByUser = async (userId) => {
    return await Nominee.find({ userId })
        .sort({ createdAt: -1 });
};

export const findNomineeById = async (nomineeId) => {
    return await Nominee.findById(nomineeId);
};

export const findNomineeByEmail = async (
    userId,
    email
) => {
    return await Nominee.findOne({
        userId,
        email,
    });
};

export const findNomineeByPhone = async (
    userId,
    phone
) => {
    return await Nominee.findOne({
        userId,
        phone,
    });
};

export const updateNominee = async (
    nomineeId,
    updateData
) => {
    return await Nominee.findByIdAndUpdate(
        nomineeId,
        updateData,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

export const deleteNominee = async (
    nomineeId
) => {
    return await Nominee.findByIdAndDelete(
        nomineeId
    );
};