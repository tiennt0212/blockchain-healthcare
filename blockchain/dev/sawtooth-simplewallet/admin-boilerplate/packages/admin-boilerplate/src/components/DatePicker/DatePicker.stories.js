import { DatePicker } from './DatePicker';
import dayjs from 'utils/extendedDayjs';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
};

export const emptyDate = () => {
  return <DatePicker placeholder="Select date" format="YYYY-MM-DD" />;
};

export const emptyDateAndTime = () => {
  return <DatePicker placeholder="Select date and time" showTime={true} />;
};

export const defaultValueDate = () => {
  return <DatePicker defaultValue={dayjs('2021-11-11 01:02:03')} format="YYYY-MM-DD" />;
};

export const defaultValueDateTime = () => {
  return (
    <DatePicker
      defaultValue={dayjs('2021-11-11 01:02:03')}
      showTime={true}
      format="YYYY-MM-DD HH:mm:ss"
    />
  );
};
