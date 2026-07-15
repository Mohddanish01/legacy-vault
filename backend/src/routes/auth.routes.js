import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema, verifyOtpSchema, refreshTokenSchema} from "../validators/auth.validator.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login );

router.post("/verify-otp", validate(verifyOtpSchema),authController.verifyOtp );

router.get("/me", protect, authController.getCurrentUser
);

router.post("/refresh-token", validate(refreshTokenSchema), authController.refreshToken
);

export default router;