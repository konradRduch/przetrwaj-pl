import { Component } from '@angular/core';
import { Incident } from '../models/incident';
import { IncidentItemComponent } from '../incident-item/incident-item.component';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../services/incidents.service';

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

  constructor(private incidentService: IncidentsService) {
    this.incidents = incidentService.getIncidents();
  }

}