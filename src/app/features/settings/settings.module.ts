import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { SettingsViewComponent } from './containers';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [SettingsViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    DropdownModule,
  ],
})
export class SettingsModule { }
