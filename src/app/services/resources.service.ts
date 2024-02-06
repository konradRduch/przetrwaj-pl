import { Injectable } from '@angular/core';
import { ResourcePoint } from '../models/resourcePoint';
import { Resource } from '../models/resource';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapBoundsService } from './map-bounds.service';
import { ResourceType } from '../models/resourceType';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  resourcesTypes: ResourceType[] = []

  private _resourcesPoints: ResourcePoint[] = [];
  resources = new BehaviorSubject<ResourcePoint[]>(this._resourcesPoints);

  constructor(private http: HttpClient, private mapBoundService: MapBoundsService) { this.onInit(); }

  onInit() {
    this.fetchResourcePointsByLocation();
    this.getResourcesTypes();
  }

  getResourcesTypes() {
    this.http.get<any[]>('/api/v1/resourcePoint/getResType').subscribe(data => {
      this.resourcesTypes = data.map(resourceType => {
        return {
          name: resourceType.name,
          description: resourceType.description,
          unit: resourceType.unit
        }
      });
    });
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

  addResourcesPoint(resourcePoint: ResourcePoint) {
    this.http.post<any>('/api/v1/location', {
      address: "sinadal",
      longitude: resourcePoint.location.longitude,
      latitude: resourcePoint.location.latitude
    }).subscribe(resp => {
      let locationToAdd = {
        id: resp.id,
        address: resp.address,
        latitude: resp.latitude,
        longitude: resp.longitude
      };
      this.http.post<any>('/api/v1/resourcePoint', {
        pointName: resourcePoint.title,
        locationId: locationToAdd.id,
        resources: resourcePoint.resources
      }).subscribe(resp => {
        console.log(resp);
      });
    });
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

  getResourcePointIndex(resourcePoint: ResourcePoint) {
    return this._resourcesPoints.indexOf(resourcePoint);
  }


  fetchResourcePointsByLocation() {
    this.http.post<any[]>('/api/v1/resourcePoint/getResByLoc',
      {
        latitudeLowerBoundry: this.mapBoundService.getBounds().south,
        latitudeUpperBoundry: this.mapBoundService.getBounds().north,
        longitudeLowerBoundry: this.mapBoundService.getBounds().west,
        longitudeUpperBoundry: this.mapBoundService.getBounds().east
      }
    ).subscribe(data => {
      // console.log(data);
      this._resourcesPoints = data.map(resourcePoint => {
        return {
          title: resourcePoint.name,
          location: {
            address: resourcePoint.location.address,
            latitude: resourcePoint.location.latitude,
            longitude: resourcePoint.location.longitude
          },
          resources: resourcePoint.resources
        }
      });
      this.resources.next(this._resourcesPoints);
    });
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
