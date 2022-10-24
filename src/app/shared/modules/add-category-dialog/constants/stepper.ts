import { MenuItem } from 'primeng/api';

import {
  CategoryColorViewComponent,
  CategoryIconViewComponent,
  CategoryNameViewComponent,
  CategoryOverviewViewComponent,
} from '../components';
import { StepConfig } from '../interfaces/stepper-config.interface';

export const STEPPER_CONFIG: StepConfig[] = [
  {
    title: '<div>Details</div>',
    subtitle: '<span>Name your category</span>',
    component: CategoryNameViewComponent,
  },
  {
    title: '<div>Icon</div>',
    subtitle: '<span>Select your category icon</span>',
    component: CategoryIconViewComponent,
  },
  {
    title: '<div>Color</div>',
    subtitle: '<span>Choose your category color</span>',
    component: CategoryColorViewComponent,
  },
  {
    title: '<div>Overview</div>',
    subtitle: '<span>Review and Submit</span>',
    component: CategoryOverviewViewComponent,
  },
];

export const STEPPER_MENU_CONFIG: MenuItem[] = STEPPER_CONFIG
  .map(({ title, subtitle }) => ({
    label: title + subtitle,
    escape: false,
  }));
