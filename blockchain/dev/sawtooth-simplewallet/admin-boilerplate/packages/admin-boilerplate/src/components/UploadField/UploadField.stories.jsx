import { UploadField } from './UploadField';
import { Form as AntForm } from 'antd';
import { Provider } from 'react-redux';
import store from 'store';

export default {
  title: 'Components/UploadField',
  component: UploadField,
};

export const Template = (args) => {
  const [form] = AntForm.useForm();
  return (
    <Provider store={store}>
      <UploadField form={form} {...args} />
    </Provider>
  );
};
