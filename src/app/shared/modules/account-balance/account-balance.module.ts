import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

import { AccountBalanceComponent } from './account-balance.component';

@NgModule({
  declarations: [AccountBalanceComponent],
  imports: [
    CommonModule,
    SkeletonModule,
  ],
  exports: [AccountBalanceComponent],
})
export class AccountBalanceModule { }
