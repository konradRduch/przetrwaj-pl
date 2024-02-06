import { Component, HostListener } from '@angular/core';
import { IncidentsListComponent } from '../incidents-list/incidents-list.component';
import { MapComponent } from '../map/map.component';
import { ResourcesListComponent } from '../resources-list/resources-list.component';
import { IncidentAddFormComponent } from '../incident-add-form/incident-add-form.component';
import { ResourceAddFormComponent } from '../resource-add-form/resource-add-form.component';
import { MapMarkersService } from '../services/map-markers.service';
import { CommonModule } from '@angular/common';
import { ResourcePointAddFormComponent } from '../resource-point-add-form/resource-point-add-form.component';
import { GlobalVariablesService } from '../services/global-variables.service';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    IncidentsListComponent,
    ResourcesListComponent,
    MapComponent,
    IncidentAddFormComponent,
    ResourceAddFormComponent,
    ResourcePointAddFormComponent,
    CommonModule
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
  public columnHeight: any;
  public columnWidth: any;

  constructor(public mapMarkerService: MapMarkersService, public globalVariablesService: GlobalVariablesService) {
    this.columnHeight = window.innerHeight - 55;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.columnHeight = window.innerHeight - 55;
  }
}
