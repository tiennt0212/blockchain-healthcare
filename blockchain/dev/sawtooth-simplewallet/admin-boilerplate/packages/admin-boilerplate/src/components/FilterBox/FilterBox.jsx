import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FilterOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Row, Col, Typography, Form, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'utils/extendedDayjs';
import DynamicField from './DynamicField';
import { media } from '../Styles/Media';
import { isEmpty } from '../../utils/app';
import { COLLECTION_TYPES, DATE_TIME_FORMAT, getGeneralFilterTypes } from 'utils/constants';

const { Title } = Typography;

const FilterBoxStyle = styled.div`
  margin-bottom: 20px;

  .admin-right-col {
    text-align: right;
  }

  .admin-left-col {
    .admin-filter-row {
      text-align: center;
      padding-bottom: 10px;
      .admin-form-item {
        margin-bottom: 10px;
      }
      .admin-minus-btn {
        text-align: center;
        margin-bottom: 10px;
      }
      .admin-plus-btn {
        min-width: 34px;
      }
      .ant-picker {
        width: 100%;
      }
    }

    .show-filter-tags {
      .ant-tag {
        margin: 8px 8px 8px 0;
        padding: 6px 7px 4px;
      }
    }

    .filter-btn {
      margin: 10px 0;
    }
  }

  button {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }

  .ant-select {
    width: 100%;
  }

  .hide {
    display: none;
  }

  .collapse-btn {
    border: none;
    box-shadow: none;
  }

  ${media.lg`
    .admin-left-col {
      .admin-filter-row {
        text-align: left;
        .admin-form-item, .admin-minus-btn {
          margin-bottom: 0;
        }
        .admin-plus-btn {
          text-align: center;
        }
      }
      .show-filter-tags {
        display: inline-block;
      }

      .filter-btn {
        margin-right: 15px;
      }
    }
  `}
`;

const handleValueBeforeFiltering = (filterInfos, filterData) => {
  // This function is used to process data before filtering
  // It will ensure stable operation when filtering RELATIONAL FIELD or DATE/TIME type
  // INPUT:
  //    filterInfos - array of object - provide some infomation: what field can be filter and its type to be render the input
  //    filterData - an object contains filters[] - filters is the list of filter operations
  // OUTPUT:
  //    newValue - an object quite similar to filterData, with the processed value

  const newValue = JSON.parse(JSON.stringify(filterData)); // duplicate filterData without reference
  filterInfos.forEach((subInfo) => {
    const { displayField, attribute: attributeToFind, type } = subInfo;
    if (displayField) {
      // displayField is the sign of RELATIONAL FIELD
      newValue.filters.forEach((subFilter) => {
        // find this RELATIONAL FIELD and refactor the attribute
        if (subFilter.attribute === attributeToFind)
          subFilter.attribute = `${attributeToFind}.${displayField}`;
      });
    }
    if (COLLECTION_TYPES.DATE.includes(type)) {
      newValue.filters.forEach((subFilter) => {
        let { value: oldValue } = subFilter || {};
        if (subFilter.attribute === attributeToFind) {
          subFilter.value = dayjs(oldValue).format(DATE_TIME_FORMAT[type]);
        }
      });
    }
  });
  return newValue;
};

