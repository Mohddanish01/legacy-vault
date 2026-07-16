import User from "../models/User.js";

export const findUserById = async (userId) => {

    return await User.findById(userId);

};

export const updateProfile = async (
    userId,
    updateData
) => {

    return await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

};

export const updatePassword = async (
    userId,
    hashedPassword
) => {

    return await User.findByIdAndUpdate(
        userId,
        {
            password: hashedPassword,
        },
        {
            new: true,
        }
    );

};