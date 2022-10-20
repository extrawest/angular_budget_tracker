import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ValidationErrorsModule } from '../validation-errors';

import { AddCategoryDialogComponent } from './add-category-dialog.component';
import {StepsModule} from "primeng/steps";
import {
  CategoryColorViewComponent,
  CategoryIconViewComponent,
  CategoryNameViewComponent,
  CategoryOverviewViewComponent
} from "./components";
import {StepperModule} from "../stepper";
import {CategoryService} from "./services/category.service";

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
    ValidationErrorsModule,
  ],
  providers: [
    CategoryService,
  ]
})
export class AddCategoryDialogModule { }
