import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';

import { AuthViewComponent } from '../../containers/auth-view';
import { ValidationErrorsModule } from '../../shared/modules/validation-errors';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginViewComponent, RegisterViewComponent, VerifyEmailViewComponent } from './containers';

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
    MessagesModule,
    MessageModule,
  ],
})
export class AuthModule { }
