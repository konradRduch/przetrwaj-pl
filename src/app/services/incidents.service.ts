import { Injectable } from '@angular/core';
import { Incident } from '../models/incident';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private _incidents: Incident[] = [];
  incidents = new BehaviorSubject<Incident[]>(this._incidents);

  constructor() { this.onInit(); }

  onInit() {
    this._incidents = [
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
    this.incidents.next(this._incidents);
  }

  addIncident(incident: Incident) {
    this._incidents.push(incident);
    this.incidents.next(this._incidents);
  }

  removeIncident(incident: Incident) {
    this._incidents = this._incidents.filter(i => i !== incident);
    this.incidents.next(this._incidents);
  }

  removeIncidentByIndex(index: number) {
    this._incidents.splice(index, 1);
    this.incidents.next(this._incidents);
  }

  removeAllIncidents() {
    this._incidents = [];
    this.incidents.next(this._incidents);
  }

  getIncidents() {
    return this.incidents.asObservable();
  }

  getIncident(index: number) {
    return this.incidents.asObservable().subscribe(incidents => incidents[index]);
  }

  getIncidentCount() {
    return this.incidents.asObservable().subscribe(incidents => incidents.length);
  }

  getIncidentIndex(incident: Incident) {
    return this.incidents.asObservable().subscribe(incidents => incidents.indexOf(incident));
  }

  // function has the same code as function belowe, but it will be used to fetch incidents from database instead of filtering so the code will be different
  // current implementation is just a placeholder for testing
  fetchIncidentsByLocation(northBound: number, southBound: number, eastBound: number, westBound: number) {
    // TODO: get incidents from database instead of filtering
    this._incidents = this._incidents.filter(incident => incident.location.latitude < northBound && incident.location.latitude > southBound && incident.location.longitude < eastBound && incident.location.longitude > westBound);
  }

  getIncidentsFromArea(northBound: number, southBound: number, eastBound: number, westBound: number) {
    return this._incidents.filter(incident => {
      return incident.location.latitude < northBound &&
      incident.location.latitude > southBound &&
      incident.location.longitude < eastBound &&
      incident.location.longitude > westBound
    });
  }
}
