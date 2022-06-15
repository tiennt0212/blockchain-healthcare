import {
  getStatusFilterTypes,
  getGeneralFilterTypes,
  COLLECTION_TYPES,
  DATE_TIME_FORMAT,
  PRIVATE_KEY,
  PUBLIC_KEY,
  METAHEALTHID,
} from './constants';
import { UploadField } from 'components/UploadField';
import { Input, Select, InputNumber } from 'antd';
import { DatePicker } from 'components/DatePicker/DatePicker';
import { TimePicker } from 'components/TimePicker/TimePicker';
const crypto = require('crypto');

const generateFiltersInfo = (ALL_ATTRIBUTES_CAN_BE_FILTERED) => {
  // Using for Filter function
  return Object.entries(ALL_ATTRIBUTES_CAN_BE_FILTERED).map((item) => {
    const key = item[0];
    const { type, model, collection, displayField } = item[1];
    return {
      attribute: key,
      type: type ? type : 'string',
      model: model ? model : '',
      collection: collection ? collection : '',
      values: item[1].type === 'enumeration' ? item[1].enum : [], // Temporarily keep but don't use
      displayField: displayField ? displayField : '',
      filterTypes: type === 'enumeration' ? getStatusFilterTypes() : getGeneralFilterTypes(),
    };
  });
};

const generateFormInfo = (ALL_ATTRIBUTES_FOR_FORM) => {
  return Object.entries(ALL_ATTRIBUTES_FOR_FORM).map((item) => {
    const key = item[0];
    const { type, model, collection, displayField } = item[1];
    return {
      attribute: key,
      // prettier-ignore
      type: type ? type
        : model ? model === 'file' ? 'single-file' : 'model'
          : collection ? collection === 'file' ? 'multiple-file' : 'collection'
            : 'string',
      model: model ? model : '',
      collection: collection ? collection : '',
      values: item[1].type === 'enumeration' ? item[1].enum : [], // Temporarily keep but don't use
      displayField: displayField ? displayField : '',
    };
  });
};

const isEmpty = (obj) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const filterObjectByKeyArr = (objItem, keyArr) => {
  if (isEmpty(objItem) || !keyArr || keyArr.length < 1) return {};
  const filtered = Object.keys(objItem)
    .filter((key) => keyArr.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: objItem[key],
      };
    }, {});
  return filtered;
};

const getSpecificAttributes = (objArr, keyName) => {
  // INPUT: objArr - object array
  //        keyName - a string, choose between 'show', 'create', 'edit' or 'filter'
  // OUTPUT: array of objects, every child object has a keyName.
  // Use to get an array of objects to show, create or edit.

  if (isEmpty(objArr)) return [];
  if (['show', 'create', 'edit', 'required'].includes(keyName)) {
    const result = Object.entries(objArr)
      .filter((item) => item[1][keyName] == true)
      .reduce((obj, value) => {
        obj[value[0]] = value[1];
        return obj;
      }, {});
    return result;
  } else if (keyName === 'filter') {
    // Only filter attributes can be shown and no "via" attributes
    // The "via" attribute is an indication of a special field, such as: file, image
    const result = Object.entries(objArr)
      .filter((item) => item[1].via == undefined && item[1]['show'] == true)
      .reduce((obj, value) => {
        obj[value[0]] = value[1];
        return obj;
      }, {});
    return result;
  } else return [];
};

const getDataByAttrName = (value, filtersData) => {
  const item = filtersData.find((item) => item.attribute === value);
  if (!item) return filtersData[0];
  return item;
};

