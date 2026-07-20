import express from "express";

import upload from "../config/multer.js";

import { protect } from "../middleware/auth.middleware.js";
import {validate} from "../middleware/validate.middleware.js";

import { createSecureFileSchema, updateSecureFileSchema } from "../validators/secureFile.validator.js";

import { createSecureFile, getSecureFiles, getSecureFileById, updateSecureFile, deleteSecureFile, downloadSecureFile } from "../controllers/secureFile.controller.js";

const router = express.Router();

router.use(protect);

router.post( "/", upload.single("file"), validate(createSecureFileSchema), createSecureFile );

router.get( "/", getSecureFiles );

router.get( "/:id/download", downloadSecureFile );

router.get( "/:id", getSecureFileById );

router.put( "/:id", validate(updateSecureFileSchema), updateSecureFile );

router.delete( "/:id", deleteSecureFile );

export default router;