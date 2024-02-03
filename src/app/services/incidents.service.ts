import { Injectable } from '@angular/core';
import { Incident } from '../models/incident';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { MapBoundsService } from './map-bounds.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private _incidents: Incident[] = [];
  incidents = new BehaviorSubject<Incident[]>(this._incidents);

  constructor(private http: HttpClient, private mapBoundsService: MapBoundsService) { this.onInit(); }

  onInit() {
    let bounds = this.mapBoundsService.getBounds()
    this.fetchIncidentsByLocation(bounds.north, bounds.south, bounds.east, bounds.west)
  }

  addIncident(lat: number, lng: number, locationToAdd: any, incidentDescription: any) {
    this.http.post<any>('/api/v1/location', {
      'address': "sinadal",
      'longitude': lng,
      'latitude': lat
    }).subscribe(resp => {
      locationToAdd = {
        id: resp.id,
        address: resp.address,
        latitude: resp.latitude,
        longitude: resp.longitude
      };
      this.http.post<any>('/api/v1/report', {
        locationId: locationToAdd.id, 
        reportTypeID: "1", 
        threatDegree: "999",
        description: incidentDescription
      }).subscribe(resp => {
        console.log(resp);
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
    this.http.post<any[]>('/api/v1/report/getRepsByLoc',
      {
        latitudeLowerBoundry: this.mapBoundsService.getBounds().south,
        latitudeUpperBoundry: this.mapBoundsService.getBounds().north,
        longitudeLowerBoundry: this.mapBoundsService.getBounds().west,
        longitudeUpperBoundry: this.mapBoundsService.getBounds().east
      }
    ).subscribe(data => {
      this._incidents = data.map(report => {
        console.log(report);
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
          expirationDate: new Date(Date.now()),
          dangerLevel: report.threatDegree,
          confirmations: report.confirmations,
          rejections: report.rejections,
        }
      });
      this.incidents.next(this._incidents);
    });
  }

  getAllIncidents() {
    return this._incidents
  }
}
