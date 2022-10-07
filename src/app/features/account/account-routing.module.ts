import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountViewComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: AccountViewComponent,
    title: 'Account Settings',
    data: {
      breadcrumb: 'Account',
    },
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
