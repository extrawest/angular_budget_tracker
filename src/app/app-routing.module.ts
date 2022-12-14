import { NgModule } from '@angular/core';
import { AuthPipe, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { DashboardViewComponent } from './containers/dashboard-view';
import { AppRoute } from './enums/app-route.enum';

const redirectUnauthorizedToLogin = (): AuthPipe => redirectUnauthorizedTo([AppRoute.Auth]);
const redirectLoggedInToHome = (): AuthPipe => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: DashboardViewComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/accounts/accounts.module').then(m => m.AccountsModule),
      },
      {
        path: AppRoute.Profile,
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: AppRoute.Transactions,
        loadChildren: () => import('./features/transactions/transactions.module').then((m) => m.TransactionsModule),
      },
      {
        path: AppRoute.Settings,
        loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
