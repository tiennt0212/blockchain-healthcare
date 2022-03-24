import { push } from 'connected-react-router';
import axios from 'axios';

import { URL_SERVER_HOST } from 'utils/constants';
import { axiosConfigUploadFile } from 'utils/axiosConfig';

const app = {
  state: {
    isFirstLoad: false,
  },
  reducers: {
    setFirstLoad(state, payload) {
      return {
        ...state,
        isFirstLoad: payload,
      };
    },
  },
  effects: (dispatch) => ({
    async navigateExample() {
      dispatch(push('/login'));
    },
    async getLocation(payload, rootState) {
      return rootState.router.location;
    },
    async uploadImages(payload) {
      const { onSuccess, file, form, isMultiUpload, fieldName, images, handleFileUrl } = payload;
      try {
        // Upload file data to server and assign response data to Upload field value.
        const fmData = new FormData();
        fmData.append('files', file);
        axios.post(`${URL_SERVER_HOST}/upload`, fmData, axiosConfigUploadFile()).then((res) => {
          onSuccess(file);
          // When uploading multiple files, the Upload field value will be an array with
          // the previous data and the respone data.
          // When uploading a single file, the Upload field value will be set to the respone data.
          const image = images ? images : [];
          res.data[0].url = handleFileUrl(res.data[0].url);
          form.setFieldsValue({
            [fieldName]: isMultiUpload ? [...image, res.data[0]] : res.data[0],
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
  }),
};

export default app;
