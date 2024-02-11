import { Injectable } from '@angular/core';
import { ResourcePoint } from '../models/resourcePoint';
import { Resource } from '../models/resource';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapBoundsService } from './map-bounds.service';
import { ResourceType } from '../models/resourceType';
import { ResourceAdd } from '../resource-add-form/resource-add-form.component';

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

  addResourceToPoint(rtId: number, rq: number, index: number) {
    let rp = this._resourcesPoints.find(rp => rp.pointId == index)
    if (rp) {
      let existingResource = rp.resources.find(r => r.resourceType.id == rtId);
      if (existingResource) {
        this.http.post<any>('/api/v1/resourcePoint/changeResQuantity', {
          resourceId: existingResource.resourceId,
          quantityDelta: rq
        }).subscribe(resp => {
          this.fetchResourcePointsByLocation();
        });
      } else {
        this.http.post<any>('/api/v1/resourcePoint/addResource', {
          resourceTypeId: rtId,
          pointId: index,
          quantity: rq
        }).subscribe(resp => {
          this.fetchResourcePointsByLocation();
        });
      }
    }
  }

  addResourcesToPoint(resources: ResourceAdd[], index: number) {
    this.fetchResourcePointsByLocation()
    //console.log(resources, "zasoby dodawane do", index)
    const resourcesMap = new Map<number, number>();
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
      this.addResourceToPoint(resource[0], resource[1], index)
    }
  }

  addResourcesPoint(resourcePoint: any) {
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

  removeResource(resource: Resource) {
    this.http.post<any>('/api/v1/resourcePoint/removeResource',
      resource.resourceId
    ).subscribe(resp => {
      console.log("deleted resource")
    });
  }

  removeResourcePoint(resourcePoint: ResourcePoint) {
    this.http.post<any>('/api/v1/resourcePoint/removeResourcePoint',
      resourcePoint.pointId
    ).subscribe(resp => {
      console.log("deleted point")
    });
    this._resourcesPoints = this._resourcesPoints.filter(i => i !== resourcePoint);
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

  getResourcePointTitles(): any[] {
    return this._resourcesPoints.map(rp => ({ title: rp.title, pointId: rp.pointId }));
  }

  getResourcePointIndex(resourcePoint: ResourcePoint) {
    return this._resourcesPoints.indexOf(resourcePoint);
  }

  getResourcesPoinsCount() {
    return this._resourcesPoints.length;
  }

  fetchResourcePointsByLocation() {
    this.mapBoundService.currentMapBounds.subscribe(bounds => {
      this.http.post<any[]>('/api/v1/resourcePoint/getResByLoc', {
        latitudeLowerBoundry: bounds.south,
        latitudeUpperBoundry: bounds.north,
        longitudeLowerBoundry: bounds.west,
        longitudeUpperBoundry: bounds.east
      }).subscribe(data => {
        this._resourcesPoints = data.map(resourcePoint => {
          return {
            pointId: resourcePoint.id,
            title: resourcePoint.name,
            location: {
              address: resourcePoint.location.address,
              latitude: resourcePoint.location.latitude,
              longitude: resourcePoint.location.longitude
            },
            resources: resourcePoint.resources.sort((a: Resource, b: Resource) => a.resourceType.name.localeCompare(b.resourceType.name))
          };
        });
        this.resources.next(this._resourcesPoints);
      });
    });
  }
}
