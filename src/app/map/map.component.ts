import { Component, ViewChild, HostListener } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../services/incidents.service';
import { ResourcesService } from '../services/resources.service';
import { LocationService } from '../services/location.service';

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string; // visible on hover
  options: {
    icon: string; // url to custom marker icon
  }
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  center: google.maps.LatLngLiteral = { lat: 50.28854410989689, lng: 18.678064408570513 }; // default location - AEI Gliwice
  markers: Marker[] = [];
  public getScreenHeight: any;
  public getScreenWidth: any;
  private selectedLocation = false;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  constructor(private incidentsService: IncidentsService, private resourcesService: ResourcesService, private locationService: LocationService) { }

  addMarker(event: google.maps.MapMouseEvent) {
    if (this.selectedLocation) {
      this.markers.pop();
    }

    this.markers.push({
      position: {
        lat: event.latLng!.lat(),
        lng: event.latLng!.lng(),
      },
      title: 'Sample title',
      options: {
        icon: this.getMarkerUrl('green'),
      }
    })
    this.selectedLocation = true;

    this.locationService.changeLocation(event.latLng!.lat(), event.latLng!.lng());
  }

  // function can be used to get map bounds coordinates and filter incidents/resources
  getMapCoordinates() {
    // bound are adjusted to fetch 3 times more data than visible on screen, because of zooming
    var mapBounds = this.map.getBounds()!;
    let verticalCenter = (mapBounds.getNorthEast().lat() + mapBounds.getSouthWest().lat()) / 2;
    let horizontalCenter = (mapBounds.getNorthEast().lng() + mapBounds.getSouthWest().lng()) / 2;
    let fetchVerticalDistance = (mapBounds.getNorthEast().lat() - mapBounds.getSouthWest().lat()) * 3;
    let fetchHorizontalDistance = (mapBounds.getNorthEast().lng() - mapBounds.getSouthWest().lng()) * 3;
    let northBound = verticalCenter + fetchVerticalDistance;
    let southBound = verticalCenter - fetchVerticalDistance;
    let eastBound = horizontalCenter + fetchHorizontalDistance;
    let westBound = horizontalCenter - fetchHorizontalDistance;

    this.incidentsService.fetchIncidentsByLocation(northBound, southBound, eastBound, westBound);
    this.resourcesService.fetchResourcePointsByLocation(northBound, southBound, eastBound, westBound);
    console.log(this.incidentsService.getIncidents());
    // TODO: get incidents/resources from database
  }

  ngOnInit() {
    this.markers = this.incidentsService.getIncidents().map(incident => {
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

    this.markers.push(...this.resourcesService.getResourcesPoints().map(resource => {
      return {
        position: {
          lat: resource.location.lat,
          lng: resource.location.lng,
        },
        title: resource.title,
        options: {
          icon: this.getMarkerUrl('blue'),
        }
      }
    }));

    console.log(this.markers);

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });

    this.getScreenHeight = window.innerHeight - 100;
    this.getScreenWidth = window.innerWidth - 500;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenHeight = window.innerHeight - 100;
    this.getScreenWidth = window.innerWidth - 500;
  }

  getMarkerUrl(color: string): string {
    return `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
  }
}
