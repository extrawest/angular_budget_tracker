import { MenuItem } from 'primeng/api';

export const DEFAULT_DATE_PERIODS: MenuItem[] = [
  { label: 'Daily' },
  { label: 'Weekly' },
  { label: 'Monthly' },
  { label: 'Yearly' },
];

export const DEFAULT_ACTIVE_DATE_PERIOD: MenuItem = DEFAULT_DATE_PERIODS[2];
