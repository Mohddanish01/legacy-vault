import Will from "../models/Will.js";

export const createWill = async (willData) => {
    return await Will.create(willData);
};

export const findWillsByUser = async (userId) => {
    return await Will.find({ userId })
        .sort({ createdAt: -1 });
};

export const findWillById = async (willId) => {
    return await Will.findById(willId);
};

export const findWillByIdAndUser = async (
    willId,
    userId
) => {
    return await Will.findOne({
        _id: willId,
        userId,
    });
};

export const findWillByTitle = async (
    userId,
    title
) => {
    return await Will.findOne({
        userId,
        title,
    });
};

export const updateWill = async (
    willId,
    updateData
) => {
    return await Will.findByIdAndUpdate(
        willId,
        updateData,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

export const deleteWill = async (
    willId
) => {
    return await Will.findByIdAndDelete(
        willId
    );
};