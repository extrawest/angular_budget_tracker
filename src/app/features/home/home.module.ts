import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';

import { HomeViewComponent } from './containers';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeViewComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardModule,
  ],
})
export class HomeModule { }
