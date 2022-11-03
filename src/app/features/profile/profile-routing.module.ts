import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoute } from '../../enums/app-route.enum';

import { ProfileViewComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ProfileViewComponent,
    data: {
      title: 'Profile',
      backLink: {
        route: `../${AppRoute.Accounts}`,
        title: 'Accounts',
      },
    },
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
