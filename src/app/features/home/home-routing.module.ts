import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeViewComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
