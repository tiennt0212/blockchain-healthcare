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
// import * as fs from 'fs';
import * as fetch from 'node-fetch';

// FAMILY_NAME = 'simplewallet';

const REST_API_ENDPOINT = 'http://0.0.0.0:8080/http://172.18.0.5:8008';

function hash(v) {
  return createHash('sha512').update(v).digest('hex');
}

export default class {
  constructor(userid) {
    const privateKeyStrBuf = this.getUserPriKey(userid);
    const privateKeyStr = privateKeyStrBuf.toString().trim();
    const context = createContext('secp256k1');
    const privateKey = Secp256k1PrivateKey.fromHex(privateKeyStr);
    this.signer = new CryptoFactory(context).newSigner(privateKey);
    this.publicKey = this.signer.getPublicKey().asHex();
    this.address = hash('simplewallet').substr(0, 6) + hash(this.publicKey).substr(0, 64);
    console.log('Storing at: ' + this.address);
  }

  deposit(amount) {
    this._wrap_and_send('deposit', [amount]);
  }

  withdraw(amount) {
    this._wrap_and_send('withdraw', [amount]);
  }

  balance() {
    let amount = this._send_to_rest_api(null);
    return amount;
  }

  transfer(user2, amount) {
    this._wrap_and_send('transfer', [amount, user2]);
  }

  getUserPriKey(userid) {
    // console.log(userid);
    // console.log('Current working directory is: ' + process.cwd());
    // var userprivkeyfile = '/home/thanhtien/.sawtooth/keys/' + userid + '.priv';
    // return fs.readFileSync(userprivkeyfile);
    return sessionStorage.getItem(`privKey-${userid}`);
  }

  getUserPubKey(userid) {
    // console.log(userid);
    // console.log('Current working directory is: ' + process.cwd());
    // var userpubkeyfile = '/home/thanhtien/.sawtooth/keys/' + userid + '.pub';
    // return fs.readFileSync(userpubkeyfile, 'utf-8');
    return sessionStorage.getItem(`pubKey-${userid}`);
  }

  _wrap_and_send(action, values) {
    var payload = '';
    const address = this.address;
    console.log('wrapping for: ' + this.address);
    var inputAddressList = [address];
    var outputAddressList = [address];
    if (action === 'transfer') {
      const pubKeyStrBuf = this.getUserPubKey(values[1]);
      const pubKeyStr = pubKeyStrBuf.toString().trim();
      var toAddress = hash('simplewallet').substr(0, 6) + hash(pubKeyStr).substr(0, 64);
      inputAddressList.push(toAddress);
      outputAddressList.push(toAddress);
      payload = action + ',' + values[0] + ',' + pubKeyStr;
    } else {
      payload = action + ',' + values[0];
    }
    var enc = new TextEncoder('utf8');
    const payloadBytes = enc.encode(payload);
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
    this._send_to_rest_api(batchListBytes);
  }

  _send_to_rest_api(batchListBytes) {
    if (batchListBytes == null) {
      var geturl = `${REST_API_ENDPOINT}/state/` + this.address;
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
          var data = responseJson.data;
          var amount = new Buffer(data, 'base64').toString();
          return amount;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetch(`${REST_API_ENDPOINT}/batches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: batchListBytes,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}
