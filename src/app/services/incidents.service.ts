import { Injectable } from '@angular/core';
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  Incidents: Incident[] = [];

  constructor() { this.onInit(); }

  onInit() {
    this.Incidents = [
      {
        title: "Incident 1",
        description: "Description 1",
        address: "Address 1",
        location: {
          latitude: 0,
          longitude: 0
        },
        creationDate: new Date("2024-01-01T00:00:00.000Z"),
        expirationDate: new Date("2024-02-01T00:00:00.000Z"),
        dangerLevel: 1,
      },
      {
        title: "Incident 2",
        description: "Description 2",
        address: "Address 2",
        location: {
          latitude: 0,
          longitude: 0
        },
        creationDate: new Date("2024-01-01T00:00:00.000Z"),
        expirationDate: new Date("2024-02-01T00:00:00.000Z"),
        dangerLevel: 2,
      }
    ];
  }

  addIncident(incident: Incident) {
    this.Incidents.push(incident);
  }

  removeIncident(incident: Incident) {
    this.Incidents = this.Incidents.filter(i => i !== incident);
  }

  removeIncidentByIndex(index: number) {
    this.Incidents.splice(index, 1);
  }

  removeAllIncidents() {
    this.Incidents = [];
  }

  getIncidents() {
    return this.Incidents;
  }

  getIncident(index: number) {
    return this.Incidents[index];
  }

  getIncidentCount() {
    return this.Incidents.length;
  }

  getIncidentIndex(incident: Incident) {
    return this.Incidents.indexOf(incident);
  }
}
