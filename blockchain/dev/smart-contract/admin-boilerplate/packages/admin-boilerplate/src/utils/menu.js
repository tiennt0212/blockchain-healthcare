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
    key: ROUTES.NFT_MARKETPLACE,
    title: 'NFT Marketplace',
    icon: <ShoppingCartOutlined />,
    path: ROUTES.NFT_MARKETPLACE,
  },
  {
    key: ROUTES.PROFILE,
    title: 'Profile',
    icon: <UserOutlined />,
    path: ROUTES.PROFILE,
  },
  {
    key: ROUTES.METAHEALTH,
    title: 'Meta EHR',
    icon: <MedicineBoxOutlined />,
    subMenu: [
      {
        key: ROUTES.PERSONALDATA,
        title: 'Personal Data ',
        icon: <ApartmentOutlined />,
        path: ROUTES.PERSONALDATA,
      },
      {
        key: ROUTES.REQUESTING,
        title: 'Requesting',
        icon: <PullRequestOutlined />,
        path: ROUTES.REQUESTING,
      },
      {
        key: ROUTES.CREATEEHR,
        title: 'Create EHR',
        icon: <ReconciliationOutlined />,
        path: ROUTES.CREATEEHR,
      },
    ],
  },
  {
    key: ROUTES.ACCESS_CONTROL,
    title: 'Access Control',
    icon: <MedicineBoxOutlined />,
    subMenu: [
      {
        key: ROUTES.ACCESS_CONTROL_MANAGER,
        title: 'Manager',
        icon: <ApartmentOutlined />,
        path: ROUTES.ACCESS_CONTROL_MANAGER,
      },
      {
        key: ROUTES.ADD_RELATIONSHIP,
        title: 'Add Relationship',
        icon: <UserAddOutlined />,
        path: ROUTES.ADD_RELATIONSHIP,
      },
    ],
  },
];
