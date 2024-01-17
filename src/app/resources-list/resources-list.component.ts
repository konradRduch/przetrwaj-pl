import { Component, HostListener } from '@angular/core';
import { ResourceItemComponent } from '../resource-item/resource-item.component';
import { CommonModule } from '@angular/common';
import { ResourcesService } from '../services/resources.service';
import { RouterModule } from '@angular/router';
import { ResourcePoint } from '../models/resourcePoint';

@Component({
  selector: 'app-resources-list',
  standalone: true,
  imports: [
    ResourceItemComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './resources-list.component.html',
  styleUrl: './resources-list.component.css'
})
export class ResourcesListComponent {
  resourcePoints: ResourcePoint[] = [];
  
  constructor(private resourceService: ResourcesService) {
    this.resourcePoints = resourceService.getResourcesPoints();
  }
}