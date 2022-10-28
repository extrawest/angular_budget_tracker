import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ValidationErrorsModule } from '../validation-errors';

import { AddTransactionDialogComponent } from './add-transaction-dialog.component';

@NgModule({
  declarations: [AddTransactionDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    SharedModule,
    ValidationErrorsModule,
  ],
})
export class AddTransactionDialogModule { }
