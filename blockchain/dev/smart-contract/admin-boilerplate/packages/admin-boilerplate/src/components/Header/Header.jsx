import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Avatar, Button } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

// import { BellOutlined } from '@ant-design/icons';
import { Logo } from '../Logo';
// import { LanguageSwitcher } from '../LanguageSwitcher';

import { media } from '../Styles/Media';
import { Dropdown } from '../Dropdown';
import defaultAvatar from '../../assets/images/profile-img.png';

const StyledHeader = styled(Layout.Header)`
  padding: 0px !important;
  height: 48px;
  width: 100%;
  .admin-header-layout-side {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .left-side,
    .right-side {
      display: flex;
      .admin-header-index-action {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 12px;
        cursor: pointer;
        transition: all 0.3s;
        .admin-avatar {
          margin: 20px 8px 20px 0;
        }
      }
    }
    .left-side {
      flex: 1 1 0%;
      height: 100%;
      .admin-header-index-action {
        padding: 0;
      }
    }
    .right-side {
      height: 100%;
      overflow: hidden;
    }
  }

  .anticon-menu-unfold {
    display: flex;
    align-items: center;
    margin-left: 16px;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  ${media.md`
    .admin-header-layout-side {
      .left-side .admin-header-index-action {
        display: none;
      }
    }
    .anticon-menu-unfold {
      display: none;
    }
  `}
`;

const Header = ({ toggleSidebar = () => {}, items, userName }) => {
  const { push } = useHistory();
  return (
    <StyledHeader>
      <div className="admin-header-layout-side">
        <div className="left-side">
          <span className="admin-header-index-action">
            <Logo height="28px" />
          </span>
          <MenuUnfoldOutlined onClick={toggleSidebar} />
        </div>
        <div className="right-side">
          <span className="admin-header-index-action">
            <Button type="primary" onClick={push('/login')}>
              Getting Started
            </Button>
          </span>
          <Dropdown items={items} fullWidthOnMobile>
            <span className="admin-header-index-action">
              <Avatar className="admin-avatar" src={defaultAvatar} size={24} />
              {userName}
            </span>
          </Dropdown>
        </div>
      </div>
    </StyledHeader>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func,
  userName: PropTypes.string,
  items: PropTypes.array.isRequired,
};

export default Header;
