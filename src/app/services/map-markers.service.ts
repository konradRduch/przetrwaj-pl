import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IncidentsService } from './incidents.service';
import { ResourcesService } from './resources.service';

@Injectable({
  providedIn: 'root'
})
export class MapMarkersService {
  addedMarker: any[] = [];
  _markers: any[] = [];
  markers = new BehaviorSubject<any[]>(this._markers);

  constructor(private incidentsService: IncidentsService, private resourcesService: ResourcesService) {
    this.incidentsService.incidents.subscribe(incidents => {
      let markersArray = [];

      markersArray = incidents.map(incident => {
        return {
          position: {
            lat: incident.location.latitude,
            lng: incident.location.longitude,
          },
          title: incident.title,
          options: {
            icon: this.getMarkerUrl('red'),
          }
        }
      });

      markersArray.push(...this.resourcesService.resources.value.map(resourcePoint => {
        return {
          position: {
            lat: resourcePoint.location.lat,
            lng: resourcePoint.location.lng,
          },
          title: resourcePoint.title,
          options: {
            icon: this.getMarkerUrl('blue'),
          }
        }
      }));

      this._markers = markersArray;
      this._markers.push(...this.addedMarker);
      this.markers.next(this._markers);
    });

    this.resourcesService.resources.subscribe(resources => {
      let markersArray = [];

      markersArray = resources.map(resourcePoint => {
        return {
          position: {
            lat: resourcePoint.location.lat,
            lng: resourcePoint.location.lng,
          },
          title: resourcePoint.title,
          options: {
            icon: this.getMarkerUrl('blue'),
          }
        }
      });

      markersArray.push(...this.incidentsService.incidents.value.map(incident => {
        return {
          position: {
            lat: incident.location.latitude,
            lng: incident.location.longitude,
          },
          title: incident.title,
          options: {
            icon: this.getMarkerUrl('red'),
          }
        }
      }));

      this._markers = markersArray;
      this._markers.push(...this.addedMarker);
      this.markers.next(this._markers);
    });
  }

  getMarkers() {
    return this.markers.asObservable();
  }

  addMarker(markerIncident: any[]) {
    this.addedMarker = markerIncident;
  }

  clearMarker() {
    this.addedMarker = []
  }

  getMarkerUrl(color: string): string {
    return `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
  }

}
