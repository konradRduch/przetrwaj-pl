import { Component, Input } from '@angular/core';
import { ResourcePoint } from '../models/resourcePoint';
import { CommonModule } from '@angular/common';
import { ResourcesService } from '../services/resources.service';
import { Resource } from '../models/resource';
import { GlobalVariablesService } from '../services/global-variables.service';

@Component({
  selector: 'app-resource-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './resource-item.component.html',
  styleUrl: './resource-item.component.css'
})
export class ResourceItemComponent {
  @Input() resourcePoint?: ResourcePoint;

  constructor(private resourceService: ResourcesService, public globalVariablesService: GlobalVariablesService) { }

  removeResource(resource: Resource) {
    this.resourceService.removeResource(resource);
    //no need to fetch again
    this.resourceService.removeResourceFromPoint(resource, this.resourceService.getResourcePointIndex(this.resourcePoint!));
  }

  removeResourcePoint(resourcePoint: ResourcePoint) {
    this.resourceService.removeResourcePoint(resourcePoint);
  }
}
