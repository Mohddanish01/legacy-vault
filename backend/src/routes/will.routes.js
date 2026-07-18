import { Router } from "express";
import * as willController from "../controllers/will.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
    createWillSchema,
    updateWillSchema,
} from "../validators/will.validator.js";

const router = Router();

router.post( "/", protect, validate(createWillSchema), willController.createWill );

router.get( "/", protect, willController.getWills );

router.get( "/:id", protect, willController.getWillById );

router.put( "/:id", protect, validate(updateWillSchema), willController.updateWill );

router.delete( "/:id", protect, willController.deleteWill );

export default router;