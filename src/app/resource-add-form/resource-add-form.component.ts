import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { ResourcesService } from '../services/resources.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Resource } from '../models/resource';

@Component({
  selector: 'app-resource-add-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './resource-add-form.component.html',
  styleUrl: './resource-add-form.component.css'
})
export class ResourceAddFormComponent {
  resources: Resource[] = [];
  resourcesPointIndex!: number;
  resourceTypeName: string = "typeName";
  resourcePointTitles!: string[];
  resourceQuantity: number = 1;
  showForm = false

  constructor(private locationService: LocationService, private resourcesService: ResourcesService) {
    this.resourcesService.resources.subscribe(() => {
      this.resourcePointTitles = this.resourcesService.getResourcePointTitles();
    });
    this.addResourceToPoint();
  }

  addResourceToPoint() {
    this.resources.push({
      resourceType: { name: this.resourceTypeName, description: "description" },
      quantity: this.resourceQuantity,
      unit: "unit",
    });
  }

  addResourcesToPoint() {
    this.resourcesService.addResourcesToPoint(this.resources, this.resourcesPointIndex)
    this.resources = []
    this.addResourceToPoint();
  }
}
