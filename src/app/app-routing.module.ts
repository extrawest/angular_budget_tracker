import { NgModule } from '@angular/core';
import { AuthPipe, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { ErrorViewComponent } from './containers/error-view';
import { AppRoute } from './enums/app-route.enum';

const redirectUnauthorizedToLogin = (): AuthPipe => redirectUnauthorizedTo([AppRoute.Auth]);
const redirectLoggedInToHome = (): AuthPipe => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: '**',
    component: ErrorViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
