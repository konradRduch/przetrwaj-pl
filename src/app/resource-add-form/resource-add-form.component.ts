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
  resources: any[] = [];
  resourcesPointIndex: number = 0;
  resourceTypeId: number = 1;
  resourceTypeUnit!: string;
  resourcePointTitles!: string[];
  resourceQuantity: number = 1;
  showForm = false

  constructor(private locationService: LocationService, public resourcesService: ResourcesService) {
    this.resourcesService.resources.subscribe(() => {
      this.resourcePointTitles = this.resourcesService.getResourcePointTitles();
    });
    this.addResourceToPoint();
  }

  addResourceToPoint() {
    this.resources.push({
      resourceType: {
        id: this.resourceTypeId,
        name: "typeNameUselessHere",
        description: "descriptionUseless",
        unit: this.resourceTypeUnit,
      },
      quantity: this.resourceQuantity,
    });
  }

  addResourcesToPoint() {
    //console.log(this.resources)
    this.resourcesService.addResourcesToPoint(this.resources, Number(this.resourcesPointIndex) + 1)
    this.resources = []    
  }
}
