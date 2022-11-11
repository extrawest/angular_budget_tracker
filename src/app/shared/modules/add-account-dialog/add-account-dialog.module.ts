import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ValidationErrorsModule } from '../validation-errors';

import { AddAccountDialogComponent } from './add-account-dialog.component';

@NgModule({
  declarations: [AddAccountDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ValidationErrorsModule,
    SharedModule,
  ],
})
export class AddAccountDialogModule { }
