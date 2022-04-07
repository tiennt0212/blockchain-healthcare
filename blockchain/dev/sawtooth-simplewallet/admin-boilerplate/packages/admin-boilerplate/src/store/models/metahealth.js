// const { SimpleWalletClient } = require('../services/SimpleWalletClient');
import SimpleWalletClient from '../services/SimpleWalletClient';
const initialValues = '';
const client = new SimpleWalletClient('thanhtien');

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
  effects: () => ({
    async deposit({ number }) {
      console.log(number);
      const res = await client.deposit(number);
      console.log(res);
    },
  }),
};

export default metaHealth;
