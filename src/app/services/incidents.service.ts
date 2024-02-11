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

  addIncident(lat: number, lng: number, locationToAdd: any, incidentDescription: any, incidentTypeIndex: number, incidentTitle: string) {
    this.http.post<any>('/api/v1/location', {
      address: "address",
      longitude: lng,
      latitude: lat
    }).subscribe(resp => {
      locationToAdd = {
        id: resp.id,
        address: resp.address,
        latitude: resp.latitude,
        longitude: resp.longitude
      };
      this.http.post<any>('/api/v1/report/addReport', {
        name: incidentTitle,
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
    this.http.post<any>('/api/v1/report/removeReport', 
      incident.incidentId
    ).subscribe(resp => {
      console.log("deleted incident")
    });
  }

  rejectIncident(incident: Incident) {
    this.http.post<any>('/api/v1/report/rejectReport', 
      incident.incidentId
    ).subscribe(resp => {
      console.log("rejected incident")
    });
  }

  confirmIncident(incident: Incident) {
    this.http.post<any>('/api/v1/report/confirmReport', 
      incident.incidentId
    ).subscribe(resp => {
      console.log("confirmed incident")
    });
  }

  removeIncidentLocally(incident: Incident) {
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
    this.http.get<any[]>('/api/v1/reportType/getAllReportTypes', {}).subscribe(data => {
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
    this.mapBoundsService.currentMapBounds.subscribe(bounds => {
      this.http.post<any[]>('/api/v1/report/getRepsByLoc',
        {
          latitudeLowerBoundry: bounds.south,
          latitudeUpperBoundry: bounds.north,
          longitudeLowerBoundry: bounds.west,
          longitudeUpperBoundry: bounds.east
        }
      ).subscribe(data => {
        this._incidents = data.map(report => {
          // console.log(report);
          return {
            incidentId: report.id,
            title: report.name,
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
            creationDate: report.dateCreation,
            expirationDate: report.dateExpiration,
            dangerLevel: report.threatDegree,
            confirmations: report.confirmations,
            rejections: report.rejections,
          }
        });
        this.incidents.next(this._incidents);
      });
    });
  }
}
