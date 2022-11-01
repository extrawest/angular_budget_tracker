import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoute } from '../../enums/app-route.enum';

import { TransactionsViewComponent } from './containers';

const routes: Routes = [
  {
    path: ':accountName',
    component: TransactionsViewComponent,
    data: {
      title: 'Transactions',
      backLink: {
        route: `../${AppRoute.Accounts}`,
        title: 'Accounts',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule { }
