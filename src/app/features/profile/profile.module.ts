import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ValidationErrorsModule } from '../../shared/modules/validation-errors';

import { ProfileViewComponent } from './containers';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfileViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ValidationErrorsModule,
    AvatarModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class ProfileModule { }
