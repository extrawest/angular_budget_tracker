import { NgModule } from '@angular/core';

import { ValidationErrorsDirective } from './validation-errors.directive';

@NgModule({
  declarations: [ValidationErrorsDirective],
  exports: [ValidationErrorsDirective],
})
export class ValidationErrorsModule { }
