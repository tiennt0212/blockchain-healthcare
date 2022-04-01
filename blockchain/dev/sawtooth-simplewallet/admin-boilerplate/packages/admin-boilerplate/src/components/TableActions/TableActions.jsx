import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button as AntdButton, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Button = styled(AntdButton)`
  margin-right: 5px;
  border-radius: 4px;
  font-size: 1.4rem;
`;

export const TableActions = ({ onDelete, onEdit }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button icon={<EditOutlined />} onClick={onEdit}></Button>
      <Popconfirm
        placement="topRight"
        title={t('confirmation.message', 'Are you sure to delete?')}
        onConfirm={onDelete}
        okText={t('confirmation.yes', 'Yes')}
        cancelText={t('confirmation.no', 'No')}
      >
        <Button icon={<DeleteOutlined />}></Button>
      </Popconfirm>
    </>
  );
};
