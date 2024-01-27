import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { IncidentsService } from '../services/incidents.service';
import { FormsModule } from '@angular/forms';
import { MapMarkersService } from '../services/map-markers.service';

@Component({
  selector: 'app-incident-add-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './incident-add-form.component.html',
  styleUrl: './incident-add-form.component.css'
})

export class IncidentAddFormComponent {
  latMarker: any;
  lngMarker: any;
  incidentTitle: string = "";
  incidentDescription: string = "";
  incidentTypeName!: string;

  setLocation(lat: number, lng: number){
    this.latMarker = lat
    this.lngMarker = lng
  }

  constructor(private locationService: LocationService, private incidentService: IncidentsService, private mapMarkerService: MapMarkersService) {
   }

  ngOnInit() {
    this.locationService.currentLocation.subscribe(location => {
      this.setLocation(location.lat, location.lng);
    });
  }

  addIncident() {
    let creationDate = new Date();
    let expirationDate = new Date(creationDate);
    expirationDate.setMonth(creationDate.getMonth() + 1);
    const incident = {
        title: this.incidentTitle,
        description: this.incidentDescription,
        incidentType: {
          name: this.incidentTypeName,
          description: "Type 1 description 1"
        },
        address: "Address 1",
        location: {
          latitude: this.latMarker,
          longitude: this.lngMarker
        },
        creationDate: creationDate,
        expirationDate: expirationDate,
        dangerLevel: 10,
      };
      this.mapMarkerService.clearMarker();
      this.incidentService.addIncident(incident);
    }    
}
