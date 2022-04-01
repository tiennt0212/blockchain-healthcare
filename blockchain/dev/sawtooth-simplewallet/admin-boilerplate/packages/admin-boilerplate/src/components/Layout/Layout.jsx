import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Breadcrumb, Card } from 'antd';

const Main = styled(Card)`
  margin: 24px;
  padding: 24px;
  min-height: 360px;
`;

const Layout = ({ children, breadcrumbItems }) => {
  return (
    <>
      {breadcrumbItems.length > 0 && (
        <Breadcrumb>
          {breadcrumbItems.map((item, index) => (
            <Breadcrumb.Item key={index}>
              <Link to={item.link}>{item.title}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}
      <Main>{children}</Main>
    </>
  );
};

Layout.propTypes = {
  breadcrumbItems: PropTypes.array,
};

Layout.defaultProps = {
  breadcrumbItems: [],
};

export default Layout;
