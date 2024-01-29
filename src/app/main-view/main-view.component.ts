import { Component } from '@angular/core';
import { IncidentsListComponent } from '../incidents-list/incidents-list.component';
import { MapComponent } from '../map/map.component';
import { ResourcesListComponent } from '../resources-list/resources-list.component';
import { IncidentAddFormComponent } from '../incident-add-form/incident-add-form.component';
import { ResourceAddFormComponent } from '../resource-add-form/resource-add-form.component';
import { MapMarkersService } from '../services/map-markers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    IncidentsListComponent,
    ResourcesListComponent,
    MapComponent,
    IncidentAddFormComponent,
    ResourceAddFormComponent,
    CommonModule
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

  constructor(public mapMarkerService: MapMarkersService) {}
}
