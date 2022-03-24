import { notification } from 'antd';
import store from 'store';

const handleMessage = (prefix, message) => `${prefix}: ${message}.`;

export const handleError = (err, prefixMessage) => {
  const errors = err?.response?.data?.data?.errors;
  const message = errors ? errors[Object.keys(errors)[0]][0] : err?.response?.data?.message;
  if (err?.response?.data?.statusCode === 401) {
    store.dispatch.authentication.logout();
  }
  notification.error({
    message: handleMessage(prefixMessage, message),
  });
};
