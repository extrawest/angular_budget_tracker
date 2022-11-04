import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

import { AccountBalanceModule } from '../../shared/modules/account-balance';
import { DataPlaceholderModule } from '../../shared/modules/data-placeholder';
import { DatePeriodTabsModule } from '../../shared/modules/date-period-tabs';

import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionsViewComponent } from './containers';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
  declarations: [TransactionsViewComponent, TransactionsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransactionsRoutingModule,
    LetModule,
    ButtonModule,
    DatePeriodTabsModule,
    SkeletonModule,
    AccountBalanceModule,
    DataPlaceholderModule,
  ],
})
export class TransactionsModule { }
