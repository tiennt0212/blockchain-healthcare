import React from 'react';
import { Dropdown as AntDropdown, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { extraSmallSize } from '../Styles/Media';
import { useDispatch } from '../../hooks';

const MenuItem = ({ path, title, ...others }) => {
  return (
    <Menu.Item {...others}>
      <Link to={path}>{title}</Link>
    </Menu.Item>
  );
};

const Dropdown = ({ items, children, fullWidthOnMobile, ...rest }) => {
  const { logout } = useDispatch(({ authentication }) => ({
    logout: authentication.logout,
  }));
  const menu = () => {
    const onClick = ({ key }) => {
      if (key === 'logout') {
        logout();
      }
    };
    return (
      <Menu onClick={onClick}>
        {items.map(({ title, hasDivider, ...rest }) => {
          return (
            <React.Fragment key={title}>
              <MenuItem title={title} {...rest} />
              {hasDivider && <Menu.Divider />}
            </React.Fragment>
          );
        })}
      </Menu>
    );
  };

  return (
    <AntDropdown
      overlay={menu}
      overlayStyle={{ width: extraSmallSize() && fullWidthOnMobile ? '100%' : 'initial' }}
      {...rest}
    >
      {children}
    </AntDropdown>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.node,
      path: PropTypes.string,
      hasDivider: PropTypes.bool,
    }),
  ).isRequired,
  fullWidthOnMobile: PropTypes.bool,
};

Dropdown.defaultProps = {
  fullWidthOnMobile: false,
};

export default Dropdown;
