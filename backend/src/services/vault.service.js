import * as vaultRepository from "../repositories/vault.repository.js";
import { encrypt, decrypt } from "./encryption.service.js";
import AppError from "../utils/AppError.js";

const mapVaultToResponse = (vault) => {
    const decrypted = decrypt(
        vault.encryptedData,
        vault.iv,
        vault.authTag
    );

    const secret = JSON.parse(
        decrypted
    );

    return {
        _id: vault._id,

        title: vault.title,

        category: vault.category,

        secret,

        isArchived:
            vault.isArchived,

        createdAt:
            vault.createdAt,

        updatedAt:
            vault.updatedAt,
    };
};

export const createVault = async (
    userId,
    vaultData
) => {

    const existingVault =
        await vaultRepository.findVaultByTitle(
            userId,
            vaultData.title
        );

    if (existingVault) {
        throw new AppError(
            "Vault with this title already exists.",
            409
        );
    }

    const encrypted =
        encrypt(
            JSON.stringify(
                vaultData.secret
            )
        );
    
    const vault =
        await vaultRepository.createVault({
            userId,

            title: vaultData.title,

            category: vaultData.category,

            encryptedData:
                encrypted.encryptedData,

            iv: encrypted.iv,

            authTag:
                encrypted.authTag,
        });

    return mapVaultToResponse(vault);
};

export const getVaults = async (
    userId
) => {
    const vaults =
    await vaultRepository.findVaultsByUser(
        userId
    );

    return vaults.map(
        mapVaultToResponse
    );
};

export const getVaultById = async (
    userId,
    vaultId
) => {
    const vault =
        await vaultRepository.findVaultByIdAndUser(
            vaultId,
            userId
        );

    if (!vault) {
        throw new AppError(
            "Vault not found.",
            404
        );
    }

    return mapVaultToResponse(
        vault
    );
};

export const updateVault = async (
    userId,
    vaultId,
    vaultData
) => {
    const vault =
        await vaultRepository.findVaultByIdAndUser(
            vaultId,
            userId
        );

    if (!vault) {
        throw new AppError(
            "Vault not found.",
            404
        );
    }

    if (
        vaultData.title &&
        vaultData.title !== vault.title
    ) {
        const existingVault =
            await vaultRepository.findVaultByTitle(
                userId,
                vaultData.title
            );

        if (existingVault) {
            throw new AppError(
                "Vault with this title already exists.",
                409
            );
        }
    }

    const updateData = {};

    if (vaultData.title) {
        updateData.title =
            vaultData.title;
    }

    if (vaultData.category) {
        updateData.category =
            vaultData.category;
    }

    if (vaultData.secret) {
        const encrypted =
            encrypt(
                JSON.stringify(
                    vaultData.secret
                )
            );

        updateData.encryptedData =
            encrypted.encryptedData;

        updateData.iv =
            encrypted.iv;

        updateData.authTag =
            encrypted.authTag;
    }

    if (
        vaultData.isArchived !==
        undefined
    ) {
        updateData.isArchived =
            vaultData.isArchived;
    }

    const updatedVault =
        await vaultRepository.updateVault(
            vaultId,
            updateData
        );

    return mapVaultToResponse(
        updatedVault
    );
};

export const deleteVault = async (
    userId,
    vaultId
) => {
    const vault =
        await vaultRepository.findVaultByIdAndUser(
            vaultId,
            userId
        );

    if (!vault) {
        throw new AppError(
            "Vault not found.",
            404
        );
    }

    await vaultRepository.deleteVault(
        vaultId
    );

    return {
        message:
            "Vault deleted successfully."
    };
};