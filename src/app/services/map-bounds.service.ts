import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapBoundsService {
  private mapBoundsSource = new BehaviorSubject({ north : 0, south: 0, east: 0, west: 0});
  currentMapBounds = this.mapBoundsSource.asObservable();

  constructor() { }

  setBounds(north: number, south: number, east: number, west: number) {
    this.mapBoundsSource.next({ north: north, south: south, east: east, west: west});
  }

  getBounds() {
    return this.mapBoundsSource.value;
  }
}
