import { HTTP_STATUS } from "../constants/httpStatus.js";

import * as secureFileService from "../services/secureFile.service.js";

import {asyncHandler} from "../utils/asyncHandler.js";

export const createSecureFile = asyncHandler(
    async (req, res) => {

        const secureFile =
            await secureFileService.createSecureFile(
                req.user.id,
                req.file,
                req.body
            );

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: "Secure file uploaded successfully.",
            data: secureFile,
        });

    }
);

export const getSecureFiles = asyncHandler(
    async (req, res) => {

        const secureFiles =
            await secureFileService.getSecureFiles(
                req.user.id
            );

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: secureFiles,
        });

    }
);

export const getSecureFileById = asyncHandler(
    async (req, res) => {

        const secureFile =
            await secureFileService.getSecureFileById(
                req.user.id,
                req.params.id
            );

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: secureFile,
        });

    }
);

export const updateSecureFile = asyncHandler(
    async (req, res) => {

        const secureFile =
            await secureFileService.updateSecureFile(
                req.user.id,
                req.params.id,
                req.body
            );

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Secure file updated successfully.",
            data: secureFile,
        });

    }
);

export const deleteSecureFile = asyncHandler(
    async (req, res) => {

        await secureFileService.deleteSecureFile(
            req.user.id,
            req.params.id
        );

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Secure file deleted successfully.",
        });

    }
);

export const downloadSecureFile = asyncHandler(
    async (req, res) => {

        const {
            fileBuffer,
            originalFileName,
            mimeType,
        } =
            await secureFileService.downloadSecureFile(
                req.user.id,
                req.params.id
            );

        res.setHeader(
            "Content-Type",
            mimeType
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${originalFileName}"`
        );

        res.send(fileBuffer);

    }
);