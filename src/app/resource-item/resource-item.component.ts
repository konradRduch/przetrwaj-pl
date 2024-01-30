import { Component, Input } from '@angular/core';
import { ResourcePoint } from '../models/resourcePoint';
import { CommonModule } from '@angular/common';
import { ResourcesService } from '../services/resources.service';
import { Resource } from '../models/resource';

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

  constructor(private resourceService: ResourcesService) { }

  removeResource(resource: Resource) {
    this.resourceService.removeResourceFromPoint(resource, this.resourceService.getResourcePointIndex(this.resourcePoint!));
  }
}
