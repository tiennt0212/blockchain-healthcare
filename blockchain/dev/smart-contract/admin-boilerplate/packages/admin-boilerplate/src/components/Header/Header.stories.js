import React from 'react';
import { Provider } from 'react-redux';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

import store from 'store';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
};

const items = [
  { title: 'My Profile', icon: <UserOutlined />, path: '/abc' },
  { title: 'Setting', icon: <SettingOutlined />, path: '/abc', hasDivider: true },
  { title: 'Logout', icon: <LogoutOutlined />, path: '/abc' },
];

const Template = (args) => (
  <Provider store={store}>
    <Header items={items} userName="Admin" {...args} />
  </Provider>
);

export const Default = Template.bind({});
