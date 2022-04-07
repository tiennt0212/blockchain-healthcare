import { useEffect } from 'react';
import { Layout } from 'components/Layout';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';

import { Table } from 'components/Table';
import { useDispatch, useSelector } from 'hooks';
import { TitlePage } from 'components/TitlePage';
import { FilterBox } from 'components/FilterBox';
import { TotalCounter } from 'components/TotalCounter';
import { TableActions } from 'components/TableActions';

import ATTRIBUTES from 'containers/Media/attributes';
import { Helmet } from 'react-helmet-async';

import mediasModel from './mediasModel';
import { addStoreModel } from 'utils/addStoreModel';
import { ROUTES } from 'utils/routeConstants';
import { getSpecificAttributes, generateFiltersInfo } from 'utils/app';

addStoreModel(mediasModel);

const breadcrumbItems = [
  { title: 'Media', link: ROUTES.MEDIA_LIST },
  { title: 'List', link: ROUTES.MEDIA_LIST },
];

const MediaList = ({ history }) => {
  const { t } = useTranslation();

  const { deleteMedias, fetchMedias } = useDispatch(({ mediasModel }) => ({
    deleteMedias: mediasModel.delete,
    fetchMedias: mediasModel.fetchMedias,
  }));

  const { medias, pagination, filterOptions, loading } = useSelector(
    ({ mediasModel: { medias, pagination, filterOptions }, loading }) => ({
      medias,
      pagination,
      filterOptions,
      loading: loading.global,
    }),
  );

  const { total, page } = pagination;

  const onChangePagination = (page, pageSize) => {
    fetchMedias({ page, pageSize });
  };

  const onChangeFilter = (formFilter) => {
    fetchMedias({ page: 1, filterOptions: formFilter.filters });
  };

  useEffect(() => {
    fetchMedias();
  }, [fetchMedias]);

  const columns = [
    {
      title: t('media.url', 'Url'),
      key: 'url',
      dataIndex: 'url',
    },
    {
      title: t('table.action', 'Action'),
      align: 'right',
      // eslint-disable-next-line react/display-name
      render: (v, i) => (
        <TableActions
          onDelete={() => deleteMedias(i.id)}
          onEdit={() => history.push(`${ROUTES.EDIT_MEDIA}?id=${encodeURIComponent(i.id)}`)}
        />
      ),
    },
  ];

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <Helmet>
        <title>{t('media.page_title', 'Media Page')}</title>
      </Helmet>
      <Spin tip="Loading..." spinning={loading}>
        <TitlePage titleText="Media List" />
        <TotalCounter total={total} />
        <FilterBox
          filterInfos={generateFiltersInfo(getSpecificAttributes(ATTRIBUTES, 'filter'))}
          handleSubmit={onChangeFilter}
          defaultFilterData={filterOptions}
        />
        <Table
          columns={columns}
          dataSource={medias}
          total={total}
          current={page}
          multiSelect
          onPageChange={onChangePagination}
          sticky
          rowKey="id"
        />
      </Spin>
    </Layout>
  );
};

export default MediaList;
