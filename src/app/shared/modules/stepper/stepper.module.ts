import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StepperComponent } from './stepper.component';

@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule,
    CdkStepperModule,
  ],
  exports: [
    StepperComponent,
    CdkStepperModule,
  ],
})
export class StepperModule { }
