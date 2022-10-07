import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardViewComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: DashboardViewComponent,
    data: {
      breadcrumb: 'Dashboard',
    },
    children: [
      {
        path: '',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
