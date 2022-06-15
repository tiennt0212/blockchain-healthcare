import { init } from '@rematch/core';
import mediasModel from '../mediasModel';
import { URL_SERVER_HOST } from 'utils/constants';

import axios from 'axios';

const axiosConfigHeader = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
  },
};

describe('mediasModel', () => {
  describe('reducers', () => {
    it('add', () => {
      const store = init({
        models: { mediasModel },
      });

      const nObj = {};

      store.dispatch.mediasModel.add(nObj);

      expect(store.getState().mediasModel).toEqual({
        medias: [nObj],
      });
    });

    it('remove', () => {
      mediasModel.state.medias = [{ id: 1 }, { id: 2 }];

      const store = init({
        models: { mediasModel },
      });

      store.dispatch.mediasModel.remove(2);

      expect(store.getState().mediasModel).toEqual({
        medias: [{ id: 1 }],
      });
    });

    it('edit', () => {
      mediasModel.state.medias = [
        { id: 1, name: 'n 1' },
        { id: 2, name: 'n 2' },
      ];

      const store = init({
        models: { mediasModel },
      });

      store.dispatch.mediasModel.edit({ id: 2, name: 'n 2 edited' });

      expect(store.getState().mediasModel).toEqual({
        medias: [
          { id: 1, name: 'n 1' },
          { id: 2, name: 'n 2 edited' },
        ],
      });
    });
  });

  describe('effects', () => {
    it('create', async () => {
      const store = init({
        models: { mediasModel },
      });
      const spyAdd = jest.spyOn(store.dispatch.mediasModel, 'add');
      const nObj = {};
      await store.dispatch.mediasModel.create(nObj);

      expect(axios.post).toBeCalledWith(`${URL_SERVER_HOST}/medias`, nObj, axiosConfigHeader);
      expect(spyAdd).toBeCalledWith(nObj);
    });

    it('update', async () => {
      const store = init({
        models: { mediasModel },
      });
      const spy = jest.spyOn(store.dispatch.mediasModel, 'edit');
      const nObj = {};
      await store.dispatch.mediasModel.update(nObj);

      expect(axios.put).toBeCalledWith(
        `${URL_SERVER_HOST}/medias/${nObj.id}`,
        nObj,
        axiosConfigHeader,
      );
      expect(spy).toBeCalledWith(nObj);
    });

    it('delete', async () => {
      const store = init({
        models: { mediasModel },
      });
      const spy = jest.spyOn(store.dispatch.mediasModel, 'remove');
      const id = 1;
      await store.dispatch.mediasModel.delete(id);

      expect(axios.delete).toBeCalledWith(`${URL_SERVER_HOST}/medias/${id}`, axiosConfigHeader);
      expect(spy).toBeCalledWith(id);
    });
  });
});
