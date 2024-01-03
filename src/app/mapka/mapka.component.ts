import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-mapka',
  templateUrl: './mapka.component.html',
  styleUrls: ['./mapka.component.css']
})
export class MapkaComponent {
  center: google.maps.LatLngLiteral = { lat: 50.28854410989689, lng: 18.678064408570513 }; // default location - AEI Gliwice
  markers: { position: { lat: number, lng: number } }[] = [];
  @ViewChild('map', { static: true }) map!: GoogleMap;

  addMarker(event: google.maps.MapMouseEvent) {
    this.markers.push({
      position: {
        lat: event.latLng!.lat(),
        lng: event.latLng!.lng(),
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
}
