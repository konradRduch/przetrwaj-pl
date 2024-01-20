import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationSource = new BehaviorSubject({lat: 0, lng: 0});
  currentLocation = this.locationSource.asObservable();

  constructor() { }

  changeLocation(lat: number, lng: number) {
    this.locationSource.next({lat, lng});
  }
}