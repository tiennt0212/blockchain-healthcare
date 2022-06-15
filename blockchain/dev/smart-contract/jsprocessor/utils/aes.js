// Includes crypto module
import crypto from "crypto";

// Difining algorithm
const algorithm = "aes-256-cbc";
const iv = Buffer.from("322a07e45466160b23dd9e59c0ec1bde", "hex");

function encrypt(text, key) {
  // Creating Cipheriv with its parameter
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  return encrypted.toString("hex");
}

// A decrypt function
function decrypt(encryptedText, key) {
  // Creating Decipher
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(Buffer.from(encryptedText, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
}

export const encryptAttributesList = (attrList, key) => {
  // attrList is an array of string
  // key 32 bytes = 256 bits
  return attrList.map((attr) => encrypt(attr, key));
};

export const decryptAttributesList = (encryptedAttrList, key) => {
  // encryptedAttrList is an array of encrypted string
  // key 32 bytes = 256 bits
  return encryptedAttrList.map((encryptedAttr) => decrypt(encryptedAttr, key));
};
