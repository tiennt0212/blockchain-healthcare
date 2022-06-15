// const { createHash } = require('crypto');
// const { CryptoFactory, createContext } = require('sawtooth-sdk/signing');
// const protobuf = require('sawtooth-sdk/protobuf');
// const fetch = require('node-fetch');
// const { Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1');
// const { TextEncoder } = require('text-encoding/lib/encoding');
import { createHash } from 'crypto';
import { CryptoFactory, createContext } from 'sawtooth-sdk/signing';
import protobuf from 'sawtooth-sdk/protobuf';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
import { TextEncoder } from 'text-encoding/lib/encoding';
import { BLOCKCHAIN_API_VIA_PROXY, PRIVATE_KEY, PUBLIC_KEY } from 'utils/constants';
import * as fetch from 'node-fetch';

// FAMILY_NAME = 'simplewallet';

const CONTACT_ACTION = ['transfer'];
function hash(v) {
  return createHash('sha512').update(v).digest('hex');
}

export default class {
  constructor(id) {
    // const privateKeyStrBuf = this.getUserPriKey(id);
    // const privateKeyStr = privateKeyStrBuf.toString().trim();
    this.context = createContext('secp256k1');
    if (id) {
      const privateKeyStr = this.getUserPriKey(id);
      const privateKey = Secp256k1PrivateKey.fromHex(privateKeyStr);
      this.signer = new CryptoFactory(this.context).newSigner(privateKey);
      this.publicKey = this.signer.getPublicKey().asHex();
      this.address = hash('simplewallet').substr(0, 6) + hash(this.publicKey).substr(0, 64);
      console.log('Storing at: ' + this.address);
    }
  }

  registerProfile(payload) {
    return this._wrap_and_send('registerProfile', payload);
  }

  addNeighBor(payload) {
    return this._wrap_and_send('addNeighBor', payload);
  }

  removeNeighBor(payload) {
    return this._wrap_and_send('removeNeighBor', payload);
  }

  grantAccess(payload) {
    return this._wrap_and_send('grantAccess', payload);
  }

  createAndCommitRecord(payload) {
    // CONTACT_ACTION
    return this._wrap_and_send('createAndCommitRecord', payload);
  }

  acceptRecord(payload) {
    // CONTACT_ACTION
    return this._wrap_and_send('acceptRecord', payload);
  }

  getMetaData() {
    // Get all meta data without payload
    return this._wrap_and_send('getMetaData', { info: 'GET_ALL_METADATA' });
  }

  getUserPriKey(id) {
    return localStorage.getItem(`${PRIVATE_KEY}${id}`);
  }

  getUserPubKey(id) {
    return localStorage.getItem(`${PUBLIC_KEY}${id}`);
  }

  getAddress() {
    return this.address;
  }

  genKeyPair() {
    const privateKey = this.context.newRandomPrivateKey();
    const publicKey = this.context.getPublicKey(privateKey);
    return { [PRIVATE_KEY]: privateKey.asHex(), [PUBLIC_KEY]: publicKey.asHex() };
  }
  _wrap_and_send(action, payload) {
    const address = this.address;
    console.log('wrapping for: ' + this.address);
    var inputAddressList = [address];
    var outputAddressList = [address];
    if (CONTACT_ACTION.includes(action)) {
      // Handle payload for CONTACT_ACTION
      const pubKeyStrBuf = this.getUserPubKey(payload.receiver);
      const pubKeyStr = pubKeyStrBuf.toString().trim();
      // Add address of the to inputAddressList and outputAddressList.
      var toAddress = hash('simplewallet').substr(0, 6) + hash(pubKeyStr).substr(0, 64);
      inputAddressList.push(toAddress);
      outputAddressList.push(toAddress);
    }
    var enc = new TextEncoder('utf8');
    const payloadToSend = JSON.stringify({ action: action, ...payload });
    const payloadBytes = enc.encode(payloadToSend);
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
      familyName: 'simplewallet',
      familyVersion: '1.0',
      inputs: inputAddressList,
      outputs: outputAddressList,
      signerPublicKey: this.signer.getPublicKey().asHex(),
      nonce: '' + Math.random(),
      batcherPublicKey: this.signer.getPublicKey().asHex(),
      dependencies: [],
      payloadSha512: hash(payloadBytes),
    }).finish();
    const transaction = protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: this.signer.sign(transactionHeaderBytes),
      payload: payloadBytes,
    });
    const transactions = [transaction];
    const batchHeaderBytes = protobuf.BatchHeader.encode({
      signerPublicKey: this.signer.getPublicKey().asHex(),
      transactionIds: transactions.map((txn) => txn.headerSignature),
    }).finish();
    const batchSignature = this.signer.sign(batchHeaderBytes);
    const batch = protobuf.Batch.create({
      header: batchHeaderBytes,
      headerSignature: batchSignature,
      transactions: transactions,
    });
    const batchListBytes = protobuf.BatchList.encode({
      batches: [batch],
    }).finish();
    return this._send_to_rest_api(batchListBytes);
  }

  _send_to_rest_api(batchListBytes) {
    if (batchListBytes == null) {
      var geturl = `${BLOCKCHAIN_API_VIA_PROXY}/state/` + this.address;
      console.log('Getting from: ' + geturl);
      return fetch(
        geturl,
        {
          method: 'GET',
        },
        { mode: 'no-cors' },
      )
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
          // var data = responseJson.data;
          // var amount = new Buffer(data, 'base64').toString();
          // return amount;
        })
        .catch((error) => {
          return error;
        });
    } else {
      return fetch(`${BLOCKCHAIN_API_VIA_PROXY}/batches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: batchListBytes,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          return error;
        });
    }
  }
}
