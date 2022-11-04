import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

import { AccountBalanceModule } from '../../shared/modules/account-balance';
import { DataPlaceholderModule } from '../../shared/modules/data-placeholder';
import { DatePeriodTabsModule } from '../../shared/modules/date-period-tabs';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './components';
import { AccountsViewComponent } from './containers';

@NgModule({
  declarations: [
    AccountsViewComponent,
    AccountsComponent,
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ButtonModule,
    SkeletonModule,
    AccountBalanceModule,
    DataPlaceholderModule,
    DatePeriodTabsModule,
  ],
})
export class AccountsModule { }
