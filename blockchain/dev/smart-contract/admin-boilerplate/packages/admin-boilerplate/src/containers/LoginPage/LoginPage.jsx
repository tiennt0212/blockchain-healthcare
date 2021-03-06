import styled from 'styled-components/macro';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'hooks';
import { Redirect } from 'react-router-dom';
import { Spin, Button } from 'antd';

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
    height: 60vh;

    h2 {
      text-align: center;
      margin-bottom: 40px;
    }

    .form__sign-left {
      flex-basis: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .form__sign-right {
      flex-basis: 60%;
    }
  }
`;

const LoginPage = () => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const loading = useSelector((state) => state.loading.global);
  const [login, setLoginPage] = useState(true);
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
          <div className="form__sign-left">
            <Button type="primary" onClick={() => setLoginPage(true)}>
              Import Key for Sign In
            </Button>
            <Button onClick={() => setLoginPage(false)}>Sign Up an account</Button>
          </div>
          <div className="form__sign-right">{login ? <LoginForm /> : <SignUp />}</div>
        </div>
      </Wrapper>
    </Spin>
  );
};

export default LoginPage;
