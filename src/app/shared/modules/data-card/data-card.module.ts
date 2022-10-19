import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCardComponent } from './data-card.component';
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [DataCardComponent],
  exports: [
    DataCardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
  ]
})
export class DataCardModule { }
