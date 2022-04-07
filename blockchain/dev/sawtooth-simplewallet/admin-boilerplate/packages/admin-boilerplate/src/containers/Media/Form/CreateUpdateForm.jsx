import { useEffect, useState } from 'react';
import { Form, Button, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useDispatch, useSelector } from 'hooks';
import pluralize from 'pluralize';
import { Input, InputNumber } from 'antd';

import dayjs from 'utils/extendedDayjs';
import { ROUTES } from 'utils/routeConstants';
import { addStoreModel } from 'utils/addStoreModel';
import { handleError } from 'utils/handleError';
import { getSpecificAttributes, generateFormInfo } from 'utils/app';
import { URL_SERVER_HOST, COLLECTION_TYPES, DATE_TIME_FORMAT } from 'utils/constants';
import { axiosConfigHeader } from 'utils/axiosConfig';

import { TitlePage } from 'components/TitlePage';
import { Layout } from 'components/Layout';
import mediasModel from 'containers/Media/List/mediasModel';
import ATTRIBUTES from 'containers/Media/attributes';
import metaHealth from '../../../store/models/metahealth';

const { Item } = Form;
const queryString = require('query-string');

addStoreModel(metaHealth);
addStoreModel(mediasModel);

const breadcrumbItems = (isEditPage) => [
  { title: 'Media', link: ROUTES.MEDIA_LIST },
  isEditPage
    ? {
        title: 'Edit',
        link: ROUTES.EDIT_MEDIA,
      }
    : {
        title: 'Create',
        link: ROUTES.CREATE_MEDIA,
      },
];

const StyledForm = styled(Form)`
  margin: auto;
  max-width: 400px;
`;

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const CreateUpdateForm = ({ location }) => {
  const { t } = useTranslation();
  const parsed = queryString.parse(location.search);
  const isEditPage = location.pathname === ROUTES.EDIT_MEDIA;
  const { id } = parsed;
  const [form] = Form.useForm();
  const [mediaInfoById, setMediaInfoById] = useState({});
  const [formData, setFormData] = useState({});
  const loading = useSelector((state) => state.loading.global);

  const mediaAttributes = generateFormInfo(
    getSpecificAttributes(ATTRIBUTES, isEditPage ? 'edit' : 'create'),
  );

  const arrModelName = mediaAttributes
    .filter((item) => item.type === 'model' || item.type === 'collection')
    .map((item) => item[item.type]);

  useEffect(() => {
    if (!isEditPage) {
      form.resetFields();
    }
    const getMediaById = async (id) => {
      try {
        const response = await axios.get(`${URL_SERVER_HOST}/medias/${id}`, axiosConfigHeader());
        setMediaInfoById(response.data);
        const initialFormData = Object.entries(response.data)
          .map((subData) => {
            const typeOfKey = mediaAttributes.find((info) => info.attribute === subData[0])?.type;
            if (COLLECTION_TYPES.DATE.includes(typeOfKey) && subData[1]) {
              // Format date/time to corresponding object
              return {
                [subData[0]]:
                  typeOfKey == 'datetime'
                    ? dayjs(subData[1]).utc(true) // because the returned datetime is UTC, no formatting needed
                    : dayjs(subData[1], DATE_TIME_FORMAT[typeOfKey]),
              };
            } else if (COLLECTION_TYPES.RELATIONAL.includes(typeOfKey) && subData[1]) {
              // Keep only displayField of this object(s)
              const displayField = mediaAttributes.find((attr) => attr.attribute === subData[0])
                ?.displayField;
              return typeOfKey == 'model'
                ? { [subData[0]]: subData[1][displayField] }
                : { [subData[0]]: subData[1].map((item) => item[displayField]) };
            } else {
              return { [subData[0]]: subData[1] };
            }
          })
          .reduce((previous, current) => Object.assign(previous, current), {});

        form.setFieldsValue({ ...initialFormData });
      } catch (err) {
        handleError(err, 'Fetch data failed');
      }
    };
    if (isEditPage) {
      getMediaById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, isEditPage, id]);

  const { addMedias, updateMedias, deposit } = useDispatch(({ mediasModel, metaHealth }) => ({
    addMedias: mediasModel.create,
    updateMedias: mediasModel.update,
    deposit: metaHealth.deposit,
  }));

  const [pageSize, setPageSize] = useState({
    initialLimit: 10,
    modelName: '',
  });
  console.log(setPageSize);

  useEffect(() => {
    const getRelationModelList = async () => {
      try {
        const obj = {};
        if (pageSize.modelName) {
          arrModelName.forEach(async (item) => {
            if (item === pageSize.modelName) {
              const response = await axios.get(
                `${URL_SERVER_HOST}/${pluralize(item)}?&pageSize=${
                  pageSize[`${item}Quantity`]
                }&_sort=id:ASC`,
                axiosConfigHeader(),
              );
              obj[`${item}`] = response?.data?.data;
              obj[`${item}Total`] = response?.data?.pagination.total;
              setFormData({ ...formData, ...obj });
            }
          });
        } else {
          arrModelName.forEach(async (item) => {
            const response = await axios.get(
              `${URL_SERVER_HOST}/${pluralize(item)}?&pageSize=${
                pageSize.initialLimit
              }&_sort=id:ASC`,
              axiosConfigHeader(),
            );
            obj[`${item}`] = response?.data?.data;
            obj[`${item}Total`] = response?.data?.pagination.total;
            setFormData({ ...formData, ...obj });
          });
        }
      } catch (err) {
        handleError(err, 'Fetch data failed');
      }
    };
    if (!isEditPage || isEditPage) {
      getRelationModelList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditPage, pageSize]);

  const onFinish = (values) => {
    deposit(values);
    if (isEditPage) {
      // changeValue();
      // updateMedias({
      //   ...mediaInfoById,
      //   ...values,
      // });
    } else {
      // changeValue();
      // addMedias({
      //   ...values,
      // });
      // form.resetFields();
    }
    console.log(mediaInfoById, addMedias, updateMedias);
  };
  return (
    <Layout breadcrumbItems={breadcrumbItems(isEditPage)}>
      <Helmet>
        {isEditPage ? (
          <title>{t('media.page_title_edit', 'Edit Media')}</title>
        ) : (
          <title>{t('media.page_title_create', 'Create New Media')}</title>
        )}
      </Helmet>
      <Spin tip="Loading..." spinning={loading}>
        <TitlePage titleText={isEditPage ? 'Edit Media' : 'Create Media'} align="center" />
        <StyledForm {...formItemLayout} form={form} name="media" onFinish={onFinish}>
          {/* <Item name={'name'} label={'Name'} key={'name'}>
            <Input />
          </Item> */}
          <Item name={'author'} label={'Author'} key={'author'}>
            <Input />
          </Item>
          <Item name={'number'} label={'Number'} key={'number'}>
            <InputNumber />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              {isEditPage ? t('form.update', 'Update') : t('form.create', 'Create')}
            </Button>
          </Item>
        </StyledForm>
      </Spin>
    </Layout>
  );
};

export default CreateUpdateForm;
