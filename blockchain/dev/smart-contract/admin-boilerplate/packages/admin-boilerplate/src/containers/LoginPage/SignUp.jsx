// import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { DatePicker } from 'components/DatePicker';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { Alert } from 'antd';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'hooks';
// import { useSelector } from 'hooks';
// import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'hooks';
import dayjs from 'dayjs';
import { METAHEALTHID } from 'utils/constants';
export const SignUp = () => {
  const { Item } = Form;
  const { registerProfile, getMetaData } = useDispatch(({ metaHealth }) => ({
    registerProfile: metaHealth.registerProfile,
    getMetaData: metaHealth.getMetaData,
  }));
  // const { metaHealth } = useSelector(({ metaHealth }) => metaHealth);
  const [canDownloadKey, setCanDownloadKey] = useState(false);
  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={async (values) => {
        values.dateOfBirth = dayjs(values.dateOfBirth).format('YYYY-MM-DD');
        try {
          await registerProfile(values);
          setCanDownloadKey(true);
        } catch (error) {
          // Not console.log anymore
        }
      }}
    >
      <Item label="Full Name" name="fullName">
        <Input placeholder="Your Full Name" />
      </Item>
      <Item label="ID" name="id">
        <Input placeholder="ID number" />
      </Item>
      <Item label="Date of birth" name="dateOfBirth">
        <DatePicker format="YYYY-MM-DD" />
      </Item>
      <Item label="Address" name="address" rules={[{ required: true }]}>
        <Input placeholder="Your address" />
      </Item>
      <Item label=" ">
        {!canDownloadKey ? (
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              function downloadObjectAsJson(exportObj, exportName) {
                var dataStr =
                  'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
                var downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute('href', dataStr);
                downloadAnchorNode.setAttribute('download', exportName + '.json');
                document.body.appendChild(downloadAnchorNode); // required for firefox
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
              }
              getMetaData(localStorage.getItem(METAHEALTHID)).then((data) => {
                console.log(data);
                console.log(data?.metadata);
                downloadObjectAsJson(data?.profile, `${localStorage.getItem(METAHEALTHID)}.json`);
              });
            }}
          >
            Download Key
          </Button>
        )}
      </Item>
    </Form>
  );
};
