import fs from "fs/promises";
import path from "path";

import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

import * as secureFileRepository from "../repositories/secureFile.repository.js";
import * as fileEncryptionService from "./fileEncryption.service.js";
import { ensureDirectoryExists } from "../utils/file.js";


export const createSecureFile = async (
    userId,
    file,
    fileData
) => {

    if (!file) {
        throw new AppError(
            "File is required.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    const encryptedFileName =
        `${file.filename}.enc`;

    const userDirectory = path.join(
        "uploads",
        "encrypted",
        userId.toString()
    );

    await ensureDirectoryExists(userDirectory);

    const encryptedFilePath = path.join(
        userDirectory,
        encryptedFileName
    );

    const { iv, authTag } =
        await fileEncryptionService.encryptFile(
            file.path,
            encryptedFilePath
        );

    await fs.unlink(file.path);

    return await secureFileRepository.createFile({
        userId,

        title: fileData.title,

        category: fileData.category,

        originalFileName: file.originalname,

        storedFileName: encryptedFileName,

        mimeType: file.mimetype,

        size: file.size,

        filePath: encryptedFilePath,

        iv,

        authTag,
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

export const getSecureFiles = async (userId) => {

    return await secureFileRepository.findFilesByUserId(
        userId
    );

};

export const getSecureFileById = async (
    userId,
    fileId
) => {

    const secureFile =
        await secureFileRepository.findFileByIdAndUserId(
            fileId,
            userId
        );

    if (!secureFile) {
        throw new AppError(
            "Secure file not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return secureFile;

};

export const updateSecureFile = async (
    userId,
    fileId,
    fileData
) => {

    const secureFile =
        await getSecureFileById(
            userId,
            fileId
        );

    secureFile.title = fileData.title;
    secureFile.category = fileData.category;

    return await secureFile.save();

};

export const deleteSecureFile = async (
    userId,
    fileId
) => {

    const secureFile =
        await getSecureFileById(
            userId,
            fileId
        );

    await fs.unlink(
        secureFile.filePath
    );

    await secureFileRepository.deleteFile(
        fileId
    );

};

export const downloadSecureFile = async (
    userId,
    fileId
) => {

    const secureFile =
        await getSecureFileById(
            userId,
            fileId
        );

    const fileBuffer =
        await fileEncryptionService.decryptFile(
            secureFile.filePath,
            secureFile.iv,
            secureFile.authTag
        );

    return {
        fileBuffer,
        originalFileName:
            secureFile.originalFileName,
        mimeType:
            secureFile.mimeType,
    };

};