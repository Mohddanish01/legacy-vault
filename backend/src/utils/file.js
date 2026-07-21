import fs from "fs/promises";

export const ensureDirectoryExists = async (directoryPath) => {
    await fs.mkdir(directoryPath, {
        recursive: true,
    });
};