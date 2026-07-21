import asyncHandler from "../utils/asyncHandler.js";

import * as deathVerificationService
    from "../services/deathVerification.service.js";

import { HTTP_STATUS }
    from "../constants/httpStatus.js";

export const createDeathVerification =
asyncHandler(async (req, res) => {

    const request =
        await deathVerificationService.createDeathVerification({

            token: req.body.token,

            certificateNumber:
                req.body.certificateNumber,

            certificateFileName:
                req.file.filename,

            certificateFilePath:
                req.file.path,

        });

    return res.status(
        HTTP_STATUS.CREATED
    ).json({

        success: true,

        message:
            "Death verification request submitted successfully.",

        data: request,

    });

});

export const getMyRequests =
asyncHandler(async (req, res) => {

    const requests =
        await deathVerificationService.getMyRequests(
            req.user.id
        );

    return res.status(
        HTTP_STATUS.OK
    ).json({

        success: true,

        data: requests,

    });

});

export const getPendingRequests =
asyncHandler(async (req, res) => {

    const requests =
        await deathVerificationService.getPendingRequests();

    return res.status(
        HTTP_STATUS.OK
    ).json({

        success: true,

        data: requests,

    });

});

export const getDeathVerificationById =
asyncHandler(async (req, res) => {

    const request =
        await deathVerificationService.getDeathVerificationById(
            req.params.id
        );

    return res.status(
        HTTP_STATUS.OK
    ).json({

        success: true,

        data: request,

    });

});

export const approveRequest =
asyncHandler(async (req, res) => {

    const request =
        await deathVerificationService.approveRequest(

            req.params.id,

            req.user.id,

            req.body.adminRemarks

        );

    return res.status(
        HTTP_STATUS.OK
    ).json({

        success: true,

        message:
            "Death verification approved successfully.",

        data: request,

    });

});

export const rejectRequest =
asyncHandler(async (req, res) => {

    const request =
        await deathVerificationService.rejectRequest(

            req.params.id,

            req.user.id,

            req.body.adminRemarks

        );

    return res.status(
        HTTP_STATUS.OK
    ).json({

        success: true,

        message:
            "Death verification rejected successfully.",

        data: request,

    });

});