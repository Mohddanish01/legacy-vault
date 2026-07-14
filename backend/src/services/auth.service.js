import * as authRepository from "../repositories/auth.repository.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import bcrypt from "bcrypt";

export const register = async (userData) => {

    const existingUser = await authRepository.findUserByEmail(userData.email);

    if (existingUser) {
    throw new AppError("User already exists", HTTP_STATUS.CONFLICT);
    }


    // Hash Password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const user = await authRepository.createUser({
        ...userData,
        password: hashedPassword,
    });

   const { password, ...safeUser } = user.toObject();
   return safeUser;

};