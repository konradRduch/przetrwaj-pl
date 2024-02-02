import { Injectable } from '@angular/core';
import { ResourcePoint } from '../models/resourcePoint';
import { Resource } from '../models/resource';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private _resourcesPoints: ResourcePoint[] = [];
  resources = new BehaviorSubject<ResourcePoint[]>(this._resourcesPoints);

  constructor() { this.onInit(); }

  onInit() {
    this._resourcesPoints = [
      {
        location: { address: "address 1", latitude: 50.288541376422316, longitude: 18.677392396155188 },
        title: "Resources Point 1",
        resources: [{
          resourceType: { name: "Resource 1", description: "description 1" },
          quantity: 1,
          unit: "unit 1",
        },
        {
          resourceType: { name: "Resource 2", description: "description 2" },
          quantity: 2,
          unit: "unit 2",
        },
        {
          resourceType: { name: "Resource 3", description: "description 3" },
          quantity: 3,
          unit: "unit 3",
        }]
      },
      {
        location: { address: "address 2", latitude: 50.28868249257966, longitude: 18.67758005929157 },
        title: "Resources Point 2",
        resources: [{
          resourceType: { name: "Resource 12", description: "description 1" },
          quantity: 1,
          unit: "unit 1",
        },
        {
          resourceType: { name: "Resource 22", description: "description 2" },
          quantity: 2,
          unit: "unit 2",
        },
        {
          resourceType: { name: "Resource 32", description: "description 3" },
          quantity: 3,
          unit: "unit 3",
        }]
      },
      {
        location: { address: "address 3", latitude: 50.28870421262463, longitude: 18.677265243529188 },
        title: "Resources Point 3",
        resources: [{
          resourceType: { name: "Resource 13", description: "description 1" },
          quantity: 1,
          unit: "unit 1",
        },
        {
          resourceType: { name: "Resource 23", description: "description 2" },
          quantity: 2,
          unit: "unit 2",
        }]
      }
    ];
  }

  addResourceToPoint(resource: Resource, index: number) {
    let existingResource = this._resourcesPoints[index].resources.find(r => r.resourceType.name === resource.resourceType.name);

    if (existingResource) {
      existingResource.quantity += resource.quantity;
    } else {
      this._resourcesPoints[index].resources.push(resource);
    }
  }

  addResourcesToPoint(resources: Resource[], index: number) {
    for (let resource of resources) {
      let existingResource = this._resourcesPoints[index].resources.find(r => r.resourceType.name === resource.resourceType.name);

      if (existingResource) {
        existingResource.quantity += resource.quantity;
        if (existingResource.quantity == 0) {
          this.removeResourceFromPoint(existingResource, index)
        }
      } else {
        this._resourcesPoints[index].resources.push(resource);
      }
    }
  }

  removeResourceFromPoint(resource: Resource, index: number) {
    this._resourcesPoints[index].resources = this._resourcesPoints[index].resources.filter(i => i !== resource);
    this.resources.next(this._resourcesPoints);
  }

  removeAllResourcesFromPoint(index: number) {
    this._resourcesPoints[index].resources = [];
    this.resources.next(this._resourcesPoints);
  }

  getResourcesFromPoint(index: number) {
    return this.resources.value[index].resources;
  }

  getResourcesCountFromPoint(index: number) {
    return this.resources.value[index].resources.length;
  }

  getResourcesPointLocation(index: number) {
    return this.resources.value[index].location;
  }

  getResourcesPoints() {
    return this.resources.asObservable();
  }

  getResourcePointTitles(): string[] {
    return this._resourcesPoints.map(rp => rp.title);
  }

  addResourcesPoint(resourcePoint: ResourcePoint) {
    this._resourcesPoints.push(resourcePoint);
    this.resources.next(this._resourcesPoints);
  }

  getResourcePointIndex(resourcePoint: ResourcePoint) {
    return this._resourcesPoints.indexOf(resourcePoint);
  }

  // function has the same code as function belowe, but it will be used to fetch incidents from database instead of filtering so the code will be different
  // current implementation is just a placeholder for testing
  fetchResourcePointsByLocation(northBound: number, southBound: number, eastBound: number, westBound: number) {
    // TODO: get incidents/resources from database instead of filtering
    this.resources.next(this._resourcesPoints.filter(resourcePoint => {
      return resourcePoint.location.latitude < northBound &&
        resourcePoint.location.latitude > southBound &&
        resourcePoint.location.longitude < eastBound &&
        resourcePoint.location.longitude > westBound
    }));
  }

  getResourcePointsFromArea(northBound: number, southBound: number, eastBound: number, westBound: number) {
    return this._resourcesPoints.filter(resourcePoint => {
      return resourcePoint.location.latitude < northBound &&
        resourcePoint.location.latitude > southBound &&
        resourcePoint.location.longitude < eastBound &&
        resourcePoint.location.longitude > westBound
    });
  }
}
