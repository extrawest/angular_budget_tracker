import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LetModule, PushModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'primeng/api';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { DashboardViewComponent } from './containers/dashboard-view';
import { ErrorViewComponent } from './containers/error-view';
import { RootViewComponent } from './containers/root-view';
import { HeaderModule } from './shared/modules/header';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [
    RootViewComponent,
    DashboardViewComponent,
    ErrorViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LetModule,
    PushModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HeaderModule,
    StateModule,
    SharedModule,
  ],
  bootstrap: [RootViewComponent],
})
export class AppModule {}
