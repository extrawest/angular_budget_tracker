import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionsViewComponent } from './containers';

const routes: Routes = [
  {
    path: ':accountId',
    component: TransactionsViewComponent,
    data: {
      title: 'Transactions',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule { }
