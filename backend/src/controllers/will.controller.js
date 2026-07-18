import * as willService from "../services/will.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createWill = asyncHandler(
    async (req, res) => {
        const will =
            await willService.createWill(
                req.user._id,
                req.body
            );

        res.status(201).json({
            success: true,
            message:
                "Will created successfully.",
            data: will,
        });
    }
);

export const getWills = asyncHandler(
    async (req, res) => {
        const wills =
            await willService.getWills(
                req.user._id
            );

        res.status(200).json({
            success: true,
            data: wills,
        });
    }
);

export const getWillById =
    asyncHandler(async (req, res) => {
        const will =
            await willService.getWillById(
                req.user._id,
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: will,
        });
    }
);

export const updateWill =
    asyncHandler(async (req, res) => {
        const will =
            await willService.updateWill(
                req.user._id,
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message:
                "Will updated successfully.",
            data: will,
        });
    }
);

export const deleteWill =
    asyncHandler(async (req, res) => {
        const result =
            await willService.deleteWill(
                req.user._id,
                req.params.id
            );

        res.status(200).json({
            success: true,
            message: result.message,
        });
    }
);