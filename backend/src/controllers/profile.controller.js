import * as profileService from "../services/profile.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const getProfile = asyncHandler(async (req, res) => {

    const profile = await profileService.getProfile(
        req.user._id
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: profile,
    });

});

export const updateProfile = asyncHandler(async (req, res) => {

    const profile =
        await profileService.updateProfile(
            req.user._id,
            req.body
        );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Profile updated successfully",
        data: profile,
    });

});

export const changePassword = asyncHandler(async (req, res) => {

    const data = await profileService.changePassword(
        req.user._id,
        req.body
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: data.message,
    });

});