import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './loading-spiner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { MapkaComponent } from './mapka/mapka.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { IncidentsListComponent } from './incidents-list/incidents-list.component';
import { IncidentItemComponent } from './incident-item/incident-item.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    MapkaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    IncidentsListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
