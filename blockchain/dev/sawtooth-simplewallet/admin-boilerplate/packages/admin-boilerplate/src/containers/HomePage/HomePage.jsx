import styled from 'styled-components';
import { Layout } from 'components/Layout';
import { Helmet } from 'react-helmet-async';
import i18n from 'i18next';

const Instruction = styled.div`
  > code {
    color: #d32029;
  }

  > .collection-name-list {
    margin-left: 40px;
    list-style-type: circle;
  }
`;

function HomePage() {
  return (
    <Layout menuOpenedKey={'Home'} menuSelectedKey={'Home'}>
      <Helmet>
        <title>{i18n.t('home.page_title', 'Home Page')}</title>
      </Helmet>
      <Instruction></Instruction>
    </Layout>
  );
}

export default HomePage;
