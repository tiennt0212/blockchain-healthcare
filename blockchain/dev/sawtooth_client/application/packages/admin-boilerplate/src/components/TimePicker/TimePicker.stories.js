import dayjs from 'utils/extendedDayjs';
import { TimePicker } from './TimePicker';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
};

export const emptyTime = () => {
  return <TimePicker placeholder={'Select time'} format="HH:mm:ss" />;
};

export const defaultValueTime = () => {
  return <TimePicker defaultValue={dayjs('1970-01-01 01:02:03')} format="HH:mm:ss" />;
};
