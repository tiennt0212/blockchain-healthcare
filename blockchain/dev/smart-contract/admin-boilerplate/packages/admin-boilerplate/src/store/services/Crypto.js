import axios from 'axios';
import { CRYPTO_ENDPOINT_VIA_PROXY } from 'utils/constants';
import { handleError } from 'utils/handleError';

export const encryptABE = async (policy, attrList, dataToEncrypt) => {
  try {
    return await axios.post(`${CRYPTO_ENDPOINT_VIA_PROXY}/encrypt`, {
      policy,
      attrList,
      dataToEncrypt,
    });
  } catch (error) {
    handleError(error, 'Get error from Crypto - ABE encryption');
  }
};

export const decryptABE = async (publicKey, secretKey, combinedData) => {
  try {
    const res = await axios.post(`${CRYPTO_ENDPOINT_VIA_PROXY}/decrypt`, {
      publicKey,
      secretKey,
      combinedData,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    handleError(error, 'Get error from Crypto - ABE decryption');
  }
};
