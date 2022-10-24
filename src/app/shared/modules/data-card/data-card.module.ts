import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

import { DataCardComponent } from './data-card.component';

@NgModule({
  declarations: [DataCardComponent],
  exports: [
    DataCardComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    SkeletonModule,
  ],
})
export class DataCardModule { }
