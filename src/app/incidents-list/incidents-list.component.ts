import { Component, HostListener } from '@angular/core';
import { Incident } from '../models/incident';
import { IncidentItemComponent } from '../incident-item/incident-item.component';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../services/incidents.service';
import { MapBoundsService } from '../services/map-bounds.service';

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [
    IncidentItemComponent,
    CommonModule
  ],
  templateUrl: './incidents-list.component.html',
  styleUrl: './incidents-list.component.css'
})
export class IncidentsListComponent {
  incidents: Incident[] = [];
  area: any;

  constructor(private incidentService: IncidentsService, private mapBoundsService: MapBoundsService) {
    this.area = mapBoundsService.currentMapBounds.subscribe(bounds => {
      this.area = bounds;
      // console.log(this.area);
      this.incidents = this.incidentService.getIncidentsFromArea(this.area.north, this.area.south, this.area.east, this.area.west);
    });
  }
}
