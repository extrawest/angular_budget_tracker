import { NgModule } from '@angular/core';
import { AuthPipe, canActivate } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { User } from 'firebase/auth';
import { map } from 'rxjs';

import { AuthViewComponent } from '../../containers/auth-view';

import { LoginViewComponent } from './containers/login-view';
import { RegisterViewComponent } from './containers/register-view';
import { VerifyEmailViewComponent } from './containers/verify-email-view';
import { AuthRoute } from './enums/auth-route.enum';

const notVerifiedOnly = (user: User | null): boolean => !!user && !user.emailVerified;
const redirectNotVerifiedToHome = (): AuthPipe => map(user => notVerifiedOnly(user) || ['/']);

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
      {
        path: AuthRoute.VerifyEmail,
        component: VerifyEmailViewComponent,
        ...canActivate(redirectNotVerifiedToHome),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
