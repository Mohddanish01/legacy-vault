import express from "express";

import * as vaultController from "../controllers/vault.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import { validate } from "../middleware/validate.middleware.js";

import {
    createVaultSchema,
    updateVaultSchema,
} from "../validators/vault.validator.js";

const router = express.Router();

router.use(protect);

router.post( "/", validate(createVaultSchema), vaultController.createVault );

router.get( "/", vaultController.getVaults );

router.get( "/:id", vaultController.getVaultById );

router.put( "/:id", validate(updateVaultSchema), vaultController.updateVault );

router.delete( "/:id", vaultController.deleteVault );

export default router;