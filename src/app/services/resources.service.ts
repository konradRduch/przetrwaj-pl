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
          id: resourceType.id,
          name: resourceType.name,
          description: resourceType.description,
          unit: resourceType.unit
        }
      });
      //console.log(this.resourcesTypes)
    });
  }

  addResourceToPoint(resource: any, index: number) {
    let existingResource = this._resourcesPoints[index - 1].resources.find(r => r.resourceType.id == resource[0]);
    if (existingResource) {
      this.http.post<any>('/api/v1/resourcePoint/changeResQuantity', {
        resourceId: existingResource.resourceId,
        quantityDelta: resource[1]
      }).subscribe(resp => {
      });

    } else {
      this.http.post<any>('/api/v1/resourcePoint/addResource', {
        resourceTypeId: resource[0],
        pointId: index,
        quantity: resource[1]
      }).subscribe(resp => {
      });
    }
  }

  addResourcesToPoint(resources: any[], index: number) {
    const resourcesMap = new Map<string, number>();
    for (let resource of resources) {
      let resourceType = resource.resourceType.id
      let quantity = resource.quantity
      if (resourcesMap.has(resourceType)) {
        resourcesMap.set(resourceType, resourcesMap.get(resourceType)! + quantity);
      } else {
        resourcesMap.set(resourceType, quantity);
      }
    }
  for (let resource of resourcesMap) {
    this.addResourceToPoint(resource, index)
  }
}

  addResourcesPoint(resourcePoint: ResourcePoint) {
    this.http.post<any>('/api/v1/location', {
      address: resourcePoint.location.address,
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
        // console.log(resp);
        this.fetchResourcePointsByLocation();
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

  getResourcesPoinsCount() {
    return this._resourcesPoints.length;
  }

  fetchResourcePointsByLocation() {
    this.mapBoundService.currentMapBounds.subscribe(bounds => {
      this.http.post<any[]>('/api/v1/resourcePoint/getResByLoc',
        {
          latitudeLowerBoundry: bounds.south,
          latitudeUpperBoundry: bounds.north,
          longitudeLowerBoundry: bounds.west,
          longitudeUpperBoundry: bounds.east
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
    });
  }
}
