import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerDialogComponent } from './marker-dialog/marker-dialog.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

import { MarkerDialogService } from './services/marker-dialog.service';
import { MapService } from './services/map.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MarkerDialogComponent,
    AuthDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [
    MarkerDialogService,
    MapService,
    UserService,
    AuthService
  ],
  entryComponents: [
    MarkerDialogComponent,
    AuthDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
