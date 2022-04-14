import { genPrivateKey, getPublicKey } from "./generate-key.js";

const a = genPrivateKey();
console.log(a);
console.log(getPublicKey(a));
