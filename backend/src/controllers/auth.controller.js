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

export const getUserSessions = asyncHandler(async (req, res) => {

    const sessions = await authService.getUserSessions(
        req.user._id,
        req.auth.tokenId
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: sessions,
    });

});

export const logoutCurrentDevice = asyncHandler(async (req, res) => {

    const data = await authService.logoutCurrentDevice(
        req.user._id,
        req.params.sessionId
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: data.message,
    });

});

export const logoutAllDevices = asyncHandler(async (req, res) => {

    const data = await authService.logoutAllDevices(
        req.user._id
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: data.message,
    });

});