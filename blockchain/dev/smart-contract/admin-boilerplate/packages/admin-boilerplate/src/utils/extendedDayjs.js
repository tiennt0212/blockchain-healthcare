import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default dayjs;
