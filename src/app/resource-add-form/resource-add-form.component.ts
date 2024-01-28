import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { ResourcesService } from '../services/resources.service';
import { MapMarkersService } from '../services/map-markers.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-add-form',
  standalone: true,
  imports: [FormsModule,
            CommonModule],
  templateUrl: './resource-add-form.component.html',
  styleUrl: './resource-add-form.component.css'
})
export class ResourceAddFormComponent {
  latMarker: any;
  lngMarker: any;
  resourcePointTitle: string = "";
  resourcesPointIndex!: number;
  resourcePointTitles!: string[];
  resourceTypeName: string = "";
  resourceQuantity: number = 1;

  setLocation(lat: number, lng: number) {
    this.latMarker = lat
    this.lngMarker = lng
  }

  constructor(private locationService: LocationService, private resourcesService: ResourcesService, private mapMarkerService: MapMarkersService ) { }

  ngOnInit() {
    this.locationService.currentLocation.subscribe(location => {
      this.setLocation(location.lat, location.lng);
    });
    this.resourcePointTitles = this.resourcesService.getResourcePointTitles()
  }

  addResourcePoint() {
    const ResourcePoint = {
        location: { lat: this.latMarker, lng: this.lngMarker },
        title: this.resourcePointTitle,
        resources: []
      };
      this.mapMarkerService.clearMarker();
      this.resourcesService.addResourcesPoint(ResourcePoint);
      this.resourcePointTitles = this.resourcesService.getResourcePointTitles()
    } 

  addResourceToPoint() {
    const Resource = {
      resourceType: { name: this.resourceTypeName, description: "NEWdescription" },
      quantity: this.resourceQuantity,
      unit: "unit 1",
    };
    this.resourcesService.addResourceToPoint(Resource, this.resourcesPointIndex)
  }

}
