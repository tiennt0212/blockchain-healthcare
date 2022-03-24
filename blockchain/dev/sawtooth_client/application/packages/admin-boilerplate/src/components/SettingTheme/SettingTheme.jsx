import { Avatar, Affix, Drawer, Typography, Radio } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { colors } from '../Styles/Colors';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'hooks';

const { Text } = Typography;

const AffixStyle = styled(Affix)`
  position: fixed;
  bottom: 180px;
  right: 0px;
  z-index: 100;
`;

const AvatarStyle = styled(Avatar)`
  background-color: ${(props) => props.$backgroundColor} !important;
`;

const HeadingStyle = styled.h3`
  margin-bottom: 1em !important;
`;

const SettingItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SettingTheme = ({ backgroundColor }) => {
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('site-theme') ? localStorage.getItem('site-theme') : 'light',
  );

  const { switchSidebarTheme } = useDispatch(({ sidebarTheme }) => ({
    switchSidebarTheme: sidebarTheme.switchSidebarTheme,
  }));

  const onChange = (e) => {
    setTheme(e.target.value);
    switchSidebarTheme(e.target.value);
  };

  const handleChangeTheme = (removedTheme, addedTheme) => {
    document.body.classList.remove(removedTheme);
    document.body.classList.add(addedTheme);
    localStorage.setItem('site-theme', addedTheme);
  };

  useEffect(() => {
    handleChangeTheme(localStorage.getItem('site-theme'), theme);
  }, [theme]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <AffixStyle>
      <div>
        <AvatarStyle
          size={48}
          shape="square"
          icon={<SettingOutlined />}
          $backgroundColor={backgroundColor}
          onClick={showDrawer}
        />
        <Drawer placement="right" onClose={onClose} visible={visible} width={330}>
          <HeadingStyle>Page style setting</HeadingStyle>
          <SettingItemStyle>
            <Text>Theme: </Text>
            <Radio.Group onChange={onChange} value={theme}>
              <Radio value="light">Light</Radio>
              <Radio value="mix">Mix</Radio>
              <Radio value="dark">Dark</Radio>
            </Radio.Group>
          </SettingItemStyle>
        </Drawer>
      </div>
    </AffixStyle>
  );
};

SettingTheme.propTypes = {
  backgroundColor: PropTypes.string,
};

SettingTheme.defaultProps = {
  backgroundColor: colors.primaryBlue,
};

export default SettingTheme;
