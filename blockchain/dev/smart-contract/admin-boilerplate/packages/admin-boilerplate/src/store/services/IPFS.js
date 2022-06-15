import axios from 'axios';
import { IPFS_ENDPOINT_VIA_PROXY } from 'utils/constants';
import { handleError } from 'utils/handleError';

export const getJsonIPFS = async (cid) => {
  try {
    const res = await axios.post(`${IPFS_ENDPOINT_VIA_PROXY}/get/string`, {
      CID: cid,
    });
    return res.data;
  } catch (error) {
    handleError(error, 'Get error from IPFS server');
  }
};
