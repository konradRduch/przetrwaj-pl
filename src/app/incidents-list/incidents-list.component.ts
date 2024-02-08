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

  constructor(private incidentService: IncidentsService) {
    this.incidentService.getIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
    });
  }
}
