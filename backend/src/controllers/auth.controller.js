import * as authService from "../services/auth.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

export const register = asyncHandler(async (req, res) => {

    const user = await authService.register(req.body);

    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "User Registered Successfully",
        data: user,
    });

});

export const login = asyncHandler(async (req, res) => {

    const data = await authService.login(req.body);

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: data.message,
        data,
    });

});

export const verifyOtp = asyncHandler(async (req, res) => {

    const data = await authService.verifyOtp({
        ...req.body,
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
    });

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: data.message,
        data,
    });

});

export const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await authService.getCurrentUser(req.user);

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
    });

});

export const refreshToken = asyncHandler(async (req, res) => {

    const data = await authService.refreshToken(req.body);

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data,
    });

});