import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'hooks';

const StyledForm = styled(Form)`
  max-width: 300px;
  margin: 0 auto;

  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
    margin-bottom: 15px;
  }
`;

export const LoginForm = () => {
  const message = useSelector((state) => state.authentication.message);
  const { login, setMessage } = useDispatch(({ authentication }) => ({
    login: authentication.login,
    setMessage: authentication.setMessage,
  }));

  const { t } = useTranslation();
  const onFinish = (values) => {
    login(values);
  };

  const onValuesChange = (changedValues) => {
    if (changedValues) {
      setMessage('');
    }
  };

  return (
    <StyledForm
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        name="username"
        autoComplete="username"
        rules={[
          {
            required: true,
            message: t('login_form.input_username', 'Please input your Username!'),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={t('login_form.username_placeholder', 'Username')}
          autoComplete="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t('login_form.input_password', 'Please input your Password!'),
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          autoComplete="password"
          placeholder={t('login_form.password_placeholder', 'Password')}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>{t('login_form.remember_me', 'Remember me')}</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          {t('login_form.forgot_password', 'Forgot password')}
        </a>
      </Form.Item>
      {message && (
        <Form.Item>
          <Alert message="Identifier or password invalid" type="error" showIcon />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {t('login_form.log_in', 'Log in')}
        </Button>
        {t('login_form.or', 'Or')} <a href="">{t('login_form.register_now', 'register now!')}</a>
      </Form.Item>
    </StyledForm>
  );
};
