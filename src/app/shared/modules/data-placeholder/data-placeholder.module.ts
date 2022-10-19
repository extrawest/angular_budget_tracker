import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPlaceholderComponent } from './data-placeholder.component';
import {SvgIconModule} from "../svg-icon";

@NgModule({
  declarations: [DataPlaceholderComponent],
  imports: [
    CommonModule,
    SvgIconModule,
  ],
  exports: [
    DataPlaceholderComponent
  ]
})
export class DataPlaceholderModule { }
