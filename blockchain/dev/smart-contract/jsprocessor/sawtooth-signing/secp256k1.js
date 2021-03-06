/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ------------------------------------------------------------------------------
 */

/** @module signing/secp256k1 */
"use strict";
import pkg from "secp256k1";
// const secp256k1 = require("secp256k1");
import { createHash, randomBytes } from "crypto";

import { PrivateKey, PublicKey, Context, ParseError } from "./core.js";

const { privateKeyVerify, verify, sign, publicKeyCreate } = pkg;
/**
 * A Secp256k1 specific implementation of the PrivateKey class.
 */
class Secp256k1PrivateKey extends PrivateKey {
  /**
   * @param {Buffer} privateKeyBytes - the bytes of the private key
   */
  constructor(privateKeyBytes) {
    super();
    this.privateKeyBytes = privateKeyBytes;
  }

  getAlgorithmName() {
    return "secp256k1";
  }

  /**
   * @return {Buffer} the key in bytes
   */
  asBytes() {
    return Buffer.from(this.privateKeyBytes);
  }

  /**
   * Creates a private key from a hex encode set of bytes.
   *
   * @param {string} privateKeyHex - the key in hex
   * @return {PrivateKey} a private key instance
   * @throws {ParseError} if the private key is not valid
   */
  static fromHex(privateKeyHex) {
    let buffer = Buffer.from(privateKeyHex, "hex");
    // verify that it is either a proper compressed or uncompressed key
    if (!privateKeyVerify(buffer) && !privateKeyVerify(buffer, false)) {
      throw new ParseError("Unable to parse a private key from the given hex");
    }
    return new Secp256k1PrivateKey(buffer);
  }

  static newRandom() {
    let privKey;
    do {
      privKey = randomBytes(32);
    } while (!privateKeyVerify(privKey));

    return new Secp256k1PrivateKey(privKey);
  }
}

/**
 * A Secp256k1 specific implementation of the PublicKey class.
 */
class Secp256k1PublicKey extends PublicKey {
  /**
   * @param {Buffer} publicKeyBytes - the bytes of the public key
   */
  constructor(publicKeyBytes) {
    super();
    this.publicKeyBytes = publicKeyBytes;
  }

  getAlgorithmName() {
    return "secp256k1";
  }

  /**
   * @return {Buffer} the key in bytes
   */
  asBytes() {
    return Buffer.from(this.publicKeyBytes);
  }

  /**
   * Creates a public key from a hex encode set of bytes.
   *
   * @param {string} publicKeyHex - the key in hex
   * @return {PublicKey} a public key instance
   * @throws {ParseError} if the public key is not valid
   */
  static fromHex(publicKeyHex) {
    let buffer = Buffer.from(publicKeyHex, "hex");
    if (!publicKeyVerify(buffer)) {
      throw new ParseError("Unable to parse a private key from the given hex");
    }
    return new Secp256k1PublicKey(buffer);
  }
}

/**
 * A Secp256k1 specific implementation of the abstract Context class.
 */
class Secp256k1Context extends Context {
  getAlgorithmName() {
    return "secp256k1";
  }

  verify(signature, message, publicKey) {
    const dataHash = createHash("sha256").update(message).digest();
    const sigBytes = Buffer.from(signature, "hex");

    return verify(dataHash, sigBytes, publicKey.publicKeyBytes);
  }

  sign(message, privateKey) {
    const dataHash = createHash("sha256").update(message).digest();

    const result = sign(dataHash, privateKey.privateKeyBytes);
    return result.signature.toString("hex");
  }

  getPublicKey(privateKey) {
    return new Secp256k1PublicKey(publicKeyCreate(privateKey.privateKeyBytes));
  }

  newRandomPrivateKey() {
    return Secp256k1PrivateKey.newRandom();
  }
}

export { Secp256k1PrivateKey, Secp256k1PublicKey, Secp256k1Context };
