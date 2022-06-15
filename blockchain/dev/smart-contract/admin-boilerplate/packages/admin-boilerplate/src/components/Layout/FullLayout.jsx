import { useState, useEffect } from 'react';
import { Layout as AtndLayout, Drawer } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

import { SettingTheme } from 'components/SettingTheme';
import { Header } from 'components/Header';
import { Brand } from 'components/Brand';
import { Sidebar } from 'components/Sidebar';
import { Footer } from 'components/Footer';
import { mediumSize, media } from 'components/Styles/Media';

import { menuList } from 'utils/menu';
import { PUBLIC_ROUTES, ROUTES } from 'utils/routeConstants';
import { METAHEALTHID } from 'utils/constants';

const { Content } = AtndLayout;

const StyledLayout = styled(AtndLayout)`
  min-height: 100vh;

  .ant-breadcrumb {
    margin: 16px 24px;
  }

  ${media.md`
    max-height: 100vh;

    .site-layout {
      .ant-layout-header {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 99;
      }
      .main-wrapper {
        overflow: auto;
      }
    }
  `}
`;

const FullLayout = ({ children, className, menuOpenedKey, menuSelectedKey }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(!!mediumSize());
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setCollapsed(!!mediumSize());
      closeDrawer();
    });
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const items = [
    {
      title: t('dropdown.logout', 'Logout'),
      icon: <LogoutOutlined />,
      path: '/',
      key: 'logout',
    },
  ];

  const isPubicRoutes =
    PUBLIC_ROUTES.includes(pathname) || !Object.values(ROUTES).includes(pathname);

  return (
    <>
      {isPubicRoutes ? (
        <>
          {children}
          <SettingTheme />
        </>
      ) : (
        <StyledLayout className={className}>
          <Sidebar
            items={menuList}
            collapsed={collapsed}
            toggleSidebar={toggleSidebar}
            openedKey={menuOpenedKey}
            selectedKey={menuSelectedKey}
          >
            <Brand collapsed={collapsed} />
          </Sidebar>
          {/* Drawer display on mobile */}
          <Drawer placement="left" width={0} onClose={closeDrawer} visible={drawerVisible}>
            <Sidebar
              items={menuList}
              collapsed={!drawerVisible}
              toggleSidebar={closeDrawer}
              openedKey={menuOpenedKey}
              selectedKey={menuSelectedKey}
            >
              <Brand collapsed={false} />
            </Sidebar>
          </Drawer>

          <AtndLayout className="site-layout">
            <Header
              toggleSidebar={() => setDrawerVisible(true)}
              items={items}
              userName={localStorage.getItem(METAHEALTHID)}
            />
            <div className="main-wrapper">
              <Content>
                <SettingTheme />
                {children}
              </Content>
              <Footer className="footer" />
            </div>
          </AtndLayout>
        </StyledLayout>
      )}
    </>
  );
};

export default FullLayout;
