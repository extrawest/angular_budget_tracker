import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { ValidationErrorsModule } from '../../shared/modules/validation-errors';

import { AccountRoutingModule } from './account-routing.module';
import { AccountViewComponent } from './containers';

@NgModule({
  declarations: [
    AccountViewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    ValidationErrorsModule,
    AvatarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
  ],
})
export class AccountModule { }
