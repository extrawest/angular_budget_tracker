import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorViewComponent } from './containers/error-view';
import { AppRoute } from './enums/app-route.enum';

const routes: Routes = [
  {
    path: AppRoute.App,
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: AppRoute.Auth,
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
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
