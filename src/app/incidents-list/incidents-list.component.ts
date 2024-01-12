import { Component, HostListener } from '@angular/core';
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
  public getScreenHeight: any;

  constructor(private incidentService: IncidentsService) {
    this.incidents = incidentService.getIncidents();
  }

  ngOnInit() {
    this.getScreenHeight = window.innerHeight - 150;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenHeight = window.innerHeight - 150;
  }

}
