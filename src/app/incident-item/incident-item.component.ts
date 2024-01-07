import { Component, Input } from '@angular/core';
import { Incident } from '../models/indident';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incident-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './incident-item.component.html',
  styleUrl: './incident-item.component.css'
})
export class IncidentItemComponent {
  @Input() incident?: Incident;
}
