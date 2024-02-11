import { Component, Input } from '@angular/core';
import { Incident } from '../models/incident';
import { CommonModule } from '@angular/common';
import { GlobalVariablesService } from '../services/global-variables.service';
import { IncidentsService } from '../services/incidents.service';

@Component({
  selector: 'app-incident-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './incident-item.component.html',
  styleUrl: './incident-item.component.css'
})
export class IncidentItemComponent {
  @Input() incident?: Incident;

  constructor(public globalVariablesService: GlobalVariablesService, private indidentsService: IncidentsService) { }

  removeIncident(incident: Incident) {
    this.indidentsService.removeIncident(incident);
    this.indidentsService.removeIncidentLocally(incident);
  }

  confirmIncident(incident: Incident) {
    this.globalVariablesService.addConfirmation(incident.incidentId, true)
    this.indidentsService.confirmIncident(incident);
    //console.log(this.globalVariablesService.incidentConfirmationMap)
  }

  rejectIncident(incident: Incident) {
    this.globalVariablesService.addConfirmation(incident.incidentId, true)
    this.indidentsService.rejectIncident(incident);
    //console.log(this.globalVariablesService.incidentConfirmationMap)
  }
}
