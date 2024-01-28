import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { ResourcesService } from '../services/resources.service';
import { MapMarkersService } from '../services/map-markers.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resource-add-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './resource-add-form.component.html',
  styleUrl: './resource-add-form.component.css'
})
export class ResourceAddFormComponent {
  latMarker: any;
  lngMarker: any;
  resourcePointTitle: string = "";

  setLocation(lat: number, lng: number) {
    this.latMarker = lat
    this.lngMarker = lng
  }

  constructor(private locationService: LocationService, private resourcesService: ResourcesService, private mapMarkerService: MapMarkersService ) { }

  ngOnInit() {
    this.locationService.currentLocation.subscribe(location => {
      this.setLocation(location.lat, location.lng);
    });
  }

  addResourcePoint() {
    const ResourcePoint = {
        location: { lat: this.latMarker, lng: this.lngMarker },
        title: this.resourcePointTitle,
        resources: []
      };
      this.mapMarkerService.clearMarker();
      this.resourcesService.addResourcesPoint(ResourcePoint);
    } 

}
