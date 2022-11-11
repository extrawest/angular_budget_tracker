import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../../shared/modules/header';

import { DashboardViewComponent } from './dashboard-view.component';

@NgModule({
  declarations: [DashboardViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
  ],
  exports: [DashboardViewComponent],
})
export class DashboardViewModule {}
