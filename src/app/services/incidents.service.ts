import { Injectable } from '@angular/core';
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  incidents: Incident[] = [];

  constructor() { this.onInit(); }

  onInit() {
    this.incidents = [
      {
        title: "Incident 1",
        description: "Description 1",
        incidentType: {
          name: "Type 1",
          description: "Type 1 description 1"
        },
        address: "Address 1",
        location: {
          latitude: 50.289249427433276,
          longitude: 18.677359521591264
        },
        creationDate: new Date("2024-01-01T00:00:00.000Z"),
        expirationDate: new Date("2024-02-01T00:00:00.000Z"),
        dangerLevel: 1,
      },
      {
        title: "Incident 2",
        description: "Description 2",
        incidentType: {
          name: "Type 2",
          description: "Type2 description 2"
        },
        address: "Address 2",
        location: {
          latitude: 50.28964178913704,
          longitude: 18.67766363209228
        },
        creationDate: new Date("2024-01-01T00:00:00.000Z"),
        expirationDate: new Date("2024-02-01T00:00:00.000Z"),
        dangerLevel: 2,
      }
    ];
  }

  addIncident(incident: Incident) {
    this.incidents.push(incident);
  }

  removeIncident(incident: Incident) {
    this.incidents = this.incidents.filter(i => i !== incident);
  }

  removeIncidentByIndex(index: number) {
    this.incidents.splice(index, 1);
  }

  removeAllIncidents() {
    this.incidents = [];
  }

  getIncidents() {
    return this.incidents;
  }

  getIncident(index: number) {
    return this.incidents[index];
  }

  getIncidentCount() {
    return this.incidents.length;
  }

  getIncidentIndex(incident: Incident) {
    return this.incidents.indexOf(incident);
  }

  fetchIncidentsByLocation(northBound: number, southBound: number, eastBound: number, westBound: number) {
    // TODO: get incidents from database instead of filtering
    this.incidents = this.incidents.filter(incident => {
      return incident.location.latitude < northBound && incident.location.latitude > southBound && incident.location.longitude < eastBound && incident.location.longitude > westBound;
    });
  }
}
