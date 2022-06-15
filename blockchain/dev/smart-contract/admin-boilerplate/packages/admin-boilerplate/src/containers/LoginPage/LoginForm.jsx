import styled from 'styled-components';
// import { Form, Input, Button, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { Alert } from 'antd';
// import { useSelector } from 'hooks';
import { useDispatch } from 'hooks';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { PRIVATE_KEY, PUBLIC_KEY, METAHEALTHID } from 'utils/constants';

const { Dragger } = Upload;
const Wrapper = styled.div`
  height: 60%;
  align-items: center;
`;

export const LoginForm = () => {
  // const message = useSelector((state) => state.authentication.message);
  const { login } = useDispatch(({ authentication }) => ({
    login: authentication.login,
    // setMessage: authentication.setMessage,
  }));

  const props = {
    name: 'file',
    beforeUpload: (file) => {
      console.log(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        login(data);
      };
      reader.readAsText(file);

      // Prevent upload
      return false;
    },
    onDrop: () => {
      const isLoggedIn =
        localStorage.getItem(`${PRIVATE_KEY}${METAHEALTHID}`) &&
        localStorage.getItem(`${PUBLIC_KEY}${METAHEALTHID}`);
      if (isLoggedIn) console.log('isLogged');
    },
  };

  return (
    <Wrapper>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">CLICK or DRAG the key file to this area</p>
        <p className="ant-upload-hint">
          The key file includes sensitive contents. Do not share it to anyone else.
        </p>
      </Dragger>
    </Wrapper>
  );
};
