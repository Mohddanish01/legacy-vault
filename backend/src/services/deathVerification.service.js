import {
    verifyVerificationToken,
    markVerificationTokenAsUsed,
} from "../services/verificationToken.service.js";

import * as deathVerificationRepository
    from "../repositories/deathVerification.repository.js";

import {
    VERIFICATION_STATUS,
} from "../constants/deathVerification.js";

import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const createDeathVerification = async ({
    token,
    certificateNumber,
    certificateFileName,
    certificateFilePath,
}) => {

    // 1. Verify secure link
    const verificationToken =
        await verifyVerificationToken(
            token,
            VERIFICATION_TOKEN_PURPOSE.DEATH_VERIFICATION
        );

    // 2. Check pending request
    const pendingRequest =
        await deathVerificationRepository.getPendingRequest(
            verificationToken.userId
        );

    if (pendingRequest) {
        throw new AppError(
            "A death verification request is already pending.",
            HTTP_STATUS.CONFLICT
        );
    }

    // 3. Calculate attempt
    const latestRequest =
        await deathVerificationRepository.getLatestRequest(
            verificationToken.userId
        );

    const attempt =
        latestRequest
            ? latestRequest.attempt + 1
            : 1;

    // 4. Create request
    const request =
        await deathVerificationRepository.createRequest({
            userId: verificationToken.userId,
            nomineeId: verificationToken.nomineeId,
            attempt,
            certificateNumber,
            certificateFileName,
            certificateFilePath,
            status: VERIFICATION_STATUS.PENDING,
        });

    // 5. Consume token
    await markVerificationTokenAsUsed(
        verificationToken._id
    );

    return request;
};


export const getMyRequests = async (
    userId
) => {

    return deathVerificationRepository.getUserRequests(
        userId
    );

};


export const getPendingRequests = async () => {

    return deathVerificationRepository.getPendingRequests();

};


export const getDeathVerificationById = async (
    requestId
) => {

    const request =
        await deathVerificationRepository.getRequestById(
            requestId
        );

    if (!request) {
        throw new AppError(
            "Death verification request not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return request;
};


export const approveRequest = async (
    requestId,
    adminId,
    adminRemarks
) => {

    const request =
        await deathVerificationRepository.getRequestById(
            requestId
        );

    if (!request) {
        throw new AppError(
            "Death verification request not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    if (
        request.status !==
        VERIFICATION_STATUS.PENDING
    ) {
        throw new AppError(
            "This request has already been processed.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    return deathVerificationRepository.updateRequest(
        requestId,
        {
            status:
                VERIFICATION_STATUS.APPROVED,
            verifiedBy: adminId,
            verifiedAt: new Date(),
            adminRemarks,
        }
    );
};


export const rejectRequest = async (
    requestId,
    adminId,
    adminRemarks
) => {

    const request =
        await deathVerificationRepository.getRequestById(
            requestId
        );

    if (!request) {
        throw new AppError(
            "Death verification request not found.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    if (
        request.status !==
        VERIFICATION_STATUS.PENDING
    ) {
        throw new AppError(
            "This request has already been processed.",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    return deathVerificationRepository.updateRequest(
        requestId,
        {
            status:
                VERIFICATION_STATUS.REJECTED,
            verifiedBy: adminId,
            verifiedAt: new Date(),
            adminRemarks,
        }
    );
};