import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardViewComponent } from './containers/dashboard-view';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardViewComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
