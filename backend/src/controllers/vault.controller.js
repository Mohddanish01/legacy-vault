import * as vaultService from "../services/vault.service.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const createVault =
    asyncHandler(
        async (
            req,
            res
        ) => {

            const vault =
                await vaultService.createVault(
                    req.user.id,
                    req.body
                );

            res.status(201).json({
                success: true,
                message:
                    "Vault created successfully.",
                data: vault,
            });
        }
    );

export const getVaults =
    asyncHandler(
        async (
            req,
            res
        ) => {
            const vaults =
                await vaultService.getVaults(
                    req.user.id
                );

            res.status(200).json({
                success: true,
                data: vaults,
            });
        }
    );

export const getVaultById =
    asyncHandler(
        async (
            req,
            res
        ) => {
            const vault =
                await vaultService.getVaultById(
                    req.user.id,
                    req.params.id
                );

            res.status(200).json({
                success: true,
                data: vault,
            });
        }
    );

export const updateVault =
    asyncHandler(
        async (
            req,
            res
        ) => {
            const vault =
                await vaultService.updateVault(
                    req.user.id,
                    req.params.id,
                    req.body
                );

            res.status(200).json({
                success: true,
                message:
                    "Vault updated successfully.",
                data: vault,
            });
        }
    );

export const deleteVault =
    asyncHandler(
        async (
            req,
            res
        ) => {
            const result =
                await vaultService.deleteVault(
                    req.user.id,
                    req.params.id
                );

            res.status(200).json({
                success: true,
                ...result,
            });
        }
    );