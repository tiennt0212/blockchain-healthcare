import { useEffect } from 'react';
import { Layout } from 'components/Layout';
import { Spin } from 'antd';

// import { Table } from 'components/Table';
import { useDispatch, useSelector } from 'hooks';
import { TitlePage } from 'components/TitlePage';
// import { FilterBox } from 'components/FilterBox';
// import { TotalCounter } from 'components/TotalCounter';
// import { TableActions } from 'components/TableActions';

// import ATTRIBUTES from 'containers/Media/attributes';
import { Helmet } from 'react-helmet-async';

// import mediasModel from 'containers/Media/List/mediasModel';
// import { addStoreModel } from 'utils/addStoreModel';
import { ROUTES } from 'utils/routeConstants';
import { METAHEALTHID } from 'utils/constants';
// import { getSpecificAttributes, generateFiltersInfo } from 'utils/app';

const breadcrumbItems = [{ title: 'Profile', link: ROUTES.PROFILE }];

const Profile = () => {
  const { getProfileData } = useDispatch(({ metaHealth }) => ({
    getProfileData: metaHealth.getProfileData,
  }));

  const { profile, metadata, loading } = useSelector(({ metaHealth: { profile }, loading }) => ({
    profile: profile?.content,
    metadata: profile?.metadata,
    loading: loading.global,
  }));

  useEffect(() => {
    if (!profile) getProfileData(localStorage.getItem(METAHEALTHID));
    // eslint-disable-next-line
  }, [profile]);

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Spin tip="Loading..." spinning={loading}>
        <TitlePage titleText="Profile" />
        <div>{profile.pubKey}</div>
        <div>{metadata.desc}</div>
      </Spin>
    </Layout>
  );
};

export default Profile;
