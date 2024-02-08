import { Injectable } from '@angular/core';
import { Incident } from '../models/incident';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { MapBoundsService } from './map-bounds.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  incidentsType: any[] = []

  private _incidents: Incident[] = [];
  incidents = new BehaviorSubject<Incident[]>(this._incidents);

  constructor(private http: HttpClient, private mapBoundsService: MapBoundsService) { this.onInit(); }

  onInit() {
    this.fetchIncidentsByLocation()
    this.getIncidentsTypes()
  }

  addIncident(lat: number, lng: number, locationToAdd: any, incidentDescription: any, incidentTypeIndex: number) {
    this.http.post<any>('/api/v1/location', {
      address: "sinadal",
      longitude: lng,
      latitude: lat
    }).subscribe(resp => {
      locationToAdd = {
        id: resp.id,
        address: resp.address,
        latitude: resp.latitude,
        longitude: resp.longitude
      };
      this.http.post<any>('/api/v1/report', {
        locationId: locationToAdd.id,
        reportTypeID: incidentTypeIndex,
        threatDegree: "999",
        description: incidentDescription
      }).subscribe(resp => {
        // console.log(resp);
        this.fetchIncidentsByLocation();
      });
    });
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

  getIncidentsTypes() {
    this.http.get<any[]>('/api/v1/reportType', {}).subscribe(data => {
      const types: any[] = [];
      for (let report in data) {
        types.push({
          "typeName": data[report].typeName
        });
      }
      this.incidentsType.push(types);
    });
  }

  getIncidentTypeNames(): any[] {
    let typeNames: any[] = [];
    for (let i = 0; i < this.incidentsType[0].length; i++) {
      typeNames.push(this.incidentsType.map(t => t[i].typeName));
    }
    return typeNames;
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

  fetchIncidentsByLocation() {
    this.http.post<any[]>('/api/v1/report/getRepsByLoc',
      {
        latitudeLowerBoundry: this.mapBoundsService.getBounds().south,
        latitudeUpperBoundry: this.mapBoundsService.getBounds().north,
        longitudeLowerBoundry: this.mapBoundsService.getBounds().west,
        longitudeUpperBoundry: this.mapBoundsService.getBounds().east
      }
    ).subscribe(data => {
      this._incidents = data.map(report => {
        // console.log(report);
        return {
          title: "title",
          description: report.description,
          incidentType: {
            name: report.reportType.typeName,
            description: report.reportType.typeDescription
          },
          location: {
            address: report.location.address,
            latitude: report.location.latitude,
            longitude: report.location.longitude
          },
          creationDate: report.date,
          expirationDate: new Date(Date.parse(report.date) + 1000 * 60 * 60 * 24 * 7),
          dangerLevel: report.threatDegree,
          confirmations: report.confirmations,
          rejections: report.rejections,
        }
      });
      this.incidents.next(this._incidents);
    });
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
