import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SvgIconModule } from '../svg-icon';

import { DataPlaceholderComponent } from './data-placeholder.component';

@NgModule({
  declarations: [DataPlaceholderComponent],
  imports: [
    CommonModule,
    SvgIconModule,
  ],
  exports: [
    DataPlaceholderComponent,
  ],
})
export class DataPlaceholderModule { }
