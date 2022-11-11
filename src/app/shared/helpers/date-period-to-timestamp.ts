import { DateTime } from 'luxon';

import { DatePeriod } from '../../enums/date-period.enum';

export function datePeriodToTimestamp(period: DatePeriod): number {
  return DateTime.local().startOf(period).valueOf();
}
