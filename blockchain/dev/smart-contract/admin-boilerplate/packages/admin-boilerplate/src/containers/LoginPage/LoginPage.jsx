import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'hooks';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import { Brand } from 'components/Brand';
import { LoginForm } from './LoginForm';
import { SignUp } from './SignUp';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;

  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  h1 {
    text-align: center;
    margin: 0px 0px 50px 0px;
    font-weight: 600;
  }
  .form {
    margin-top: 20px;
    padding: 0px 150px;
    display: flex;
    justify-content: space-between;

    h2 {
      text-align: center;
      margin-bottom: 40px;
    }

    .form__sign-in {
      flex-basis: 40%;
    }

    .form__sign-up {
      flex-basis: 60%;
    }
  }
`;

const LoginPage = () => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const loading = useSelector((state) => state.loading.global);

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Wrapper>
        <Helmet>
          <title>Welcome to Health Plus</title>
        </Helmet>
        <Brand />
        <h1>Welcome to Health Plus</h1>
        <div className="form">
          <div className="form__sign-in">
            <h2>Import Key for Sign In</h2>
            <LoginForm />
          </div>
          <div className="form__sign-up">
            <h2> Sign Up Your Information</h2>
            <SignUp />
          </div>
        </div>
      </Wrapper>
    </Spin>
  );
};

export default LoginPage;
