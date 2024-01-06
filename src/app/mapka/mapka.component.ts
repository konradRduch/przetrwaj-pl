import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

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
  selector: 'app-mapka',
  templateUrl: './mapka.component.html',
  styleUrls: ['./mapka.component.css']
})
export class MapkaComponent {
  center: google.maps.LatLngLiteral = { lat: 50.28854410989689, lng: 18.678064408570513 }; // default location - AEI Gliwice
  markers: Marker[] = [];
  @ViewChild('map', { static: true }) map!: GoogleMap;

  addMarker(event: google.maps.MapMouseEvent) {
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
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }

  getMarkerUrl(color: string): string {
    return `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
  }
}
