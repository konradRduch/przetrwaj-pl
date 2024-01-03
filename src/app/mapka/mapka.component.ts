import { Component, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-mapka',
  templateUrl: './mapka.component.html',
  styleUrls: ['./mapka.component.css']
})
export class MapkaComponent {
  center: google.maps.LatLngLiteral = { lat: 50.2889384, lng: 18.6777903 };

  

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }
}
