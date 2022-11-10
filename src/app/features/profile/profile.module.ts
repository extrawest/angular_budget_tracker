import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

import { ValidationErrorsModule } from '../../shared/modules/validation-errors';

import { ProfileViewComponent } from './containers';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfileViewComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ValidationErrorsModule,
    AvatarModule,
    ButtonModule,
    FileUploadModule,
    InputTextModule,
    ToastModule,
    MessagesModule,
  ],
})
export class ProfileModule { }
