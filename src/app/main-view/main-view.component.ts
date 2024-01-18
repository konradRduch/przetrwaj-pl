import { Component } from '@angular/core';
import { IncidentsListComponent } from '../incidents-list/incidents-list.component';
import { MapComponent } from '../map/map.component';
import { ResourcesListComponent } from '../resources-list/resources-list.component';
import { IncidentAddFormComponent } from '../incident-add-form/incident-add-form.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    IncidentsListComponent,
    ResourcesListComponent,
    MapComponent,
    IncidentAddFormComponent
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

}
