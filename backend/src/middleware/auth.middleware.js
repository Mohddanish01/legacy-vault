import * as tokenService from "../services/token.service.js";
import * as authRepository from "../repositories/auth.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(
            "Unauthorized",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    const token = authHeader.split(" ")[1];

    const decoded = tokenService.verifyAccessToken(token);


    const user = await authRepository.findUserById(decoded.id);

    if (!user) {
        throw new AppError(
            "User not found",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    const { password, ...safeUser } = user.toObject();

    req.user = {
        ...safeUser,
        id: safeUser._id.toString(),
    };

    req.auth = decoded;

    next();
});