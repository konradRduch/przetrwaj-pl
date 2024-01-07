import { Component } from '@angular/core';
import { Incident } from '../models/indident';
import { IncidentItemComponent } from '../incident-item/incident-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [
    IncidentItemComponent,
    CommonModule
  ],
  templateUrl: './incidents-list.component.html',
  styleUrl: './incidents-list.component.css'
})
export class IncidentsListComponent {

  incidents: Incident[] =
  [
    {
      title: "Incident 1",
      description: "Description 1",
      address: "Address 1",
      location: {
        latitude: 0,
        longitude: 0
      },
      creationDate: new Date("2024-01-01T00:00:00.000Z"),
      expirationDate: new Date("2024-02-01T00:00:00.000Z"),
      dangerLevel: 1,
    },
    {
      title: "Incident 2",
      description: "Description 2",
      address: "Address 2",
      location: {
        latitude: 0,
        longitude: 0
      },
      creationDate: new Date("2024-01-01T00:00:00.000Z"),
      expirationDate: new Date("2024-02-01T00:00:00.000Z"),
      dangerLevel: 2,
    }
  ];

}
