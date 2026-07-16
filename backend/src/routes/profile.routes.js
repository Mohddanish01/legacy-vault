import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { updateProfileSchema, changePasswordSchema } from "../validators/profile.validator.js";
import { protect } from "../middleware/auth.middleware.js";
import * as profileController from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", protect, profileController.getProfile
);
router.put("/", protect, validate(updateProfileSchema), profileController.updateProfile
);
router.put("/change-password", protect,validate(changePasswordSchema),profileController.changePassword
);

export default router;