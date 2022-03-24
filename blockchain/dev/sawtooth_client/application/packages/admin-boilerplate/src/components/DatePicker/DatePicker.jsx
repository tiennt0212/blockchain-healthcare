import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/lib/date-picker/generatePicker';
// https://github.com/ant-design/ant-design/issues/26190#issuecomment-703673400

// eslint-disable-next-line
export const DatePicker = generatePicker(dayjsGenerateConfig);
