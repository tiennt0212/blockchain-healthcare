import { genPrivateKey, getPublicKey } from "./generate-key.js";

const a = genPrivateKey();
console.log(a.privateKeyBytes.toString("hex"));
console.log(getPublicKey(a).publicKeyBytes.toString("hex"));
