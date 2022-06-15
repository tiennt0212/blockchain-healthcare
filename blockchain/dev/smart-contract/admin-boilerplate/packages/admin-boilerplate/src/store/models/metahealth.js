// const { SimpleWalletClient } = require('../services/SimpleWalletClient');
import HealthPlus from '../services/HealthPlus';
// import { HelloWorld } from 'store/services/IPFS_Service';
import { generateRandomString } from 'utils/app';
import {
  PRIVATE_KEY,
  PUBLIC_KEY,
  METAHEALTHID,
  BLOCKCHAIN_API_VIA_PROXY,
  PROXY_ENDPOINT,
} from 'utils/constants';
import { decryptABE } from 'store/services/Crypto';
import { encryptABE } from 'store/services/Crypto';
import { getJsonIPFS } from 'store/services/IPFS';
import { encryptAttributesList, removeLocalStorageUser } from 'utils/app';
// import { axiosConfigHeader } from 'utils/axiosConfig';
// import axios from 'axios';
import { notification } from 'antd';
import { handleError } from 'utils/handleError';

const initialValues = '';

const metaHealth = {
  name: 'metaHealth',
  state: initialValues,
  reducers: {
    setMetaHealth(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    async registerProfile(payload) {
      const keyPair = new HealthPlus().genKeyPair();
      const { privKey } = keyPair;
      const randomID = generateRandomString();
      localStorage.setItem(`${PRIVATE_KEY}${randomID}`, keyPair[PRIVATE_KEY]);
      localStorage.setItem(`${PUBLIC_KEY}${randomID}`, keyPair[PUBLIC_KEY]);
      localStorage.setItem(METAHEALTHID, randomID);
      const client = new HealthPlus(randomID);

      // Build attrList
      const encryptedOwnerList = encryptAttributesList(['OWNER'], privKey.slice(0, 32));

      // Set policy string
      const encryptedWriterList = encryptAttributesList(['WRITE'], privKey.slice(0, 32));
      const encryptedReaderList = encryptAttributesList(['READ'], privKey.slice(0, 32));
      const policyStr = `(${encryptedOwnerList.join(
        ' and ',
      )} or (READ and (${encryptedReaderList.join(
        ' or ',
      )})) or (WRITE and (${encryptedWriterList.join(' or ')})))`;

      // Encrypt data
      const profileData = { metaHealthID: randomID, ...payload, ...keyPair };

      try {
        const resEncrypted = await encryptABE(policyStr, encryptedOwnerList, profileData);
        const {
          data: { masterKey, publicKey, secretKey, combinedData },
        } = resEncrypted;
        const res = await client.registerProfile({
          content: combinedData, // include publicKey, masterKey, secretKey and combinedData
          metadata: {
            created_at: Date.now(),
            desc: 'Register Profile',
            owner: keyPair[PUBLIC_KEY],
            policyStr,
            masterKey,
            publicKey,
            secretKey,
            //history is null
          },
        });
        // Wait 8s for batch status
        return await fetch(`${PROXY_ENDPOINT}/${res.link}&wait=8`)
          .then((res) => res.json())
          .then((resJson) => {
            const batchStatus = resJson;
            const { invalid_transactions, status } = batchStatus.data[0];
            if (!invalid_transactions?.length && status === 'COMMITTED') {
              notification.success({
                message: 'Success',
                description: 'Successfully register profile',
              });
              this.getMetaData(randomID);
            } else {
              removeLocalStorageUser(randomID);
            }
            dispatch.authentication.setIsAuthenticated(true);
            return resJson;
          });
      } catch (error) {
        console.log(error);
        handleError(error, 'Some error occured');
        removeLocalStorageUser(randomID);
      }
      // console.log(payload);
    },
    async getProfileData(id) {
      const address = new HealthPlus(id).getAddress();
      try {
        return await fetch(`${BLOCKCHAIN_API_VIA_PROXY}/state/${address}`)
          .then((res) => res.json())
          .then((resJson) => {
            const bufferData = new Buffer(resJson.data, 'base64');
            const dataParsedStr = bufferData.toString('ascii');
            const dataParsedJSON = JSON.parse(dataParsedStr);
            return dataParsedJSON;
          })
          .then(async (dataParsedJSON) => {
            const { profile: profileCID } = dataParsedJSON;
            const { publicKey, secretKey } = dataParsedJSON.metadata;
            const content = await this.getContentAndDecrypt({
              cid: profileCID,
              publicKey,
              secretKey,
            });

            this.setMetaHealth({ profile: { metadata: dataParsedJSON.metadata, content } });
            return dataParsedJSON;
          });
      } catch (error) {
        console.log(error);
        handleError(error, 'Some error occured');
      }
    },
    async getContentAndDecrypt(payload) {
      const { cid, publicKey, secretKey } = payload;
      try {
        const combinedData = await getJsonIPFS(cid);
        return await decryptABE(publicKey, secretKey, combinedData);
      } catch (error) {
        // Dont need to log error
      }
    },
  }),
  selectors: (slice) => ({
    getMeta() {
      return slice((metaHealth) => metaHealth?.metadata);
    },
  }),
};

export default metaHealth;
