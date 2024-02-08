import { Component } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { LocationService } from '../services/location.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapMarkersService } from '../services/map-markers.service';
import { MapBoundsService } from '../services/map-bounds.service';

@Component({
  selector: 'app-resource-point-add-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './resource-point-add-form.component.html',
  styleUrl: './resource-point-add-form.component.css'
})
export class ResourcePointAddFormComponent {
  latMarker: any;
  lngMarker: any;
  resourcePointTitle: string = "";

  setLocation(lat: number, lng: number) {
    this.latMarker = lat
    this.lngMarker = lng
  }

  constructor(private locationService: LocationService, private resourcesService: ResourcesService,
    private mapMarkerService: MapMarkersService, private mapBoundsService: MapBoundsService) { }

  ngOnInit() {
    this.locationService.currentLocation.subscribe(location => {
      this.setLocation(location.lat, location.lng);
    });
  }

  addResourcePoint() {
    const ResourcePoint = {
      location: { address: "address", latitude: this.latMarker, longitude: this.lngMarker },
      title: this.resourcePointTitle,
      resources: []
    };
    // console.log(ResourcePoint);
    this.mapMarkerService.clearMarker();
    this.resourcesService.addResourcesPoint(ResourcePoint);
  }
}
