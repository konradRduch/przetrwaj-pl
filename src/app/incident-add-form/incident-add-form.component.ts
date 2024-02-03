import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { IncidentsService } from '../services/incidents.service';
import { FormsModule } from '@angular/forms';
import { MapMarkersService } from '../services/map-markers.service';
import { MapBoundsService } from '../services/map-bounds.service';
import { CommonModule } from '@angular/common';

export interface LocationDB {
  id: number,
  address: string,
  latitude: number,
  longitude: number
}

@Component({
  selector: 'app-incident-add-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './incident-add-form.component.html',
  styleUrl: './incident-add-form.component.css'
})

export class IncidentAddFormComponent {
  latMarker: any;
  lngMarker: any;
  incidentTitle: string = "";
  incidentDescription: string = "";
  incidentTypeName!: string;
  locationToAdd!: LocationDB

  incidentTypeIndex: any;
  incidentTypeNames!: any[]

  setLocation(lat: number, lng: number){
    this.latMarker = lat
    this.lngMarker = lng
  }

  constructor(private locationService: LocationService, private incidentService: IncidentsService,
              private mapMarkerService: MapMarkersService, private mapBoundsService: MapBoundsService) {
   }

  ngOnInit() {
    this.locationService.currentLocation.subscribe(location => {
      this.setLocation(location.lat, location.lng);
      this.incidentTypeNames = this.incidentService.getIncidentTypeNames()
    });
  }

  addIncident() {
    this.mapMarkerService.clearMarker()
    this.incidentService.addIncident(this.latMarker, this.lngMarker, this.locationToAdd, this.incidentDescription, Number(this.incidentTypeIndex) + 1)
    let bounds = this.mapBoundsService.getBounds()
    this.incidentService.fetchIncidentsByLocation(bounds.north, bounds.south, bounds.east, bounds.west)
    //this.mapBoundsService.setBounds(bounds.north, bounds.south, bounds.east, bounds.west)
    }    
}
