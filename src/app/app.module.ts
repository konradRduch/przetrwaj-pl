import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './loading-spiner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps'
import { IncidentsListComponent } from './incidents-list/incidents-list.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { MapComponent } from './map/map.component';
import { IncidentsService } from './services/incidents.service';
import { ResourcesService } from './services/resources.service';
import { IncidentAddFormComponent } from './incident-add-form/incident-add-form.component';
import { LocationService } from './services/location.service';
import { ResourceAddFormComponent } from './resource-add-form/resource-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    IncidentsListComponent,
    ResourcesListComponent,
    MapComponent,
    IncidentAddFormComponent,
    ResourceAddFormComponent
  ],
  providers: [
    IncidentsService,
    ResourcesService,
    LocationService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
