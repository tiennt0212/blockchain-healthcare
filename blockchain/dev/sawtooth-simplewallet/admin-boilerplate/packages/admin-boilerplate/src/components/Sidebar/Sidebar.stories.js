import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Sidebar } from './Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
};

const items = [
  { title: 'sub1', icon: <UserOutlined />, path: '/abc' },
  {
    title: 'subnav 2',
    icon: <LaptopOutlined />,
    subMenu: [
      {
        title: 'option5',
        icon: <LaptopOutlined />,
        subMenu: [
          { title: 'option9', path: '/abc', icon: <NotificationOutlined /> },
          { title: 'option10', path: '/abc' },
        ],
      },
      { title: 'option6', icon: <NotificationOutlined />, path: '/abc' },
    ],
  },
  {
    title: 'subnav 3',
    icon: <LaptopOutlined />,
    subMenu: [
      { title: 'option7', path: '/abc' },
      { title: 'option8', path: '/abc' },
    ],
  },
];

export const Default = () => (
  <div style={{ minHeight: '100vh' }}>
    <Sidebar items={items} />
  </div>
);
