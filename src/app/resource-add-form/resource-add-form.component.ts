import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-resource-add-form',
  standalone: true,
  imports: [],
  templateUrl: './resource-add-form.component.html',
  styleUrl: './resource-add-form.component.css'
})
export class ResourceAddFormComponent {
  latMarker: any;
  lngMarker: any;

  setLocation(lat: number, lng: number) {
    this.latMarker = lat
    this.lngMarker = lng
  }

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.currentLocation.subscribe(location => {
      this.setLocation(location.lat, location.lng);
    });
  }
}
