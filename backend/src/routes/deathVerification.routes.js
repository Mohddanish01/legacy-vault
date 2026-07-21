import { Router } from "express";

import * as deathVerificationController from "../controllers/deathVerification.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import {validate} from "../middlewares/validate.js";

import {
    createDeathVerificationSchema,
} from "../validators/deathVerification.validator.js";

const router = Router();

router.post( "/", validate(createDeathVerificationSchema),  deathVerificationController.createDeathVerification );

router.get( "/me", protect, deathVerificationController.getMyRequests );

export default router;