import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoute } from '../../enums/app-route.enum';

import { SettingsViewComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: SettingsViewComponent,
    data: {
      title: 'Settings',
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
export class SettingsRoutingModule { }
