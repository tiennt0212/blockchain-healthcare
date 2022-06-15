// CORE API: https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
// FILE API: https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md

import { create } from "ipfs-http-client";

const IPFS_ENDPOINT = "http://172.18.0.7:5001";
const client = create(IPFS_ENDPOINT);

export const StoreData = (data) => {
  const rs = client.add("Hello world!");
  console.log(rs);
  console.log(rs.cid);
};
