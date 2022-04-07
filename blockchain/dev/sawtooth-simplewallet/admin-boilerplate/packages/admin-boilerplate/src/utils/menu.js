import { HomeOutlined } from '@ant-design/icons';
import { ROUTES } from './routeConstants';

export const menuList = [
  {
    key: '/',
    title: 'Home',
    icon: <HomeOutlined />,
    path: ROUTES.HOMEPAGE,
  },
  {
    key: 'media',
    title: 'Media',
    subMenu: [
      { key: ROUTES.MEDIA_LIST, title: 'Media List', path: ROUTES.MEDIA_LIST },
      { key: ROUTES.CREATE_MEDIA, title: 'Create Media', path: ROUTES.CREATE_MEDIA },
    ],
  },
];
