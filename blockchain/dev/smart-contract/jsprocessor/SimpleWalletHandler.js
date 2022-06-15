"use strict";
const { TransactionHandler } = require("sawtooth-sdk/processor/handler");
const {
  InvalidTransaction,
  InternalError,
} = require("sawtooth-sdk/processor/exceptions");
const { TextEncoder, TextDecoder } = require("text-encoding/lib/encoding");

const axios = require("axios");
const crypto = require("crypto");
const hash = (x) =>
  crypto
    .createHash("sha512")
    .update(x)
    .digest("hex")
    .toLowerCase()
    .substring(0, 64);
const CONTACT_ACTION = ["createAndCommitRecord", "acceptRecord"];
const PRIVATE_KEY = "privKey";
const PUBLIC_KEY = "pubKey";
const SW_FAMILY = "simplewallet";

var encoder = new TextEncoder("utf8");
var decoder = new TextDecoder("utf8");
const SW_NAMESPACE = hash(SW_FAMILY).substring(0, 6);
const IPFS_FLASK_ENDPOINT = "http://192.168.199.151:5001";
//function to obtain the payload obtained from the client

const postIPFS = async (path, data) => {
  try {
    const res = await axios.post(`${IPFS_FLASK_ENDPOINT}${path}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getIPFS = async (path) => {
  try {
    const res = await axios.get(`${IPFS_FLASK_ENDPOINT}${path}`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const _decodeRequest = (payload) =>
  new Promise((resolve, reject) => {
    const parsedPayload = JSON.parse(payload.toString());
    if (typeof parsedPayload !== "object") {
      let reason = new InvalidTransaction("Payload must be an object");
      reject(reason);
    } else if (payload.action) {
      let reason = new InvalidTransaction("Action is missed");
      reject(reason);
    } else {
      resolve(parsedPayload);
    }
  });

//function to display the errors
const _toInternalError = (err) => {
  console.log(" in error message block");
  let message = err.message ? err.message : err;
  throw new InternalError(message);
};

//function to set the entries in the block using the "SetState" function
const _setEntry = (context, address, stateValue) => {
  let dataBytes = encoder.encode(stateValue);
  let entries = {
    [address]: dataBytes,
  };
  return context.setState(entries);
};

const registerProfile =
  (context, address, payload, user) => async (possibleAddressValues) => {
    let stateValueRep = possibleAddressValues[address];
    let dataToStoreToMerkleTree = {};

    if (stateValueRep == null || stateValueRep == "") {
      const { metadata, content } = payload;
      console.log("No previous profile, create a new profile");
      const profileCID = await postIPFS("/store/json", {
        dataToStore: content,
      });
      dataToStoreToMerkleTree = { profile: profileCID, metadata };
    } else {
      throw new InvalidTransaction(
        "This address have been stored other metadata, cannot create one"
      );
      // const currentMetaData = decoder.decode(stateValueRep);
      // const currentMetaDataParsed = JSON.parse(currentMetaData);
      // // Append to have a new metadata.
      // const dataToStore = {...currentMetaDataParsed, profile:}
    }
    return _setEntry(context, address, JSON.stringify(dataToStoreToMerkleTree));
  };

const addNeighBor =
  (context, senderAddress, payload, receiverAddress) =>
  async (possibleAddressValues) => {
    let currentEntry = possibleAddressValues[senderAddress];
    // let currentDestEntry = possibleAddressValues[receiverAddress];
    let dataToStoreToMerkleTree = {};

    if (currentEntry == null || currentEntry == "") {
      throw new InvalidTransaction("This user is not valid");
    } else {
      currentEntry = JSON.parse(currentEntry);
      let { metadata, wishNeighbor } = payload;
      console.log(`Add ${wishNeighbor} to neighbors list`);
      dataToStoreToMerkleTree = {
        ...currentEntry,
        neighbors: [
          ...currentEntry.neighbors,
          { pubKey: wishNeighbor, metadata: { connect: true, ...metadata } },
        ],
      };
      return _setEntry(
        context,
        senderAddress,
        JSON.stringify(dataToStoreToMerkleTree)
      );
    }
  };

const removeNeighBor =
  (context, senderAddress, payload, receiverAddress) =>
  async (possibleAddressValues) => {
    let currentEntry = possibleAddressValues[senderAddress];
    // let currentDestEntry = possibleAddressValues[receiverAddress];
    let dataToStoreToMerkleTree = {};

    if (currentEntry == null || currentEntry == "") {
      throw new InvalidTransaction("This user is not valid");
    } else {
      currentEntry = JSON.parse(currentEntry);
      let { metadata, neighborPubKey } = payload;
      console.log(`Remove ${neighborPubKey} from neighbors list`);
      dataToStoreToMerkleTree = {
        ...currentEntry,
        neighbors: [
          ...currentEntry.neighbors.map((neighbor) => {
            if (neighbor.pubKey === neighborPubKey) {
              return { ...neighbor, metadata: { connect: false, ...metadata } };
            } else {
              return neighbor;
            }
          }),
        ],
      };
      return _setEntry(
        context,
        senderAddress,
        JSON.stringify(dataToStoreToMerkleTree)
      );
    }
  };

const grantAccess =
  (context, senderAddress, payload, receiverAddress) =>
  async (possibleAddressValues) => {
    let currentEntry = possibleAddressValues[senderAddress];
    currentEntry = JSON.parse(currentEntry);
    // let currentDestEntry = possibleAddressValues[receiverAddress];

    let { metadata, neighborPubKey } = payload;
    let dataToStoreToMerkleTree = {};
    if (currentEntry == null || currentEntry == "") {
      throw new InvalidTransaction("This user is not valid");
    } else {
      console.log(`Grant access for ${neighborPubKey} from neighbors list`);
      dataToStoreToMerkleTree = {
        ...currentEntry,
        neighbors: [
          ...currentEntry.neighbors.map((neighbor) => {
            if (neighbor.pubKey === neighborPubKey) {
              return { ...neighbor, connect: false };
            } else {
              return neighbor;
            }
          }),
        ],
      };
      return _setEntry(
        context,
        senderAddress,
        JSON.stringify(dataToStoreToMerkleTree)
      );
    }
  };

const createAndCommitRecord = // CONTACT_ACTION

    (context, senderAddress, payload, receiverAddress) =>
    async (possibleAddressValues) => {
      let currentEntry = possibleAddressValues[senderAddress];
      let currentDestEntry = possibleAddressValues[receiverAddress];

      // content was encrypted by the author and provide a key for the user
      // metadata include dateTime, author and description
      let senderDataToStoreToMerkleTree = {};
      let receiverDataToStoreToMerkleTree = {};
      if (
        currentEntry == null ||
        currentEntry == "" ||
        currentDestEntry == null ||
        currentDestEntry == ""
      ) {
        throw new InvalidTransaction("This user is not valid");
      } else {
        currentEntry = JSON.parse(currentEntry);
        currentDestEntry = JSON.parse(currentDestEntry);
        let { metadata, content } = payload;

        console.log(`${senderAddress} create record for ${receiverAddress}`);

        const recordCID = await postIPFS("/store/json", {
          dataToStore: content,
        });

        senderDataToStoreToMerkleTree = {
          ...currentEntry,
          records: {
            ...currentEntry.records,
            REQUEST: [
              ...currentEntry.records.REQUEST,
              { record: recordCID, metadata }, // Add a record
            ],
          },
        };

        receiverDataToStoreToMerkleTree = {
          ...currentDestEntry,
          records: {
            ...currentDestEntry.records,
            REQUEST: [
              ...currentDestEntry.records.REQUEST,
              { record: recordCID, metadata }, // Add a record
              // If the author PubKey in metadata is not same as the user PubKey
              // It means the user is the receiver
            ],
          },
        };

        _setEntry(
          context,
          senderAddress,
          JSON.stringify(senderDataToStoreToMerkleTree)
        );
        _setEntry(
          context,
          receiverAddress,
          JSON.stringify(receiverDataToStoreToMerkleTree)
        );
      }
    };

const acceptRecord = //CONTACT_ACTION

    (context, senderAddress, payload, receiverAddress) =>
    async (possibleAddressValues) => {
      let currentEntry = possibleAddressValues[senderAddress];
      let currentDestEntry = possibleAddressValues[receiverAddress];

      // content was encrypted by the author and provide a key for the user
      // metadata include dateTime, author and description
      let senderDataToStoreToMerkleTree = {};
      let receiverDataToStoreToMerkleTree = {};
      if (currentEntry == null || currentEntry == "") {
        throw new InvalidTransaction("This user is not valid");
      } else {
        currentEntry = JSON.parse(currentEntry);
        currentDestEntry = JSON.parse(currentDestEntry);
        let { metadata, recordCID } = payload;

        console.log(
          `${senderAddress} accept record CID ${recordCID} from ${receiverAddress}`
        );

        const acceptedRecord = currentEntry.records.REQUEST.filter((r) => {
          if (r.record == recordCID) {
            return;
          }
        });

        senderDataToStoreToMerkleTree = {
          ...currentEntry,
          records: {
            ...currentEntry.records,
            REQUEST: [
              ...currentEntry.records.REQUEST.filter((r) => {
                if (r.record == recordCID) {
                  currentEntry.records.MYDATA = [
                    ...currentEntry.records.MYDATA,
                    r,
                  ];
                  return false;
                } else return true;
              }),
            ],
            MYDATA: [...senderDataToStoreToMerkleTree.MYDATA],
          },
        };

        receiverDataToStoreToMerkleTree = {
          ...currentDestEntry,
          records: {
            ...currentDestEntry.records,
            REQUEST: [
              ...currentDestEntry.records.REQUEST.filter(
                (r) => r.record !== recordCID
              ),
            ],
          },
        };

        _setEntry(
          context,
          senderAddress,
          JSON.stringify(senderDataToStoreToMerkleTree)
        );
        _setEntry(
          context,
          receiverAddress,
          JSON.stringify(receiverDataToStoreToMerkleTree)
        );
      }
    };

class SimpleWalletHandler extends TransactionHandler {
  constructor() {
    super(SW_FAMILY, ["1.0"], [SW_NAMESPACE]);
  }
  apply(transactionProcessRequest, context) {
    return _decodeRequest(transactionProcessRequest.payload)
      .catch(_toInternalError)
      .then((update) => {
        let header = transactionProcessRequest.header;
        let userPublicKey = header.signerPublicKey;
        const { action, toKey, ...metadata } = update;
        // Select the action to be performed
        let actionFn;
        if (action === "registerProfile") {
          actionFn = registerProfile;
        } else if (action === "addNeighBor") {
          actionFn = addNeighBor;
        } else if (action === "removeNeighBor") {
          actionFn = removeNeighBor;
        } else if (action === "grantAccess") {
          actionFn = grantAccess;
        } else if (action === "createAndCommitRecord") {
          actionFn = createAndCommitRecord;
        } else if (action === "acceptRecord") {
          actionFn = acceptRecord;
        } else {
          throw new InvalidTransaction(`Action ${action} is not supported`);
        }
        const senderAddress = SW_NAMESPACE + hash(userPublicKey).slice(-64);
        let receiverAddress;
        if (toKey != undefined) {
          receiverAddress = SW_NAMESPACE + hash(update.toKey).slice(-64);
        }
        // Get the current state, for the key's address:
        let getPromise;
        if (CONTACT_ACTION.includes(action))
          getPromise = context.getState([senderAddress, receiverAddress]);
        else getPromise = context.getState([senderAddress]);
        let actionPromise = getPromise.then(
          actionFn(context, senderAddress, metadata, receiverAddress)
        );
        return actionPromise.then((addresses, a) => {
          if (addresses.length === 0) {
            throw new InternalError("State Error!");
          }
        });
      });
  }
}
module.exports = SimpleWalletHandler;
