import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'hooks';

import { media, mediaMaxWidth } from 'components/Styles/Media';

const { SubMenu } = Menu;
const { Sider } = Layout;

const StyledSider = styled(Sider)`
  transform: ${({ collapsed }) => (collapsed ? 'translateX(-100%)' : 'translateX(0)')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  min-height: 100vh;

  &.ant-layout-sider-collapsed {
    .logo {
      h1 {
        display: none;
      }
    }
  }
  .ant-layout-sider-children {
    height: auto;
    .ant-menu {
      height: 100%;
      border-right: 0;
    }
  }

  ${media.md`
    transition: none !important;
    transform: none;

    position: relative;
    max-height: 100vh;

    .ant-layout-sider-trigger {
      transition: none;
      position: absolute;
    }
  `}

  ${mediaMaxWidth.md`
    position: fixed !important;
  `}
`;

const sideBarClassName = 'main-side-bar';

const MenuItem = ({ onClickItem, path, title, ...others }) => {
  return (
    <Menu.Item onClick={onClickItem} {...others}>
      <Link to={path}>{title}</Link>
    </Menu.Item>
  );
};

const renderMenu = (items) =>
  items.map((item) => {
    const { key, title, subMenu, ...others } = item;
    return subMenu ? (
      <SubMenu key={key} title={title} {...others}>
        {renderMenu(subMenu)}
      </SubMenu>
    ) : (
      <MenuItem key={key} title={title} {...others} />
    );
  });

export const Sidebar = ({ items, children, collapsed, toggleSidebar }) => {
  const { pathname } = useLocation();
  const openedKey = pathname.split('-')[0].replace('/', '');
  const [sideBarOpenedKeys, setSideBarOpenedKeys] = useState([]);
  const sidebarTheme = useSelector((state) => state.sidebarTheme.theme);

  useEffect(() => {
    if (!collapsed) {
      setSideBarOpenedKeys([openedKey]);
    }
  }, [openedKey, collapsed]);

  const onCollapse = (collapsed, type) => {
    if (type === 'clickTrigger') toggleSidebar();
  };

  return (
    <StyledSider
      width={208}
      className={sideBarClassName}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={onCollapse}
    >
      {children}
      <Menu
        mode="inline"
        onOpenChange={(items) => setSideBarOpenedKeys(items)}
        openKeys={sideBarOpenedKeys}
        defaultSelectedKeys={[pathname]}
        theme={sidebarTheme}
      >
        {renderMenu(items)}
      </Menu>
    </StyledSider>
  );
};

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string,
      icon: PropTypes.node,
      path: PropTypes.string,
      subMenu: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string,
          icon: PropTypes.node,
          path: PropTypes.string,
        }),
      ),
      hasDivider: PropTypes.bool,
    }),
  ).isRequired,
};

Sidebar.defaultProps = {
  toggleSidebar: () => {},
};
