import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { ErrorViewComponent } from './containers/error-view';
import { RootViewComponent } from './containers/root-view';

@NgModule({
  declarations: [
    RootViewComponent,
    ErrorViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
  ],
  bootstrap: [RootViewComponent],
})
export class AppModule {}
