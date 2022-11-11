import { DatePeriod } from '../../../../enums/date-period.enum';
import { DatePeriodConfig } from '../interfaces/date-period-config.interface';

export const DATE_PERIODS_CONFIG: Record<DatePeriod, DatePeriodConfig> = {
  [DatePeriod.Day]: {
    label: 'Daily',
    value: DatePeriod.Day,
  },
  [DatePeriod.Week]: {
    label: 'Weekly',
    value: DatePeriod.Week,
  },
  [DatePeriod.Month]: {
    label: 'Monthly',
    value: DatePeriod.Month,
  },
  [DatePeriod.Year]: {
    label: 'Yearly',
    value: DatePeriod.Year,
  },
};
