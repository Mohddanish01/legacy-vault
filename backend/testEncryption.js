import dotenv from "dotenv";

dotenv.config();

const { encrypt, decrypt } = await import(
    "./src/services/encryption.service.js"
);

const encrypted = encrypt("Hello World");

console.log("Encrypted:");
console.log(encrypted);

const decrypted = decrypt(
    encrypted.encryptedData,
    encrypted.iv,
    encrypted.authTag
);

console.log("Decrypted:");
console.log(decrypted);