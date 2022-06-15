import { encryptAttributesList, decryptAttributesList } from "./aes.js";

const myAttrList = ["READ", "WRITE"];
const myPrivateKey = "BLOCKCHAINHEALTHBLOCKCHAINHEALTH";
const encrypted = encryptAttributesList(myAttrList, myPrivateKey);
console.log(encrypted);
const decrypted = decryptAttributesList(encrypted, myPrivateKey);
console.log(decrypted);