const handleRenderInput = (
  value,
  filtersData,
  data,
  { form },
  setPageSize,
  pageSize,
  modelName,
  collectionName,
) => {
  const { type, values, model, displayField, collection } = getDataByAttrName(value, filtersData);
  const handleScroll = (e) => {
    const value = modelName ? modelName : collectionName;
    const isEndOfList = e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight;
    if (isEndOfList) {
      if (!pageSize[`${value}Quantity`]) {
        setPageSize((prevState) => {
          prevState[`${value}Quantity`] =
            prevState.initialLimit + 10 > data[`${value}Total`]
              ? data[`${value}Total`]
              : prevState.initialLimit + 10;
          return {
            ...prevState,
            modelName: value,
          };
        });
      } else if (pageSize[`${value}Quantity`] < data[`${value}Total`]) {
        setPageSize((prevState) => {
          prevState[`${value}Quantity`] =
            prevState[`${value}Quantity`] + 10 > data[`${value}Total`]
              ? data[`${value}Total`]
              : prevState[`${value}Quantity`] + 10;
          return {
            ...prevState,
            modelName: value,
          };
        });
      }
    }
  };
  let inputType;
  switch (true) {
    case COLLECTION_TYPES.FILE.includes(type):
      inputType = (
        <UploadField form={form} isMultiUpload={type === 'multiple-file'} fieldName={value} />
      );
      break;
    case COLLECTION_TYPES.RELATIONAL.includes(type):
      inputType =
        type === 'model' ? (
          <Select
            placeholder="Select a option"
            onPopupScroll={handleScroll}
            showSearch="true"
            allowClear
          >
            {data[model]?.map((item, index) => {
              return (
                <Select.Option key={index} value={item[`${displayField}`]}>
                  {item[`${displayField}`]}
                </Select.Option>
              );
            })}
          </Select>
        ) : (
          <Select
            placeholder="Select a option"
            allowClear
            showSearch="true"
            showArrow
            mode="multiple"
            onPopupScroll={handleScroll}
          >
            {data[collection]?.map((item, index) => {
              return (
                <Select.Option key={index} value={item[`${displayField}`]}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        );
      break;
    case COLLECTION_TYPES.TEXT.includes(type):
      inputType = <Input />;
      break;
    case COLLECTION_TYPES.NUMBER.includes(type):
      inputType = <InputNumber />;
      break;
    case COLLECTION_TYPES.DATE.includes(type):
      inputType =
        type === 'time' ? (
          <TimePicker format={DATE_TIME_FORMAT['time']} />
        ) : (
          <DatePicker format={DATE_TIME_FORMAT[type]} showTime={type === 'datetime'} />
        );
      break;
    case COLLECTION_TYPES.BOOLEAN.includes(type):
      inputType = (
        <Select placeholder="Select a option" allowClear>
          <Select.Option key={true} value={true}>
            true
          </Select.Option>
          <Select.Option key={false} value={false}>
            false
          </Select.Option>
        </Select>
      );
      break;
    case COLLECTION_TYPES.PASSWORD.includes(type):
      inputType = <Input.Password />;
      break;
    case COLLECTION_TYPES.ENUMERATION.includes(type):
      inputType = (
        <Select placeholder="Select a option" allowClear>
          {values?.map((item, index) => (
            <Select.Option key={index} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      );
      break;
    default:
      inputType = <Input />;
      break;
  }
  return inputType;
};

const isAbsoluteURL = (str) => {
  return /(^http(s)?:\/\/)/g.test(str);
};

const generateRandomString = (length = 10) => {
  // Get 8 random characters
  return Math.random().toString(36).slice(2, length);
};

function encrypt(text, key) {
  // Creating Cipheriv with its parameter
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  return encrypted.toString('hex').toUpperCase();
}

// A decrypt function
function decrypt(encryptedText, key) {
  // Creating Decipher
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString().toUpperCase();
}

const algorithm = 'aes-256-cbc';
const iv = Buffer.from('322a07e45466160b23dd9e59c0ec1bde', 'hex');

const encryptAttributesList = (attrList, key) => {
  // attrList is an array of string
  // key 32 bytes = 256 bits
  return attrList.map((attr) => encrypt(attr, key));
};

const decryptAttributesList = (encryptedAttrList, key) => {
  // encryptedAttrList is an array of encrypted string
  // key 32 bytes = 256 bits
  return encryptedAttrList.map((encryptedAttr) => decrypt(encryptedAttr, key));
};

const removeLocalStorageUser = (randomID) => {
  localStorage.removeItem(`${PRIVATE_KEY}${randomID}`);
  localStorage.removeItem(`${PUBLIC_KEY}${randomID}`);
  localStorage.removeItem(METAHEALTHID);
};

export {
  generateFiltersInfo,
  generateFormInfo,
  isEmpty,
  filterObjectByKeyArr,
  getSpecificAttributes,
  getDataByAttrName,
  handleRenderInput,
  isAbsoluteURL,
  generateRandomString,
  encryptAttributesList,
  decryptAttributesList,
  removeLocalStorageUser,
};
