import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataPlaceholderComponent } from './data-placeholder.component';

@NgModule({
  declarations: [DataPlaceholderComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    DataPlaceholderComponent,
  ],
})
export class DataPlaceholderModule { }
