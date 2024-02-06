import { Component, ViewChild, HostListener } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../services/incidents.service';
import { ResourcesService } from '../services/resources.service';
import { LocationService } from '../services/location.service';
import { MapBoundsService } from '../services/map-bounds.service';
import { MapMarkersService } from '../services/map-markers.service';

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
  addedMarker: any[] = [];
  public mapHeight: any;
  public mapWidth: any;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  constructor(private incidentsService: IncidentsService, private resourcesService: ResourcesService, private markersService: MapMarkersService,
    private locationService: LocationService, private boundService: MapBoundsService) { }

  addMarker(event: google.maps.MapMouseEvent) {
    this.addedMarker = [({
      position: {
        lat: event.latLng!.lat(),
        lng: event.latLng!.lng(),
      },
      title: 'New marker',
      options: {
        icon: this.getMarkerUrl('green'),
      }
    })]
    this.markersService.addMarker(this.addedMarker)
    this.locationService.changeLocation(event.latLng!.lat(), event.latLng!.lng());
    this.getMapCoordinates();
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

    this.incidentsService.fetchIncidentsByLocation();
    this.resourcesService.fetchResourcePointsByLocation();
    this.boundService.setBounds(mapBounds.getNorthEast().lat(), mapBounds.getSouthWest().lat(), mapBounds.getNorthEast().lng(), mapBounds.getSouthWest().lng());
  }

  ngOnInit() {
    this.markersService.markers.subscribe(markers => this.markers = markers);

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });

    this.mapHeight = window.innerHeight - 55;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.mapHeight = window.innerHeight - 55;
  }

  getMarkerUrl(color: string): string {
    return `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
  }
}
