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

import { MarkerDialogService } from './services/marker-dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MarkerDialogComponent
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
  providers: [MarkerDialogService],
  entryComponents: [
    MarkerDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
