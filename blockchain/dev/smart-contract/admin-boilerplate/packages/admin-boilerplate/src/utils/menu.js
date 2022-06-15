import {
  UserOutlined,
  ShoppingCartOutlined,
  MedicineBoxOutlined,
  ApartmentOutlined,
  UserAddOutlined,
  PullRequestOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import { ROUTES } from './routeConstants';

export const menuList = [
  {
    key: '/nft-marketplace',
    title: 'NFT Marketplace',
    icon: <ShoppingCartOutlined />,
    path: ROUTES.HOMEPAGE,
  },
  {
    key: '/profile',
    title: 'Profile',
    icon: <UserOutlined />,
    path: ROUTES.HOMEPAGE,
  },
  {
    key: '/metahealth',
    title: 'Meta EHR',
    icon: <MedicineBoxOutlined />,
    subMenu: [
      {
        key: '/metahealth/personal-data',
        title: 'Manager ',
        icon: <ApartmentOutlined />,
        path: ROUTES.HOMEPAGE,
      },
      {
        key: '/metahealth/requesting',
        title: 'Requesting',
        icon: <PullRequestOutlined />,
        path: ROUTES.HOMEPAGE,
      },
      {
        key: '/metahealth/requesting',
        title: 'Create EHR',
        icon: <ReconciliationOutlined />,
        path: ROUTES.HOMEPAGE,
      },
    ],
  },
  {
    key: '/access-control',
    title: 'Access Control',
    icon: <MedicineBoxOutlined />,
    subMenu: [
      {
        key: '/access-control-manager',
        title: 'Manager',
        icon: <ApartmentOutlined />,
        path: ROUTES.HOMEPAGE,
      },
      {
        key: '/add-relationship',
        title: 'Add Relationship',
        icon: <UserAddOutlined />,
        path: ROUTES.HOMEPAGE,
      },
    ],
  },
];
