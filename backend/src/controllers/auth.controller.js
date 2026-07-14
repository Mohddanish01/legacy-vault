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