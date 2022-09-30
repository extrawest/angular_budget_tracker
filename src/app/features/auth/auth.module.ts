import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthViewComponent } from '../../containers/auth-view';
import { ValidationErrorsModule } from '../../shared/modules/validation-errors';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginViewComponent } from './containers/login-view';
import { RegisterViewComponent } from './containers/register-view';
import { VerifyEmailViewComponent } from './containers/verify-email-view';

@NgModule({
  declarations: [
    AuthViewComponent,
    LoginViewComponent,
    RegisterViewComponent,
    VerifyEmailViewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    AuthRoutingModule,
    ValidationErrorsModule,
  ],
})
export class AuthModule { }
