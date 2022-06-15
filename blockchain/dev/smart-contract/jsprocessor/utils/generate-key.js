import { createContext } from "../sawtooth-signing/index.js";

const context = createContext("secp256k1");

export const genPrivateKey = () => {
  return context.newRandomPrivateKey();
};

export const getPublicKey = (privKey) => {
  return context.getPublicKey(privKey);
};
