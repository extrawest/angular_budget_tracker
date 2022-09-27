import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthViewComponent } from './containers/auth-view';
import { LoginViewComponent } from './containers/login-view';
import { RegisterViewComponent } from './containers/register-view';
import { AuthRoute } from './enums/auth-route.enum';

const routes: Routes = [
  {
    path: '',
    component: AuthViewComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AuthRoute.Login,
      },
      {
        path: AuthRoute.Login,
        component: LoginViewComponent,
      },
      {
        path: AuthRoute.Register,
        component: RegisterViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
