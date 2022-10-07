import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
  ],
  exports: [BreadcrumbsComponent],
})
export class BreadcrumbsModule { }
