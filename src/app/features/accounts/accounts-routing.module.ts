import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsViewComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: AccountsViewComponent,
    data: {
      title: 'Accounts',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule { }
