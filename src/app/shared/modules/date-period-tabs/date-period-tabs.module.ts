import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';

import { DatePeriodTabsComponent } from './date-period-tabs.component';

@NgModule({
  declarations: [DatePeriodTabsComponent],
  imports: [
    CommonModule,
    TabMenuModule,
  ],
  exports: [DatePeriodTabsComponent],
})
export class DatePeriodTabsModule { }
