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
        location: { lat: 50.288541376422316, lng: 18.677392396155188 },
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
        location: { lat: 50.28868249257966, lng: 18.67758005929157 },
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
        location: { lat: 50.28870421262463, lng: 18.677265243529188 },
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
    this._resourcesPoints[index].resources.push(resource);
    this.resources.next(this._resourcesPoints);
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

  addResourcesPoint(resourcePoint: ResourcePoint) {
    this._resourcesPoints.push(resourcePoint);
    this.resources.next(this._resourcesPoints);
  }

  // function has the same code as function belowe, but it will be used to fetch incidents from database instead of filtering so the code will be different
  // current implementation is just a placeholder for testing
  fetchResourcePointsByLocation(northBound: number, southBound: number, eastBound: number, westBound: number) {
    // TODO: get incidents/resources from database instead of filtering
    this.resources.next(this._resourcesPoints.filter(resourcePoint => {
      return resourcePoint.location.lat < northBound &&
        resourcePoint.location.lat > southBound &&
        resourcePoint.location.lng < eastBound &&
        resourcePoint.location.lng > westBound
    }));
  }

  getResourcePointsFromArea(northBound: number, southBound: number, eastBound: number, westBound: number) {
    return this._resourcesPoints.filter(resourcePoint => {
      return resourcePoint.location.lat < northBound &&
        resourcePoint.location.lat > southBound &&
        resourcePoint.location.lng < eastBound &&
        resourcePoint.location.lng > westBound
    });
  }
}
