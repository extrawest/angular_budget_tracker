import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ValidationErrorsModule } from '../validation-errors';

import { AddCategoryDialogComponent } from './add-category-dialog.component';

@NgModule({
  declarations: [
    AddCategoryDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ValidationErrorsModule,
  ],
})
export class AddCategoryDialogModule { }
