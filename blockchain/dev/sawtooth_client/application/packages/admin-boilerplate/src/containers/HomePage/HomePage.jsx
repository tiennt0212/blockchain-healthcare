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
  const collectionNames = require('./collectionNames.json');
  const collectionName = collectionNames.map((name, index) => <li key={index}>{name}</li>);

  return (
    <Layout menuOpenedKey={'Home'} menuSelectedKey={'Home'}>
      <Helmet>
        <title>{i18n.t('home.page_title', 'Home Page')}</title>
      </Helmet>
      <Instruction>
        If you do not have a model page yet, use <code>yarn get-model</code> command to update your
        JSON file and <code>yarn generate</code> to create a new model page according to your below
        collectionNames.
        <ul className="collection-name-list">{collectionName}</ul>
      </Instruction>
    </Layout>
  );
}

export default HomePage;
