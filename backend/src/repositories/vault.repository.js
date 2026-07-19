import Vault from "../models/Vault.js";

export const createVault = async (vaultData) => {
    return await Vault.create(vaultData);
};

export const findVaultsByUser = async (userId) => {
    return await Vault.find({
        userId,
        isArchived: false,
    }).sort({
        createdAt: -1,
    });
};

export const findArchivedVaultsByUser = async (userId) => {
    return await Vault.find({
        userId,
        isArchived: true,
    }).sort({
        createdAt: -1,
    });
};

export const findVaultById = async (vaultId) => {
    return await Vault.findById(vaultId);
};

export const findVaultByIdAndUser = async (
    vaultId,
    userId
) => {
    return await Vault.findOne({
        _id: vaultId,
        userId,
    });
};

export const findVaultByTitle = async (
    userId,
    title
) => {
    return await Vault.findOne({
        userId,
        title,
    });
};

export const updateVault = async (
    vaultId,
    updateData
) => {
    return await Vault.findByIdAndUpdate(
        vaultId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );
};

export const deleteVault = async (vaultId) => {
    return await Vault.findByIdAndDelete(
        vaultId
    );
};