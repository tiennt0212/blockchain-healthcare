import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'hooks';

import { isAbsoluteURL } from 'utils/app';
import { URL_SERVER_HOST } from 'utils/constants';

export const UploadField = ({ form, isMultiUpload, fieldName }) => {
  const { t } = useTranslation();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };

  // After getting data from the List Page, it will be processed to display in the fileList state.
  useEffect(() => {
    let fieldValue = form.getFieldsValue()[fieldName];
    let imageFormData = [];

    // If this UploadField is a Single File UploadField, form.getFieldsValue()[fieldName] will
    // return an object, which we will convert to an array for update fileList state.
    if (isObject(fieldValue)) {
      imageFormData = [fieldValue];
    }
    // On the other hand, if this UploadField is Multiple Files UploadField,
    // form.getFieldsValue()[fieldName] will return an array, we just need to check that it is not
    // undefined and update fileList state.
    else if (fieldValue) {
      imageFormData = fieldValue;
    }

    imageFormData = imageFormData.map((file) => {
      if (file.url) file.url = handleFileUrl(file.url);
      file.uid = file.id;
      return file;
    });

    // Finally, if fieldValue is undefined, fileList state is an empty array.
    setFileList(imageFormData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, form.getFieldsValue()[fieldName]]);

  const { uploadImages } = useDispatch(({ app }) => ({
    uploadImages: app.uploadImages,
  }));

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{t('upload-field.upload', 'Upload')}</div>
    </div>
  );

  const handleFileUrl = (fileUrl) => {
    const url = isAbsoluteURL(fileUrl) ? fileUrl : `${URL_SERVER_HOST}${fileUrl}`;
    return url;
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.preview || handleFileUrl(file.url));
    setPreviewVisible(true);
    setPreviewTitle(file.name || handleFileUrl(file.url).substring(file.url.lastIndexOf('/') + 1));
  };

  // With any change in fileList state, this function will update fileList state.
  const handleChange = ({ fileList }) => {
    // In case of file deletion (number of fileList is less than the upload field value):
    // If this UploadField is a Multiple Files UploadField, it will compare
    // fileList state with form.getFieldsValue()[fieldName] then update the upload field value.
    // If this UploadField is a Single File UploadField, form.getFieldsValue()[fieldName]
    // will be set to null.
    setFileList(fileList);
    const images = form.getFieldsValue()[fieldName];
    form.setFieldsValue({
      [fieldName]:
        isMultiUpload === true && images && images.length > fileList.length
          ? images.filter((img) => fileList.includes(img))
          : fileList.length === 0
          ? null
          : images,
    });
  };

  const customRequest = (options) => {
    uploadImages({
      onSuccess: options.onSuccess,
      file: options.file,
      form: form,
      isMultiUpload: isMultiUpload,
      fieldName: fieldName,
      images: form.getFieldsValue()[fieldName],
      handleFileUrl: handleFileUrl,
    });
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
      >
        {(isMultiUpload === true ? fileList.length >= 8 : fileList.length > 0)
          ? null
          : uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

UploadField.propTypes = {
  form: PropTypes.any,
  isMultiUpload: PropTypes.bool,
  fieldName: PropTypes.string,
};
