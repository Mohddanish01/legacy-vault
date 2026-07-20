import SecureFile from "../models/SecureFile.js";

export const createFile = async (fileData) => {
    return SecureFile.create(fileData);
};

export const findFileById = async (id) => {
    return SecureFile.findById(id);
};

export const findFilesByUserId = async (userId) => {
    return SecureFile.find({
        userId,
        isArchived: false,
    }).sort({
        createdAt: -1,
    });
};

export const findFileByIdAndUserId = async (
    fileId,
    userId
) => {
    return SecureFile.findOne({
        _id: fileId,
        userId,
        isArchived: false,
    });
};

export const updateFile = async (id, updateData) => {
    return SecureFile.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );
};

export const deleteFile = async (id) => {
    return SecureFile.findByIdAndDelete(id);
};