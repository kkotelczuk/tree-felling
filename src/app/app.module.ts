import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerInfoComponent } from './marker-info/marker-info.component';
import { MarkerDialogComponent } from './marker-dialog/marker-dialog.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { UserListComponent } from './user-list/user-list.component';

import { MarkerDialogService } from './services/marker-dialog.service';
import { MapService } from './services/map.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MarkerDialogComponent,
    AuthDialogComponent,
    MarkerInfoComponent,
    UserListComponent
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
    AuthService,
    UsersService
  ],
  entryComponents: [
    MarkerDialogComponent,
    AuthDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
