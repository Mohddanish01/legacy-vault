export const FILE_CATEGORIES = {
    IDENTITY: "Identity",
    EDUCATION: "Education",
    PROPERTY: "Property",
    INSURANCE: "Insurance",
    MEDICAL: "Medical",
    LEGAL: "Legal",
    FINANCIAL: "Financial",
    OTHER: "Other",
};

export const ALLOWED_MIME_TYPES = [
    "application/pdf",

    "image/jpeg",
    "image/png",
    "image/webp",

    "application/zip",
    "application/x-zip-compressed",

    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const MAX_FILE_SIZE =
    10 * 1024 * 1024;