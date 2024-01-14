import { Component, ViewChild, HostListener } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

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
