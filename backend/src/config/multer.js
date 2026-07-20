import multer from "multer";
import path from "path";

import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, } from "../constants/file.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/temp");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;

        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {

    // const allowedMimeTypes = [
    //     "application/pdf",

    //     "image/jpeg",
    //     "image/png",
    //     "image/webp",

    //     "application/zip",
    //     "application/x-zip-compressed",

    //     "application/msword",
    //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    //     "application/vnd.ms-excel",
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // ];

    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type."), false);
    }
};

const upload = multer({
    storage,

    fileFilter,

    limits: {
        fileSize: MAX_FILE_SIZE,
    },
});

export default upload;