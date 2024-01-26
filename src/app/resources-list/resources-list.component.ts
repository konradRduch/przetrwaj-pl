import { Component, HostListener } from '@angular/core';
import { ResourceItemComponent } from '../resource-item/resource-item.component';
import { CommonModule } from '@angular/common';
import { ResourcesService } from '../services/resources.service';
import { RouterModule } from '@angular/router';
import { ResourcePoint } from '../models/resourcePoint';
import { MapBoundsService } from '../services/map-bounds.service';

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
  area: any;

  constructor(private resourceService: ResourcesService, private resourcesService: ResourcesService, private mapBoundsService: MapBoundsService) {
    this.area = mapBoundsService.currentMapBounds.subscribe(bounds => { 
      this.area = bounds; console.log(this.area); 
      this.resourcePoints = this.resourceService.getResourcePointsFromArea(this.area.north, this.area.south, this.area.east, this.area.west);
    });
  }
}