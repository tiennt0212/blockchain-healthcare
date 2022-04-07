import { notification } from 'antd';
import { f2Qp } from 'utils/f2Qp';
import { URL_SERVER_HOST } from 'utils/constants';
import { handleError } from 'utils/handleError';
import { axiosConfigHeader } from 'utils/axiosConfig';
import axios from 'axios';

const mediasModel = {
  name: 'mediasModel',
  state: {
    medias: [],
    pagination: {
      total: 0,
      page: 1,
      pageSize: 10,
    },
    filterOptions: '',
  },
  reducers: {
    setMedias(state, { data, pagination, filterOptions }) {
      return {
        ...state,
        medias: data,
        pagination,
        filterOptions,
      };
    },
  },
  effects: () => ({
    async fetchMedias(payload, state) {
      const { pagination, filterOptions } = state.mediasModel;
      const { page, pageSize, filterOptions: filterPayload } = { ...pagination, ...payload };
      const queryFilter = filterPayload ? filterPayload : filterOptions;
      try {
        const response = await axios.get(
          `${URL_SERVER_HOST}/medias?${f2Qp(
            queryFilter,
          )}&page=${page}&pageSize=${pageSize}&_sort=id:ASC`,
          axiosConfigHeader(),
        );
        this.setMedias({ ...response.data, filterOptions: queryFilter });
      } catch (err) {
        handleError(err, 'Fetch data failed');
      }
    },
    async create(payload) {
      try {
        await axios.post(`${URL_SERVER_HOST}/medias`, payload, axiosConfigHeader());
        notification.success({
          message: 'Successfully create item!',
        });
      } catch (err) {
        handleError(err, 'Create failed');
      }
    },
    async update(payload) {
      try {
        await axios.put(`${URL_SERVER_HOST}/medias/${payload.id}`, payload, axiosConfigHeader());
        notification.success({
          message: 'Successfully update item!',
        });
      } catch (err) {
        handleError(err, 'Update failed');
      }
    },
    async delete(id, state) {
      try {
        await axios.delete(`${URL_SERVER_HOST}/medias/${id}`, axiosConfigHeader());

        const { page, pageSize, total } = state.mediasModel.pagination;

        // check for deleting the last item of the last page AND not in the first page
        if (total - pageSize * (page - 1) < 2 && page !== 1) {
          this.fetchMedias({ page: page - 1 });
        } else {
          this.fetchMedias();
        }

        notification.success({
          message: 'Success',
          description: 'Successfully delete item!',
        });
      } catch (err) {
        handleError(err, 'Delete failed');
      }
    },
  }),
};

export default mediasModel;
