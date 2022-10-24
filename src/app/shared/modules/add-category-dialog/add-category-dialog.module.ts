import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StepsModule } from 'primeng/steps';

import { StepperModule } from '../stepper';
import { ValidationErrorsModule } from '../validation-errors';

import { AddCategoryDialogComponent } from './add-category-dialog.component';
import {
  CategoryColorViewComponent,
  CategoryIconViewComponent,
  CategoryNameViewComponent,
  CategoryOverviewViewComponent,
} from './components';

@NgModule({
  declarations: [
    AddCategoryDialogComponent,
    CategoryNameViewComponent,
    CategoryIconViewComponent,
    CategoryColorViewComponent,
    CategoryOverviewViewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    StepsModule,
    StepperModule,
    DropdownModule,
    ValidationErrorsModule,
  ],
})
export class AddCategoryDialogModule { }
