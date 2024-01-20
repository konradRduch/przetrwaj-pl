import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-incident-add-form',
  standalone: true,
  imports: [],
  templateUrl: './incident-add-form.component.html',
  styleUrl: './incident-add-form.component.css'
})
export class IncidentAddFormComponent {
  latMarker: any;
  lngMarker: any;

  setLocation(lat: number, lng: number){
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