const FilterBox = ({
  title,
  description,
  filterInfos, // an array of objects, it provides some infomation: what field can be filter and its type to be render the input
  handleSubmit,
  defaultFilterData, // an object it contains data that you would like filtering?
  className = '',
}) => {
  const [form] = Form.useForm();
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState({ filters: defaultFilterData || [] });
  const [tagList, setTagList] = useState(defaultFilterData || []);

  const { t } = useTranslation();
  const initialFilterValue = {
    attribute: filterInfos[0]?.attribute,
    type: filterInfos[0]?.filterTypes[0].value,
    value: '',
  };

  useEffect(() => {
    form.setFieldsValue(filterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  const updateFieldsForm = () => {
    // Update values of form when add/remove filter row in DynamicField Component
    setFilterData(form.getFieldsValue());
  };

  const onFinish = (values) => {
    handleSubmit(handleValueBeforeFiltering(filterInfos, values));
    setShowFilter(!showFilter);
    setTagList(values?.filters);
    setFilterData(values);
  };

  const handleClearAll = () => {
    const defaultFilterData = {
      filters: [],
    };
    setShowFilter(false);
    setFilterData(defaultFilterData);
    setTagList([]);
    handleSubmit(defaultFilterData);
  };

  const onDeleteTag = (e, index) => {
    e.preventDefault();
    const updatedValues = {
      ...filterData,
      filters: filterData.filters.filter((item, i) => {
        return index !== i;
      }),
    };
    setFilterData(updatedValues);
    setTagList(updatedValues?.filters);
    handleSubmit(handleValueBeforeFiltering(filterInfos, updatedValues));
  };

  return (
    <FilterBoxStyle className={className}>
      <Form
        form={form}
        name="filterBox"
        initialValues={filterData}
        onFinish={onFinish}
        className={`${showFilter ? 'show' : 'hide'}`}
      >
        <Row justify="space-between">
          {/* Filter Form area */}
          <Col span={24} lg={16} className="admin-left-col">
            <Title level={3}>{title}</Title>
            <p>{description}</p>
            <DynamicField
              filterInfos={filterInfos}
              initialValue={initialFilterValue}
              form={form}
              filterData={filterData}
              updateFieldsForm={updateFieldsForm}
            />
          </Col>

          <Col span={24} lg={8} className="admin-right-col">
            <Button className="admin-clear-btn" onClick={handleClearAll}>
              {t('filter_box.clear_all', 'Clear all')}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isEmpty(filterData) || !filterData?.filters?.length}
            >
              {t('filter_box.apply', 'Apply')}
            </Button>
          </Col>
        </Row>
      </Form>

      <Row justify="space-between">
        <Col span={24} lg={22} className="admin-left-col">
          <Button
            size="middle"
            onClick={() => setShowFilter(!showFilter)}
            className="filter-btn"
            type="primary"
          >
            <FilterOutlined />
            {t('filter_box.filters', 'Filters')}
          </Button>
          <div className={`show-filter-tags`}>
            {tagList?.map((item, index) => {
              let { attribute: attributeToFind, value: inputValue } = item;
              const typeOfValue = typeof inputValue;
              if (typeOfValue == 'object') {
                // inputValue is specific type like date/time or other
                const itemType = filterInfos.find((subInfo) => subInfo.attribute == attributeToFind)
                  ?.type; // identify this object type
                inputValue = dayjs(inputValue).format(DATE_TIME_FORMAT[itemType]);
              } else if (typeOfValue == 'boolean') {
                inputValue = inputValue.toString();
              }
              const inputTypeMapping = getGeneralFilterTypes().find(
                (typeItem) => typeItem.value === item.type,
              )?.label;
              return (
                <Tag key={index} closable onClose={(e) => onDeleteTag(e, index)} color="blue">
                  {attributeToFind} {<b>{inputTypeMapping}</b>} {inputValue}
                </Tag>
              );
            })}
          </div>
        </Col>

        <Col span={24} lg={2} className="admin-right-col">
          <Button className="collapse-btn" onClick={() => setShowFilter(!showFilter)}>
            {showFilter ? (
              <>
                {t('filter_box.hide', 'Hide')} <UpOutlined />{' '}
              </>
            ) : (
              <DownOutlined />
            )}
          </Button>
        </Col>
      </Row>
    </FilterBoxStyle>
  );
};

FilterBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  filterInfos: PropTypes.arrayOf(
    PropTypes.shape({
      attribute: PropTypes.string.isRequired,
      filterTypes: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
      ).isRequired,
      type: PropTypes.string.isRequired,
      values: PropTypes.array, // ['1', '2', '3'] For enum type with render select option
    }),
  ).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default FilterBox;
