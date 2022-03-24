import antDesignLogo from '../assets/images/logo.png';
import i18n from 'i18next';

export const LOGO_APP = antDesignLogo;

export const INPUT_TYPES = {
  DATE: 'date',
  TEXT: 'text',
  NUMBER: 'number',
};

export const getStatusFilterTypes = () => [
  { label: i18n.t('status.equal', 'equal'), value: '=' },
  { label: i18n.t('status.not_equal', 'not equal'), value: '_ne' },
];

export const getGeneralFilterTypes = () => [
  ...getStatusFilterTypes(),
  { label: i18n.t('status.is_less_than', 'is less than'), value: '_lt' },
  {
    label: i18n.t('status.is_less_than_or_equal_to', 'is less than or equal to'),
    value: '_lte',
  },
  { label: i18n.t('status.is_greater_than', 'is greater than'), value: '_gt' },
  {
    label: i18n.t('status.is_greater_than_or_equal_to', 'is greater than or equal to'),
    value: '_gte',
  },
  { label: i18n.t('status.contains', 'contains'), value: '_contains' },
  {
    label: i18n.t('status.contains_case_sensitive', 'contains (case sensitive)'),
    value: '_containss',
  },
];

export const ALL_ATTRIBUTES = {
  // Example
  name: {
    type: 'string',
    maxLength: 128,
  },
  status: {
    type: 'enumeration',
    enum: ['requesting', 'accepted', 'banned'],
  },
  users_permissions_user: {
    plugin: 'users-permissions',
    model: 'user',
    via: 'friends',
  },
  users: {
    plugin: 'users-permissions',
    collection: 'user',
    via: 'friend',
    isVirtual: true,
  },
  published_at: {
    type: 'datetime',
    configurable: false,
  },
  created_by: {
    model: 'user',
    plugin: 'admin',
    configurable: false,
    writable: false,
    private: true,
  },
  updated_by: {
    model: 'user',
    plugin: 'admin',
    configurable: false,
    writable: false,
    private: true,
  },
  created_at: {
    type: 'timestamp',
  },
  updated_at: {
    type: 'timestamp',
  },
};

export const COLLECTION_TYPES = {
  TEXT: ['string', 'text', 'uid', 'email'],
  NUMBER: ['integer', 'biginteger', 'decimal', 'float'],
  DATE: ['date', 'datetime', 'time', 'timestamp'],
  BOOLEAN: ['boolean'],
  PASSWORD: ['password'],
  ENUMERATION: ['enumeration'],
  FILE: ['single-file', 'multiple-file'],
  RELATIONAL: ['model', 'collection'],
};

export const USER_MODEL = {
  id: {
    type: 'string',
  },
  confirmed: {
    type: 'enumeration',
    enum: [0, 1],
  },
  username: {
    type: 'string',
  },
  pName: {
    type: 'string',
  },
  email: {
    type: 'string',
  },
  gender: {
    type: 'enumeration',
    enum: ['male', 'female', 'unset'],
  },
  birthdate: {
    type: 'timestamp',
  },
  phoneNumber: {
    type: 'string',
  },
  address: {
    type: 'string',
  },
  lastAccess: {
    type: 'timestamp',
  },
  state: {
    type: 'enumeration',
    enum: ['enable', 'disable'],
  },
  familyName: {
    type: 'string',
  },
  givenName: {
    type: 'string',
  },
  middleName: {
    type: 'string',
  },
  locale: {
    type: 'string',
  },
  picture: {
    type: 'string',
  },
  profile: {
    type: 'string',
  },
  updatedAt: {
    type: 'timestamp',
  },
};

export const DATE_TIME_FORMAT = {
  datetime: 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss',
};

export const URL_SERVER_HOST = process.env.REACT_APP_SERVER;
