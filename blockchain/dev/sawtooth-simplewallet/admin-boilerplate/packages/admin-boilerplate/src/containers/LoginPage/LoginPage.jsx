import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'hooks';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import { Brand } from 'components/Brand';
import { LoginForm } from './LoginForm';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;

  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');

  h3 {
    text-align: center;
    margin: 50px 0;
  }
`;

const LoginPage = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const loading = useSelector((state) => state.loading.global);

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Wrapper>
        <Helmet>
          <title>{t('login.page_title', 'Login')}</title>
        </Helmet>
        <Brand />
        <h3>{t('login.title', 'Login')}</h3>
        <LoginForm />
      </Wrapper>
    </Spin>
  );
};

export default LoginPage;
