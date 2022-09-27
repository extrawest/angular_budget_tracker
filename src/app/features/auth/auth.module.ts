import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthViewComponent } from './containers/auth-view';
import { LoginViewComponent } from './containers/login-view';
import { RegisterViewComponent } from './containers/register-view';

@NgModule({
  declarations: [
    AuthViewComponent,
    LoginViewComponent,
    RegisterViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
